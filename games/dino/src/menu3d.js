// Menu 3D background camera (CONFIRMED from DinoAndAliens.exe FUN_00419940, view matrix DAT_0055faa70 -> SetTransform(VIEW) via FUN_0043bb90).
// Matrix = D3D row-vector 4x4 (index i = byte offset/4), built by in-place PRE-multiplications on identity:
//   FUN_00402a50 identity; FUN_00406580(a) rows1,2: r1'=c*r1+s*r2, r2'=-s*r1+c*r2; FUN_00403650(a) rows0,1: r0'=c*r0+s*r1, r1'=-s*r0+c*r1;
//   FUN_004066a0(a) rows0,2: r0'=c*r0-s*r2, r2'=s*r0+c*r2 (a in degrees, 0x48c300 = PI/180);
//   FUN_004067c0(x,y,z)/FUN_00403770(v): row3 += x*row0+y*row1+z*row2; columns: FUN_0040c660 X=(m0,m4,m8), FUN_00418290 Y=(m1,m5,m9), FUN_004182c0 Z=(m2,m6,m10).
import * as THREE from 'three';
import { Character, loadSkl, loadAnm } from './character.js';
const R = Math.PI / 180;
const RT1 = Uint8Array.from('101cac1f34bc5ae91b13e859389daa9b82d02d3de48473f9d733667b981a968f94b304df45e05d05023f8ea958550dbef418e67ede422f9025d54993f1f056b70a9fef5211cbfa37d34a974d63ecb6e78c7092e174d4122bfb7a3264ca3c6b89ddc0ab9c2ceeaecda8eb7cc217462a5fb09954bdf5c81e14fe88f7db0e1daf2920ffe24187164348f3fc5000a6b5a021b9a1cc2e4c51f8d180b8e55bed4b5395ba8dc7fd094475406a032706c686f2d6dae3153124d95c61b48aa4309a77266d787f6fa50757015e0bc491723ac360796e760c6971a765add235bbc122a308f6399edc83bf3eea8b36a26cb262c54e8581b17dc9ce2823680f473b4fcf6719d8'.match(/../g), h => parseInt(h, 16)); let r1a = 0, r1b = 0; // table 0x49e1d8, stream 1 (FUN_00440320/004402b0)
const rng1 = () => { r1a = (r1a + 1) & 255; r1b = (r1b + 3) & 255; return (RT1[r1a] << 8) | RT1[r1b]; };
const mk = () => { const m = new Array(16).fill(0); m[0] = m[5] = m[10] = m[15] = 1; return m; };
const rotX = (m, a) => { const c = Math.cos(a * R), s = Math.sin(a * R); for (let j = 0; j < 4; j++) { const r1 = m[4 + j], r2 = m[8 + j]; m[4 + j] = c * r1 + s * r2; m[8 + j] = -s * r1 + c * r2; } };
const rotZ = (m, a) => { const c = Math.cos(a * R), s = Math.sin(a * R); for (let j = 0; j < 4; j++) { const r0 = m[j], r1 = m[4 + j]; m[j] = c * r0 + s * r1; m[4 + j] = -s * r0 + c * r1; } };
const rotY = (m, a) => { const c = Math.cos(a * R), s = Math.sin(a * R); for (let j = 0; j < 4; j++) { const r0 = m[j], r2 = m[8 + j]; m[j] = c * r0 - s * r2; m[8 + j] = s * r0 + c * r2; } };
const tr = (m, x, y, z) => { for (let j = 0; j < 4; j++) m[12 + j] += x * m[j] + y * m[4 + j] + z * m[8 + j]; };
const cX = (m) => [m[0], m[4], m[8]], cY = (m) => [m[1], m[5], m[9]], cZ = (m) => [m[2], m[6], m[10]];
const sc = (v, s) => v.map((a) => a * s), ad = (...vs) => vs.reduce((p, v) => [p[0] + v[0], p[1] + v[1], p[2] + v[2]]);
const trv = (m, v) => tr(m, v[0], v[1], v[2]);

