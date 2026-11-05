import * as THREE from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { buf, txt } from './formats.js';

export async function loadSkl(path) {
  const ab = await buf(path), dv = new DataView(ab);
  const NV = dv.getUint32(0, true), NB = dv.getUint32(4, true);
  let o = 8;
  const off = new Float32Array(NB * 3);
  for (let i = 0; i < NB * 3; i++, o += 4) off[i] = dv.getFloat32(o, true);
  const inf = []; // per vertex: [{w,b,x,y,z}]
  for (let v = 0; v < NV; v++) {
    const a = [];
    for (let k = 0; k < 3; k++, o += 20) {
      const w = dv.getFloat32(o, true);
      if (w !== 0) a.push({ w, b: dv.getInt32(o + 4, true), x: dv.getFloat32(o + 8, true), y: dv.getFloat32(o + 12, true), z: dv.getFloat32(o + 16, true) });
    }
    inf.push(a);
  }
  const children = [], names = [];
  for (let b = 0; b < NB; b++, o += 56) {
    const n = dv.getInt32(o, true), c = [];
    for (let k = 0; k < n; k++) c.push(dv.getInt32(o + 4 + k * 4, true));
    children.push(c);
    let e = o + 0x18; while (e < o + 0x38 && dv.getUint8(e)) e++; // CONFIRMED FUN_00401340: bone name char[32] at record +0x18 (record 0x38 = count, 5 child slots, name)
    names.push(String.fromCharCode(...new Uint8Array(ab, o + 0x18, e - o - 0x18)));
  }
  const NT = dv.getUint32(o, true); o += 4;
  const idx = new Int32Array(NT * 3);
  for (let i = 0; i < NT * 3; i++, o += 4) idx[i] = dv.getInt32(o, true);
  const uv = new Float32Array(NT * 6);
  for (let i = 0; i < NT * 6; i++, o += 4) uv[i] = dv.getFloat32(o, true);
  const parent = new Int32Array(NB).fill(-1);
  children.forEach((c, b) => c.forEach((k) => (parent[k] = b)));
  return { NV, NB, off, inf, children, parent, names, NT, idx, uv };
}

export async function loadAnm(path) {
  const ab = await buf(path), dv = new DataView(ab);
  const B = dv.getUint32(0, true), ms = dv.getUint32(4, true), F = dv.getUint32(8, true);
  let o = 12;
  const root = new Float32Array(F * 3);
  for (let i = 0; i < F * 3; i++, o += 4) root[i] = dv.getFloat32(o, true);
  const ang = new Float32Array(B * F * 3);
  for (let i = 0; i < B * F * 3; i++, o += 4) ang[i] = dv.getFloat32(o, true);
  return { B, ms, F, root, ang };
}

// CONFIRMED FUN_00404170 (+FUN_004042b0 x87 emulated): q = qz*qy*qx, radians -> three.js Euler order 'ZYX'
export const EULER = { order: 'ZYX', scale: 1 };
const _q = new THREE.Quaternion(), _e = new THREE.Euler(), _m = new THREE.Matrix4(), _t = new THREE.Matrix4();

// CONFIRMED FUN_00402df0 (consts 0x48c2e4=1.0, 0x48c2e8=0.001, 0x48c2f0=0.0): dot<0 -> negate b; if 1-dot<=0.001 linear weights (1-t,t);
// else classic slerp sin((1-t)w)/sin(w), sin(tw)/sin(w), w=acos(dot). Result is NOT normalised (FUN_00402ba0 is a plain copy).
function slerpExact(a, b, t) {
  let d = a.x * b.x + a.y * b.y + a.z * b.z + a.w * b.w, bx = b.x, by = b.y, bz = b.z, bw = b.w;
  if (!(d >= 0)) { d = -d; bx = -bx; by = -by; bz = -bz; bw = -bw; }
  let k0, k1;
  if (1 - d <= 0.001) { k0 = 1 - t; k1 = t; }
  else { const w = Math.acos(d), s = Math.sin(w); k0 = Math.sin((1 - t) * w) / s; k1 = Math.sin(t * w) / s; }
  a.set(k1 * bx + k0 * a.x, k1 * by + k0 * a.y, k1 * bz + k0 * a.z, k1 * bw + k0 * a.w);
  return a;
}
const WIND = (i) => (i % 3 === 0 ? i : i % 3 === 1 ? i + 1 : i - 1); // swap 2nd/3rd vertex of each tri

