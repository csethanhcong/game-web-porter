// Dynamic shadow = exe FUN_00415f20 (lightmap render) + FUN_00416450 (ground quad draw). See FORMATS.md "Shadows".
// Game coords (x,y,z-up) <-> three (x,z,y). All math below is done in GAME coords like the exe, then converted.
// CONFIRMED (decompile/disasm): constants 145 (quad/ortho width), 10 (re-centre threshold), 1000 (light dist), -25 (cam y offset),
// near 1 / far 5000, RT "lightmap" 512x512 (FUN_00414330), clear black, casters white, quad blend SRC=ZERO DST=INVSRCCOLOR,
// colour = tex * (global ambient 1 * material ambient 0.5), ZENABLE off in exe (here: depth test + polygonOffset, equivalent on ground).
const D2R = Math.PI / 180;
export function createShadow(THREE, renderer, scene, camera, opts = {}) {
  const SIZE = 145, RTS = 512, GY = opts.groundY ?? 0;
  const rt = new THREE.WebGLRenderTarget(RTS, RTS, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: false, depthBuffer: true });
  const ocam = new THREE.OrthographicCamera(-SIZE / 2, SIZE / 2, SIZE / 2, -SIZE / 2, 1, 5000);
  const white = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide });
  const mat = new THREE.ShaderMaterial({
    uniforms: { map: { value: rt.texture }, k: { value: 0.5 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: 'uniform sampler2D map; uniform float k; varying vec2 vUv; void main(){ float s = texture2D(map, vUv).r * k; gl_FragColor = vec4(vec3(1.0 - s), 1.0); }',
    transparent: true, depthWrite: false, depthTest: true, side: THREE.DoubleSide,
    blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.ZeroFactor, blendDst: THREE.SrcColorFactor, // = exe ZERO/INVSRCCOLOR with src=s: dst*(1-s) (INVSRCCOLOR factor rendered black in three, so output 1-s and use SRCCOLOR)
    polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2,
  });
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(12);
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  // exe vertex order (FUN_00430b60, flat case): v0(-R+U) uv(0,0), v1(-R-U) uv(1,0), v2(R+U) uv(0,1), v3(R-U) uv(1,1); D3D v down -> GL v = 1-v
  geo.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 1, 1, 1, 0, 0, 1, 0]), 2));
  geo.setIndex([0, 1, 2, 2, 1, 3]);
  const quad = new THREE.Mesh(geo, mat); quad.frustumCulled = false; quad.renderOrder = 3; quad.visible = false; scene.add(quad);
  const S = { x: 0, y: 0, z: -1 }; // DAT_0053d384 = normalised .lev sun (raw)
  const C = { x: 0, y: 0, z: 0 }; // DAT_0055a7e4 lightmap centre (game), starts 0
  const g = (p) => ({ x: p.x, y: p.z, z: p.y }); // three -> game
  const casters = [];
  const setL = (o, on) => { if (!o) return; o.traverse((m) => { if (on) m.layers.enable(1); else m.layers.disable(1); }); };
  ocam.layers.set(1);
  // ---- static per-object shadow FUN_0041d180 (bake) + slot 0xc quad FUN_0041ee30 -> FUN_00430eb0 (drawn inside the lightmap pass) ----
  // CONFIRMED: view of the bake = LookAt(eye=(sx,sy,-sz)*500, at 0) built in FUN_0040a890 (same light view as the lightmap), ortho (W, W*vz/|v|, 1, 5000), lights 0/1 DISABLED,
  // clear white, object drawn textured (FUN_0040f410), texel = 255-B; W=(1+tan)R, off=(tan-1)R/2, px = pow2[4..512] nearest 2W, quad 0.94W UV [0.03,0.97] at obj+off*n;
  // lightmap pass blend before FUN_00416870: ALPHABLEND on, SRC=ONE, DST=ONE, lighting off (FUN_00415f20) -> quads and textured items add.
  // CONFIRMED: bake = black silhouette (ambient 0, see bakeMatOf), shadow side = -(sx,sy) (static bake uses the same light view + ground quad mapping as the dynamic pass; FUN_0040a890 view = LookAtLH(500*(sx,sy,-sz), 0, up=v x perp)). R from per-mesh bounding sphere (exe +0xf0/+0xfc).
  const bakeCam = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 3000);
  bakeCam.layers.set(2);
  const shearU = { uDir: { value: new THREE.Vector2() }, uGY: { value: GY } };
  const bakeMats = new WeakMap(), unlitMats = new WeakMap();
  // CONFIRMED (FUN_0040a890 + FUN_0041d180 + FUN_0040f410 + FUN_0043d200, DAT_005d9460=1): the bake material is D3D diffuse (1,1,1,1) / AMBIENT (0,0,0,0) / emissive 0, lights 0/1 disabled, LIGHTING on
  // -> every vertex colour is BLACK (texture colour is irrelevant). Non-.tga meshes: texture 0, no alpha test, CULL_CCW -> solid black silhouette. .tga meshes (flag +0x8c) go through the deferred
  // queue FUN_0043d200: ALPHATEST ref 1 (FUN_0040a890 state 0x18=1), CULL_NONE, blend SRC=ONE DST=INVSRCALPHA -> result = white*(1-alpha). Clear white; texel = 255-B = coverage.
  const bakeMatOf = (m) => {
    let b = bakeMats.get(m); if (b) return b;
    const tga = (m.alphaTest || 0) > 0; // main.js: alphaTest only on .tga textures (== exe flag +0x8c)
    b = new THREE.MeshBasicMaterial({ map: tga ? (m.map || null) : null, color: 0x000000, alphaTest: tga ? 1 / 255 : 0, transparent: tga, side: tga ? THREE.DoubleSide : (m.side ?? THREE.FrontSide), toneMapped: false, fog: false });
    b.onBeforeCompile = (sh) => { Object.assign(sh.uniforms, shearU); sh.vertexShader = 'uniform vec2 uDir; uniform float uGY;\n' + sh.vertexShader.replace('#include <project_vertex>', 'vec4 wpS = modelMatrix * vec4(transformed,1.0); wpS.xz += uDir * max(wpS.y - uGY, 0.0); vec4 mvPosition = viewMatrix * wpS; gl_Position = projectionMatrix * mvPosition;'); };
    b.customProgramCacheKey = () => 'shadowShear'; bakeMats.set(m, b); return b;
  };
  const unlitOf = (m) => { // item / key / lock casters: textured, lighting off, additive (lightmap pass state)
    let b = unlitMats.get(m); if (b) return b;
    b = new THREE.MeshBasicMaterial({ map: m.map || null, color: m.color ? m.color.clone() : 0xffffff, alphaTest: m.alphaTest || 0, transparent: true, opacity: m.opacity ?? 1, side: THREE.DoubleSide, depthTest: false, depthWrite: false, toneMapped: false, fog: false, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor });
    unlitMats.set(m, b); return b;
  };
  const swapMats = (obj, fn, saved) => obj.traverse((q) => { if (!q.isMesh) return; if (saved) { saved.push([q, q.material]); } q.material = Array.isArray(q.material) ? q.material.map(fn) : fn(q.material); });
  const restoreMats = (saved) => { for (const [q, m] of saved) q.material = m; saved.length = 0; };
  const baked = new Map(), quads = new Map(), qmat = new Map();
  const potNear = (v) => { let best = 4; for (let n = 4; n <= 512; n *= 2) if (Math.abs(n - v) < Math.abs(best - v)) best = n; return best; };
  const sunDir = () => { const sz = S.z || -1e-6, dx = S.x / sz, dy = S.y / sz, tn = Math.hypot(dx, dy); return { dx, dy, tn, nx: tn > 1e-6 ? dx / tn : 1, ny: tn > 1e-6 ? dy / tn : 0 }; }; // game-space ground displacement per unit height
  function bakeFor(ob) {
    const key = ob.ch + '_' + (ob.rot || 0); let b = baked.get(key); if (b) return b;
    const m = ob.mesh, sd = sunDir(), o = m.position; m.updateMatrixWorld(true);
    let R = 0.5; const sp = new THREE.Vector3(), sc = new THREE.Vector3();
    m.traverse((q) => { if (!q.isMesh || !q.geometry) return; if (!q.geometry.boundingSphere) q.geometry.computeBoundingSphere(); const bs = q.geometry.boundingSphere; // exe: R = max over meshes (|centre comp| + radius), centre/radius = mesh +0xf0/+0xfc
      sp.copy(bs.center).applyMatrix4(q.matrixWorld).sub(o); q.matrixWorld.decompose(new THREE.Vector3(), new THREE.Quaternion(), sc); const r = bs.radius * Math.max(sc.x, sc.y, sc.z);
      R = Math.max(R, Math.abs(sp.x) + r, Math.abs(sp.z) + r, Math.abs(sp.y) + r); });
    const W = (1 + sd.tn) * R, off = (sd.tn - 1) * R / 2, px = potNear(2 * W);
    const rtB = new THREE.WebGLRenderTarget(px, px, { minFilter: THREE.LinearFilter, magFilter: THREE.LinearFilter, generateMipmaps: false, depthBuffer: true });
    const cx = o.x + off * sd.nx, cz = o.z + off * sd.ny;
    bakeCam.left = -W / 2; bakeCam.right = W / 2; bakeCam.top = W / 2; bakeCam.bottom = -W / 2; bakeCam.updateProjectionMatrix();
    bakeCam.up.set(sd.nx, 0, sd.ny); bakeCam.position.set(cx, GY + 1000, cz); bakeCam.lookAt(cx, GY, cz); bakeCam.updateMatrixWorld(true);
    shearU.uDir.value.set(sd.dx, sd.dy);
    const saved = [], lay = []; swapMats(m, bakeMatOf, saved); m.traverse((q) => { lay.push([q, q.layers.mask]); q.layers.enable(2); });
    const pr = renderer.getRenderTarget(), pb = scene.background, pa = renderer.autoClear, cc = renderer.getClearColor(new THREE.Color()), ca = renderer.getClearAlpha();
    scene.background = null; renderer.autoClear = true; renderer.setClearColor(0xffffff, 1);
    renderer.setRenderTarget(rtB); renderer.clear(); renderer.render(scene, bakeCam);
    renderer.setRenderTarget(pr); renderer.setClearColor(cc, ca); scene.background = pb; renderer.autoClear = pa;
    restoreMats(saved); for (const [q, mk] of lay) q.layers.mask = mk;
    b = { rt: rtB, W, off, px, nx: sd.nx, ny: sd.ny }; baked.set(key, b); return b;
  }
  function quadFor(ob) {
    let q = quads.get(ob); if (q) return q;
    const b = bakeFor(ob), hw = 0.47 * b.W, cx = b.off * b.nx, cz = b.off * b.ny;
    const rx = -b.ny, rz = b.nx, P = [], U = [];
    for (const [su, sv] of [[-1, 1], [-1, -1], [1, 1], [1, -1]]) { P.push(cx + su * hw * rx + sv * hw * b.nx, 0, cz + su * hw * rz + sv * hw * b.ny); U.push(su < 0 ? 0.03 : 0.97, sv < 0 ? 0.03 : 0.97); }
    const gq = new THREE.BufferGeometry(); gq.setAttribute('position', new THREE.BufferAttribute(new Float32Array(P), 3)); gq.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(U), 2)); gq.setIndex([0, 1, 2, 2, 1, 3]);
    let mt = qmat.get(b); if (!mt) { // texel = 255-B written to RGB (exe FUN_0041d180), then added (ONE/ONE); no gamma (exe works on raw bytes; rt here is raw too)
      mt = new THREE.ShaderMaterial({ uniforms: { map: { value: b.rt.texture } }, vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
        fragmentShader: 'uniform sampler2D map; varying vec2 vUv; void main(){ float b = clamp(texture2D(map, vUv).b, 0.0, 1.0); gl_FragColor = vec4(vec3(1.0 - b), 1.0); }',
        side: THREE.DoubleSide, depthTest: false, depthWrite: false, transparent: true, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor });
      qmat.set(b, mt); }
    q = new THREE.Mesh(gq, mt); q.frustumCulled = false; q.layers.set(3); scene.add(q); quads.set(ob, q); return q;
  }
  // CONFIRMED FUN_0041ee50 (shadow mode): only 'k','z',-0x1f draw the real mesh; items (class 0x48c96c, FUN_0040c8f0) draw textured mesh; every other static object AND movable ('#': vtable 0x48c9bc slot 0x1c = FUN_0041d180, quad matrix +0xa8 follows +0x24 in FUN_0041dc20) = baked quad.
  const isUnlit = (ob) => ob.mesh && ob.ch !== 'k' && ob.ch !== 'z' && ((ob.rec || 0) & 0x200); // 'k'/'z' = FUN_0041e6e0: ALPHABLEND off, lighting on, texture 0 -> white real mesh (CONFIRMED)
  const isBaked = (ob) => ob.mesh && !'kzw'.includes(ob.ch) && !((ob.rec || 0) & 0x200);
  const quadList = [], unlitList = [], whiteList = [], savedU = [];
  const whiteAdd = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide, depthTest: false, depthWrite: false, toneMapped: false, fog: false, transparent: true, blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneFactor });
  const api = {
    quad, rt, angleDeg: 0,
    setSun(x, y, z) { const l = Math.hypot(x, y, z) || 1; S.x = x / l; S.y = y / l; S.z = z / l; },
    // ctx: { hero: Object3D, enemies: Object3D[], objs: [{mesh, ch}], cell }
    update(ctx) {
      // --- FUN_00415f20 ---
      let vx = S.x * 1000, vy = S.y * 1000; const vz = -S.z * 1000; // local_c: sun*1000 with z negated
      if (vx === 0) vx = 1e-6;
      let a = Math.atan(vy / vx); if (vx < 0) a += Math.PI; // DAT_004b6ae0 (rad) before *57.2958
      api.angleDeg = a * (180 / Math.PI);
      const pe = a + Math.PI / 2, px = Math.cos(pe), py = Math.sin(pe); // perp (cos,sin,0)
      let ux = vy * 0 - vz * py, uy = vz * px - vx * 0, uz = vx * py - vy * px; // up = normalize(v x perp)
      const ul = Math.hypot(ux, uy, uz) || 1; ux /= ul; uy /= ul; uz /= ul;
      // focus: ray from (cam + (0,-25,0)) along camera forward onto z=0 (FUN_00439f00); re-centre when moved > 10
      const cp = g(camera.position), f = new THREE.Vector3(); camera.getWorldDirection(f); const fg = g(f);
      const pt = { x: cp.x, y: cp.y - 25, z: cp.z };
      const t = fg.z === 0 ? -1 : -pt.z / fg.z;
      const P = { x: pt.x + fg.x * t, y: pt.y + fg.y * t, z: pt.z + fg.z * t };
      if (Math.hypot(P.x - C.x, P.y - C.y, P.z - C.z) > 10) { C.x = P.x; C.y = P.y; C.z = P.z; }
      // light camera: LookAtLH(eye = C+v, at = C, up) ; ortho (145, 145*vz/|v|, 1, 5000)
      const vl = Math.hypot(vx, vy, vz);
      const H = SIZE * vz / vl;
      ocam.top = H / 2; ocam.bottom = -H / 2; ocam.updateProjectionMatrix();
      ocam.up.set(ux, uz, uy);
      ocam.position.set(C.x + vx, C.z + vz, C.y + vy);
      ocam.lookAt(C.x, C.z, C.y);
      ocam.updateMatrixWorld(true);
      // casters in the exe window around hero cell (FUN_004168c0: x -15..+14, y -14..+10 cells) -- GUESS: anchored on mesh origin
      const hp = g(ctx.hero ? ctx.hero.position : camera.position), cs = ctx.cell || 5;
      const hx = Math.floor(hp.x / cs), hy = Math.floor(hp.y / cs);
      const inWin = (o) => { const p = g(o.position), dx = Math.floor(p.x / cs) - hx, dy = Math.floor(p.y / cs) - hy; return dx >= -15 && dx < 15 && dy >= -14 && dy < 11; };
      for (const o of casters) setL(o, false);
      casters.length = 0;
      if (ctx.hero) casters.push(ctx.hero);
      for (const e of ctx.enemies || []) if (e) casters.push(e);
      for (const q of quadList) q.visible = false; quadList.length = 0; unlitList.length = 0; whiteList.length = 0;
      for (const ob of ctx.objs || []) if (ob && ob.mesh && ob.ch !== 'w' && inWin(ob.mesh)) {
        if (isBaked(ob)) { const q = quadFor(ob); q.position.set(ob.mesh.position.x, GY, ob.mesh.position.z); q.visible = true; quadList.push(q); } // quad follows the object (FUN_0041dc20 rebuilds +0xa8 from +0x24)
        else if (isUnlit(ob)) unlitList.push(ob.mesh);
        else casters.push(ob.mesh);
      }
      for (const m of ctx.extra || []) if (m) whiteList.push(m); // bomb-pickup spheres: FUN_0040ce90 shadow mode = texture 0 (white), additive; flare sprite FUN_0042e290 skipped (CONFIRMED)
      for (const o of casters) setL(o, true);
      const prevRT = renderer.getRenderTarget(), prevOv = scene.overrideMaterial, prevBg = scene.background, prevAuto = renderer.autoClear;
      scene.overrideMaterial = white; scene.background = null; renderer.autoClear = true;
      const cc = renderer.getClearColor(new THREE.Color()), ca = renderer.getClearAlpha();
      renderer.setClearColor(0x000000, 1);
      renderer.setRenderTarget(rt); renderer.clear(); renderer.render(scene, ocam);
      if (quadList.length || unlitList.length || whiteList.length) { // baked quads + textured items, ONE/ONE, lighting off (FUN_00415f20 before FUN_00416870)
        const lay = []; for (const m of unlitList) { swapMats(m, unlitOf, savedU); m.traverse((q) => { lay.push([q, q.layers.mask]); q.layers.enable(3); }); }
        for (const m of whiteList) { swapMats(m, () => whiteAdd, savedU); lay.push([m, m.layers.mask]); m.layers.enable(3); }
        ocam.layers.set(3); scene.overrideMaterial = null; renderer.autoClear = false; renderer.render(scene, ocam); ocam.layers.set(1);
        restoreMats(savedU); for (const [q, mk] of lay) q.layers.mask = mk;
      }
      renderer.setRenderTarget(prevRT); renderer.setClearColor(cc, ca);
      scene.overrideMaterial = prevOv; scene.background = prevBg; renderer.autoClear = prevAuto;
      // --- FUN_00416450 quad: world = Rz(angleDeg) * T(C); verts (+-72.5,+-72.5) ---
      const ca2 = Math.cos(a), sa = Math.sin(a), h = SIZE / 2;
      const L = [[-h, h], [-h, -h], [h, h], [h, -h]];
      for (let i = 0; i < 4; i++) {
        const [lx, ly] = L[i], wx = C.x + lx * ca2 - ly * sa, wy = C.y + lx * sa + ly * ca2;
        pos[i * 3] = wx; pos[i * 3 + 1] = GY; pos[i * 3 + 2] = wy;
      }
      geo.attributes.position.needsUpdate = true;
      quad.visible = true;
    },
  };
  return api;
}
