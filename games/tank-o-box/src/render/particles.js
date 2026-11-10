// ParticleSystem port. Engine: class at ctor FUN_00475a40, update 0x475200, per-particle update 0x473180, spawn 0x474d90, emitter point 0x474860,
// quad buffer 0x473450, render 0x474710, "Emit" event 0x472ed0, animated setter 0x472a70, chain matrix 0x4733a0. Details: FORMATS.md 'ENGINE: particles'.
// GUESS items are marked G-R11..G-R14 (GUESS_REGISTER.md).
import * as THREE from 'three';
import { attr, num, vec, child } from '../loader/xml.js';
import { loadModel } from '../loader/assets.js';
import { Rng } from '../game/rng.js';
import { PARTICLES } from '../config.js';

const rng = new Rng(); // global engine RNG (seed GetTickCount in the original: any seed is correct)
const systems = new Set();
const TWO_PI = 6.28318, DEG = 0.01745327777; // doubles at 0x4f8cd8 / 0x4f8cd0 (CONFIRMED values)
const _m = new THREE.Matrix4(), _ai = new THREE.Matrix4(), _v = new THREE.Vector3(), _n = new THREE.Matrix3(), _n2 = new THREE.Vector3();

const VERT = /* glsl */ `
attribute vec4 pcolor; varying vec4 vC; varying vec2 vUv;
void main(){ vUv = uv; vC = pcolor; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
// CONFIRMED (FUN_00486eb0 particle item draw, FUN_004862b0 mode 0, FUN_00488380): stage0 COLOROP=ALPHAOP=MODULATE2X (texture x current), SRCBLEND=ONE (set to 2 before the draw,
// back to 5 after), DESTBLEND=INVSRCALPHA, ZWRITE off, ZFUNC LESSEQUAL (blended pass). G-R11 GUESS (narrowed): the per-vertex colour/alpha is the 'current' (diffuse) operand.
const FRAG = /* glsl */ `
uniform sampler2D uMap; uniform float uHasMap; varying vec4 vC; varying vec2 vUv;
void main(){ vec4 t = uHasMap > 0.5 ? texture2D(uMap, vUv) : vec4(1.0); gl_FragColor = vec4(clamp(t.rgb * vC.rgb * 2.0, 0.0, 1.0), clamp(t.a * vC.a * 2.0, 0.0, 1.0)); }`;

class ParticleSystem {
  constructor(node, el, tex, model) {
    this.node = node; this.tex = tex; this.model = model;
    // ctor defaults FUN_00475a40; XML attribute table 0x4753d0
    this.pps = num(el, 'ParticlesPerSec', 0); this.emitCount = num(el, 'ParticlesEmit', 0); this.acc = 0;
    this.sizeStart = num(el, 'SizeStart', 1); this.sizeEnd = num(el, 'SizeEnd', 1); this.sizeVar = num(el, 'SizeVar', 0);
    this.colStart = vec(el, 'ColorStart', [1, 1, 1]); this.colEnd = vec(el, 'ColorEnd', [1, 1, 1]); this.colVar = vec(el, 'ColorVar', [0, 0, 0]);
    this.alphaStart = num(el, 'AlphaStart', 1); this.alphaEnd = num(el, 'AlphaEnd', 1); this.alphaVar = num(el, 'AlphaVar', 0);
    this.speed = num(el, 'Speed', 0); this.speedVar = num(el, 'SpeedVar', 0); this.gravity = vec(el, 'Gravity', [0, 0, 0]);
    this.attract = num(el, 'AttractiveForce', 0); this.life = num(el, 'LifeTime', 0); this.lifeVar = num(el, 'LifeVar', 0);
    this.cone = num(el, 'ConeAngle', 0); this.level = Math.round(num(el, 'EmitterLevel', 0));
    this.off = new THREE.Vector3(); this.p = []; this.cap = 0; this.attached = false; this.mesh = null;
    const mat = new THREE.ShaderMaterial({
      vertexShader: VERT, fragmentShader: FRAG, uniforms: { uMap: { value: tex ? tex.tex : null }, uHasMap: { value: tex ? 1 : 0 } },
      transparent: true, depthWrite: false, depthTest: true, depthFunc: THREE.LessEqualDepth, side: THREE.DoubleSide, // CULLMODE=3 applies (0x488380) but the quads are camera-facing and wound CW on screen (0x473450), i.e. always front: DoubleSide is equivalent
      blending: THREE.CustomBlending, blendEquation: THREE.AddEquation, blendSrc: THREE.OneFactor, blendDst: THREE.OneMinusSrcAlphaFactor,
    });
    this.geo = new THREE.BufferGeometry(); this.mat = mat;
    this.mesh = new THREE.Mesh(this.geo, mat); this.mesh.frustumCulled = false; this.mesh.name = ''; this.mesh.userData.particles = true;
    this.grow(64);
  }
  grow(n) {
    this.cap = n;
    this.aPos = new THREE.BufferAttribute(new Float32Array(n * 18), 3); this.aUv = new THREE.BufferAttribute(new Float32Array(n * 12), 2); this.aCol = new THREE.BufferAttribute(new Float32Array(n * 24), 4);
    this.aPos.setUsage(THREE.DynamicDrawUsage); this.aUv.setUsage(THREE.DynamicDrawUsage); this.aCol.setUsage(THREE.DynamicDrawUsage);
    this.geo.setAttribute('position', this.aPos); this.geo.setAttribute('uv', this.aUv); this.geo.setAttribute('pcolor', this.aCol);
  }
  // CONFIRMED setter 0x472a70 (animated double params); unknown params are ignored (returns false)
  setParam(name, v) {
    switch (name) {
      case 'SizeStart': this.sizeStart = v; break; case 'SizeEnd': this.sizeEnd = v; break; case 'SizeVar': this.sizeVar = v; break;
      case 'AlphaStart': this.alphaStart = v; break; case 'AlphaEnd': this.alphaEnd = v; break; case 'AlphaVar': this.alphaVar = v; break;
      case 'ParticlesPerSec': this.pps = v; break; case 'ParticlesEmit': this.emitCount = v; break; case 'ParticlesEmitNow': this.acc += v; break;
      case 'Speed': this.speed = v; break; case 'SpeedVar': this.speedVar = v; break; case 'LifeTime': this.life = v; break; case 'LifeVar': this.lifeVar = v; break;
      case 'EmitterLevel': this.level = Math.trunc(v); break;
      default: break;
    }
  }
  emit() { this.acc += this.emitCount; } // "Emit" event 0x472ed0: acc += ParticlesEmit (spawned on the next update)
  // EmitterLevel ancestor (FUN_004733a0 / 0x473180): climb `level` engine nodes via parent (+0xf8); unnamed wrapper groups are port-only and not counted.
  anchor() {
    let a = this.node, n = 0;
    while (n < this.level) {
      let q = a.parent; while (q && !q.isScene && q.name === '') q = q.parent;
      if (!q || q.isScene) break; a = q; n++;
    }
    return a;
  }
  visibleChain() { for (let o = this.node; o; o = o.parent) if (!o.visible) return false; return true; }
  // emitter point + direction (0x474860), in ps local space
  emitterPoint(out) {
    const M = this.model;
    if (!M || !M.triangleCount) { // no model: pos 0, cone direction
      const az = rng.r01() * TWO_PI, spread = rng.r01() * this.cone * DEG;
      out.pos.set(0, 0, 0); out.dir.set(Math.cos(az) * Math.sin(spread), Math.sin(az) * Math.sin(spread), Math.cos(spread)); return;
    }
    const tri = rng.mod(M.triangleCount); let r1 = rng.r01(), r2 = rng.r01();
    if (r1 + r2 > 1) { r1 = 1 - r1; r2 = 1 - r2; }
    const w0 = 1 - r1 - r2, b = tri * 9, P = M.positions, N = M.normals;
    out.pos.set(P[b] * w0 + P[b + 3] * r1 + P[b + 6] * r2, P[b + 1] * w0 + P[b + 4] * r1 + P[b + 7] * r2, P[b + 2] * w0 + P[b + 5] * r1 + P[b + 8] * r2);
    out.dir.set(N[b] * w0 + N[b + 3] * r1 + N[b + 6] * r2, N[b + 1] * w0 + N[b + 4] * r1 + N[b + 7] * r2, N[b + 2] * w0 + N[b + 5] * r1 + N[b + 8] * r2).normalize();
  }
  spawn(C, pt) { // 0x474d90; C = chain matrix (ps local -> EmitterLevel ancestor space)
    this.emitterPoint(pt);
    const life = rng.r01() * this.lifeVar + this.life;
    const pos = pt.pos.clone().applyMatrix4(C);
    _n.getNormalMatrix(C); const dir = pt.dir.clone().applyMatrix3(_n); // 0x474d90: transformed direction is NOT re-normalised
    const sp = rng.r01() * this.speedVar + this.speed;
    const rc = rng.r01(); // one scalar for all 3 colour components
    const col = [this.colStart[0] + rc * this.colVar[0], this.colStart[1] + rc * this.colVar[1], this.colStart[2] + rc * this.colVar[2]];
    const alpha = rng.r01() * this.alphaVar + this.alphaStart;
    const size = rng.r01() * this.sizeVar + this.sizeStart;
    const il = life > 0 ? 1 / life : 0; // life<=0: engine divides by 0 (particle dies on its first update anyway); guarded here
    this.p.push({
      age: 0, life, pos, vel: dir.multiplyScalar(sp), col,
      dcol: [(this.colEnd[0] - col[0]) * il, (this.colEnd[1] - col[1]) * il, (this.colEnd[2] - col[2]) * il],
      alpha, dalpha: (this.alphaEnd - alpha) * il, size, dsize: (this.sizeEnd - size) * il,
    });
  }
  alive(p, dt, att) { // 0x473180
    p.age += dt; if (p.age > p.life) return false; // age == life stays alive
    p.pos.addScaledVector(p.vel, dt);
    p.vel.x += this.gravity[0] * dt; p.vel.y += this.gravity[1] * dt; p.vel.z += this.gravity[2] * dt;
    p.col[0] += p.dcol[0] * dt; p.col[1] += p.dcol[1] * dt; p.col[2] += p.dcol[2] * dt;
    p.alpha += p.dalpha * dt; p.size += p.dsize * dt;
    if (att) { _n2.copy(att).sub(p.pos); if (_n2.lengthSq() > 0) { _n2.normalize(); p.vel.addScaledVector(_n2, this.attract * dt); } } // G-R13 CONFIRMED (0x40d1d0 = a-b): toward the ps
    return true;
  }
  step(dt) {
    const node = this.node;
    // G-R14 CONFIRMED: update manager 0x41c240 -> 0x475200 updates+spawns regardless of visibility (no check); only drawing is gated by the node visible chain.
    this.mesh.visible = this.visibleChain();
    const A = this.anchor();
    if (this.mesh.parent !== A) A.add(this.mesh);
    A.updateWorldMatrix(true, false); node.updateWorldMatrix(true, false);
    _ai.copy(A.matrixWorld).invert(); this.inv = _ai.clone();
    // blended sort key (0x47ca70): 1/(|cam - item pos|+1) ascending (far first), items interleaved with 0x108 blended items (0x488380). Item pos = ps position (GUESS G-R12);
    // three sorts by the mesh origin's view depth, so the mesh origin sits at the ps position and vertices are stored relative to it.
    this.off = _v.setFromMatrixPosition(node.matrixWorld).applyMatrix4(_ai).clone(); this.mesh.position.copy(this.off); this.mesh.updateMatrix();
    let att = null;
    if (this.attract !== 0) att = _v.setFromMatrixPosition(node.matrixWorld).applyMatrix4(_ai).clone();
    const P = this.p;
    for (let i = 0; i < P.length;) {
      if (this.alive(P[i], dt, att)) i++; else { P[i] = P[P.length - 1]; P.pop(); } // swap-remove with last (0x472c30)
    }
    this.acc = dt * this.pps + this.acc; const n = Math.trunc(this.acc); this.acc -= n;
    if (n > 0) {
      _m.copy(_ai).multiply(node.matrixWorld); const pt = { pos: new THREE.Vector3(), dir: new THREE.Vector3() };
      for (let i = 0; i < n; i++) this.spawn(_m, pt);
    }
  }
  // quads (0x473450): camera-facing, 6 vertices per particle; offsets a=M(-h,-h,0), b=M(h,-h,0); verts p+a, p-b, p-a, p+a, p-a, p+b
  build(ex, ey) {
    const P = this.p; if (!this.mesh.parent) return;
    if (P.length > this.cap) this.grow(Math.max(P.length, this.cap * 2));
    _ai.copy(this.mesh.parent.matrixWorld).invert(); // camera axes (world) -> ancestor space; quad size is in ancestor units (G-R11 GUESS)
    const X = ex.clone().transformDirection(_ai), Y = ey.clone().transformDirection(_ai); // G-R11: unit axes
    const pos = this.aPos.array, uv = this.aUv.array, col = this.aCol.array;
    const U = [0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0];
    for (let i = 0; i < P.length; i++) {
      const p = P[i], h = p.size * 0.5;
      const ax = (-X.x - Y.x) * h, ay = (-X.y - Y.y) * h, az = (-X.z - Y.z) * h; // a = M(-h,-h)
      const bx = (X.x - Y.x) * h, by = (X.y - Y.y) * h, bz = (X.z - Y.z) * h; // b = M(h,-h)
      const px = p.pos.x - this.off.x, py = p.pos.y - this.off.y, pz = p.pos.z - this.off.z;
      const V = [px + ax, py + ay, pz + az, px - bx, py - by, pz - bz, px - ax, py - ay, pz - az, px + ax, py + ay, pz + az, px - ax, py - ay, pz - az, px + bx, py + by, pz + bz];
      pos.set(V, i * 18); uv.set(U, i * 12);
      for (let k = 0; k < 6; k++) { const o = i * 24 + k * 4; col[o] = p.col[0]; col[o + 1] = p.col[1]; col[o + 2] = p.col[2]; col[o + 3] = p.alpha; }
    }
    this.geo.setDrawRange(0, P.length * 6); this.aPos.needsUpdate = this.aUv.needsUpdate = this.aCol.needsUpdate = true;
  }
  dispose() { if (this.mesh.parent) this.mesh.parent.remove(this.mesh); this.geo.dispose(); this.mat.dispose(); }
}

// <ParticleSystem> element -> Object3D (node with TRS applied by caller); the quad mesh is parented to the EmitterLevel ancestor on the first step.
export async function buildParticleSystem(el, node, loadTexture) {
  if (!PARTICLES) return node;
  const sh = child(el, '#Shader#') || child(el, '#Shaders#'); const eEl = sh ? child(sh, 'Emissive') : null;
  let tex = null; if (eEl && eEl.attrs.Image) { try { tex = await loadTexture(attr(eEl, 'Image')); } catch (e) { tex = null; } }
  let model = null; const src = attr(el, 'Source'); if (src) { try { model = await loadModel(src); } catch (e) { model = null; } } // emitters/*.model
  const ps = new ParticleSystem(node, el, tex, model); node.userData.ps = ps; systems.add(ps);
  return node;
}

// Per game frame, variable dt (0x475200). Systems whose node left the scene (object destroyed) are disposed.
export function stepParticles(dt) {
  if (!systems.size) return;
  for (const ps of systems) {
    let top = ps.node; while (top.parent) top = top.parent;
    if (!top.isScene) { if (ps.attached) { ps.dispose(); systems.delete(ps); } continue; }
    ps.attached = true; if (dt > 0) ps.step(dt); else ps.mesh.visible = ps.visibleChain();
  }
}
// Per render: rebuild camera-facing quads. camMatrix = three camera.matrix (world), axes = right / up.
const _ex = new THREE.Vector3(), _ey = new THREE.Vector3(), _ez = new THREE.Vector3();
export function orientParticles(camMatrix) {
  if (!systems.size) return;
  camMatrix.extractBasis(_ex, _ey, _ez); _ex.normalize(); _ey.normalize();
  for (const ps of systems) if (ps.attached) ps.build(_ex, _ey);
}
// anim <Command><Execute Name="Emit" Time> (Target = path to the ParticleSystem node): fires prev < time <= now. Separate from audio runCommands.
export function runEmitCommands(cmds, prev, now, root, resolvePath) {
  if (!cmds || !cmds.length || !root) return;
  for (const c of cmds) {
    if (c.name !== 'Emit' || !(c.time > prev && c.time <= now)) continue;
    const n = resolvePath(root, c.target); if (n && n.userData.ps) n.userData.ps.emit();
  }
}