export class Character {
  constructor(skl, texName) {
    this.skl = skl;
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(skl.NT * 9), 3));
    const uv = new Float32Array(skl.NT * 6);
    for (let i = 0; i < skl.NT * 3; i++) { const j = WIND(i); uv[i * 2] = skl.uv[j * 2]; uv[i * 2 + 1] = skl.uv[j * 2 + 1]; } // CONFIRMED visually (FORMATS: engine v=1-v D3D top-origin; three TextureLoader flipY=true => pass raw v). Previously double-flipped -> grey patches
    g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
    const t = new THREE.TextureLoader().load(__B + 'assets/textures/' + texName); t.colorSpace = THREE.SRGBColorSpace;
    this.mesh = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: t, side: THREE.DoubleSide }));
    this.mesh.frustumCulled = false;
    this.world = Array.from({ length: skl.NB }, () => new THREE.Matrix4());
    this.vpos = new Float32Array(skl.NV * 3);
    this.clip = null; this.time = 0; this.loop = true;
  }
  // CONFIRMED FUN_00402310/00402350/00401a80: play() blends over 200 time units: old clip keeps running, new clip frozen at frame 0,
  // blend t = timer/200; when done the new clip becomes current and keeps the overshoot as its time.
  play(anm, loop = true, dur = 200) { // dur: FUN_00402310 = 200 (0x43480000), FUN_00402350(anm, d) = explicit d (enemy shock = 100)
    if (!this.clip) { this.clip = anm; this.time = 0; this.loop = loop; return; }
    this.blend = { to: anm, loop, t: 0, dur };
  }
  update(dt) {
    let a = this.clip; if (!a) return;
    const d = dt * 1000, bl = this.blend;
    if (bl) {
      if (bl.t < bl.dur) bl.t += d;
      if (bl.t >= bl.dur) { this.time = bl.t - bl.dur; this.clip = a = bl.to; this.loop = bl.loop; this.blend = null; }
      else this.time += d;
    } else this.time += d;
    const T = a.F * a.ms;
    if (this.loop) { if (this.time > T) this.time -= T; if (this.time > T) this.time %= T; } else this.time = Math.min(this.time, T - 1e-3);
    this.pose(a, this.time / a.ms);
  }
  localQ(a, b, f, out) {
    _e.set(a.ang[(b * a.F + f) * 3] * EULER.scale, a.ang[(b * a.F + f) * 3 + 1] * EULER.scale, a.ang[(b * a.F + f) * 3 + 2] * EULER.scale, EULER.order);
    return out.setFromEuler(_e);
  }
  pose(a, ft) {
    const bl = this.blend, s = this.skl, f0 = Math.floor(ft) % a.F, f1 = (f0 + 1) % a.F, fr = ft - Math.floor(ft);
    const q0 = new THREE.Quaternion(), q1 = new THREE.Quaternion();
    const visit = (b, parentM) => {
      this.localQ(a, b, f0, q0); this.localQ(a, b, f1, q1); slerpExact(q0, q1, fr);
      if (bl) { this.localQ(bl.to, b, 0, q1); slerpExact(q0, q1, bl.t / bl.dur); }
      const m = this.world[b];
      _m.makeRotationFromQuaternion(q0);
      let x = s.off[b * 3], y = s.off[b * 3 + 1], z = s.off[b * 3 + 2];
      let x0 = 0, y0 = 0, z0 = 0;
      if (b === 0) { x0 = a.root[f0 * 3] * (1 - fr) + a.root[f1 * 3] * fr; y0 = a.root[f0 * 3 + 1] * (1 - fr) + a.root[f1 * 3 + 1] * fr; z0 = a.root[f0 * 3 + 2] * (1 - fr) + a.root[f1 * 3 + 2] * fr; x += x0; y += y0; z += z0; }
      if (b === 0 && bl) { const k = bl.t / bl.dur; x += (bl.to.root[0] - x0) * k; y += (bl.to.root[1] - y0) * k; z += (bl.to.root[2] - z0) * k; }
      _m.setPosition(x, y, z);
      if (this.ovr && this.ovr[b]) _m.multiply(this.ovr[b]); // CONFIRMED FUN_00401830 (asm): FUN_00403170 computes B*A, so D3D local' = ovr*local; stored as column-array (transpose) this is local.multiply(ovr). Override matrices +0x12c/+0x16c/+0x1ac/+0x1ec per bone
      m.copy(parentM).multiply(_m);
      for (const c of s.children[b]) visit(c, m);
    };
    visit(0, new THREE.Matrix4());
    const v = new THREE.Vector3();
    for (let i = 0; i < s.NV; i++) {
      let X = 0, Y = 0, Z = 0;
      for (const k of s.inf[i]) { v.set(k.x, k.y, k.z).applyMatrix4(this.world[k.b]); X += v.x * k.w; Y += v.y * k.w; Z += v.z * k.w; }
      // CONFIRMED: skeleton is Z-up, forward +X, feet at z=0. Map (x,y,z)->(x,z,y) exactly like loadCgo (reflection => winding flipped below)
      this.vpos[i * 3] = X; this.vpos[i * 3 + 1] = Z; this.vpos[i * 3 + 2] = Y;
    }
    const p = this.mesh.geometry.attributes.position.array;
    for (let i = 0; i < s.NT * 3; i++) { const vi = s.idx[WIND(i)] * 3; p[i * 3] = this.vpos[vi]; p[i * 3 + 1] = this.vpos[vi + 1]; p[i * 3 + 2] = this.vpos[vi + 2]; }
    this.mesh.geometry.attributes.position.needsUpdate = true;
    // smooth (welded) vertex normals: previews show Gouraud-smooth characters, not faceted ones
    const NV = s.NV, nv = this._nv || (this._nv = new Float32Array(NV * 3)); nv.fill(0);
    for (let t = 0; t < s.NT; t++) {
      const a = s.idx[t * 3] * 3, b = s.idx[t * 3 + 2] * 3, c = s.idx[t * 3 + 1] * 3, vp = this.vpos;
      const ux = vp[b] - vp[a], uy = vp[b + 1] - vp[a + 1], uz = vp[b + 2] - vp[a + 2], wx = vp[c] - vp[a], wy = vp[c + 1] - vp[a + 1], wz = vp[c + 2] - vp[a + 2];
      const nx = uy * wz - uz * wy, ny = uz * wx - ux * wz, nz = ux * wy - uy * wx;
      for (const k of [a, b, c]) { nv[k] += nx; nv[k + 1] += ny; nv[k + 2] += nz; }
    }
    let na = this.mesh.geometry.attributes.normal;
    if (!na) { na = new THREE.BufferAttribute(new Float32Array(s.NT * 9), 3); this.mesh.geometry.setAttribute('normal', na); }
    const n = na.array;
    for (let i = 0; i < s.NT * 3; i++) { const vi = s.idx[WIND(i)] * 3, x = nv[vi], y = nv[vi + 1], z = nv[vi + 2], l = Math.hypot(x, y, z) || 1; n[i * 3] = x / l; n[i * 3 + 1] = y / l; n[i * 3 + 2] = z / l; }
    na.needsUpdate = true;
  }
}
