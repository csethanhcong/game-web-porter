// Hero visual effects of the exe hero draw FUN_00423e40 (+ FUN_004232c0 / FUN_00401830 / FUN_0041fb70).
// CONFIRMED (decompile + asm):
//  * ctor FUN_0041fb70: +0x36c = bone "glavnyi HeadNub" (index 7 in pups.skl), +0x370 = nevidimka.msh, +0x374 = hat.jpg, +0x238 = bone "glavnyi Ponytail1" (8).
//  * Invisibility pickup (FUN_00422990 case 0xED): flag +0x360 = 1 (first time: fade-in timer +0x364 = 0), +0x35c += 10000 ms. The flag is NEVER cleared (only by the ctor FUN_0041fdb0).
//  * FUN_00423e40: while +0x360: +0x364 += frame ms (clamped to 500); a = min(+0x364, +0x35c) / 500 (hero fades back in during the last 500 ms);
//    hero skin drawn with material diffuse alpha = 1 - 0.7*a, blend SRCALPHA/INVSRCALPHA (non-fallback path DAT_005d9460 == 0).
//    After the skin the hat nevidimka.msh (texture hat.jpg) is drawn with alpha = a on bone HeadNub: world = heroMatrix(+0x74) * bone transform, then local ops
//    FUN_004067c0(0,-0.6,0) translate, FUN_004066a0(90) rotate about Y, FUN_00406580(12) rotate about X (each = this = Op*this in D3D row order).
//  * FUN_004232c0 (per frame): override matrix +0x1ec = Rz(-40 deg) while +0x360 else identity; FUN_00401830 applies it to bone +0x238 (Ponytail1) as local' = override * local (D3D row order; FUN_00403170 = B*A), i.e. local.multiply(ovr) in three.
//  * Corpse fade (state 4, timer +0x2b4 < 0 after the death anim length F*ms): +0x368 += frame ms (< 20000); alpha = 1 - +0x368/20000 (same blend path, overrides the invisibility alpha).
//  * Exit (state 8, +0x2b4 = mahanie F*ms counting down, < 2000): alpha = (+0x2b4 - DAT_005d7c0c*dt)/2000.
// GUESS: composition order bone transform (translate to bone position, then bone rotation = web world[b]); sub-tick interpolation term of the exit fade
// (DAT_005d7c0c * dt, approximated with the logic-tick accumulator); hat appearance (msh/texture orientation) is not visually verified.
import * as THREE from 'three';
import { buf, parseMsh } from './formats.js';

const D2R = Math.PI / 180;
const SW = new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1); // engine (x,y,z-up) <-> three (x,z,y)
const _t = new THREE.Matrix4(), _r = new THREE.Matrix4(), _m = new THREE.Matrix4();

async function hatMesh() { // nevidimka.msh built exactly like loadCgo (main.js): y/z swap, v flipped, smooth normals when header byte 3 != 0
  const m = parseMsh(await buf('geomobjs/nevidimka.msh')), g = new THREE.BufferGeometry();
  const pos = new Float32Array(m.T * 9), uv = new Float32Array(m.T * 6);
  for (let t = 0; t < m.T; t++) for (let c = 0; c < 3; c++) {
    const vi = m.idx[t * 3 + c], q = (t * 3 + c) * 3, o = vi * 3;
    pos[q] = m.pos[o] + m.offset[0]; pos[q + 1] = m.pos[o + 2] + m.offset[2]; pos[q + 2] = m.pos[o + 1] + m.offset[1];
    uv[(t * 3 + c) * 2] = m.uv[(t * 3 + c) * 2]; uv[(t * 3 + c) * 2 + 1] = 1 - m.uv[(t * 3 + c) * 2 + 1];
  }
  g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); g.computeVertexNormals();
  if (m.smooth) {
    const acc = new Float32Array(m.V * 3), A = new THREE.Vector3(), B = new THREE.Vector3(), C = new THREE.Vector3();
    for (let t = 0; t < m.T; t++) { A.fromArray(pos, t * 9); B.fromArray(pos, t * 9 + 3); C.fromArray(pos, t * 9 + 6); B.sub(A); C.sub(A); B.cross(C);
      for (let c = 0; c < 3; c++) { const o = m.idx[t * 3 + c] * 3; acc[o] += B.x; acc[o + 1] += B.y; acc[o + 2] += B.z; } }
    const na = g.attributes.normal.array;
    for (let t = 0; t < m.T * 3; t++) { const o = m.idx[t] * 3, l = Math.hypot(acc[o], acc[o + 1], acc[o + 2]) || 1; na[t * 3] = acc[o] / l; na[t * 3 + 1] = acc[o + 1] / l; na[t * 3 + 2] = acc[o + 2] / l; }
  }
  const tx = new THREE.TextureLoader().load(__B + 'assets/textures/hat.jpg'); tx.colorSpace = THREE.SRGBColorSpace;
  const mesh = new THREE.Mesh(g, new THREE.MeshLambertMaterial({ map: tx, transparent: true })); // jpg: FrontSide (cull CCW) like every non-.tga texture
  mesh.matrixAutoUpdate = false; mesh.frustumCulled = false; mesh.visible = false;
  return mesh;
}