/** mode = DAT_0055b09c (FUN_004195d0), t = DAT_0055cf08 ms (mode 0 timeline), g = DAT_0055ceec (mode 0xf; reset to 0 by FUN_00403000). Returns the 16-float view matrix. */
export function viewMatrix(mode, t, g = [0, 0, 0]) {
  const m = mk();
  if (mode === 1) { rotX(m, -135); trv(m, ad(sc(cZ(m), 40), sc(cY(m), 4.5))); tr(m, 31, 42, 0); }
  else if (mode >= 2 && mode < 6) { rotX(m, -125); trv(m, ad(sc(cY(m), 6.5), sc(cZ(m), 60))); tr(m, -31, -35, 0); }
  else if (mode >= 6 && mode < 15 && mode !== 0xf) { rotX(m, -125); trv(m, ad(sc(cY(m), 6.5), sc(cZ(m), 54))); tr(m, -31, -35, 0); }
  else if (mode === 0xf) { rotX(m, -135); trv(m, ad(sc(cY(m), 6.5), sc(cZ(m), 55))); trv(m, [15 - g[0], 19 - g[1], 0 - g[2]]); }
  else { // mode 0: state by timeline
    const st = state(t);
    if (st === 0) { rotX(m, -130); rotZ(m, Math.cos(t / 2000) * 10); trv(m, ad(sc(cY(m), 4.5), sc(cZ(m), 60))); }
    else if (st === 1) { rotX(m, -136); rotZ(m, -30); const s = Math.sin(t / 2500) * 0.2 + 1; trv(m, ad(sc(cY(m), 5), sc(cZ(m), 60 * s))); }
    else if (st === 2) { rotX(m, -130); rotY(m, Math.sin(t / 20000) * -10); const s = Math.cos(t / 2500); trv(m, ad(sc(cY(m), 3), sc(cZ(m), 60 * 0.8), sc(cX(m), 10 * s))); }
    else if (st === 3) { rotX(m, -130); const s = Math.sin(t / 1300) * 0.1 + 1; trv(m, ad(sc(cY(m), 3), sc(cX(m), 5), sc(cZ(m), 60 * 0.8 * s))); }
    else if (st === 4) { rotX(m, -127); rotZ(m, -40); trv(m, ad(sc(cY(m), 0), sc(cZ(m), 60 * 0.6))); }
    else { rotX(m, -130); rotZ(m, 35); trv(m, ad(sc(cY(m), 1), sc(cX(m), 8), sc(cZ(m), 60 * 0.8))); }
    trv(m, ad(sc(cX(m), -5), [0, 9, 0]));
  }
  return m;
}
/** Mode 0 timeline DAT_0055cf04 from t (FUN_00419940: >0 && <5000 ->0, <10000 ->1, <15000 ->2, <18000 ->3, <20000 ->4, <22000 ->5, else t=0 and keep state). */
export const state = (t) => (t < 5000 ? 0 : t < 10000 ? 1 : t < 15000 ? 2 : t < 18000 ? 3 : t < 20000 ? 4 : 5);

const F = new THREE.Matrix4().makeScale(1, 1, -1), S = new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
/** Apply a D3D view matrix (game axes x,y,z-up LH) to a three.js camera (three = (x_g, z_g, y_g), see FORMATS). */
export function applyView(camera, m) {
  const A = new THREE.Matrix4().set(m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]);
  const V = F.clone().multiply(A).multiply(S);
  camera.matrixAutoUpdate = false; camera.matrixWorldInverse.copy(V); camera.matrixWorld.copy(V).invert(); camera.matrixWorldNeedsUpdate = false;
  camera.matrixWorld.decompose(camera.position, camera.quaternion, camera.scale);
}

// ===== Menu scene objects (CONFIRMED FUN_0041b740 / FUN_004195d0 / FUN_0041af20; coordinates engine x,y,z-up -> three (x, z, y)) =====
// world matrix of a skin object (FUN_00401a80 tail): M = S(+0x74 diag) * Rz(heading +0x30 deg, FUN_00403650) * T(position +0x24 [+ root offset]);
// -> three: scale s, rotation.y = -heading, position (x, z, y). main.chr: pos (0,0,0) heading 120 (mode 0) / pos G=(-25,30,0) heading 90 (mode 0xf, FUN_004195d0 copies G=DAT_0055ceec into +0x24).
const G = [-25, 30, 0]; // DAT_0055ceec (FUN_0041b740), also used by the mode 0xf camera (15-G, 19-G)
const MON = [ // FUN_0041b740: .chr, texture, scale (FUN_00406430), anm table DAT_0055a860[idx*3 + cycle]
  { skl: 'vilka', tex: 'vilka_screen.jpg', s: 0.8, an: ['vilka_pause', 'vilka_perekrest', 'vilka_ataka'], zr: 8, type: 5 },
  { skl: 'sniper', tex: 'snayper_screen.jpg', s: 0.8, an: ['sniper_pause', 'sniper_perekrest', 'sniper_perekrest'], zr: 14, type: 6 },
  { skl: 'dlinnyi', tex: 'dlinnyi_screen.jpg', s: 1, an: ['dlinnyi_pause', 'dlinnyi_perekrest', 'dlinnyi_perekrest'], zr: 17, type: 7 },
  { skl: 'bugai', tex: 'bugai_screen.jpg', s: 1, an: ['bugai_pause', 'bugai_perekrest', 'bugai_attack'], zr: 17, type: 7 },
];
const BON = [ // 9 bonus slots 0x55b120 + i*0x1e4 (FUN_0041b740): cgo + id byte (as in main.js pickupAnim)
  ['bomb2.cgo', '\xf1'], ['bomb2.cgo', '\xf0'], ['bomb2.cgo', '\xef'], ['key.cgo', 'k'], ['batareyka.cgo', '\xe1'],
  ['bonus_life.cgo', '\xff'], ['bonus_ananas.cgo', '\xe0'], ['bonus_nevidimka.cgo', '\xed'], ['bonus_clock.cgo', '\xf7']];
