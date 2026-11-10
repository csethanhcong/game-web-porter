// three.js renderer for the D3D8 (left-handed) data. See FORMATS.md "Rendering facts".
// Strategy: scene graph keeps raw D3D coordinates; the root group mirrors x (scale -1,1,1) so three's right-handed pipeline shows the identical image.
//  Camera CameraPerspective Scale="-1 1 -1" (a 180deg yaw) points the D3D camera along -z with screen-right = world -x (G-X02 explained);
//  three camera matrix = matrixWorld(camNode incl. mirror) * diag(1,1,-1)  (D3D camera looks +z local, three looks -z local).
import * as THREE from 'three';
import { pendingCount } from './loader/assets.js';
import { lightUniforms, MAX_LIGHTS, setLighting } from './render/material.js';
import { DIRLIGHT_THREE_FORM } from './config.js';
import { orientBillboards } from './render/billboard.js';
import { orientParticles } from './render/particles.js';

THREE.ColorManagement.enabled = false;

export function createRenderer(canvas) {
  const gl = new THREE.WebGLRenderer({ canvas, antialias: true, preserveDrawingBuffer: true });
  gl.outputColorSpace = THREE.LinearSRGBColorSpace;
  gl.setClearColor(0x000000, 1); // GUESS clear colour (black); engine clear not located
  const scene = new THREE.Scene();
  const mirror = new THREE.Group(); mirror.name = 'mirrorX'; mirror.scale.set(-1, 1, 1); scene.add(mirror);
  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 200); camera.matrixAutoUpdate = false;
  const R = { gl, scene, mirror, camera, content: null, camNode: null, camInfo: null, viewAspect: 4 / 3, override: null, wireframe: false };

  R.setContent = (content) => {
    if (R.content) mirror.remove(R.content);
    R.content = content; mirror.add(content); content.updateMatrixWorld(true);
    let cam = null; content.traverse((o) => { if (!cam && o.userData.camera && o.name === 'Camera') cam = o; });
    if (!cam) content.traverse((o) => { if (!cam && o.userData.camera) cam = o; });
    R.rawView = null; R.camNode = cam; R.camInfo = cam ? cam.userData.camera : null;
    if (R.camInfo) R.viewAspect = 1 / R.camInfo.aspect; // Aspect=0.75 read as height/width (GUESS G-R06) -> 4:3 landscape
    R.resize(); R.render(); R.invalidate(3);
  };

  // Render-on-dirty loop (FIX-R1). R.render() stays synchronous (used by __dbg). invalidate(n) schedules n frames via rAF,
  // so a late GPU texture upload / resize / async load still ends up drawn instead of leaving the first frame black.
  let dirty = 0, looping = false;
  function loop() { if (dirty > 0) { dirty--; R.render(); requestAnimationFrame(loop); } else looping = false; }
  R.invalidate = (n = 1) => { dirty = Math.max(dirty, n); if (!looping) { looping = true; requestAnimationFrame(loop); } };
  // Force GPU upload of every map now (before first draw) and wait two frames, so __ready means "first frame has pixels".
  R.prepare = async () => {
    scene.traverse((o) => { if (o.isMesh && o.material && o.material.uniforms && o.material.uniforms.uMap && o.material.uniforms.uMap.value) gl.initTexture(o.material.uniforms.uMap.value); });
    R.render(); R.invalidate(3);
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    R.render();
  };

  const M_CZ = new THREE.Matrix4().makeScale(1, 1, -1), tmp = new THREE.Matrix4();
  function updateCamera() {
    const ci = R.camInfo;
    if (!R.camNode || !ci) { // DEBUG-ONLY (FIX-R2, NOT original behaviour): raw ?scene= view without a Camera node -> frame the bbox. Never used by ?level=.
      if (!R.rawView) return;
      camera.fov = 45; camera.aspect = R.viewAspect; camera.near = R.rawView.near; camera.far = R.rawView.far; camera.updateProjectionMatrix();
      camera.matrix.copy(R.override || R.rawView.matrix); camera.matrixWorld.copy(camera.matrix); camera.matrixWorldInverse.copy(camera.matrix).invert(); return;
    }
    R.content.updateMatrixWorld(true);
    // D3D FOV = vertical (D3DXMatrixPerspectiveFovLH convention; GUESS G-R06). Check: with vertical fov the whole 45x45 grid is on screen
    // (ground y ndc +0.82..-0.88), with horizontal fov the grid would overflow the viewport. Aspect attr 0.75 = H/W -> viewport 4:3.
    camera.fov = THREE.MathUtils.radToDeg(ci.fov); camera.aspect = 1 / ci.aspect; camera.near = ci.near; camera.far = ci.far;
    camera.updateProjectionMatrix();
    camera.matrix.copy(R.override || tmp.copy(R.camNode.matrixWorld).multiply(M_CZ));
    camera.matrixWorld.copy(camera.matrix); camera.matrixWorldInverse.copy(camera.matrix).invert();
  }
  // DEBUG-ONLY default camera for raw scenes (three-space, i.e. after the x mirror): 3/4 view of the content bbox. GUESS-free: not from the original.
  R.frameContent = () => {
    R.content.updateMatrixWorld(true);
    const box = new THREE.Box3(), mb = new THREE.Box3(); // visible meshes only (hidden effect nodes would inflate the frame)
    R.content.traverseVisible((o) => { if (o.isMesh) { o.geometry.computeBoundingBox(); mb.copy(o.geometry.boundingBox).applyMatrix4(o.matrixWorld); box.union(mb); } });
    if (box.isEmpty()) return;
    const c = box.getCenter(new THREE.Vector3()), r = Math.max(box.getSize(new THREE.Vector3()).length() / 2, 0.1), d = r / Math.sin(THREE.MathUtils.degToRad(22.5)) * 1.1;
    const pos = c.clone().add(new THREE.Vector3(0.6, 0.5, 1).normalize().multiplyScalar(d));
    R.rawView = { near: d / 100, far: d * 10, matrix: new THREE.Matrix4().lookAt(pos, c, new THREE.Vector3(0, 1, 0)).setPosition(pos) };
  };
  R.cameraMatrix = () => camera.matrix.clone();

  // Lights: all visible Light nodes (D3D world is global; lights embedded in object scenes count when visible).
  function refreshLights() {
    const amb = lightUniforms.uAmbient.value.set(0, 0, 0); let n = 0;
    const lu = lightUniforms;
    R.content.traverseVisible((o) => {
      const L = o.userData.light; if (!L) return;
      if (L.intensity <= 0.01) return; // Light::render 0x46be10: Intensity <= 0.01 skipped (CONFIRMED)
      if (L.type === 'AMBIENT') { amb.x += L.ambient[0] * L.intensity; amb.y += L.ambient[1] * L.intensity; amb.z += L.ambient[2] * L.intensity; return; } // CONFIRMED 0x46be10 / 0x488380
      if (n >= MAX_LIGHTS) return; // max 8 (FUN_004881f0), AMBIENT takes no slot
      const col = lu.uLCol.value[n], att = lu.uLAtt.value[n], I = L.intensity;
      if (L.type === 'DIRECTIONAL') { // Diffuse = rgb*Intensity (CONFIRMED FUN_004881f0). Direction form in three space = GUESS (config DIRLIGHT_THREE_FORM)
        col.set(L.diffuse[0] * I, L.diffuse[1] * I, L.diffuse[2] * I);
        const e = o.matrixWorld.elements; // W20,W21,W22 = e[2], e[6], e[10] (column-major)
        if (DIRLIGHT_THREE_FORM === 'literal') lu.uLPos.value[n].set(e[2], e[6], -e[10]);
        else lu.uLPos.value[n].set(-e[2], e[6], -e[10]); // C row 2 (mirror leaves row 2 unchanged), engine L=(C20,C21,-C22), then x reflected into three space
        lu.uLPos.value[n].normalize().negate(); // shader uses L = -uLPos for directional (uLPos = direction light travels)
        lu.uLType.value[n] = 1; att.set(1, 0, 0); lu.uLRange.value[n] = 1e9;
      } else { // POINT (CONFIRMED FUN_004881f0 / FUN_0047ca70): Diffuse=rgb, atten coef/I, Range 6 | 6I | 6sqrt(I)
        col.set(L.diffuse[0], L.diffuse[1], L.diffuse[2]);
        o.getWorldPosition(lu.uLPos.value[n]); lu.uLType.value[n] = 0;
        if (L.attenuation === 'QUADRATIC') { att.set(0, 0, 1 / I); lu.uLRange.value[n] = 6 * Math.sqrt(I); }
        else if (L.attenuation === 'CONSTANT') { att.set(1 / I, 0, 0); lu.uLRange.value[n] = 6; }
        else { att.set(0, 1 / I, 0); lu.uLRange.value[n] = 6 * I; }
      }
      n++;
    });
    // D3DRS_AMBIENT = sat(sum Ambient*Intensity) quantised to /255 (CONFIRMED 0x488380)
    amb.set(Math.round(Math.min(Math.max(amb.x, 0), 1) * 255) / 255, Math.round(Math.min(Math.max(amb.y, 0), 1) * 255) / 255, Math.round(Math.min(Math.max(amb.z, 0), 1) * 255) / 255);
    lu.uNumLights.value = n;
  }

  R.resize = () => {
    const w = innerWidth, h = innerHeight; let vw = w, vh = Math.round(w / R.viewAspect); if (vh > h) { vh = h; vw = Math.round(h * R.viewAspect); }
    canvas.style.width = vw + 'px'; canvas.style.height = vh + 'px'; canvas.style.display = 'block'; canvas.style.margin = `${Math.floor((h - vh) / 2)}px auto`;
    gl.setPixelRatio(Math.min(devicePixelRatio || 1, 2)); gl.setSize(vw, vh, false);
  };
  R.render = () => { if (!R.content) return; updateCamera(); orientBillboards(scene, camera.matrix); orientParticles(camera.matrix); refreshLights(); gl.render(scene, camera); };
  R.stats = () => ({ pending: pendingCount() });
  R.setWireframe = (on) => { R.wireframe = !!on; scene.traverse((o) => { if (o.isMesh) o.material.wireframe = R.wireframe; }); };
  R.setLighting = setLighting;
  R.setCameraOverride = (m) => { R.override = m ? new THREE.Matrix4().fromArray(m) : null; };
  addEventListener('resize', () => { R.resize(); R.render(); R.invalidate(2); });
  return R;
}
