// Environment sprites: 'T' tree glints (CONFIRMED FUN_0041f0a0) and 'G' tilted grass (CONFIRMED FUN_0041f2f0), dispatched by FUN_0041ee50.
// Stream 2 RNG (state 0x6a4164 idx1+=1, 0x6a4168 idx2+=3, table RT = 0x49e1d8): v = RT[i1]<<8 | RT[i2]; FUN_00440450(n)=v%n; FUN_004404c0(p)=v/32768*p-p; FUN_00440420(seed): i1=seed>>8, i2=seed&255.
// Game z-up (x,y,z) -> three (x,z,y). GUESS items are marked below.
import * as THREE from 'three';
export function createEnvSprites({ RT, spriteQ, txt, camera, OBJ, hero, fl, F, enemies, heatAt }) {
  let a = 0, b = 0, clk = 0; // clk = _DAT_0055a79c (accumulated frame ms)
  const seed = (s) => { a = (s >> 8) & 255; b = s & 255; };
  const nx = () => { a = (a + 1) & 255; b = (b + 3) & 255; return (RT[a] << 8) | RT[b]; };
  const rI = (n) => nx() % n, rF = (p) => nx() / 32768 * p - p;
  const bounds = new Map(); // cgo name -> [{c:[x,y,z], r}] (FUN_0040f080: boundN.name=leaves b_circle=1 center.xyz radius)
  const loadBounds = (name) => { if (bounds.has(name)) return; bounds.set(name, []); txt('geomobjs/' + name).then((s) => {
    const m = {}; for (const ln of s.split(/\r?\n/)) { const k = ln.match(/^\s*(bound\d+)\.(\w+(?:\.\w+)?)\s*=\s*(.+?)\s*$/); if (k) (m[k[1]] ||= {})[k[2]] = k[3]; }
    bounds.set(name, Object.values(m).filter((q) => q.name === 'leaves' && +q.b_circle === 1).map((q) => ({ c: [+q['center.x'], +q['center.y'], +q['center.z']], r: +q.radius })));
  }); };
  const grassB = new WeakMap(), V = new THREE.Vector3(), P = new THREE.Vector3(), col = new THREE.Color(), dir = new THREE.Vector3(), W = new THREE.Vector3();
  const sway = () => { // FUN_00416450: raw (sin(T/200)+3, cos(T/270)*.18, cos(T/170)*.13) normalised, * ((sin(T/400)+2.5)+cos(T/643))
    const T = clk; V.set(Math.sin(T / 200) + 3, Math.cos(T / 270) * 0.18, Math.cos(T / 170) * 0.13).normalize().multiplyScalar(Math.sin(T / 400) + 2.5 + Math.cos(T / 643)); };
  // FUN_0042e290 enqueue: FUN_00413210(pos, radius = size) frustum cull per sprite (CONFIRMED); RNG is consumed regardless
  const Q = (x, y, z, ang, size, c, type, frm) => { if (fr.intersectsSphere(sph.set(P.set(x, y, z), size))) spriteQ(x, y, z, ang, size, c, type, frm, 1); };
  const fr = new THREE.Frustum(), pm = new THREE.Matrix4(), sph = new THREE.Sphere();
  return function frame(ms) {
    clk += ms; sway(); camera.updateMatrixWorld(); pm.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse); fr.setFromProjectionMatrix(pm);
    camera.getWorldDirection(dir); // fwd of FUN_004182c0(0x5faa70): CONFIRMED (FUN_004182c0 = column 2 of the matrix = F; 0x5faa70 = normal camera matrix written by FUN_004158e0): = camera view direction
    seed(0x4d2); // FUN_0041f0a0 reseeds once per call (per object): CONFIRMED order below; reseed placed per object = GUESS (asm shows it once before the loop)
    const hp = hero.obj ? hero.obj.position : null;
    for (const ob of OBJ) {
      if (!ob || !ob.mesh) continue;
      const g = ob.mesh, nm = g.userData.name || '';
      if (ob.ch === 'T' && /^tree[12]\.cgo$/.test(nm)) {
        loadBounds(nm); const bl = bounds.get(nm); if (!bl.length) continue;
                g.updateMatrixWorld();
        seed(0x4d2);
        for (const q of bl) {
          W.set(q.c[0], q.c[2], q.c[1]).applyMatrix4(g.matrixWorld); // centre through obj+0x24
          col.setRGB(0, 0, 0); const B = rI(155) + 100, G = rI(70) + 185, R = rI(155) + 100; col.setRGB(R / 255, G / 255, B / 255);
          const r4 = rF(90), r5 = rF(0.1);
          const size = q.r * 3.5 + V.y * 0.015, ang = r4 + V.x * 0.7;
          P.copy(W); P.z += 1; P.addScaledVector(dir, -(r5 + 0.6)); P.x += V.x * 0.015 * q.r; P.y += V.z * 0.015 * q.r; P.z += V.y * 0.015 * q.r;
          const px = P.x, py = P.y, pz = P.z; Q(px, py, pz, ang, size, col, 2, 0x38);
        }
      } else if (ob.ch === 'G') {
        const px = g.position.x, pz = g.position.z;
                for (const c of g.children) c.visible = false; /* FUN_0041f2f0 draws no mesh */ let st = grassB.get(g); if (!st) { st = { B: 0, seed: ob.rnd | 0 }; grassB.set(g, st); } // obj+0x1d4 = rng(10000) set by FUN_0041da80 (vtable slot 0x18) = ob.rnd (CONFIRMED)
        if (st.B > 0) { st.B -= ms / 80; if (st.B < 0) st.B = 0; }
        // target T by cell flags at (obj+0x1c0,+0x1c4) (CONFIRMED asm FUN_0041f2f0): 0x20 hero (global 0x4dcdb4 = hero pos), else 0x10 enemy (+0x24), else 0x80 movable object (+0x1b4), else (1000,0,0)
        const cx = ob.x, cy = ob.y, ff = fl(cx, cy), ci = cy * F.N + cx; let tx = 1e6, tz = 0;
        if (ff & 0x20) { if (hp) { tx = hp.x; tz = hp.z; } } else if (ff & 0x10) { const e = enemies.find((q) => q.id === F.ie[ci]); if (e) { tx = e.o.position.x; tz = e.o.position.z; } } else if (ff & 0x80) { const m = OBJ[F.i1[ci]]; if (m && m.mesh) { tx = m.mesh.position.x; tz = m.mesh.position.z; } }
        const amp = heatAt(cx, cy) * 10; if (st.B < amp) st.B = amp; // table DAT_005453b8 = heat grid (FUN_00411710): if s>0, B=max(B,s*10)
        let lean = 0; { const dx = px - tx, dz = pz - tz, L = Math.hypot(dx, dz); if (L < 8) lean = (8 - L) * 3; if (dx < 0) lean = -lean; }
        seed(st.seed); const aa = Math.round(Math.min(st.B / 2, 65));
        const OFS = [[0, 1, 1.0], [0, -3, 0.7], [-2, -1, 0.5], [2, -1, 0.4]];
        for (let i = 0; i < 4; i++) {
          const Bc = rI(55) + 200, Gc = rI(75) + 180 - aa, Rc = rI(55) + 200; col.setRGB(Rc / 255, Gc / 255, Bc / 255);
          const size = rF(2) + 6, r5 = rF(20), ang = r5 - 90 + lean * OFS[i][2];
          Q(px + OFS[i][0], 0, pz + OFS[i][1], ang, size, col, 2, 0x32);
        }
      }
    }
  };
}
