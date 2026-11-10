// Second-pass overlays (HUD scene, GameMenu on top of the level). Each overlay owns a THREE.Scene with the same x-mirror root as renderer.js and its own
// CameraPerspective node. Camera maths = renderer.js updateCamera (FORMATS Rendering facts; three camera = camNode.matrixWorld * diag(1,1,-1), Fov vertical G-R06).
import * as THREE from 'three';

const M_CZ = new THREE.Matrix4().makeScale(1, 1, -1);

export function createOverlay(content, name = 'overlay') {
  const scene = new THREE.Scene(); const mirror = new THREE.Group(); mirror.scale.set(-1, 1, 1); scene.add(mirror); mirror.add(content);
  const camera = new THREE.PerspectiveCamera(45, 4 / 3, 0.5, 200); camera.matrixAutoUpdate = false;
  let camNode = null; content.traverse((o) => { if (!camNode && o.userData.camera) camNode = o; });
  return { name, scene, mirror, content, camera, camNode, visible: true };
}
export function updateOverlayCamera(ov) {
  const ci = ov.camNode && ov.camNode.userData.camera; ov.scene.updateMatrixWorld(true); if (!ci) return false;
  const c = ov.camera; c.fov = THREE.MathUtils.radToDeg(ci.fov); c.aspect = 1 / ci.aspect; c.near = ci.near; c.far = ci.far; c.updateProjectionMatrix();
  c.matrix.copy(ov.camNode.matrixWorld).multiply(M_CZ); c.matrixWorld.copy(c.matrix); c.matrixWorldInverse.copy(c.matrix).invert();
  return true;
}
// Wrap R.render once: base render, then every overlay with depth cleared (colour kept).
export function installOverlays(R) {
  if (R.overlays) return; R.overlays = [];
  const base = R.render;
  R.render = () => {
    base();
    if (!R.content && !R.overlays.length) return;
    const gl = R.gl;
    for (const ov of R.overlays) {
      if (!ov.visible || !updateOverlayCamera(ov)) continue;
      const prev = gl.autoClear; gl.autoClear = false; gl.clearDepth(); gl.render(ov.scene, ov.camera); gl.autoClear = prev;
    }
  };
}
export function addOverlay(R, ov) { installOverlays(R); if (!R.overlays.includes(ov)) R.overlays.push(ov); R.invalidate && R.invalidate(2); }
export function removeOverlay(R, ov) { if (!R.overlays) return; const i = R.overlays.indexOf(ov); if (i >= 0) R.overlays.splice(i, 1); R.invalidate && R.invalidate(2); }