// LIGHTING (CONFIRMED FUN_0041b740/FUN_0041af20): the menu has no light of its own. FUN_0041b740 copies the level light DAT_004ddb70 (directional, set from menulevel.txt sun=(0.7,0.7,-1)) into DAT_0055b0b8 (never otherwise written);
// FUN_0041af20 then does SetLight(0,&DAT_0055b0b8)/LightEnable(0)/SetMaterial(default DAT_004dd128: diffuse 1, ambient 0.2) = the same dl/AmbientLight main.js builds for menulevel. Skins, sintezator.cgo and bonus meshes use that default material
// (the fade only copies it and sets diffuse alpha = f^3). FUN_0041af20 never calls the lightmap pass FUN_00415f20 -> menu skins cast no dynamic shadow (hero.obj hidden, not a caster). Meshes come from loadCgo (winding + raw V fix apply).
let C = null, W = null; // ctx, scene objects
export async function init(ctx) {
  C = ctx; const A = (n) => loadAnm('animations/' + n + '.anm');
  const root = new THREE.Group(); root.visible = false; ctx.scene.add(root);
  const mk = async (skl, tex) => { const ch = new Character(await loadSkl('characters/' + skl + '.skl'), tex); const o = new THREE.Group(); o.add(ch.mesh); root.add(o); return { ch, o }; };
  const main = await mk('pups', 'glavnyi_screen.jpg'); main.an = { glav: await A('glavnyi_sintezator'), hist: await A('history') };
  main.ch.play(main.an.glav); main.ch.update(0);
  const mon = [];
  for (const d of MON) { const m = await mk(d.skl, d.tex); m.an = []; for (const n of d.an) m.an.push(await A(n)); m.ch.play(m.an[0]); m.ch.update(0); m.o.scale.setScalar(d.s); m.o.rotation.y = -80 * R; m.o.position.set(22, 0, 55); mon.push(m); } // +0x24=(22,55,0), heading +0x30 = 80
  const bon = [];
  for (let i = 0; i < BON.length; i++) {
    const parts = await ctx.loadCgo(BON[i][0]), o = new THREE.Group();
    for (const p of parts) o.add(new THREE.Mesh(p.geometry, p.material.clone()));
    o.position.set(22, 0, 55); root.add(o); // +0x1b4 = (22,55,0) (DAT_0055cef8)
    const pt = rng1() / 32768 * 1000 - 1000, pa = rng1() % 360; // CONFIRMED FUN_0040c8b0: +0x1e0 = FUN_00440320(1000) first, then +0x1dc = FUN_004402b0(360), stream 1 (initial idx 0/0 = GUESS)
    bon.push({ o, c: BON[i][1], t: 0, ob: { pa, pt } });
  }
  const sp = await ctx.loadCgo('sintezator.cgo'), sint = new THREE.Group();
  for (const p of sp) sint.add(new THREE.Mesh(p.geometry, p.material.clone()));
  sint.position.set(-2.5, 0, 3); sint.rotation.y = -210 * R; root.add(sint); // FUN_004067c0(-2.5,3,0) + FUN_004186f0(210)
  W = { root, main, mon, bon, sint, cyc: 0, tmr: 0, idx: 0, fade: 0, rem: 0, mode: -1 };
}
const setAlpha = (o, a) => o.traverse((m) => { if (m.isMesh && m.material) { m.material.transparent = a < 1 || m.material.alphaTest > 0; m.material.opacity = a; } });