/** hero = { obj, ch, state, wave }; getMs() -> { invisMs, finished, finishMs, hp } sampled each frame. */
export async function createHeroFx(hero) {
  const ch = hero.ch, names = ch.skl.names, head = names.indexOf('glavnyi HeadNub'), tail = names.indexOf('glavnyi Ponytail1');
  const hat = await hatMesh(); hero.obj.add(hat);
  const S = { on: false, fadeIn: 0, corpse: 0, deathMs: 0, prev: 0 }; // +0x360, +0x364, +0x368, state-4 elapsed
  const tailOvr = new THREE.Matrix4().identity(); ch.ovr = tail >= 0 ? { [tail]: tailOvr } : null;
  const mat = ch.mesh.material;
  return {
    S,
    /** call once per rendered frame after hero.ch.update(dt); dtMs real frame ms. */
    update(dtMs, x) {
      if (x.invisMs > 0 && !S.on) { S.on = true; S.fadeIn = 0; } // FUN_00422990 case 0xED (the timer itself is st.invis)
      if (S.on) { if (S.fadeIn < 500) S.fadeIn += dtMs; if (S.fadeIn > 500) S.fadeIn = 500; }
      const a = S.on ? Math.min(S.fadeIn, x.invisMs) / 500 : 0; // local_58
      tailOvr.copy(S.on ? _r.makeRotationZ(-40 * D2R) : _r.identity()); // FUN_004232c0 (+0x1ec)
      let alpha = S.on ? 1 - 0.7 * a : 1;
      const dead = x.hp <= 0 && hero.state === 'death';
      if (dead) { S.deathMs += dtMs; const clip = hero.ch.blend ? hero.ch.blend.to : hero.ch.clip, L = clip ? clip.F * clip.ms : 0; // state 4: timer = F*ms - elapsed
        if (S.deathMs > L && S.corpse < 20000) S.corpse += dtMs; if (S.deathMs > L) alpha = Math.max(0, 1 - S.corpse / 20000); }
      else if (x.finished && hero.wave) { const L = hero.wave.F * hero.wave.ms, rem = L - x.finishMs; if (rem < 2000) alpha = Math.max(0, rem / 2000); }
      mat.transparent = alpha < 1; mat.opacity = alpha;
      if (S.on && a > 0 && head >= 0) {
        hat.visible = true; hat.material.opacity = a;
        _m.copy(ch.world[head]).multiply(_t.makeTranslation(0, -0.6, 0)).multiply(_r.makeRotationY(90 * D2R)).multiply(_t.makeRotationX(12 * D2R)); // Bone * T * RotY(90) * RotX(12) (column order of the exe's row-order ops)
        hat.matrix.copy(SW).multiply(_m).multiply(SW); hat.matrixWorldNeedsUpdate = true;
      } else hat.visible = false;
    },
  };
}