/** FUN_004195d0: state change on a new mode (exact order of the exe). */
function enter(mode, prev) {
  const { main, mon, bon } = W, an = MON;
  if (prev === 0xf && mode === 0) { main.ch.play(main.an.glav); main.ch.clip = main.an.glav; main.ch.time = 0; main.ch.blend = null; main.o.position.set(0, 0, 0); main.o.rotation.y = -120 * R; }
  if (mode === 0xf) { main.ch.clip = main.an.hist; main.ch.time = 0; main.ch.blend = null; main.o.position.set(G[0], 0, G[1]); main.o.rotation.y = -90 * R; }
  else if (mode >= 2 && mode <= 5) {
    const i = mode - 2; W.idx = i; W.fade = 800; W.tmr = mon[i].an[W.cyc].F * mon[i].an[W.cyc].ms;
    for (let k = 0; k < 0x32; k++) { const z = C.prand0(an[i].zr), y = C.prand(3), x = C.prand(3); C.spawnPart(an[i].type, 22 + x, z, 55 + y); } // FUN_0042e840(pos=(22,55,0)+(x,y,z), type)
  } else if (mode >= 6 && mode < 0xf) { W.fade = 800; W.bidx = mode - 6; for (let k = 0; k < 0x14; k++) C.spawnPart(0xb, 22, 0, 55); }
}

/** Per-frame menu driver (FUN_0041af20): mode from the current screen (FUN_004195d0: 0 main, 1 credits, 2..5 monster page, 6..14 bonus page, 0xf history; other screens = 0, CONFIRMED by xrefs). */
let tl = 0, prevMode = -1;
export const menu3d = {
  mode: 0,
  frame(camera, dtMs, scr, page) {
    let mode = scr === 'credits' ? 1 : scr === 'history' ? 0xf : scr === 'monsters' ? 2 + page : scr === 'bonuses' ? 6 + page : 0;
    if (W && mode !== prevMode) { enter(mode, prevMode < 0 ? 0 : prevMode); }
    prevMode = mode; this.mode = mode;
    tl += dtMs; if (tl > 22000) tl = 0; // DAT_0055cf08 wraps to 0 after 22000 ms (mode 0 only matters)
    applyView(camera, viewMatrix(mode, tl, G));
    if (!W) return;
    const dt = dtMs / 1000, { main, mon, bon, sint } = W;
    if (C.hero.obj) C.hero.obj.visible = false; // the exe draws no web-style hero in the menu (hero = main.chr skin object)
    W.root.visible = true;
    main.o.visible = mode === 0 || mode === 0xf; sint.visible = mode === 0;
    mon.forEach((m, i) => { m.o.visible = mode === 2 + i; });
    bon.forEach((b, i) => { const v = mode === 6 + i; b.o.visible = v && !(b.g); if (b.g) b.g.visible = v; });
    if (mode === 0 || mode === 0xf) main.ch.update(dt);
    if (mode >= 2 && mode <= 5) {
      const m = mon[W.idx]; W.tmr -= dtMs;
      if (W.tmr < 0) { W.cyc = (W.cyc + 1) % 3; const a = m.an[W.cyc]; W.tmr = a.F * a.ms; m.ch.play(a, true, 50); } // FUN_00402350(anm, 50.0)
      m.ch.update(dt);
    }
    if (mode >= 6 && mode < 0xf) C.pickupAnim(bon[W.bidx], dt);
    if (mode === 0 && (state(tl) === 3 || state(tl) === 4)) { // type 0x11 particles at (0,0,32): count = (rem+dt)/8 per frame
      const u = W.rem + Math.round(dtMs), n = u >> 3; W.rem = u & 7; for (let k = 0; k < n; k++) C.spawnPart(0x11, 0, 32, 0);
    } else W.rem = (W.rem + Math.round(dtMs)) & 7;
    // fade (FUN_0041af20): v -= dt; alpha = (1 - v/800)^3 on the second draw pass (monster/bonus; history skin too)
    let a = 1; if (W.fade > 0) { W.fade -= dtMs; const f = 1 - Math.max(0, W.fade) / 800; a = f * f * f; if (W.fade < 0) W.fade = 0; }
    if (mode >= 2 && mode <= 5) setAlpha(mon[W.idx].o, a); else if (mode >= 6 && mode < 0xf) setAlpha(bon[W.bidx].o, a);
    C.stepParticles(dt);
  },
};
