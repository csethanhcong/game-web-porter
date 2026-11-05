import { menu3d, init as menu3dInit } from './menu3d.js';
import { curPage } from './screens.js';
import { play, heroHurt, setTrack, update as audioUpdate } from './audio.js';
import { menu } from './menu.js';
import { DEMOS, demoUrl } from './config.js';
import { createEnvSprites } from './envsprites.js';
import { hud as hudApi, drawHud } from './hud.js';
import * as THREE from 'three';
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { Character, loadSkl, loadAnm } from './character.js';
import { txt, buf, parseMsh, parseIni, parseLev } from './formats.js';
import { createShadow } from './shadow.js';
import { createHeroFx } from './herofx.js';
let heroFx = null;

const CELL = 5;
const q = new URLSearchParams(location.search);
const levelName = q.get('level') || 'menulevel'; // no ?level: the menu background is menulevel.txt (CONFIRMED FUN_00407890(-1,0) loads "menulevel.txt")

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(innerWidth, innerHeight); document.body.appendChild(renderer.domElement);
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x000000); // CONFIRMED: gameplay frame has no colour clear (only Z clear, FUN_0043a670); colour clears elsewhere are black (FUN_0043bd50(0)); no fog (state 0x1c never set)
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, 1, 1500); // CONFIRMED FUN_0043a400/FUN_0043ad10: fov PI/4 (vertical), near 1, far 1500, aspect=clientW/clientH
addEventListener('resize', () => { renderer.setSize(innerWidth, innerHeight); camera.aspect = innerWidth / innerHeight; camera.updateProjectionMatrix(); });
const shadow = createShadow(THREE, renderer, scene, camera);

const texCache = new Map();
const TEXFILES = new Map([["403094.jpg", "403094.jpg"], ["bark02.jpg", "BARK02.JPG"], ["barkbw.jpg", "BARKBW.JPG"], ["barkdrk.jpg", "Barkdrk.jpg"], ["barkdrk2.jpg", "Barkdrk2.jpg"], ["rings.jpg", "RINGS.JPG"], ["bochka_screen.jpg", "bochka_screen.jpg"], ["bomb_sphere.jpg", "bomb_sphere.jpg"], ["bomb_sphere0.jpg", "bomb_sphere0.jpg"], ["bomb_sphere1.jpg", "bomb_sphere1.jpg"], ["bomb_sphere2.jpg", "bomb_sphere2.jpg"], ["bonus_screen.jpg", "bonus_screen.jpg"], ["bottom.jpg", "bottom.jpg"], ["box1.jpg", "box1.jpg"], ["budilnik_screen.jpg", "budilnik_screen.jpg"], ["budilnik_zvonok.jpg", "budilnik_zvonok.jpg"], ["bugai_screen.jpg", "bugai_screen.jpg"], ["chastokol.jpg", "chastokol.jpg"], ["dirt01.jpg", "dirt01.jpg"], ["dirt02.jpg", "dirt02.jpg"], ["dirt03.jpg", "dirt03.jpg"], ["dlinnyi_screen.jpg", "dlinnyi_screen.jpg"], ["exploanim.tga", "exploanim.tga"], ["exploflare.jpg", "exploflare.jpg"], ["flare.jpg", "flare.jpg"], ["flower.tga", "flower.tga"], ["font.tga", "font.tga"], ["glavnyi_screen.jpg", "glavnyi_screen.jpg"], ["green1.jpg", "green1.jpg"], ["hat.jpg", "hat.jpg"], ["iconbatareyka.tga", "iconbatareyka.tga"], ["iconbomb1.tga", "iconbomb1.tga"], ["iconbugay.tga", "iconbugay.tga"], ["icondlinny.tga", "icondlinny.tga"], ["iconhero.tga", "iconhero.tga"], ["iconkey.tga", "iconkey.tga"], ["iconshorty.tga", "iconshorty.tga"], ["iconsniper.tga", "iconsniper.tga"], ["icontablo.tga", "icontablo.tga"], ["kust1.tga", "kust1.tga"], ["kuvshinka.tga", "kuvshinka.tga"], ["lazer_screen.jpg", "lazer_screen.jpg"], ["lazer_zerkalo_screen.jpg", "lazer_zerkalo_screen.jpg"], ["list_palma_screen.tga", "list_palma_screen.tga"], ["list_papor_screen.tga", "list_papor_screen.tga"], ["menulogo.tga", "menulogo.tga"], ["menutex.tga", "menutex.tga"], ["metal_box.jpg", "metal_box.jpg"], ["nevologo.jpg", "nevologo.jpg"], ["nevosoft.jpg", "nevosoft.jpg"], ["ograda_screen.jpg", "ograda_screen.jpg"], ["ograda_vorota1_screen.jpg", "ograda_vorota1_screen.jpg"], ["ograda_vorota2_screen.jpg", "ograda_vorota2_screen.jpg"], ["palma_01_stvol.jpg", "palma_01_stvol.jpg"], ["podsvet.jpg", "podsvet.jpg"], ["redblue.jpg", "redblue.jpg"], ["reshetka.jpg", "reshetka.jpg"], ["sintezator_screen.jpg", "sintezator_screen.jpg"], ["smoke.tga", "smoke.tga"], ["snayper_screen.jpg", "snayper_screen.jpg"], ["stone01.jpg", "stone01.jpg"], ["stone02.jpg", "stone02.JPG"], ["stone03.jpg", "stone03.jpg"], ["strelka_screen.jpg", "strelka_screen.jpg"], ["tablo_screen.jpg", "tablo_screen.jpg"], ["teleport_kamni.jpg", "teleport_kamni.jpg"], ["teleport_screen.jpg", "teleport_screen.jpg"], ["trava1.tga", "trava1.tga"], ["vetki1.tga", "vetki1.tga"], ["vilka_screen.jpg", "vilka_screen.jpg"], ["water.jpg", "water.jpg"], ["water01.jpg", "water01.jpg"], ["water02.jpg", "water02.jpg"], ["water03.jpg", "water03.jpg"], ["water04.jpg", "water04.jpg"], ["water05.jpg", "water05.jpg"], ["water06.jpg", "water06.jpg"], ["water07.jpg", "water07.jpg"], ["water08.jpg", "water08.jpg"], ["water09.jpg", "water09.jpg"], ["water10.jpg", "water10.jpg"], ["water11.jpg", "water11.jpg"], ["water12.jpg", "water12.jpg"], ["water13.jpg", "water13.jpg"], ["water14.jpg", "water14.jpg"], ["water15.jpg", "water15.jpg"], ["water16.jpg", "water16.jpg"], ["water17.jpg", "water17.jpg"], ["water18.jpg", "water18.jpg"], ["water19.jpg", "water19.jpg"], ["water20.jpg", "water20.jpg"], ["water21.jpg", "water21.jpg"], ["water22.jpg", "water22.jpg"], ["white.jpg", "white.jpg"], ["yellow.jpg", "yellow.jpg"], ["zabor_screen.jpg", "zabor_screen.jpg"]]); // Windows FS is case-insensitive (the original loads e.g. BARKDRK.JPG = Barkdrk.jpg); web server is not
function tex(name) {
  name = TEXFILES.get(name.toLowerCase()) || name;
  if (!texCache.has(name)) {
    const ext = name.split('.').pop().toLowerCase();
    const t = (ext === 'tga' ? new TGALoader() : new THREE.TextureLoader()).load(__B + 'assets/textures/' + name);
    t.colorSpace = THREE.SRGBColorSpace; t.wrapS = t.wrapT = THREE.RepeatWrapping;
    texCache.set(name, t);
  }
  return texCache.get(name);
}
let waterMat = null;
const cgoCache = new Map();
async function loadCgo(name) {
  if (cgoCache.has(name)) return cgoCache.get(name);
  const p = (async () => {
    const ini = parseIni(await txt('geomobjs/' + name));
    const n = +ini.nummeshes || 0, parts = [];
    for (let k = 0; k < n; k++) {
      const m = parseMsh(await buf('geomobjs/' + ini['mesh' + k]));
      const g = new THREE.BufferGeometry();
      const pos = new Float32Array(m.T * 9), uv = new Float32Array(m.T * 6);
      for (let t = 0; t < m.T; t++) for (let c = 0; c < 3; c++) {
        const vi = m.idx[t * 3 + c];
        { const q = (t * 3 + c) * 3, o = vi * 3; pos[q] = m.pos[o] + m.offset[0]; pos[q + 1] = m.pos[o + 2] + m.offset[2]; pos[q + 2] = m.pos[o + 1] + m.offset[1]; } // msh is Z-up: engine swaps y/z. CONFIRMED FUN_0042bdc0: header position (offset 4) goes through FUN_00403850 into the mesh matrix at +0x90, which FUN_0040f410 applies when drawing (header rotation is 0 in all files)
        uv[(t * 3 + c) * 2] = m.uv[(t * 3 + c) * 2]; uv[(t * 3 + c) * 2 + 1] = m.uv[(t * 3 + c) * 2 + 1]; // RAW v: the engine's D3D v = 1 - v_file is already provided by TextureLoader flipY=true (bochka.msh: lid faces have v_file~0.15, lid sits in the bottom rows of bochka_screen.jpg; same fix as character.js)
      }
      g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      g.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
      g.computeVertexNormals(); // flat per-face normal
      // CONFIRMED FUN_0042bdc0: byte 3 of .msh (param_1+4) == 0 -> FUN_0043a2a0 flat normals (one normalised face normal per triangle); != 0 -> FUN_0043a080 smooth: per original vertex index sum of UNNORMALISED face cross products (area weighted), normalised at the end (FUN_00403af0); every triangle corner uses its vertex's normal.
      if (m.smooth) {
        const acc = new Float32Array(m.V * 3), A = new THREE.Vector3(), B = new THREE.Vector3(), Cc = new THREE.Vector3();
        for (let t = 0; t < m.T; t++) { A.fromArray(pos, t * 9); B.fromArray(pos, t * 9 + 3); Cc.fromArray(pos, t * 9 + 6); B.sub(A); Cc.sub(A); B.cross(Cc); // (w1-w0)x(w2-w0) = engine (v2-v0)x(v1-v0) after the y/z reflection
          for (let c = 0; c < 3; c++) { const o = m.idx[t * 3 + c] * 3; acc[o] += B.x; acc[o + 1] += B.y; acc[o + 2] += B.z; } }
        const na = g.attributes.normal.array;
        for (let t = 0; t < m.T * 3; t++) { const o = m.idx[t] * 3, l = Math.hypot(acc[o], acc[o + 1], acc[o + 2]) || 1; na[t * 3] = acc[o] / l; na[t * 3 + 1] = acc[o + 1] / l; na[t * 3 + 2] = acc[o + 2] / l; }
      }
      // Winding: the file's triangles are CW seen from outside in the engine (CULL_CCW keeps them, CONFIRMED state 3 FUN_0043d200); the (x,z,y) swap above is a reflection, so in three (front = CCW) the OUTER faces were culled
      // and rocks/crates/fences/barrels were drawn inside-out (stone shells, preview shows solid boulders). Swap corners 1<->2 of every triangle (pos, uv and the already computed normals) -> outer faces are front;
      // the normals are NOT negated (keeps the lighting of the engine's own normals (v2-v0)x(v1-v0)). Cull-reversed passes (bomb spheres, state 0x16=2) then correctly show the inner faces with BackSide.
      for (const [an, is] of [['position', 3], ['normal', 3], ['uv', 2]]) { const a = g.attributes[an].array; for (let t = 0; t < m.T; t++) for (let j = 0; j < is; j++) { const o1 = (t * 3 + 1) * is + j, o2 = (t * 3 + 2) * is + j, w = a[o1]; a[o1] = a[o2]; a[o2] = w; } }
      const mat = new THREE.MeshLambertMaterial({ map: ini['texture' + k] ? tex(ini['texture' + k]) : null, ...(/\.tga$/i.test(ini['texture' + k] || '') ? { side: THREE.DoubleSide, alphaTest: 0x80 / 255, transparent: true } : { side: THREE.FrontSide }) });
      // CONFIRMED FUN_00438420 (texture flag +0x8c = name contains ".tga"/".TGA") + FUN_0043d200: only flagged textures get ALPHATESTENABLE (ref 0x80 GEQUAL), alpha blend SRCALPHA/INVSRCALPHA and CULL_NONE; all others (jpg) are opaque with CULL_CCW (state 3). travka_* meshes (lazer_screen.jpg, no flag) are drawn like every other mesh: no hiding.
      // D3D does not flip normals for back faces (CULL_NONE just draws them with the same lighting): disable three's faceDirection flip.
      if (mat.side === THREE.DoubleSide) mat.onBeforeCompile = (sh) => { sh.fragmentShader = sh.fragmentShader.replace('#include <normal_fragment_begin>', THREE.ShaderChunk.normal_fragment_begin.replace('gl_FrontFacing ? 1.0 : - 1.0', '1.0')); };
      g.userData.pv = [m.offset[0], m.offset[2], m.offset[1]]; // mesh node origin (three coords); door swing pivots here (GUESS: anim matrix applied in node-local space)
      parts.push(new THREE.Mesh(g, mat));
    }
    return parts;
  })();
  cgoCache.set(name, p); return p;
}
async function place(name, cx, cy, w, h, rotDeg, N) {
  let parts; try { parts = await loadCgo(name); } catch { return null; }
  const o = new THREE.Group(); o.userData.w = w; o.userData.h = h; o.userData.name = name; o.userData.box = name === 'box.cgo'; o.userData.c = name.startsWith('vorota') ? 'g' : name.startsWith('zamok') ? 'z' : '';
  for (const p of parts) o.add(new THREE.Mesh(p.geometry, p.material));
  o.position.set((cx + w / 2) * CELL - N * CELL / 2, 0, (cy + h / 2) * CELL - N * CELL / 2);
  o.rotation.y = -THREE.MathUtils.degToRad(rotDeg); // CONFIRMED FUN_004186f0(+0x1d0): D3D RotationZ(deg) m00=cos m01=sin (row vectors, CCW in game xy) -> three (x,z,y) swap gives rotation.y = -deg
  scene.add(o);
  return o;
}
// ===== REAL PER-CELL FLAG GRID (CONFIRMED FUN_00407890 / FUN_00406f40 / FUN_00407430; original table 0x4b6ae8 + x*0x400 + y*8) =====
// f = ushort flags (+6), i0 = static object id (+0, flag 4), i1 = movable object id (+2, flag 0x80), ie = enemy id (+4). Index = y*N+x (x = grid column).
// Reads outside the grid return 3 (the border cells carry |=3; memory beyond the border is not modelled).
const F = { N: 0, f: null, i0: null, i1: null, ie: null }, OBJ = [null];
const fl = (x, y) => (x < 0 || y < 0 || x >= F.N || y >= F.N ? 3 : F.f[y * F.N + x]);
const fset = (x, y, v) => { if (x >= 0 && y >= 0 && x < F.N && y < F.N) F.f[y * F.N + x] = v; };
const vOr = (vx, vy) => fl(vx, vy) | fl(vx - 1, vy) | fl(vx, vy - 1) | fl(vx - 1, vy - 1); // FUN_0040b010/0b070 core: OR of the 4 cells of a vertex
const vAnd = (vx, vy) => fl(vx, vy) & fl(vx - 1, vy) & fl(vx, vy - 1) & fl(vx - 1, vy - 1); // FUN_0040b0d0
const vFlagSet = (vx, vy, m, id) => { for (const [x, y] of [[vx, vy], [vx - 1, vy], [vx, vy - 1], [vx - 1, vy - 1]]) if (x >= 0 && y >= 0 && x < F.N && y < F.N) { F.f[y * F.N + x] |= m; if (id !== undefined) F.ie[y * F.N + x] = id; } }; // FUN_0042cac0
const vFlagClr = (vx, vy, m) => { for (const [x, y] of [[vx, vy], [vx - 1, vy], [vx, vy - 1], [vx - 1, vy - 1]]) if (x >= 0 && y >= 0 && x < F.N && y < F.N) F.f[y * F.N + x] &= ~m; }; // FUN_0042cc00
// CONFIRMED loader record flags per char (FUN_00406f40 switch); chars not listed (incl. hero start 0xC3) stay 0.
const REC = (c) => {
  if ('%@Pp<>^vgI\xc1\xc7#'.includes(c)) return 0x1803;
  if ('$Tt'.includes(c)) return 3;
  if ('0Oo'.includes(c)) return 0x1003;
  if (c >= '1' && c <= '9') return 0x5803;
  if (c === 'L') return 0x5003;
  if ('Qqwr|'.includes(c)) return 2;
  if (c === 'W') return 0x9803;
  if (c === 'z') return 0x5803;
  if ('k\xe0\xe1\xed\xf7\xfd\xfe\xff\xef\xf0\xf1'.includes(c)) return 0x200;
  return 0; // '&','*','B','F','G','E', unhandled
};
const THR = (c) => ('g|\xc1#\xef\xf0\xf1'.includes(c) ? 10 : 0xff); // CONFIRMED destruction thresholds (obj +0x1d9)
// LOADER RNG: CONFIRMED FUN_00440260(0) seed, FUN_004402b0 (rng(n)=v%n), FUN_00440320 (rngf(P)=v/32768*P-P), table at exe VA 0x49e1d8 (verified byte-identical in exe).
const RT = Uint8Array.from('101cac1f34bc5ae91b13e859389daa9b82d02d3de48473f9d733667b981a968f94b304df45e05d05023f8ea958550dbef418e67ede422f9025d54993f1f056b70a9fef5211cbfa37d34a974d63ecb6e78c7092e174d4122bfb7a3264ca3c6b89ddc0ab9c2ceeaecda8eb7cc217462a5fb09954bdf5c81e14fe88f7db0e1daf2920ffe24187164348f3fc5000a6b5a021b9a1cc2e4c51f8d180b8e55bed4b5395ba8dc7fd094475406a032706c686f2d6dae3153124d95c61b48aa4309a77266d787f6fa50757015e0bc491723ac360796e760c6971a765add235bbc122a308f6399edc83bf3eea8b36a26cb262c54e8581b17dc9ce2823680f473b4fcf6719d8'.match(/../g), (h) => parseInt(h, 16));
let rI1 = 0, rI2 = 0;
const rngV = () => { rI1 = (rI1 + 1) & 255; rI2 = (rI2 + 3) & 255; return (RT[rI1] << 8) | RT[rI2]; };
const rng = (n) => rngV() % n, rngf = (P) => (rngV() / 32768) * P - P;
const R = (n) => 1 + rng(n);
const SIMPLE = {
  '$': ['kust01.cgo', 1, 1, 0], '%': ['metalbox.cgo', 2, 2, 0], '0': ['stone02.cgo', 1, 1, 0], 'B': ['buket.cgo', 1, 1, 0],
  'E': ['exit.cgo', 4, 4, 0], 'F': ['flower.cgo', 1, 1, 0], 'G': ['grass1.cgo', 1, 1, 0], 'O': ['stone01.cgo', 1, 1, 0],
  'P': ['palm1.cgo', 1, 1, 0], 'o': ['stone03.cgo', 1, 1, 0], 'p': ['palm2.cgo', 1, 1, 0], 'k': ['key.cgo', 1, 1, 0],
  'g': ['vorota.cgo', 1, 1, 0], '#': ['box.cgo', 2, 2, 0], '\xc1': ['bochka.cgo', 2, 2, 0], '\xc7': ['mirror.cgo', 2, 2, 0],
  '\xe0': ['bonus_ananas.cgo', 1, 1, 0], '\xe1': ['batareyka.cgo', 1, 1, 0], '\xed': ['bonus_nevidimka.cgo', 1, 1, 0],
  '\xf7': ['bonus_clock.cgo', 1, 1, 0], '\xfd': ['bonus_life025.cgo', 1, 1, 0], '\xfe': ['bonus_life05.cgo', 1, 1, 0], '\xff': ['bonus_life.cgo', 1, 1, 0],
  '\xef': ['bomb2.cgo', 1, 1, 0], '\xf0': ['bomb2.cgo', 1, 1, 0], '\xf1': ['bomb2.cgo', 1, 1, 0],
};
const RANDOM = { '&': ['oduvan', 2], '*': ['paporotnik', 2], '@': ['penek', 3], 'T': ['tree', 2], 't': ['tree', 2] };

async function build(name) {
  const lev = parseLev(await txt(name === 'menulevel' ? 'texts/menulevel.txt' : 'levels/' + name + '.lev'));
  const { N, grid } = lev;
  rI1 = rI2 = 0; // CONFIRMED FUN_00407890 calls FUN_00440260(0) before placing (no rng calls happen earlier)
  // CONFIRMED FUN_00407890 end (decomp ~4136): music=N from .lev; 0/absent -> 2 + rand()%8; then FUN_00434e60(N) (fade 1200 ms, then BASS_MusicPlayEx at order table[N])
  G.music = +lev.head.music || 0; if (G.music === 0) G.music = 2 + Math.floor(Math.random() * 8); setTrack(G.music);
  G.title = lev.head.name; st.ananasTotal = grid.join('').split('\xe0').length - 1;
  const isW = (x, y) => 'wqQ'.includes(grid[y]?.[x] || '.') && grid[y]?.[x] !== undefined;
  // GROUND: CONFIRMED FUN_00413850: drawn first (before everything but water setup), ZWRITE off, ZENABLE off, LIGHTING off (unlit). floor(N*5/50) = trunc(N/10) (_ftol FUN_00440e30) x same count of 50.0 x 50.0 tiles (+0.01 overlap, z=-0.2), origin -N*5/2; per tile (x outer, y inner) variant = rng3(0..2) of dirt01/02/03 from the SECOND RNG (FUN_00440420(0xd80): i1=0x0d, i2=0x80; FUN_00440450 same step/table as the loader RNG). UV of the 4 corners (0,0),(0,-1),(-1,-1),(-1,0) for v0=(x,y), v1=(x+50,y), v2=(x+50,y+50), v3=(x,y+50) wrap-repeat. No holes under water.
  {
    let g1 = 0x0d, g2 = 0x80; const grng = (n) => { g1 = (g1 + 1) & 255; g2 = (g2 + 3) & 255; return ((RT[g1] << 8) | RT[g2]) % n; };
    const cnt = Math.trunc(N * CELL / 50), h0 = N * CELL / 2, V = [[], [], []], UU = [[], [], []];
    for (let a = 0; a < cnt; a++) for (let b = 0; b < cnt; b++) {
      const v = grng(3), x0 = a * 50 - h0, y0 = b * 50 - h0, x1 = x0 + 50.01, y1 = y0 + 50.01;
      // game (x,y) -> three (x, z); D3D uv (u,v) -> three uv (u, 1 - v)
      const c0 = [x0, y0, 0, 1], c1 = [x1, y0, 0, 2], c2 = [x1, y1, -1, 2], c3 = [x0, y1, -1, 1]; // [x, y, u, v_three]
      for (const c of [c0, c1, c2, c0, c2, c3]) { V[v].push(c[0], -0.2, c[1]); UU[v].push(c[2], c[3]); }
    }
    for (let v = 0; v < 3; v++) { if (!V[v].length) continue; const gg = new THREE.BufferGeometry(); gg.setAttribute('position', new THREE.Float32BufferAttribute(V[v], 3)); gg.setAttribute('uv', new THREE.Float32BufferAttribute(UU[v], 2));
      const gm = new THREE.Mesh(gg, new THREE.MeshBasicMaterial({ map: tex('dirt0' + (v + 1) + '.jpg'), side: THREE.DoubleSide, depthTest: false, depthWrite: false })); gm.renderOrder = -10; gm.frustumCulled = false; scene.add(gm); }
  }
  const buildWater = () => { // called after the object passes (needs OBJ). exe FUN_004393f0 water pass: quad+wave blend SRCALPHA/INVSRCALPHA, lighting off, zwrite off; frame = floor(wt/65)%22 over water01..22.jpg (FUN_00439740)
    const wobs = OBJ.filter((o) => o && 'wqQ'.includes(o.ch) && o.wty !== undefined); // water objects (type 0x77) in creation order
    if (!wobs.length) return;
    const h0 = N * CELL / 2;
    // CONFIRMED FUN_004388a0 (virtual slot 0x18, run per object after load in creation order): vertex alpha 0x78 (bed type 0) else 0x41; edge fade by bottom type +500 and rotation index +0x1ae; type 0 cells raise the vertices touching a non-bed (type!=0) water neighbour to 0x41. Vertex k = corner (0,0),(5,0),(5,5),(0,5) = colour +0x1dc+4k. GUESS: non-water / empty / out-of-grid neighbours count as type 0.
    const nbT = (x, y) => { if (x < 0 || y < 0 || x >= N || y >= N || !(F.f[y * N + x] & 4)) return 0; const o = OBJ[F.i0[y * N + x]]; return o && o.wty !== undefined ? o.wty : 0; };
    const edgeA = (o) => {
      const ty = o.wty, r = o.wri, a = [ty === 0 ? 0x78 : 0x41, 0, 0, 0]; a[1] = a[2] = a[3] = a[0];
      if (ty === 1) { a[(r + 1) % 4] = a[(r + 2) % 4] = a[(r + 3) % 4] = 0; } else if (ty === 2) { a[(r + 2) % 4] = a[(r + 3) % 4] = 0; } else if (ty === 3) { a[(r + 2) % 4] = 0; }
      if (ty === 0) { const n = (dx, dy) => nbT(o.x + dx, o.y + dy) !== 0;
        if (n(1, 1)) a[2] = 0x41; if (n(1, -1)) a[1] = 0x41; if (n(-1, -1)) a[0] = 0x41; if (n(-1, 1)) a[3] = 0x41;
        if (n(1, 0)) a[1] = a[2] = 0x41; if (n(-1, 0)) a[0] = a[3] = 0x41; if (n(0, 1)) a[2] = a[3] = 0x41; if (n(0, -1)) a[0] = a[1] = 0x41; }
      return a;
    };
    const frames = []; for (let i = 1; i <= 22; i++) frames.push(tex(i < 10 ? 'water0' + i + '.jpg' : 'water' + i + '.jpg'));
    const fm = new THREE.MeshBasicMaterial({ map: frames[0], vertexColors: true, transparent: true, depthWrite: false, side: THREE.DoubleSide });
    // CONFIRMED FUN_00438d80/FUN_0043ce90: quad base=objpos-(2.5,2.5,2.3), tris (v0,v1,v2),(v0,v2,v3), v=(0,0),(5,0),(5,5),(0,5); uv = (gx&1,gy&1)*0.5 + {(0,0),(.5,0),(.5,.5),(0,.5)}; D3D v -> three 1-v.
    const FP = [], FU = [], FC = [];
    for (const o of wobs) {
      const x0 = o.x * CELL - h0, y0 = o.y * CELL - h0, u0 = (o.x & 1) * 0.5, v0 = (o.y & 1) * 0.5, a = edgeA(o);
      const cs = [[0, 0], [1, 0], [1, 1], [0, 1]];
      for (const k of [0, 1, 2, 0, 2, 3]) { const [fx, fy] = cs[k]; FP.push(x0 + 5 * fx, -2.3, y0 + 5 * fy); FU.push(u0 + 0.5 * fx, 1 - (v0 + 0.5 * fy)); FC.push(1, 1, 1, a[k] / 255); }
    }
    const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.Float32BufferAttribute(FP, 3)); fg.setAttribute('uv', new THREE.Float32BufferAttribute(FU, 2)); fg.setAttribute('color', new THREE.Float32BufferAttribute(FC, 4));
    // CONFIRMED FUN_00439740/FUN_004390e0/FUN_00438f70: 4 shared variants (par=(gx&1)+2*(gy&1)) of 4x4 verts, vertex alpha 0x5a, indices (b,b+1,b+4),(b+1,b+5,b+4).
    const wm = new THREE.MeshBasicMaterial({ map: tex('water.jpg'), transparent: true, opacity: 0x5a / 255, depthWrite: false, side: THREE.DoubleSide });
    const WP = new Float32Array(wobs.length * 48), WU = new Float32Array(wobs.length * 32), WI = [];
    wobs.forEach((_, k) => { for (let j = 0; j < 3; j++) for (let i = 0; i < 3; i++) { const b = k * 16 + i + j * 4; WI.push(b, b + 1, b + 4, b + 1, b + 5, b + 4); } });
    const wg = new THREE.BufferGeometry(); wg.setAttribute('position', new THREE.BufferAttribute(WP, 3)); wg.setAttribute('uv', new THREE.BufferAttribute(WU, 2)); wg.setIndex(WI);
    const fmesh = new THREE.Mesh(fg, fm), wmesh = new THREE.Mesh(wg, wm); fmesh.renderOrder = 1; wmesh.renderOrder = 2; fmesh.frustumCulled = wmesh.frustumCulled = false; scene.add(fmesh, wmesh);
    // LILIES CONFIRMED FUN_004393f0: obj+0x1f8 (1 for 'Q' kuvshinka_cvetok.msh, 2 for 'q' kuvshinka_list.msh, 0 for 'w'), kuvshinka.tga, alpha test, zwrite on, unlit. Matrix (D3D row vectors) = Rz(rnd deg) * Ry(sin(t*0.005+rnd)*5 deg) * T(local) * Mobj, T by +500: 1:(-2.9,-2.9,-2.5) 2:(0,-2.8,-2.5) 3:(-2.6,-2.6,-2.5) 0:(0,0,-2.5) (FUN_004067c0 translates along local rows); rnd = obj+0x1d4 = rng(10000).
    // GUESS: Mobj (+0x24) = RotationZ(rot) with translation = objpos (z 0); 4049e0/4022c0 = cos, 4049d0/4022f0 = sin (from the rotation structure); time unit = ms.
    const lil = wobs.filter((o) => o.ch !== 'w'), LT = { 1: [-2.9, -2.9, -2.5], 2: [0, -2.8, -2.5], 3: [-2.6, -2.6, -2.5], 0: [0, 0, -2.5] };
    const S = new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1), G4 = new THREE.Matrix4();
    const lmeshes = [];
    const loadL = async (file) => { const m = parseMsh(await buf('geomobjs/' + file)), pos = new Float32Array(m.T * 9), uv = new Float32Array(m.T * 6);
      for (let t = 0; t < m.T; t++) for (let c = 0; c < 3; c++) { const vi = m.idx[t * 3 + c], q = (t * 3 + c) * 3, o = vi * 3; pos[q] = m.pos[o] + m.offset[0]; pos[q + 1] = m.pos[o + 2] + m.offset[2]; pos[q + 2] = m.pos[o + 1] + m.offset[1]; uv[(t * 3 + c) * 2] = m.uv[(t * 3 + c) * 2]; uv[(t * 3 + c) * 2 + 1] = m.uv[(t * 3 + c) * 2 + 1]; }
      const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3)); g.setAttribute('uv', new THREE.BufferAttribute(uv, 2)); return g; };
    if (lil.length) tasks.push((async () => {
      const lm = new THREE.MeshBasicMaterial({ map: tex('kuvshinka.tga'), side: THREE.DoubleSide, alphaTest: 0x80 / 255, transparent: true, depthWrite: true });
      const gs = { 1: await loadL('kuvshinka_cvetok.msh'), 2: await loadL('kuvshinka_list.msh') };
      for (const o of lil) { const me = new THREE.Mesh(gs[o.ch === 'Q' ? 1 : 2], lm); me.matrixAutoUpdate = false; me.frustumCulled = false; me.renderOrder = 3; scene.add(me); lmeshes.push([me, o]); }
    })());
    const lilyM = (o, wt) => {
      const rd = Math.PI / 180, c0 = Math.cos(o.rot * rd), s0 = Math.sin(o.rot * rd), px = (o.x + 0.5) * CELL - h0, py = (o.y + 0.5) * CELL - h0;
      const M = [c0, s0, 0, 0, -s0, c0, 0, 0, 0, 0, 1, 0, px, py, 0, 1], t = LT[o.wty], rn = o.rnd;
      for (let k = 0; k < 4; k++) M[12 + k] += t[2] * M[8 + k] + t[1] * M[4 + k] + t[0] * M[k]; // FUN_004067c0
      { const a = Math.sin(wt * 0.005 + rn) * 5 * rd, c = Math.cos(a), s = Math.sin(a); for (let k = 0; k < 4; k++) { const r0 = M[k], r2 = M[8 + k]; M[8 + k] = c * r2 + s * r0; M[k] = c * r0 - s * r2; } } // FUN_004066a0
      { const a = rn * rd, c = Math.cos(a), s = Math.sin(a); for (let k = 0; k < 4; k++) { const r0 = M[k], r1 = M[4 + k]; M[4 + k] = c * r1 - s * r0; M[k] = s * r1 + c * r0; } } // FUN_00403650
      G4.fromArray(M); return G4.premultiply(S).multiply(S); // row-vector D3D matrix -> three column matrix with y/z swap
    };
    let wt = 0, lastT = null; // _DAT_005d64a8 += DAT_005d7c00 (frame delta, ms: GUESS)
    waterMat = { update(t) {
      wt += lastT === null ? 0 : t - lastT; lastT = t;
      fm.map = frames[Math.floor(wt / 65) % 22];
      wobs.forEach((o, k) => { const par = (o.x & 1) + 2 * (o.y & 1), x0 = o.x * CELL - h0, y0 = o.y * CELL - h0; for (let j = 0; j < 4; j++) for (let i = 0; i < 4; i++) {
        const z = 0.4 * Math.sin(wt * 0.005 + i * 6.2831855 / 3) * Math.cos(wt * 0.005 + j * 6.2831855 / 3), n = k * 16 + i + j * 4;
        WP[n * 3] = x0 + i * 5 / 3; WP[n * 3 + 1] = -2.3 + z; WP[n * 3 + 2] = y0 + j * 5 / 3;
        WU[n * 2] = wt * 0.0002 + (i / 3 + (par & 1)) * 0.5; WU[n * 2 + 1] = 1 - (wt * 0.0001 + (j / 3 + (par >> 1)) * 0.5); } });
      wg.attributes.position.needsUpdate = true; wg.attributes.uv.needsUpdate = true;
      for (const [me, o] of lmeshes) { me.matrix.copy(lilyM(o, wt)); me.matrixWorldNeedsUpdate = true; } } };
  };
  // LIGHT: CONFIRMED FUN_00407890/FUN_00414330: sun=(sx,sy,sz) normalised, D3D light dir = (sx,sy,-sz) (travel direction, game z-up), type DIRECTIONAL, diffuse (1,1,1), ambient light 0, global ambient white x default material ambient 0.2 (mat 0x4dd128: diff 1, amb 0.2).
  // game->three (x,z,y): travel dir = (sx,-sz,sy). three>=r155 needs intensity PI for D3D-equivalent Lambert. CONFIRMED: the 0.3/0.5 grey material in FUN_00416450 belongs to the shadow quad (blend ZERO/INVSRCCOLOR), not to level objects, so level meshes use the default material. Shadow textures/quad (128x128 RTs) are NOT ported (unconfirmed visual).
  const sun = (lev.head.sun || '(0.4,0.3,-1)').match(/-?[\d.]+/g).map(Number), sl = Math.hypot(...sun) || 1;
  const dl = new THREE.DirectionalLight(0xffffff, Math.PI); dl.position.set(-sun[0] / sl, sun[2] / sl, -sun[1] / sl).multiplyScalar(100); scene.add(dl);
  scene.add(new THREE.AmbientLight(0xffffff, Math.PI * 0.2));
  shadow.setSun(sun[0], sun[1], sun[2]); // dynamic lightmap shadow (src/shadow.js, FUN_00415f20/FUN_00416450); DAT_0053d384 = raw .lev sun
  const tasks = [], skip = new Set(), spawns = [];
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (grid[y][x] === 'M') { skip.add(x + ',' + (y + 1)); const t = +grid[y + 1]?.[x]; spawns.push({ x, y, type: t >= 1 && t <= 4 ? t : 1, face: ({ v: 2, '<': 4, '^': 6 })[grid[y][x + 1]] || 0 }); }
  F.N = N; F.f = new Uint16Array(N * N); F.i0 = new Uint16Array(N * N); F.i1 = new Uint16Array(N * N); F.ie = new Uint8Array(N * N); OBJ.length = 1;
  const occ = { has: (k) => { const [x, y] = k.split(',').map(Number); return (fl(x, y) & 0xB4) !== 0; } }; // CONFIRMED early exit: anchor flags & (4|0x80|0x10|0x20)
  const mark = (x, y, w, h) => { for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) F.f[(y + j) * N + x + i] |= 0x10; }; // 'M' only (FUN_00407430)
  const put = (nm, cx, cy, w, h, rot, ch) => { // object write: record copied into the whole w*h footprint; '#','%',0xC1,0xC7 movable (|0x80, id1) else |4 id0; bit 8 cleared
    if (cx < 0 || cy < 0 || cx >= N || cy >= N || (fl(cx, cy) & 0xB4)) return null;
    ch = ch === undefined ? put.c : ch; put.last = null;
    const ob = { ch, x: cx, y: cy, w, h, cnt: 0, thr: THR(ch), touched: 0, active: 0, moving: 0, links: [0, 0, 0], mesh: null, rot }; OBJ.push(ob); const id = OBJ.length - 1; put.last = ob; ob.id = id;
    const mv = '#%\xc1\xc7'.includes(ch);
    let rec = REC(ch) & ~8; rec |= mv ? 0x80 : 4; ob.rec = rec; ob.off = { x: 0, z: 0 };
    for (let j = 0; j < h; j++) for (let i = 0; i < w; i++) { const k = (cy + j) * N + cx + i; if (cx + i >= N || cy + j >= N) continue; F.f[k] = rec; if (mv) F.i1[k] = id; else F.i0[k] = id; }
    if (ch === 'E') { ob.thr = 0xff; for (const [i, j] of [[0, 0], [3, 0], [0, 3], [3, 3]]) F.f[(cy + j) * N + cx + i] |= 3; }
    const pr = place(nm, cx, cy, w, h, rot, N); tasks.push(pr); pr.then((o) => { ob.mesh = o; if (o) o.userData.ob = ob; }); return pr;
  };
  const nb = (x, y, ch) => [[1, 0], [-1, 0], [0, 1], [0, -1]].map(([dx, dy]) => grid[y + dy]?.[x + dx] === ch);
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const c = grid[y][x];
    if (c === 'I') { const [r, l, d, u] = nb(x, y, 'I'); if ((r || l) && (d || u) || ['g', 'z'].some((q) => nb(x, y, q).some(Boolean))) { put('paling_stolb.cgo', x, y, 1, 1, 180, 'I'); } }
    else if (c === 'W') {
      const [r, l, d, u] = nb(x, y, 'W'), cnt = +l - +!r + (2 - +!d) + +u;
      if ((r || l) && (d || u) || cnt === 1 || !(r || l || d || u)) { put('kirpich_bashnya.cgo', x, y, 1, 1, 180, 'W'); }
    }
  }
  // MAIN PASS (CONFIRMED FUN_00407890 switch, FUN_00406f40): row-major, cell skipped when flags&(4|0x80|0x10|0x20) (occ); object writes flag into all w*h cells; rng consumed in decompile call order.
  const at = (x, y) => grid[y]?.[x];
  const FIXED = { '$': ['kust01.cgo', 1, 1, 0], '%': ['metalbox.cgo', 2, 2, 0], 'G': ['grass1.cgo', 1, 1, 0], 'E': ['exit.cgo', 4, 4, 0],
    '<': ['strelka.cgo', 1, 1, 180], '>': ['strelka.cgo', 1, 1, 0], '^': ['strelka.cgo', 1, 1, -90], 'v': ['strelka.cgo', 1, 1, 90] };
  const RF = { 'B': 'buket.cgo', 'F': 'flower.cgo', 'P': 'palm1.cgo', 'p': 'palm2.cgo' }; // rot rngf(180)
  const RR = { '&': ['oduvan', 2, 3, ''], '*': ['paporotnik', 2, 3, ''], '@': ['penek', 3, 4, ''], 'T': ['tree', 2, 4, ''], 't': ['tree', 2, 4, 'dry'] }; // [base, nVariants, rng(rotN)*90, suffix]
  const STONE = { '0': 'stone02', 'O': 'stone01', 'o': 'stone03' };
  const runs = (c, hn, hr, vn, vr, p10) => { // horizontal run (only if right neighbour == c) then vertical run (always), CONFIRMED I/W/|/r cases
    const x = runs.x, y = runs.y;
    if (at(x + 1, y) === c) for (let k = 0; at(x + k, y) === c; k++) put(hn(), x + k, y, 1, 1, hr);
    for (let k = 0; at(x, y + k) === c; k++) put(vn(), x, y + k, 1, 1, vr);
  };
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const c = grid[y][x]; if (!c || c === '.' || occ.has(x + ',' + y)) continue;
    put.c = c; runs.x = x; runs.y = y;
    if (c === 'M') { mark(x, y, 2, 2); continue; } // FUN_00407430: flag 0x10 on 2x2; spawns collected above
    if (PICK[c]) { const pr = put(SIMPLE[c][0], x, y, 1, 1, 0), pob = put.last; if (pr) tasks.push(pr.then((o) => { if (o) { const bt = { '\xef': 2, '\xf0': 1, '\xf1': 0 }[c]; if (bt !== undefined) o.traverse((m) => { if (m.isMesh) { m.material = m.material.clone(); m.material.map = tex(BTYPE[bt].tex); } }); items.push({ o, c, taken: false, ob: pob }); } })); continue; }
    if (FIXED[c]) { const [n, w, h, r] = FIXED[c]; put(n, x, y, w, h, r); }
    else if (RF[c]) put(RF[c], x, y, 1, 1, rngf(180));
    else if (RR[c]) { const [b, k, rn, suf] = RR[c]; const nm = b + R(k) + suf + '.cgo'; put(nm, x, y, 1, 1, rng(rn) * 90); }
    else if (STONE[c]) { const big = at(x, y + 1) === c && at(x + 1, y) === c, b = STONE[c]; const nm = b + (big ? '' : 'a') + '.cgo'; put(nm, x, y, big ? 2 : 1, big ? 2 : 1, rng(4) * 90); }
    else if (c === 'I') runs((c), () => 'paling0' + R(2) + '.cgo', 180, () => 'paling0' + R(2) + '_bok.cgo', -90);
    else if (c === '|') runs((c), () => 'zabor0' + R(4) + '.cgo', 180, () => 'zabor0' + R(4) + '_bok.cgo', -90);
    else if (c === 'W') runs((c), () => 'kirpich_base_opt.cgo', 180, () => 'kirpich_base.cgo', 90);
    else if (c === 'r') runs((c), () => 'reshetka.cgo', 180, () => 'reshetka_bok.cgo', 270);
    else if (c === 'g') { if (at(x + 1, y) === 'g') put('vorota.cgo', x, y, 2, 1, 180); else if (at(x, y + 1) === 'g') put('vorota.cgo', x, y, 1, 2, 270); }
    else if (c === 'z') {
      if (at(x + 1, y) === 'z') put('zamok.cgo', x, y, 4, 1, at(x + 3, y) === '^' ? 0 : 180);
      else if (at(x, y + 1) === 'z') put('zamok.cgo', x, y, 1, 4, at(x, y + 3) === '>' ? 90 : 270);
    }
    else if (c === 'L') put('lazer.cgo', x, y, 2, 2, ({ '>': 1, '^': 0, '<': 3, 'v': 2 })[at(x + 1, y)] * 90 || 0);
    else if (c >= '1' && c <= '9') put('tablo.cgo', x, y, 1, 1, 180);
    else if (c === '\xc1') put('bochka.cgo', x, y, 2, 2, rngf(10));
    else if (c === '\xc7') put('mirror.cgo', x, y, 2, 2, at(x + 1, y) === '/' ? 90 : 0);
    else if ('wqQ'.includes(c)) {
      const w = (dx, dy) => isW(x + dx, y + dy), R_ = w(1, 0), Lf = w(-1, 0), D = w(0, 1), U = w(0, -1);
      let rot = 0, ty = 0; // transcribed from FUN_00407890 case 'Q'/'q'/'w'
      if (R_ || U || !Lf || !D) {
        if (Lf || U || !R_ || !D) {
          if (Lf || D || !R_ || !U) {
            if (R_ || D || !Lf || !U) {
              if (R_ && Lf && !D) { rot = 0; ty = 2; } else if (R_ && Lf && !U) { rot = 180; ty = 2; }
              else if (U && D && !Lf) { rot = 90; ty = 2; } else if (U && D && !R_) { rot = 270; ty = 2; }
              else if (R_ && D && !w(1, 1)) { rot = 0; ty = 3; } else if (R_ && U && !w(1, -1)) { rot = 270; ty = 3; }
              else if (Lf && U && !w(-1, -1)) { rot = 180; ty = 3; } else if (Lf && D && !w(-1, 1)) { rot = 90; ty = 3; }
            } else { rot = 0; ty = 1; }
          } else { rot = 90; ty = 1; }
        } else { rot = 180; ty = 1; }
      } else { rot = 270; ty = 1; }
      const bp = put(ty === 0 ? 'bottom0.cgo' : 'bottom' + ty + (rng(2) === 1 ? '' : 'a') + '.cgo', x, y, 1, 1, rot); if (bp) { put.last.wty = ty; put.last.wri = rot / 90; bp.then((o) => { if (o) o.visible = false; }); } // CONFIRMED FUN_00439380 (water bed pass): state 0x13=1 (SRC ZERO) 0x14=2 (DEST ONE) -> the bottom mesh leaves the colour buffer unchanged (invisible, no colour); only the water quad (FUN_00438d80) is seen // CONFIRMED: rng not called for type 0; +500 bottom type, +0x1ae rotation index
    }
  }
  // BOX PASS (CONFIRMED FUN_00407890 after main pass): '#' whose anchor flags word == 0 -> box.cgo 2x2 record 0x1883 (thr 10). The pickup ids found (flag 0x200) at (x+1,y),(x+1,y+1),(x,y+1) are stored in obj +0x1dc/+0x1e0/+0x1e4 and the box record overwrites those cells.
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) if (grid[y][x] === '#' && fl(x, y) === 0) {
    const lk = [[1, 0], [1, 1], [0, 1]].map(([dx, dy]) => (fl(x + dx, y + dy) & 0x200 ? F.i0[(y + dy) * N + x + dx] : 0));
    put.c = '#'; put('box.cgo', x, y, 2, 2, 0, '#'); if (put.last) put.last.links = lk;
  }
  for (let i = 0; i < N; i++) for (const [x, y] of [[i, 0], [i, N - 1], [0, i], [N - 1, i]]) F.f[y * N + x] |= 3; // CONFIRMED borders |= 3 (exact extent GUESS: outermost row/column)
  for (const o of OBJ) { if (!o) continue; if (PICK[o.ch]) { o.pt = rngf(1000); o.pa = rng(360); } o.rnd = rng(10000); } // CONFIRMED loop FUN_0040aa.. (0x40ab4f/0x40ab6a): per object in creation order slot 0x1c then slot 0x18; every class (laser 41c050, water 4388a0, box 40d120, exit 'E' 435560, pickup 40c870, generic 41d050) slot 0x18 calls FUN_0041da80 = rng(10000); pickup slot 0x1c FUN_0040c8b0 = rngf(1000)->+0x1e0, rng(360)->+0x1dc. CONFIRMED FUN_0041da80 (first call in water virtual init FUN_004388a0, vtable slot 0x18, run per object in creation order after the load passes): obj+0x1d4 = rng(10000). NOT done: same for lasers/FUN_00435560 objects, vtable slot 0x1c of every object
  buildWater();
  await Promise.all(tasks);
  G.N = N; G.grid = grid.map((r) => r.split(''));
    G.tips = await loadTips(name);
  setupLasers();
  st.ammo = [+lev.head.numbombs || 0, +lev.head.numradiobombs || 0, +lev.head.numgrenades || 0];
  for (const sp of spawns) await spawnEnemy(sp, N);
  let sx = 12, sy = 41;
  for (let y = 0; y < N; y++) { const x = grid[y].indexOf('\xc3'); if (x >= 0) { sx = x; sy = y; } }
  hero.start = { x: (sx + 1) * CELL - N * CELL / 2, z: (sy + 1) * CELL - N * CELL / 2 };
  await spawnHero(hero.start.x, hero.start.z);
  heroFx = await createHeroFx(hero).catch(() => null); // hat + invisibility look (src/herofx.js, FUN_00423e40)
}
const G = { N: 0, grid: [] };
const items = [], enemies = [];
const PICK = { 'k': 1, '\xe0': 1, '\xe1': 1, '\xed': 1, '\xf7': 1, '\xfd': 1, '\xfe': 1, '\xff': 1, '\xef': 1, '\xf0': 1, '\xf1': 1 };
const HERO_HP = 300; // CONFIRMED hero ctor FUN_0041fdb0: hp=max=300; st.hp is hp/300
const st = { keys: 0, hp: 1, ananas: 0, ananasTotal: 0, energy: 0, bombs: 0, time: 0, invis: 0, msg: '' };
const ETYPE = { 1: ['vilka', 'vilka_screen.jpg', { idle: 'vilka_pause', run: 'vilka_run', atk: 'vilka_ataka', fid: 'vilka_perekrest', shock: 'vilka_shock' }, 0.8],
  2: ['sniper', 'snayper_screen.jpg', { idle: 'sniper_pause', run: 'sniper_beg', atk: 'sniper_ataka', fid: 'sniper_perekrest', shock: 'sniper_shock' }, 0.45],
  3: ['dlinnyi', 'dlinnyi_screen.jpg', { idle: 'dlinnyi_pause', run: 'dlinnyi_beg', atk: 'dlinnyi_ataka', fid: 'dlinnyi_perekrest', shock: 'dlinnyi_shock' }, 0.5],
  4: ['bugai', 'bugai_screen.jpg', { idle: 'bugai_pause', run: 'bugai_run', atk: 'bugai_attack', fid: 'bugai_perekrest', shock: 'bugai_shock' }, 0.7] };
// GUESS: skeleton root (pelvis) is at y=0 in the .skl; lift mesh so the idle-pose feet touch the ground (original's foot offset not found)
function ground(ch) { /* no-op: skeleton is Z-up with feet at z=0, mapped to y=0 in Character.pose (no lift needed) */ }
async function spawnEnemy(sp, N) {
  const [name, tex, an, speed] = ETYPE[sp.type];
  const ch = new Character(await loadSkl('characters/' + name + '.skl'), tex);
  const anims = {}; for (const k in an) anims[k] = await loadAnm('animations/' + an[k] + '.anm');
  ch.play(anims.idle); ch.update(0); ground(ch);
  const o = new THREE.Group(); o.add(ch.mesh); o.scale.setScalar(hero.SCALE);
  o.position.set((sp.x + 1) * CELL - N * CELL / 2, 0, (sp.y + 1) * CELL - N * CELL / 2);
  const yaw0 = -(Math.PI / 4) * (sp.face || 0); o.rotation.y = yaw0; // CONFIRMED heading h -> engine angle 45*h deg (FUN_004024d0/00402390); yaw = -angle (same convention as hero)
  scene.add(o);
  // CONFIRMED (loader FUN_00407430): hp = 25 vilka, 50 sniper/dlinnyi/bugai; sight range (+0x2a8) 35/85/75/60 world units; damage +0x2b8 = 30/50/1(per frame)/30 of hero hp 300
  const hh = sp.face || 0, off0 = N * CELL / 2;
  enemies.push({ o, ch, anims, state: 0, active: true, speed, type: sp.type, home: o.position.clone(), hp: [25, 50, 50, 50][sp.type - 1], sight: [35, 85, 75, 60][sp.type - 1], dmg: [30, 50, 1, 30][sp.type - 1],
    h: hh, yaw: yaw0, yawT: yaw0, turnT: 0, turnW: 0, t: 0, sx: 0, sz: 0, alert: false, hit: false, acnt: 0, dcnt: 0, shots: 0, shotT: 0, sflag: false, sidleN: 3, sidle: 6, // sniper +0x2f0=3, +0x2ec=6
    cx: sp.x + 1, cy: sp.y + 1, fx: sp.x + 1, fy: sp.y + 1, id: (spawnEnemy.n = (spawnEnemy.n || 0) + 1) });
  vFlagSet(sp.x + 1, sp.y + 1, 0x10, spawnEnemy.n);
}
// ===== Enemy AI. CONFIRMED port (decomp/asm): bugai FUN_0040d950, vilka FUN_00431300, dlinnyi FUN_0040fef0 family, sniper FUN_00433320 =====
// Logic runs on the original fixed 33 ms tick (timeSetEvent(0x21)->FUN_0043a4e0, DAT_005d7bd4=33*timescale 1.0); movement is per tick (NOT dt-scaled);
// animation advances with real dt. Anything marked GUESS below is not confirmed from the binary.
const TICK_MS = 33, ET = { VILKA: 1, SNIPER: 2, DLINNYI: 3, BUGAI: 4 };
const DIRI = [[1, 0], [1, 1], [0, 1], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]]; // FUN_0042d600 (gridx,gridy) = port (x,z)
const DIRN = DIRI.map(([x, y]) => { const l = Math.hypot(x, y); return [x / l, y / l]; });
// CONFIRMED exe PRNGs, table = 256 bytes at VA 0x49e1d8. Stream 1 (state 0x6a415c idx1 += 1, 0x6a4158 idx2 += 3, both &0xff; v = T[idx1]<<8 | T[idx2]):
// FUN_004402b0(n)=v%n, FUN_00440320(r)=v/32768*r-r [-r,r), FUN_004403a0(r)=v*r/65536 [0,r). Used by effects, bullets, blood, pickups, laser sparks and (same stream) the loader.
// Seeded FUN_00440260(0) at level load start and again at load end (FUN_00407890), so the effects stream starts at idx1=idx2=0 after loading (identical seed). The call order
// of other consumers (enemy/hero logic) interleaves in the exe and cannot be reproduced call-for-call here; the stream itself is exact.
// Stream 3 (state 0x6a416c, FUN_004405c0(0) seed, idx += 0x17): FUN_004405d0(n) = T[idx] % n; used by enemy AI (rnd), hero dance/death. Stream 2 (0x6a4164/8) is the ground-tile RNG (FUN_00440450/004404c0).
// (table RT = same bytes as the loader RNG above; loader stream rngV/rI1/rI2 is stream 1 during loading, reseeded to 0 at load end -> rv1 below starts at 0/0)
let rs1a = 0, rs1b = 0, rs3 = 0;
const rv1 = () => { rs1a = (rs1a + 1) & 255; rs1b = (rs1b + 3) & 255; return (RT[rs1a] << 8) | RT[rs1b]; };
const rint1 = (n) => rv1() % n;
const rnd = (n) => { rs3 = (rs3 + 0x17) & 255; return n > 0 ? RT[rs3] % n : 0; }; // FUN_004405d0 (CONFIRMED)
const rc = (v, dc) => (dc < 0 ? Math.ceil(v) : Math.floor(v)); // FUN_00406c30 ceil if dir<0 else FUN_00406c50 floor
const hMod = (h) => ((h % 8) + 8) % 8;
const eOff = () => G.N * CELL / 2;
// REAL flag grid F (see build()). Enemy masks CONFIRMED: FUN_0040b010 0x652; dlinnyi FUN_0040b070 0x2672 (adds 0x2000|0x20); BFS 0x2612. Own footprint (0x10) is cleared during the enemy's own tick, so no self test is needed.
const heroV = () => { const o = eOff(), p = hero.obj.position, d = DIRI[hero.dirI ?? 0]; return [rc((p.x + o) / CELL, -d[0]), rc((p.z + o) / CELL, -d[1])]; }; // cellOf(pos,-UV[dir]) (FUN_00406b70)
const vFree = (e, vx, vy) => (vOr(vx, vy) & (e.type === ET.DLINNYI ? 0x2672 : 0x652)) === 0;
function eInfo(e) { // +0x294 dir to hero, +0x2a0 dist
  const p = e.o.position, hp = hero.obj.position, dx = hp.x - p.x, dz = hp.z - p.z, d = Math.hypot(dx, dz);
  e.dist = d; e.dir = d > 1e-6 ? [dx / d, dz / d] : [0, 0];
}
function nearestDir(v) { let b = 0, bd = 1e9; for (let i = 0; i < 8; i++) { const d = Math.hypot(DIRN[i][0] - v[0], DIRN[i][1] - v[1]); if (d < bd - 1e-9) { bd = d; b = i; } } return b; } // FUN_0042d010
function setHeading(e, h) { // FUN_004024d0 -> FUN_00402390: linear turn over 200 ms (shortest way)
  h = hMod(h); e.h = h;
  const tgt = -(Math.PI / 4) * h; let d = tgt - e.yaw; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI;
  e.yawT = e.yaw + d; e.turnW = d / 0.2; e.turnT = 0.2;
}
function setState(e, s) { // FUN_0040edc0 / FUN_00432450 / FUN_004349a0 (same shape for all four types)
  const A = e.anims, L = (a) => a.F * a.ms;
  switch (s) {
    case 0: e.t = L(A.idle); e.ch.play(A.idle, true); break;
    case 1: e.ch.play(A.run, true); break;
    case 2: e.ch.play(A.atk, false); e.t = L(A.atk); if (e.type === ET.SNIPER) e.alert = false; break;
    case 3: e.ch.play(A.fid, false); e.t = L(A.fid); break;
    case 4: e.ch.play(A.idle, true); e.t = 1000; break;
    case 6: e.ch.play(A.shock, false, 100); e.t = L(A.shock); break;
  }
  e.state = s;
}
// FUN_0042cf80: cone test, dist <= sight and |table[h] + dirToHero| >= 1.5
const inCone = (e, h) => e.dist <= e.sight && Math.hypot(DIRN[h][0] + e.dir[0], DIRN[h][1] + e.dir[1]) >= 1.5;
// FUN_0042d080: bugai/dlinnyi LOS: n=trunc(dist/2.5) samples along the dir to hero, tile flags & 0x1010 (GUESS: wall proxy + other-enemy footprint)
function losTile(e) {
  const o = eOff(), p = e.o.position, n = Math.trunc(e.dist / 2.5);
  for (let i = 0; i < n; i++) { const tx = Math.trunc((p.x + e.dir[0] * i * 2.5 + o) / CELL), ty = Math.trunc((p.z + e.dir[1] * i * 2.5 + o) / CELL); if (fl(tx, ty) & 0x1010) return false; }
  return true;
}
// FUN_004320a0: vilka LOS: single cell, mask 0x12, no enemy check (CONFIRMED)
function losVert(e) {
  const o = eOff(), p = e.o.position, n = Math.trunc(e.dist / 2.5);
  for (let i = 0; i < n; i++) { const vx = Math.trunc((p.x + e.dir[0] * i * 2.5 + o) / CELL), vy = Math.trunc((p.z + e.dir[1] * i * 2.5 + o) / CELL); if (fl(vx, vy) & 0x12) return false; }
  return true;
}
// FUN_0042d170: BFS over a 30x30 window from the hero cell; turn to the first-step dir nearest to the dir to hero. Returns 0 if hero further than 30 cells.
// GUESS: neighbour test uses vFree (mask 0x2612 vs 0x652 differ in unknown bits), tie-break and 'unreachable' result.
function bfsChase(e) {
  const [hx, hy] = heroV(); const cx = e.cx, cy = e.cy;
  if (Math.abs(hx - cx) > 30 || Math.abs(hy - cy) > 30) return false;
  const dist = new Map(), key = (x, y) => x * 4096 + y; dist.set(key(hx, hy), 0); const q = [[hx, hy]];
  for (let qi = 0; qi < q.length; qi++) {
    const [x, y] = q[qi], d = dist.get(key(x, y));
    if (x === cx && y === cy) break;
    for (const [dx, dy] of DIRI) { const nx = x + dx, ny = y + dy; if (Math.abs(nx - hx) > 30 || Math.abs(ny - hy) > 30 || dist.has(key(nx, ny))) continue; if (!(nx === cx && ny === cy) && !vFree(e, nx, ny)) continue; dist.set(key(nx, ny), d + 1); q.push([nx, ny]); }
  }
  const dc = dist.get(key(cx, cy)); if (dc === undefined) return false;
  let best = -1, bd = 1e9;
  for (let i = 0; i < 8; i++) { const nd = dist.get(key(cx + DIRI[i][0], cy + DIRI[i][1])); if (nd === undefined || nd >= dc) continue; const v = Math.hypot(DIRN[i][0] - e.dir[0], DIRN[i][1] - e.dir[1]); if (v < bd) { bd = v; best = i; } }
  if (best >= 0) setHeading(e, best);
  return true;
}
// FUN_0040e9b0 (bugai) / FUN_00410a90 (dlinnyi): alert. returns 0/1/2 (2 = attack started)
function alertCheck(e) {
  const dead = st.hp <= 0, inv = st.invis > 0;
  if (dead || (e.type === ET.BUGAI && inv)) { e.alert = false; return 0; }
  if (e.type === ET.DLINNYI && inv) e.alert = false;
  const cone = inCone(e, e.h) && !inv, los = losTile(e);
  if (cone && (e.type === ET.DLINNYI || los)) e.alert = true;
  if (e.alert) e.alert = bfsChase(e);
  if (!cone || !los) return e.alert ? 1 : 0;
  if (e.dist > (e.type === ET.BUGAI ? 14.5 : 25.0)) return e.alert ? 1 : 0; // +0x2f4 bugai 14.5; dlinnyi +0x2ec 25.0
  setState(e, 2); return 2;
}
// FUN_004320a0: vilka alert (no flag, no BFS): 0 none, 1 seen, 2 attack
function alertVilka(e) {
  if (st.invis > 0 || st.hp <= 0) return 0;
  if (!inCone(e, e.h) || !losVert(e)) return 0;
  setHeading(e, nearestDir(e.dir));
  const o = eOff(), hp = hero.obj.position, hcx = rc((hp.x + o) / CELL, -e.dir[0]), hcy = rc((hp.z + o) / CELL, -e.dir[1]);
  if (Math.abs(e.cx - hcx) < 3 && Math.abs(e.cy - hcy) < 3) { setState(e, 2); return 2; }
  return 1;
}
// FUN_0040eab0 / FUN_00432250 / FUN_00410bc0: choose a heading among free neighbour vertices (4-neighbours for vilka, 8 for bugai/dlinnyi)
function pickHeading(e) {
  const c = e.type === ET.VILKA ? [0, 2, 4, 6] : [0, 1, 2, 3, 4, 5, 6, 7], ok = c.filter((i) => vFree(e, e.cx + DIRI[i][0], e.cy + DIRI[i][1]));
  if (!ok.length) { if (e.type === ET.VILKA) setState(e, 0); else setState(e, rnd(2) ? 0 : 3); return false; } // vilka 432250: edc0(0); bugai eab0: 50/50 edc0(0)/(3)
  let h, tries = 0;
  for (;;) { h = ok[rnd(ok.length)]; tries++; if (tries > (e.type === ET.VILKA ? 2 : 2)) break; if ([1, 2, 7, 6].some((k) => h === hMod(e.h + k))) break; }
  setHeading(e, h); return true;
}
// FUN_0040ed80 / FUN_00432420 / FUN_00410ec0: idle chance, rand(4)==0 then pause (vilka: always pause; bugai 50/50 pause/perekrest)
function idleChance(e) { if (rnd(4) === 0) setState(e, e.type === ET.VILKA ? 0 : (rnd(2) ? 0 : 3)); }
// ---- run state: bugai FUN_0040db60, vilka FUN_00431510, dlinnyi FUN_0040fef0 ----
function runTick(e) {
  const o = eOff(), p = e.o.position, d = DIRN[e.h], spd = [0, 0.8, 0.45, 0.5, 0.7][e.type], k = (e.h & 1) ? 1.43 : 1.01;
  e.sx = d[0] * spd; e.sz = d[1] * spd; // +0x24c
  const px = rc((p.x + d[0] * k * CELL + o) / CELL, d[0]), pz = rc((p.z + d[1] * k * CELL + o) / CELL, d[1]);
  if (!vFree(e, px, pz)) { // blocked: snap to the grid line of the half-cell point ahead
    const sx = rc((p.x + d[0] * k * CELL / 2 + o) / CELL, d[0]) * CELL - o, sz = rc((p.z + d[1] * k * CELL / 2 + o) / CELL, d[1]) * CELL - o;
    e.sx = sx - p.x; e.sz = sz - p.z;
    if (e.type === ET.VILKA) { idleChance(e); pickHeading(e); return; } // FUN_00432420, FUN_00432250 (as called)
    if ((e.type === ET.BUGAI || e.type === ET.DLINNYI) && e.hit) { setState(e, 6); return; } // dlinnyi hit check: GUESS (same as bugai)
    if (e.type === ET.SNIPER) { if (sniperAim(e) !== 2) { pickHeadingSniper(e); idleSniper(e); } return; }
    if (!e.alert) { pickHeading(e); idleChance(e); } else alertCheck(e);
    return;
  }
  const ax = rc((p.x + e.sx + o) / CELL, d[0]), az = rc((p.z + e.sz + o) / CELL, d[1]), bx = rc((p.x + o) / CELL, d[0]), bz = rc((p.z + o) / CELL, d[1]);
  if (ax === bx && az === bz) return;
  e.cx = ax; e.cy = az;
  if (e.type === ET.SNIPER) {
    const r = sniperAim(e); if (r !== 0) return; // FUN_00434210
    const L = vFree(e, ax + DIRI[hMod(e.h + 2)][0], az + DIRI[hMod(e.h + 2)][1]), R = vFree(e, ax + DIRI[hMod(e.h + 6)][0], az + DIRI[hMod(e.h + 6)][1]);
    if (!e.alert) {
      if (!(L && R) || rnd(e.sidleN) !== 0 || (e.h & 1)) { if ((R || L) && rnd(12) === 0) { if (L && !R) setHeading(e, e.h + 2); else if (!L && R) setHeading(e, e.h + 6); } } else setState(e, 3);
    }
    return;
  }
  if ((e.type === ET.BUGAI || e.type === ET.DLINNYI) && e.hit) { setState(e, 6); return; }
  const h0 = e.h, r = e.type === ET.VILKA ? alertVilka(e) : alertCheck(e);
  if (r === 2 || e.h !== h0) return;
  if (r !== 0 && e.type === ET.VILKA) return;
  const side = (dd) => { const dv = DIRI[hMod(e.h + dd)]; return vFree(e, ax + dv[0], az + dv[1]) && !vFree(e, bx + dv[0], bz + dv[1]); };
  if (side(2) && side(6)) setState(e, 3);
}
// ---- pause / perekrest / shock (bugai FUN_0040e2e0/0040e4b0/0040e3e0, vilka FUN_00431c00/00431d90/00431cc0, dlinnyi FUN_00410660/004107f0/00410720) ----
function aimAlert(e) { return e.type === ET.VILKA ? alertVilka(e) : alertCheck(e); }
function pauseTick(e, peri) {
  e.sx = e.sz = 0;
  if (e.type === ET.BUGAI && !peri && e.t >= 500 && e.t < 500 + TICK_MS && rnd(3) === 0) play('bugaystand', e.o.position);
  const r = aimAlert(e);
  if (r === 0) {
    if (e.hit) { setState(e, 6); if (e.type === ET.VILKA) e.hit = false; } // vilka clears the flag here (+0x2bc=0); bugai/dlinnyi clear it at the end of shock
    if (e.t < 1) { setState(e, 1); if (peri) pickHeading(e); } else e.t -= TICK_MS;
  } else if (e.state !== 2) setState(e, 1);
}
function shockTick(e) {
  e.sx = e.sz = 0;
  if (e.t < 1) {
    e.hit = false;
    if (e.dist < e.sight) setHeading(e, nearestDir(e.dir));
    if (aimAlert(e) !== 2) setState(e, 1);
  } else e.t -= TICK_MS;
}
// ---- attack: bugai FUN_0040e570, vilka FUN_00431e50, dlinnyi FUN_004108b0 ----
function attackTick(e) {
  e.sx = e.sz = 0;
  const A = e.anims.atk, L = A.F * A.ms, dead = st.hp <= 0, inv = st.invis > 0;
  const hurt = (dmg) => { if (st.hp <= 0) return; /* CONFIRMED FUN_00423630: ignored in hero state 4 (dead) */ heroBlood(dmg); st.hp = Math.max(0, st.hp - dmg / HERO_HP); heroHurt(() => rint1(3)); }; // FUN_00423630: herodamage1-4 cycle, 400 ms cooldown (audio.js heroHurt)
  const inFront = () => e.dist < 14.15 && Math.hypot(DIRN[e.h][0] - e.dir[0], DIRN[e.h][1] - e.dir[1]) < 0.5; // _DAT_0048ca84=14.15, _DAT_0048c2fc=0.5
  if (e.type === ET.BUGAI) {
    for (const f of [0.3, 0.7]) if (e.t >= L * f && e.t < L * f + TICK_MS && inFront()) { play('bugaykick', e.o.position); hurt(e.dmg); } // DAT_0048c434/0048c3ec; +0x2b8=30
    for (const f of [0.4, 0.8]) if (e.t >= L * f && e.t < L * f + TICK_MS) play('bugaymah', e.o.position);
    setHeading(e, nearestDir(e.dir));
    if (dead) { setHeading(e, rnd(8)); setState(e, rnd(2) ? 0 : 3); return; }
    if (inv) { setState(e, 3); return; }
    if (!losTile(e) || e.dist > 14.5) { setState(e, 1); return; }
    if (e.t < 1) {
      const r = alertCheck(e);
      if (r === 1) { e.acnt = 0; setState(e, 1); }
      else if (r === 0) { e.acnt = 0; setState(e, 1); pickHeading(e); idleChance(e); }
      else { e.acnt++; if (e.acnt > 3) { e.acnt = 0; setState(e, 1); setHeading(e, e.h + 4); e.alert = false; pickHeading(e); idleChance(e); } }
    } else e.t -= TICK_MS;
  } else if (e.type === ET.VILKA) {
    if (e.t >= L * 0.2 && e.t < L * 0.2 + TICK_MS && inFront()) hurt(e.dmg); // _DAT_0048d3e0=0.2; inFront operand GUESS (same as bugai)
    if (e.t > 299 && e.t < 300 + TICK_MS) play('vilkaataka', e.o.position);
    if (e.t < 1) {
      const r = alertVilka(e);
      if (r === 1) { e.acnt = 0; setState(e, 1); }
      else if (r === 0) { e.acnt = 0; setState(e, 1); pickHeading(e); idleChance(e); }
      else { e.acnt++; if (e.acnt > 2) { e.acnt = 0; setState(e, 1); setHeading(e, e.h + 4); pickHeading(e); idleChance(e); } }
    } else e.t -= TICK_MS;
  } else if (e.type === ET.DLINNYI) {
    // FUN_004108b0 (read only partially): per tick damage 1.0 after the first 200 ms of the anim; dlinnyataka sound via +0x2f8 counter
    if (e.t < L - 200) hurt(1.0);
    if (e.dcnt === 0) play('dlinnyataka', e.o.position);
    e.dcnt += TICK_MS; if (e.dcnt > 175) e.dcnt = 0;
    setHeading(e, nearestDir(e.dir));
    if (dead) { setHeading(e, rnd(8)); setState(e, rnd(2) ? 0 : 3); return; }
    if (inv) { setState(e, 3); return; }
    if (e.dist > 25.0 * 1.2 || !losTile(e)) { setState(e, 1); return; }
    // GUESS: tail (t<1) same shape as bugai (not read)
    if (e.t < 1) { const r = alertCheck(e); if (r !== 2) { setState(e, 1); if (r === 0) { pickHeading(e); idleChance(e); } } } else e.t -= TICK_MS;
  }
}
// ---- sniper (FUN_00433320 family) ----
// FUN_004340f0: scan up to 25 vertices along dir; 0 = hero found (clear line), 1 = other enemy in way, 2 = nothing, 3/4 = wall (4 if within 5)
function sniperScan(e, dir) {
  for (let i = 0; i <= 24; i++) {
    const vx = e.cx + DIRI[dir][0] * i, vy = e.cy + DIRI[dir][1] * i;
    const [hx, hy] = heroV(); if (hx === vx && hy === vy && st.invis <= 0 && st.hp > 0) return 0;
    const m = vOr(vx, vy); if (m & 1) return (i < 5) + 3; // CONFIRMED order (FUN_004340f0): hero vertex, OR&1, OR&0x10
    if (m & 0x10) return 1;
  }
  return 2;
}
// FUN_00434410: acquire/lose the hero for the sniper. returns 1 when it turned toward the hero
function sniperSee(e, h) {
  if (e.dist > e.sight) return 0;
  if (!e.alert) {
    if (Math.hypot(DIRN[h][0] + e.dir[0], DIRN[h][1] + e.dir[1]) >= 1.5 && losTile(e)) {
      const [hx, hy] = heroV(), ddx = Math.abs(hx - e.cx), ddy = Math.abs(hy - e.cy);
      const go = (d) => { if (!vFree(e, e.cx + DIRI[d][0], e.cy + DIRI[d][1])) return false; setHeading(e, d); return true; };
      if (ddx < ddy) { if (!go(e.cx < hx ? 0 : 4)) return 0; } else if (!go(e.cy < hy ? 2 : 6)) return 0;
      e.alert = true; return 1;
    }
    return 0;
  }
  if (e.dist < 1.4) e.alert = false; // _DAT_0048e730
  return 0;
}
// FUN_00434210: sniper aim/shoot decision. returns 0/1/2
function sniperAim(e) {
  let c = sniperScan(e, e.h); if (e.h & 1) c = 4;
  if (c === 0) { if (e.shots === 3) { e.shots = 0; return 0; } setState(e, 2); e.shots++; return 2; }
  if (!(e.shotT <= 6000 || e.alert || c === 4 || c === 1)) { setState(e, 2); e.shotT = 0; return 2; } // GUESS: +0x300=6000.0 limit, +0x304 timer accumulates 33/tick
  if (e.alert) for (const dd of [2, 6]) { const s = hMod(e.h + dd); if (sniperScan(e, s) === 0) { setHeading(e, s); setState(e, 2); return 2; } }
  if (!e.sflag) return sniperSee(e, e.h) ? 1 : 0;
  setHeading(e, nearestDir(e.dir)); e.sflag = false; return 1;
}
function pickHeadingSniper(e) { // FUN_00434690: all 8 neighbours, up to 5 tries
  e.alert = false;
  const ok = [0, 1, 2, 3, 4, 5, 6, 7].filter((i) => vFree(e, e.cx + DIRI[i][0], e.cy + DIRI[i][1]));
  if (!ok.length) { setState(e, 0); return; }
  let h, tries = 0;
  for (;;) { h = ok[rnd(ok.length)]; tries++; if (tries > 5) break; if ([1, 2, 7, 6].some((k) => h === hMod(e.h + k))) break; }
  setHeading(e, h);
}
function idleSniper(e) { e.alert = false; if (rnd(e.sidle) === 0) setState(e, 0); } // FUN_00434960 rand(+0x2ec=6)
const bullets = [];
function sniperShot(e) { // CONFIRMED FUN_00434b60: bullet at enemy pos + dir*3 + (0,0,8) (FUN_0040b1d0: phase +0x20 = 0, dmg +0x2b8, type 0); puff type 4 at bullet pos + dir*2; snipershot 3D sound at pos + dir*2
  const p = e.o.position, d = DIRN[e.h], m = new THREE.Object3D(); // logic-only holder; visuals = billboard sprites in drawBullets (FUN_0040b2d0)
  m.position.set(p.x + d[0] * 3, 8 * hero.SCALE, p.z + d[1] * 3);
  bullets.push({ m, dx: d[0], dz: d[1], dmg: e.dmg, ph: 0 });
  const q = new THREE.Vector3(m.position.x + d[0] * 2, m.position.y, m.position.z + d[1] * 2);
  spawnPart(4, q.x, q.y, q.z); play('snipershot', q);
}
// ---- particles (CONFIRMED FUN_0042e840 init / FUN_0042ff10 draw+update; 2048-slot ring, record 0x5c bytes) ----
// rec: life(+0, ms) pos(+4) vel(+0x10, per ms) angle(+0x1c deg) angvel(+0x20) size(+0x24) sizevel(+0x28) rgba(+0x2c) rgbavel(+0x3c) grav(+0x4c) frame(+0x50) blend(+0x54).
// prand(r)=FUN_00440320 in [-r,r); prand0(r)=FUN_004403a0 in [0,r) (CONFIRMED table PRNG stream 1, see rv1). Coords stored as three (x, up, z).
const PART = new Array(2048).fill(null); let partIdx = 0; const _pc = new THREE.Color();
const prand = (r) => rv1() / 32768 * r - r, prand0 = (r) => rv1() * r / 65536; // CONFIRMED FUN_00440320 / FUN_004403a0 on stream 1
function spawnPart(type, x, y, z) {
  const P = { life: 2000, x, y, z, vx: 0, vy: 0, vz: 0, ang: 0, av: 0, size: 0, sv: 0, c: [1, 1, 1, 1], cv: [0, 0, 0, 0], g: 0, frame: 0, blend: 0, type };
  switch (type) {
    case 3: P.vx = prand(0.007); P.vz = prand(0.007); P.vy = 0.01; P.ang = prand(20) - 90; P.av = prand(0.1); P.size = prand0(0.6) + 3; P.sv = -0.0035; P.c = [1, prand0(0.5) + 0.2, prand0(0.5) + 0.2, 1]; P.g = prand(0.0005) - 0.001; P.frame = 0x3d; P.blend = 2; break; // hero blood
    case 0: P.vx = prand(0.003); P.vz = prand(0.003); P.vy = -0.003; P.size = prand0(1) + 5; P.sv = -0.0055; P.c = [prand0(1), prand0(1), prand0(1), 1]; P.g = prand(0.0002) + 0.0007; P.frame = 0x3e; P.life = 2000; break; // CONFIRMED FUN_0042e840 case 0 (smoke puff, spawned by fire grid)
    case 1: P.vx = prand(0.002); P.vz = prand(0.002); P.vy = -0.006; P.size = prand0(2) + 4; P.sv = -0.0084; P.c = [prand0(1), prand0(1), prand0(1), 1]; P.g = prand(0.0001) + 0.0015; P.frame = 0x3e; P.life = 2000; break; // CONFIRMED FUN_0042e840 case 1 (debris smoke trail)
    case 4: P.life = 20000; P.av = 40; P.size = 14; P.sv = -0.015; P.cv = [-0.0004, -0.0004, -0.0004, 0]; P.frame = 0x36; P.blend = 0; break; // flash/puff
    case 5: case 6: case 7: // enemy blood: 5 vilka, 6 sniper, 7 dlinnyi/bugai
      P.life = 1500; P.vx = prand(0.009); P.vz = prand(0.009); P.vy = prand(0.005) + 0.035; P.ang = -90; P.av = prand(0.01);
      P.size = type === 5 ? prand0(0.5) + 2.5 : prand0(0.7) + 2.8; P.sv = type === 5 ? -0.002 : -0.0022;
      P.c = type === 6 ? [1, 0.8, 0.8, 1] : [0.8, 0.8, 1, 1]; P.g = prand(0.001) - 0.002; P.frame = 0x35; P.blend = 0; break;
    case 10: P.vx = prand(0.007); P.vz = prand(0.007); P.vy = 0.01; P.ang = prand(20) - 90; P.av = prand(0.1); P.size = prand0(0.8) + 4; P.sv = -0.004; P.c = [prand0(0.3) + 0.5, prand0(0.3) + 0.5, 1, 1]; P.g = prand(0.0005) - 0.001; P.frame = 0x3f; P.blend = 0; break; // bullet-hit spark
    // CONFIRMED FUN_0042e840 cases 2, 8, 9, 0xb, 0xf, 0x10, 0x11 (constants decoded from the exe). Angle never set by the exe in 2/8/0xf/0x11 (stale ring slot) -> 0 = GUESS.
    case 2: P.vx = prand(0.002); P.vz = prand(0.002); P.vy = -0.004; P.size = prand0(0.6) + 3; P.sv = -0.003; P.c = [prand0(1), prand0(1), prand0(1), 1]; P.g = prand(0.0001) + 0.0004; P.frame = 0x3e; P.blend = 0; break; // smoke puff (variant)
    case 8: P.vx = prand(0.004); P.vz = prand(0.004); P.vy = -0.001; P.av = prand(0.1); P.size = prand0(0.5) + 4; P.sv = prand0(0.009) + 0.01; P.c = [0.85, 0.85, 0.85, 0.85]; { const d = prand(0.0007) - 0.002; P.cv = [d, d, d, d]; } P.g = prand(0.0001) + 0.0005; P.frame = 0x37; P.blend = 3; break; // growing fading additive puff (dies when alpha < 0)
    case 9: P.vx = prand(0.01); P.vz = prand(0.01); P.vy = 0.01; P.ang = prand(20) - 90; P.av = prand(0.1); P.size = prand0(1) + 3; P.sv = -0.006; P.c = [prand0(0.3) + 0.5, prand0(0.3) + 0.5, 1, 1]; P.g = prand(0.0005) - 0.001; P.frame = 0x3f; P.blend = 0; break; // spark
    case 0xb: P.vy = prand0(0.02); P.vx = prand(0.004); P.vz = prand(0.004); P.ang = prand(100); P.av = prand(0.01); P.size = prand(1) + 3; P.sv = prand(0.001) - 0.002; P.cv = [0, 0, 0, prand(0.0003) - 0.001]; P.life = 1000; P.ph = prand0(100); P.frame = 0x34; P.blend = 2; break; // special draw (see stepParticles), no gravity
    case 0xf: P.vx = prand(0.009); P.vz = prand(0.009); P.vy = 0.003; P.size = prand0(1) + 5; P.sv = -0.0055; P.c = [prand0(1), prand0(1), prand0(1), 1]; P.g = prand(0.0002) - 0.0004; P.frame = 0x3e; P.blend = 0; break;
    case 0x10: P.vx = prand(0.007); P.vz = prand(0.007); P.vy = 0.01; P.ang = prand(20) - 90; P.av = prand(0.1); P.size = prand0(2) + 6; P.sv = -0.02; P.c = [prand0(0.2) + 0.8, prand0(0.3) + 0.5, prand0(0.3) + 0.5, 1]; P.g = prand(0.0005) - 0.001; P.frame = 0x3e; P.blend = 0; break;
    case 0x11: P.vx = prand(0.01); P.vz = prand(0.01); P.vy = 0.003; P.size = prand0(1) + 4; P.sv = -0.0015; P.c = [prand0(1), prand0(1), prand0(1), 1]; P.life = 5000; P.g = prand(0.0002) - 0.0002; P.frame = 0x3e; P.blend = 0; break;
    // CONFIRMED FUN_0042e840 cases 0xc/0xd/0xe (laser sparks / lock opening). Engine vec (x, y, zUp) -> three (vx, vz, vy). Initial angle of 0xc/0xd is never set by the exe (stale ring slot) -> 0 = GUESS.
    case 0xc: P.vx = prand(0.004); P.vz = prand(0.004); P.vy = 0.004; P.av = prand(100); P.size = prand0(0.5) + 2.7; P.sv = -0.0045; P.c = [prand0(0.1) + 0.9, prand0(0.1) + 0.9, 1, 1]; P.life = 2000; P.g = prand(0.0005) - 0.001; P.frame = 0x3c; P.blend = 0; break; // spark at a mirror reflection
    case 0xd: P.vx = prand(0.012); P.vz = prand(0.012); P.vy = prand(0.01) + 0.006; P.av = prand(100); P.size = prand0(1.9) + 2.4; P.sv = -0.006 - prand0(0.003); P.c = [prand0(0.1) + 0.9, prand0(0.1) + 0.9, 1, 1]; P.life = 2000; P.g = prand(0.0006) - 0.0015; P.frame = 0x3c; P.blend = 0; break; // spark at the beam end
    case 0xe: P.vx = prand(0.02); P.vz = prand(0.02); P.vy = prand(0.005) + 0.033; P.ang = -90; P.av = prand(2); P.size = prand0(0.5) + 1.5; P.sv = -0.0023; P.c = [1, 0.8, 0.8, 1]; P.life = 1500; P.g = prand(0.001) - 0.003; P.frame = 0x34; P.blend = 2; break; // lock opening sparks (x20)
  }
  PART[partIdx] = P; partIdx = (partIdx + 1) & 2047;
}
function heroBlood(dmg) { // FUN_00423630 (skipped when hero state 4 = dead): ceil(dmg/4) type-3 particles at pos + (0,0,prand(2)+4)
  if (st.hp <= 0) return; const p = hero.obj.position; if (hero.ch) hero.ch.eyeHit = true; // +0x380 = 1 (eye shake, eyeWander)
  for (let i = 0; i < dmg / 4; i++) spawnPart(3, p.x, p.y + prand(2) + 4, p.z);
}
function enemyBlood(e, dmg) { // FUN_0042ccd0: i < dmg/3 + 8 particles at pos + (0,0,prand(4)+5); vilka 5, sniper 6, dlinnyi 7, bugai 7
  const p = e.o.position, t = [5, 6, 7, 7][e.type - 1];
  for (let i = 0; i < dmg / 3 + 8; i++) spawnPart(t, p.x, p.y + prand(4) + 5, p.z);
}
function stepParticles(dt) { // dt seconds; draw then update per FUN_0042ff10 (DAT_005d7c00 = frame ms)
  const ms = dt * 1000;
  for (let i = 0; i < 2048; i++) {
    const P = PART[i]; if (!P || !(P.life > 0)) continue;
    // CONFIRMED colour: byte = low 8 bits of round(255*c) (FUN_00440e30 rounds, FUN_004064a0 stores a byte, NO clamp -> wraps); alpha same, used as sprite alpha (alpha ref 0x80)
    const cb = (v) => (Math.round(255 * v) & 255) / 255;
    if (P.type === 0xb) { // FUN_0042ff10 type 0xb: white sprite offset by (sin,cos)(life/200+ph)*ph/100*(1000-life)/70 in the ground plane, alpha = c3; plus an additive frame 0x36 glow (size*3, grey = alpha) at the same place
      const sc = (P.ph / 100) * ((1000 - P.life) / 70), an = P.life / 200 + P.ph, qx = P.x + Math.sin(an) * sc, qz = P.z + Math.cos(an) * sc, al = cb(P.c[3]);
      _pc.setRGB(1, 1, 1); spriteQ(qx, P.y, qz, P.ang, P.size, _pc, P.blend, P.frame, al);
      _pc.setRGB(al, al, al); spriteQ(qx, P.y, qz, 0, P.size * 3, _pc, 0, 0x36);
      P.ang += ms * P.av; P.size += ms * P.sv; if (P.size < 0) P.life = 0;
      P.x += P.vx * ms; P.y += P.vy * ms; P.z += P.vz * ms;
      if (P.y < 0) { P.y = 0; P.vy = -P.vy * 0.8; }
      P.life -= ms; for (let k = 0; k < 4; k++) P.c[k] += ms * P.cv[k]; if (P.c[3] < 0) P.life = 0;
      continue;
    }
    _pc.setRGB(cb(P.c[0]), cb(P.c[1]), cb(P.c[2]));
    spriteQ(P.x, P.y, P.z, P.ang, P.size, _pc, P.blend, P.frame, cb(P.c[3]));
    if (P.type === 0xe) { _pc.setRGB(cb(P.c[3]), cb(P.c[3]), cb(P.c[3])); spriteQ(P.x, P.y, P.z, 0, P.size * 3, _pc, 0, 0x36); } // second quad of 0xe: frame 0x36 additive, size*3, grey = alpha (exe offsets it by camVec*0.01 = depth bias, GUESS ignored)
    P.ang += ms * P.av; P.size += ms * P.sv; if (P.size < 0) P.life = 0;
    P.x += P.vx * ms; P.y += P.vy * ms; P.z += P.vz * ms;
    if (P.y < 0) { P.y = 0; P.vy = -P.vy * 0.8; }
    P.vy += ms * P.g * 0.05; P.life -= ms;
    for (let k = 0; k < 4; k++) P.c[k] += ms * P.cv[k];
    if (P.frame === 0x37 && P.c[3] < 0 && P.blend === 3) P.life = 0;
  }
}
function drawBullets(ms) { // CONFIRMED FUN_0040b2d0: pos + dir*2.0*alpha (DAT_005d7c0c = tick fraction); sprite 1 white frame 0x36 size 4 type 0; sprite 2 rgb(200,0,0) frame 0x35 type 0, size sin(phase*0.02)+3, angle prand(100); phase += frame ms
  const al = enemyAcc / TICK_MS, red = new THREE.Color(200 / 255, 0, 0), wh = new THREE.Color(1, 1, 1);
  for (const b of bullets) {
    const x = b.m.position.x + b.dx * 2 * al, y = b.m.position.y, z = b.m.position.z + b.dz * 2 * al;
    spriteQ(x, y, z, 0, 4, wh, 0, 0x36);
    spriteQ(x, y, z, prand(100), Math.sin(b.ph * 0.02) + 3, red, 0, 0x35); b.ph += ms;
  }
}
function bulletTick() { // FUN_0040b470: 2.0 per tick; dies on wall flag, hits hero (<2.5) or other enemy (<2.5)
  const o = eOff();
  for (const b of bullets.slice()) {
    const m = b.m; m.position.x += b.dx * 2.0; m.position.z += b.dz * 2.0;
    const vx = rc((m.position.x + o) / CELL, b.dx), vy = rc((m.position.z + o) / CELL, b.dz);
    const kill = () => { scene.remove(m); bullets.splice(bullets.indexOf(b), 1); };
    if (vx < 0 || vy < 0 || vx > G.N || vy > G.N) { kill(); continue; }
    const vm = vOr(vx, vy); if (vm & 1) { play('bulletend', m.position); spawnPart(4, m.position.x, m.position.y, m.position.z); for (let i = 0; i < b.dmg / 2; i++) spawnPart(10, m.position.x, m.position.y, m.position.z); kill(); continue; } // FUN_0040b470: wall flag 1 first
    const hp = hero.obj.position;
    if ((vm & 0x20) && st.hp > 0 && Math.hypot(hp.x - m.position.x, hp.z - m.position.z) < 2.5) { play('bulletend', m.position); heroBlood(b.dmg); st.hp = Math.max(0, st.hp - b.dmg / HERO_HP); heroHurt(() => rint1(3)); spawnPart(4, m.position.x, m.position.y, m.position.z); for (let i = 0; i < b.dmg / 2; i++) spawnPart(10, m.position.x, m.position.y, m.position.z); kill(); continue; }
    const eid = [[vx, vy], [vx - 1, vy], [vx, vy - 1], [vx - 1, vy - 1]].map(([a, b]) => (fl(a, b) & 0x10 ? F.ie[b * F.N + a] : -1)).find((v) => v >= 0), t = (vm & 0x10) && enemies.find((q) => q.id === eid && q.hp > 0 && Math.hypot(q.o.position.x - m.position.x, q.o.position.z - m.position.z) < 2.5);
    if (t) { play('bulletend', m.position); enemyDamage(t, b.dmg); kill(); }
  }
}
function enemyDamage(e, dmg) { // FUN_0042ccd0: hit flag, hp -= dmg (floor 0), pain sound
  e.hit = true; e.hp = Math.max(0, e.hp - dmg); enemyBlood(e, dmg);
  if (!(performance.now() < (e.painUntil || 0))) { play(['vilkapunish', 'sniperpunish', 'dlinnypunish', 'bugaypunish'][e.type - 1], e.o.position); e.painUntil = performance.now() + 500; } // CONFIRMED FUN_0042ccd0: sound only if cooldown +0x2c8 <= 0, then set to 500 ms
}
function sniperTick(e) { // update FUN_00433320 switch: 0 pause FUN_00433cc0, 1 run FUN_00433580, 2 attack FUN_00433ff0, 3 perekrest FUN_00433de0, 6 shock FUN_00433d50
  e.shotT += TICK_MS;
  if (e.hit) { setState(e, 6); e.hit = false; } // FUN_00433320: hit flag handled before the switch
  const A = e.anims;
  switch (e.state) {
    case 0: e.sx = e.sz = 0; { const r = sniperAim(e); if (r === 0) { if (e.t < 1) setState(e, 1); else e.t -= TICK_MS; } else if (e.state !== 2) setState(e, 1); } break;
    case 1: runTick(e); break;
    case 2: { e.sx = e.sz = 0; const L = A.atk.F * A.atk.ms; if (e.t >= L * 0.8 && e.t < L * 0.8 + TICK_MS) sniperShot(e); // _DAT_0048c410 = 0.8
      if (e.t < 1) { if (sniperAim(e) === 0) { setState(e, 1); pickHeadingSniper(e); idleSniper(e); } } else e.t -= TICK_MS; } break;
    case 3: { e.sx = e.sz = 0; const L = A.fid.F * A.fid.ms, w1 = L * 0.33, w2 = L * 0.67; // _DAT_0048e72c/_DAT_0048e728
      const side = (dd) => { const s = hMod(e.h + dd); if (sniperScan(e, s) === 0) { setHeading(e, s); setState(e, 2); return true; } if (sniperSee(e, s)) { setState(e, 1); return true; } return false; };
      if (e.t >= w1 && e.t < w1 + TICK_MS) { if (side(2)) return; } else if (e.t >= w2 && e.t < w2 + TICK_MS) { if (side(6)) return; }
      if (e.t < 1) setState(e, 1); else e.t -= TICK_MS; } break;
    case 6: e.sx = e.sz = 0; if (e.t < 1) { e.sflag = true; if (sniperAim(e) !== 2) setState(e, 1); } else e.t -= TICK_MS; break;
  }
}
function enemyTick(e) { // FUN_0040d950 / FUN_00431300 / FUN_00433320 per-tick update
  if (!e.active) return;
  eInfo(e);
  if (e.dist > (e.type === ET.VILKA || e.type === ET.SNIPER ? 150 : 210)) return; // activation radius: bugai _DAT_0048ca80=210, vilka/sniper _DAT_0048d830=150 (dlinnyi value not read: GUESS 210)
  const p = e.o.position, o = eOff();
  if (e.fx !== undefined) vFlagClr(e.fx, e.fy, 0x10); e.fx = undefined; // FUN_0042cc00: clear 0x10 at cellOf(pos,-UV[heading]) (CONFIRMED sign)
  p.x += e.sx; p.z += e.sz; // pos += step (previous tick's step)
  e.cx = Math.trunc((p.x + o) / CELL); e.cy = Math.trunc((p.z + o) / CELL); // +0x2c0/+0x2c4
  eInfo(e);
  if (e.hp > 0) {
    if (e.type === ET.SNIPER) sniperTick(e);
    else switch (e.state) {
      case 0: pauseTick(e, false); break;
      case 1: runTick(e); break;
      case 2: attackTick(e); break;
      case 3: pauseTick(e, true); break;
      case 6: shockTick(e); break;
    }
  } else if (e.state === 4) { // FUN_0042d830 death: 1000 ms then removed
    if (e.t === 1000) play('chpok1', e.o.position);
    e.t -= TICK_MS; e.sx = e.sz = 0;
    if (e.t < 1) { e.active = false; scene.remove(e.o); const i = enemies.indexOf(e); if (i >= 0) enemies.splice(i, 1); }
    return;
  } else setState(e, 4);
  if (e.hp > 0) { const u = DIRN[e.h]; e.fx = rc((p.x + o) / CELL, -u[0]); e.fy = rc((p.z + o) / CELL, -u[1]); vFlagSet(e.fx, e.fy, 0x10, e.id); } // FUN_0042cac0: OR 0x10 + enemy id into the 4 cells of cellOf(pos,-UV[heading])
}
let enemyAcc = 0;
function stepEnemies(dt) {
  if (!hero.obj) return;
  enemyAcc += dt * 1000;
  for (let n = 0; enemyAcc >= TICK_MS && n < 8; n++) { enemyAcc -= TICK_MS; for (const e of enemies.slice()) enemyTick(e); bulletTick(); }
  if (enemyAcc > 4 * TICK_MS) enemyAcc = 0;
  for (const e of enemies) { // real-time: turn smoothing (200 ms) + animation
    if (e.turnT > 0) { const s = Math.min(dt, e.turnT); e.yaw += e.turnW * s; e.turnT -= s; if (e.turnT <= 1e-9) e.yaw = e.yawT; }
    e.o.rotation.y = e.yaw;
    e.ch.update(dt);
  }
}
// ---- sorted billboard sprite queue (CONFIRMED FUN_0042e290 enqueue / FUN_0042e620 flush / FUN_0042dcb0 quad) ----
// Atlas exploanim.tga = 8x8 cells of 0.125; frame f -> col f%8, row f/8 (row 0 on top), uv = cell*0.125+0.001, span 0.124. Special frames 0x38 / 0x32 = 2x2 cell blocks
// (0x32: single quad, but its up-axis is (camAxis*0.2+(0,0,0.8))*size/2 i.e. tilted toward world-up; the tilt IS ported as a custom quad, spriteQ32). Blend by type (FUN_0042e620): 0 and 3 = SRCCOLOR,ONE; 1 = ZERO,INVSRCALPHA; 2 = SRCALPHA,INVSRCALPHA.
// ZWRITE off, depth test on, global alpha test ref 0x80. Quad = camera right/up rotated by angle (deg), edge = size (half = size*0.5, FUN_0042dcb0).
const SPQ = { pool: [], used: 0, mpool: [], mused: 0, tc: new Map() };
function spriteTex(frame) {
  if (!SPQ.tc.has(frame)) {
    const t = tex('exploanim.tga').clone(); t.needsUpdate = true; t.wrapS = t.wrapT = THREE.ClampToEdgeWrapping;
    const f0 = frame === 0x38 ? 0x30 : frame, big = frame === 0x38 || frame === 0x32, sp = big ? 0.249 : 0.124; /* FUN_0042dcb0: 0x38 -> cell 0x30, 0x32 -> col2,row6, both 2x2 block (span 0.25-0.001) */ const c = f0 % 8, r = Math.floor(f0 / 8); t.repeat.set(sp, sp); t.offset.set(c * 0.125 + 0.001, 1 - (r * 0.125 + 0.001) - sp);
    SPQ.tc.set(frame, t);
  }
  return SPQ.tc.get(frame);
}
const _qR = new THREE.Vector3(), _qU = new THREE.Vector3(), _qA = new THREE.Vector3(), _qr = new THREE.Vector3(), _qu = new THREE.Vector3();
// CONFIRMED FUN_0042dcb0 (frame 0x32): up axis A = (camUp*0.2 + (0,0,0.8 game-z = three +Y)) * size/2 instead of camUp*size/2; right = camRight*size/2; roll by angle (sign CONFIRMED, see k below). Custom quad, same blend/zwrite as Sprite.
function spriteQ32(x, y, z, angDeg, size, rgb, type, alpha) {
  let q = SPQ.mpool[SPQ.mused++];
  if (!q) {
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(12), 3)); g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]), 2)); g.setIndex([0, 1, 2, 0, 2, 3]);
    q = new THREE.Mesh(g, new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, side: THREE.DoubleSide, blending: THREE.CustomBlending })); q.frustumCulled = false; scene.add(q); SPQ.mpool.push(q);
  }
  const m = q.material, tx = spriteTex(0x32);
  if (m.map !== tx) { m.map = tx; m.needsUpdate = true; }
  m.blendSrc = type === 1 ? THREE.ZeroFactor : type === 2 ? THREE.SrcAlphaFactor : THREE.SrcColorFactor;
  m.blendDst = type === 0 || type === 3 ? THREE.OneFactor : THREE.OneMinusSrcAlphaFactor; m.blendEquation = THREE.AddEquation; m.opacity = alpha; m.color.set(rgb);
  const e = camera.matrixWorld.elements, h = size * 0.5, k = -angDeg * Math.PI / 180, c = Math.cos(k), sn = Math.sin(k); // CONFIRMED sign: exe texture-right Q = R*cos(a) - UP*sin(a), texture-up P = R*sin(a) + UP*cos(a) (FUN_0042e1f0 = cos, FUN_0042e220 = sin, deg*0.017453) => positive angle = clockwise on screen = three rotation -a
  _qR.set(e[0], e[1], e[2]); _qU.set(e[4], e[5], e[6]); _qA.copy(_qU).multiplyScalar(0.2); _qA.y += 0.8;
  _qr.copy(_qR).multiplyScalar(c * h).addScaledVector(_qA, sn * h); _qu.copy(_qA).multiplyScalar(c * h).addScaledVector(_qR, -sn * h);
  const P = q.geometry.attributes.position, sg = [[-1, -1], [1, -1], [1, 1], [-1, 1]];
  for (let i = 0; i < 4; i++) P.setXYZ(i, x + sg[i][0] * _qr.x + sg[i][1] * _qu.x, y + sg[i][0] * _qr.y + sg[i][1] * _qu.y, z + sg[i][0] * _qr.z + sg[i][1] * _qu.z);
  P.needsUpdate = true; q.userData.want = true;
}
function spriteQ(x, y, z, angDeg, size, rgb, type, frame, alpha = 1) { // three coords (x, up, z)
  if (frame === 0x32) return spriteQ32(x, y, z, angDeg, size, rgb, type, alpha);
  let sp = SPQ.pool[SPQ.used++];
  if (!sp) { sp = new THREE.Sprite(new THREE.SpriteMaterial({ transparent: true, depthWrite: false, blending: THREE.CustomBlending }) /* CONFIRMED FUN_0042e620 (sprite flush) sets ALPHABLEND on, ZWRITE off, never ALPHATESTENABLE=1 (0xf only set to 0 at its end): no alphaTest; the old alphaTest 0.5 discarded the faint frame-63 glow */); sp.frustumCulled = false; scene.add(sp); SPQ.pool.push(sp); }
  const m = sp.material;
  if (m.map !== spriteTex(frame)) { m.map = spriteTex(frame); m.needsUpdate = true; }
  m.blendSrc = type === 1 ? THREE.ZeroFactor : type === 2 ? THREE.SrcAlphaFactor : THREE.SrcColorFactor;
  m.blendDst = type === 0 || type === 3 ? THREE.OneFactor : THREE.OneMinusSrcAlphaFactor; m.blendEquation = THREE.AddEquation;
  m.opacity = alpha; m.color.set(rgb); m.rotation = -angDeg * Math.PI / 180; /* CONFIRMED FUN_0042dcb0: positive angle = clockwise on screen (three Sprite rotation is ccw) */ sp.position.set(x, y, z); sp.scale.set(size, size, 1); sp.userData.want = true;
}
// FIX: shadow.update renders `scene` several times per frame (lightmap/occluder passes, shadow.js:74,144,148); the old onBeforeRender->spriteEnd reset the queue on the FIRST of those passes so
// every billboard (bomb glow, explosion flares, particles) was hidden in the final render. Now sprites are visible only when SPQ.final is set (final render) and the queue resets after it.
function spriteEnd() { for (const sp of SPQ.pool) { sp.userData.keep = sp.userData.want; sp.userData.want = false; sp.visible = false; } for (const q of SPQ.mpool) { q.userData.want = false; q.visible = false; } SPQ.mused = 0; SPQ.used = 0; SPQ.final = false; }
scene.onBeforeRender = () => { for (const sp of SPQ.pool) sp.visible = !!(SPQ.final && sp.userData.want); for (const q of SPQ.mpool) q.visible = !!(SPQ.final && q.userData.want); };
// Bomb pickups (CONFIRMED FUN_0040c8f0 / FUN_0040ce90, class vtable[5]): 4 bomb spheres (spherebmb.msh, texture bomb_sphere{1,2,0}.jpg for 0xEF/0xF0/0xF1, blend SRCCOLOR,ONE, cull flipped
// = back faces) at pos+(0,0,2)+off, off = (-2.2,-2,0) (2.2,-2,0) (0,2,0) (0,0,2.5); each rotated X sin(t/300)*70 deg then Y sin(t/220)*50 deg, plus a flare sprite (frame 63, type 0)
// size sin(t/260+t/250)*0.55+5.5, angle sin(t/190+t/270)*90, tint (230,255,230)/(255,230,230)/(230,230,255) for 0xEF/0xF0/0xF1. t = +0x1e0 (frame ms) starts at rngf(1000) = GUESS (Math.random).
const BOMB_PK = { '\xef': { tex: 'bomb_sphere1.jpg', rgb: 0xe6ffe6 }, '\xf0': { tex: 'bomb_sphere2.jpg', rgb: 0xffe6e6 }, '\xf1': { tex: 'bomb_sphere0.jpg', rgb: 0xe6e6ff } };
const BOMB_OFF = [[-2.2, -2, 0], [2.2, -2, 0], [0, 2, 0], [0, 0, 2.5]];
function bombPickupAnim(it, dt) {
  const o = it.o, K = BOMB_PK[it.c];
  if (!it.g) {
    it.g = new THREE.Group(); it.g.matrixAutoUpdate = false; it.base = o.position.clone(); it.t = it.ob && it.ob.pt !== undefined ? it.ob.pt : prand(1000); it.sph = [];
    const src = []; o.traverse((m) => { if (m.isMesh) src.push(m); });
    const mat = new THREE.MeshBasicMaterial({ map: tex(K.tex), color: K.rgb, side: THREE.BackSide, transparent: true, blending: THREE.CustomBlending, blendSrc: THREE.SrcColorFactor, blendDst: THREE.OneFactor });
    for (let k = 0; k < 4; k++) { const m = new THREE.Mesh(src[0].geometry, mat); m.matrixAutoUpdate = false; it.g.add(m); it.sph.push(m); }
    o.visible = false; scene.add(it.g);
  }
  const t = it.t, D = Math.PI / 180;
  for (let k = 0; k < 4; k++) {
    const f = BOMB_OFF[k], gx = it.base.x + f[0], gy = it.base.z + f[1], gz = it.base.y + 2 + f[2];
    _pm.makeTranslation(gx, gy, gz); _pm.multiply(_po.makeRotationX(Math.sin(t / 300) * 70 * D)); _pm.multiply(_po.makeRotationY(Math.sin(t / 220) * 50 * D));
    it.sph[k].matrix.copy(_S).multiply(_pm).multiply(_S); it.sph[k].matrixWorldNeedsUpdate = true;
    spriteQ(gx, gz, gy, Math.sin(t / 190 + t / 270) * 90, Math.sin(t / 260 + t / 250) * 0.55 + 5.5, K.rgb, 0, 63);
  }
  it.t += dt * 1000;
}
// CONFIRMED FUN_0040caf0 (vtable[1] of the pickup class, called per visible object per frame via FUN_00416xxx loop at decomp ~10836):
// M = T(pos) then post-multiplied ops (D3DX standard rotations, degrees; column form here = Mc*op), t = 0x19c accumulates real frame ms,
// a = 0x1dc = rng(360) (FUN_0040c8b0). Ids (signed byte): key 0x6b, 0xE1 battery, 0xED invisible, 0xFF/FE/FD/E0 life/ananas, 0xF7 clock.
// GUESS: `a` comes from Math.random (exe uses the shared table RNG, call order unknown); t also advances while off screen.
// Bomb pickups (0xEF/F0/F1) have no matrix animation in FUN_0040caf0 (drawn via FUN_0040c8f0, see FORMATS.md).
const _S = new THREE.Matrix4().set(1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1);
const _pm = new THREE.Matrix4(), _po = new THREE.Matrix4();
function pickupAnim(it, dt) {
  if (BOMB_PK[it.c]) return bombPickupAnim(it, dt);
  const o = it.o;
  if (!it.base) { it.base = o.position.clone(); it.t = 0; it.a = it.ob && it.ob.pa !== undefined ? it.ob.pa : rint1(360); o.matrixAutoUpdate = false; }
  const t = it.t, a = it.a, D = Math.PI / 180, c = it.c;
  const rx = (d) => _pm.multiply(_po.makeRotationX(d * D)), ry = (d) => _pm.multiply(_po.makeRotationY(d * D)), rz = (d) => _pm.multiply(_po.makeRotationZ(d * D));
  const tr = (z) => _pm.multiply(_po.makeTranslation(0, 0, z));
  _pm.makeTranslation(it.base.x, it.base.z, it.base.y); // game coords (x, y, z-up)
  if (c === 'k') { tr(5); rx(90); ry(t * 0.11 + a); rz(20); ry(t * 0.16); }
  else if (c === '\xe1') { tr(5); rz(t * 0.09 + a); ry(20); rz(t * 0.12); }
  else if (c === '\xed') { tr(Math.sin(t * 0.005 + a) + 4); rz(t * 0.09 + a); ry(15); rz(t * 0.1); }
  else if (c === '\xff' || c === '\xfe' || c === '\xfd' || c === '\xe0') { tr(3); rz(a); rz(t * 0.09); ry(20); rz(t * 0.13); }
  else if (c === '\xf7') { tr(5); rz(t * 0.13 + a); rx(-15); }
  else { it.t += dt * 1000; return; }
  o.matrix.copy(_S).multiply(_pm).multiply(_S); o.matrixWorldNeedsUpdate = true; o.updateMatrixWorld(true);
  it.t += dt * 1000;
}
function stepItems(dt) {
  if (!hero.obj) return;
  for (const it of items) if (!it.taken) pickupAnim(it, dt);
  st.invis = Math.max(0, st.invis - dt);
}
// CONFIRMED FUN_00422990(x,y): if cell flags & 0x200 -> cell flags = 0, apply the pickup effect by type. Called for the 4 cells of the next vertex every state-1 tick.
function pickupCell(x, y) {
  if (!(fl(x, y) & 0x200)) return;
  const ob = OBJ[F.i0[y * F.N + x]]; fset(x, y, 0);
  const it = items.find((q) => q.ob === ob && !q.taken); if (!it) return;
  it.taken = true; scene.remove(it.o); if (it.g) scene.remove(it.g);
  const snd = { k: 'key1', '\xe0': 'ananas', '\xe1': 'batareyka', '\xed': 'invisible', '\xf7': 'clock', '\xfd': 'apple1', '\xfe': 'apple1', '\xff': 'apple1', '\xef': 'bomb', '\xf0': 'bomb', '\xf1': 'bomb' }[it.c] || null; // CONFIRMED FUN_00422990 (2D sounds); no sound for other items
  if (snd) play(snd);
  switch (it.c) {
    case 'k': st.keys++; break;
    case '\xe0': st.ananas++; st.hp = 1; break; // CONFIRMED: ananas refills hp to max
    case '\xe1': st.energy++; break;
    case '\xed': st.invis += 10; break; // CONFIRMED +10000 ms
    case '\xf7': hero.clockT = (hero.clockT || 0) + 10000; hero.speed = 1.5; break; // CONFIRMED FUN_00422990: clock.ogg, +0x340 += 10000 ms, +0x278 = 1.5
    case '\xfd': st.hp = Math.min(1, st.hp + 20 / HERO_HP); break; // CONFIRMED FUN_00422990: +20
    case '\xfe': st.hp = Math.min(1, st.hp + 40 / HERO_HP); break; // +40
    case '\xff': st.hp = Math.min(1, st.hp + 80 / HERO_HP); break; // +80
    case '\xf0': st.ammo[1] += 4; break; // CONFIRMED +4 (0xF1->type0, 0xF0->type1, 0xEF->type2)
    case '\xef': st.ammo[2] += 4; break;
    default: st.ammo[0] += 4; // 0xF1
  }
}
let levelMs = 0, fpsVal = 0, fpsAcc = 0, fpsN = 0; // levelMs = _DAT_004d6af0 (FUN_00414e30: +dt while not ended); fps refreshed every 300 ms (FUN_0043a570)
function hud() { // replaced by src/hud.js (FUN_00416dd0 replica); facing flags FUN_00420b20
  const f = { tablet: false, lock: false, laser: false };
  if (hero.obj && st.hp > 0) for (const [x, y] of frontCells()) {
    const o = objAt0(x, y), c = o?.ch;
    if (c >= '1' && c <= '9' && c.length === 1) f.tablet = true;
    if (c === 'z' && !o.dead && o.open === undefined && st.keys > 0) f.lock = true; // GUESS: side test omitted
    if (st.energy > 0 && lasers.some((l) => !l.active && x >= l.x && x <= l.x + 1 && y >= l.y && y <= l.y + 1)) f.laser = true;
  }
  const cnt = [0, 0, 0, 0]; for (const e of enemies) if (e.state !== 4 && e.type >= 1 && e.type <= 4) cnt[e.type - 1]++;
  const m = levelName.match(/^p0(\d)_l(\d+)$/), tm = levelName.match(/^tutorial(\d+)$/);
  const op = menu.options(); hudApi.showClock = !!op.time; // option showleveltime (DAT_0060fdf8) FUN_00425a70
  drawHud({ replaying, levelMs, showFps: !!op.fps, fps: fpsVal, tri: renderer.info.render.triangles, hp: st.hp, ammo: st.ammo, sel: st.sel, keys: st.keys, bat: st.energy, enemies: cnt, facing: f, title: G.title, level: levelName, packIdx: m ? +m[1] : 0, lvlIdx: m ? +m[2] : tm ? +tm[1] : 1 });
}
// removed debug 'R' = location.reload(): R is part of the FREECAM cheat word (no such key in the exe); reload manually with Shift+R if needed
addEventListener('keydown', (e) => { if (e.code === 'KeyR' && e.shiftKey) location.reload(); });
menu.init((n) => { location.search = '?level=' + n; }, () => { last = performance.now(); });
menu.inGame = q.has('level');
addEventListener('keydown', (e) => { if (e.code === 'Escape') { if (menu.ending) return; if (menu.open) menu.hide(); else if (finished || deathT >= 0) showEndMenu(); else if (replaying) { menu.replayEnd = false; menu.end(replayWon ? 'replaywin' : 'replayloss'); } else menu.show(true); } }); // CONFIRMED FUN_00413de0: Esc mid-replay (DAT_0061dea8=1) opens 'replaywin' if DAT_004d6b04 (outcome of the recorded run: 1 at victory, 0 at death, not reset at level start) else 'replayloss'; 'resumereplay'/'back'/Esc on them = FUN_00413de0 toggle = resume (FUN_0042ab00, FUN_0042b5d0). CONFIRMED FUN_00417df0/FUN_00413de0: Esc ignored while the end menu is open; with victory/defeat and the menu closed it opens defeat/victory at once (no pause); otherwise toggles 'gameplay' (pauses)
// REPLAY. CONFIRMED exe: FUN_00413f80 sets DAT_0055970e; FUN_00413a70 then restarts the level (FUN_004154d0 + FUN_00407890) with DAT_0061dea8=1 (FUN_0043f5b0, index DAT_0065340c=0); FUN_0043fa30 records the input bitmask DAT_00663910 once per frame in a ushort array (<=0x1aa21 entries, DAT_0061df38) and plays it back when DAT_0061dea8==1; new/restart level clears it (FUN_0043f500).
// PORT (differs): records key down/up events with the level time in ms instead of per-frame masks (frame-rate independent); persisted in sessionStorage while the end menu is shown. replaywin/replayloss menus: ported (Esc mid-replay).
// PORT (deterministic): like FUN_0043fa30 an input mask is stored once per logic tick (33 ms, GUESS: exe samples per rendered frame) in a ushort-style array; the mask has one bit per held key (codes table 'c', max 16 keys).
let rec = { c: [], m: [] }, recIdx = 0, replaying = false, recAcc = 0, recMask = 0;
// DEMO / ATTRACT (CONFIRMED FUN_00413a70, FUN_00440140, FUN_0043d7d0, FUN_0043fa30, FUN_0043a4e0): <level>.rec = raw little-endian uint16 input bitmasks, no header, ONE per 33 ms timer tick, count = bytes/2 (FUN_00440140: size/2);
// FUN_0043fa30 replay: mask = arr[idx]; if (idx < count) idx++ (past the end it keeps reading arr[count]; port feeds 0). Bits: 0x20 FIRE edge, 0x40 NEXT WEAPON edge, 1 USE edge, 0x800 USE held, 2 LEFT, 4 RIGHT, 8 UP, 0x10 DOWN, 0x80 key slot 10 edge, 0x100/0x200/0x400 bomb hotkeys slots 7/8/9 edge.
// Demo end (FUN_00414e30: 7000 ms after win/death -> FUN_00413fe0 -> FUN_00413a70): next index (cur+1+(rand&1)) % count. Enter/Space/Esc (FUN_00417df0) leave the demo to the main menu. Exit-nag variant (DAT_0055a7ad, 'exit' item) = demo only, N/A.
// GUESS/limits: web input sampling is per logic tick of the web sim (not bit-exact with the exe frame order / RNG stream order), so positions can drift from the recording; no headless parity run is possible (main.js needs DOM/WebGL).
const demoMode = q.has('demo'); let demoMasks = null, demoBase = 0, demoIdx = 0, demoHeld = 0;
if (demoMode) { replaying = true; fetch(__B + 'assets/demos/' + levelName + '.rec').then((r) => r.arrayBuffer()).then((b) => { demoMasks = new Uint16Array(b.slice(0, b.byteLength & ~1)); demoBase = levelMs; recAcc = 0; }).catch(() => {}); }
const demoNext = () => { const cur = DEMOS.indexOf(levelName); location.search = demoUrl((cur + 1 + (DEMOS.length < 2 ? 0 : Math.floor(Math.random() * 2))) % DEMOS.length); };
if (demoMode) addEventListener('keydown', (e) => { if (e.isTrusted && (e.code === 'Escape' || e.code === 'Enter' || e.code === 'Space')) { e.stopImmediatePropagation(); location.search = ''; } }, true); // FUN_00417df0 (DAT_0055a7ae): 0xd/0x20/0x1b -> main menu
function demoStep() {
  if (!demoMasks) return;
  const kb = menu.keys(), DIR = [[2, 3], [4, 4], [8, 5], [0x10, 6], [0x800, 2]], EDGE = [[0x20, 0], [0x40, 1], [0x80, 10], [0x100, 7], [0x200, 8], [0x400, 9]];
  while (recAcc * 33 <= levelMs - demoBase) {
    const mk = demoIdx < demoMasks.length ? demoMasks[demoIdx++] : 0; recAcc++;
    for (const [bit, slot] of DIR) { const on = (mk & bit) !== 0, was = (demoHeld & bit) !== 0; if (on !== was) dispatchEvent(new KeyboardEvent(on ? 'keydown' : 'keyup', { code: kb[slot], cancelable: true })); }
    for (const [bit, slot] of EDGE) if (mk & bit) { dispatchEvent(new KeyboardEvent('keydown', { code: kb[slot], cancelable: true })); dispatchEvent(new KeyboardEvent('keyup', { code: kb[slot], cancelable: true })); }
    demoHeld = mk;
  }
}
const heldRec = new Set();
try { if (sessionStorage.getItem('dino_replay') && q.has('level')) { rec = JSON.parse(sessionStorage.getItem('dino_rec') || '{"c":[],"m":[]}'); replaying = rec.m.length > 0; } sessionStorage.removeItem('dino_replay'); } catch (e) { rec = { c: [], m: [] }; }
menu.replayEnd = false;
let replayWon = false; try { replayWon = sessionStorage.getItem('dino_win') === '1'; } catch (e) {} // DAT_004d6b04 = outcome of the last run (see Esc handler)
addEventListener('keydown', (e) => { if (replaying && e.isTrusted && e.code !== 'Escape') e.stopImmediatePropagation(); }, true);
addEventListener('keyup', (e) => { if (replaying && e.isTrusted) e.stopImmediatePropagation(); }, true);
// JOYSTICK (Gamepad API). CONFIRMED FUN_0043f780/FUN_0043f6e0/FUN_0043f720/FUN_0043fa30: DirectInput8, first attached game controller (EnumDevices class 4, DIEDFL_ATTACHEDONLY), format c_dfDIJoystick2, every axis range -1000..1000 (DIPROP_RANGE). Per frame (if DAT_0049e1d0 enabled): threshold t=ftol(((2*sens-1)*0.7+1)*300), sens=DAT_0049e1d4 (0..1, default 0.5 -> 300); lX>t sets key slot 4 (RIGHT), lX<-t slot 3 (LEFT), lY>t slot 6 (DOWN), lY<-t slot 5 (UP) (the REMAPPED keyboard slots 0x663914[]); button idx DAT_0065337c[0]/[1] press edge -> FIRE (0x20) / NEXT WEAPON (0x40), [2] press edge -> USE (1) + held (0x800). Disabled during replay (the recorded mask replaces the input). GUESS: standard-mapping Gamepad axes 0/1 = lX/lY and button index = DirectInput rgbButtons index (the real order depends on the pad).
const joyHeld = new Set();
function joyFire(code, on) { if (!code || joyHeld.has(code) === on) return; if (on) joyHeld.add(code); else joyHeld.delete(code); const ev = new KeyboardEvent(on ? 'keydown' : 'keyup', { code, cancelable: true }); ev.fromJoy = true; dispatchEvent(ev); }
function joyStep() {
  const J = menu.joy, kb = menu.keys(); let gp = null;
  if (!replaying && !menu.open && J.en && navigator.getGamepads) for (const g of navigator.getGamepads()) if (g && g.connected) { gp = g; break; }
  if (!gp) { for (const c of [...joyHeld]) joyFire(c, false); return; }
  const t = Math.trunc(((2 * J.sens - 1) * 0.7 + 1) * 300), lX = (gp.axes[0] || 0) * 1000, lY = (gp.axes[1] || 0) * 1000;
  joyFire(kb[4], lX > t); joyFire(kb[3], lX < -t); joyFire(kb[6], lY > t); joyFire(kb[5], lY < -t);
  for (let i = 0; i < 3; i++) { const b = gp.buttons[J.btn[i]]; joyFire(kb[i], !!(b && b.pressed)); }
}
const recKey = (down) => (e) => { if (replaying || (!e.isTrusted && !e.fromJoy) || e.code === 'Escape' || e.code === 'KeyR') return; if (down) heldRec.add(e.code); else heldRec.delete(e.code); };
addEventListener('keydown', recKey(true)); addEventListener('keyup', recKey(false));
function replayStep() { // called every frame with levelMs; one mask per 33 ms tick
  if (menu.open || finished || deathT >= 0) return;
  if (demoMode) { demoStep(); return; }
  while (recAcc * 33 <= levelMs) {
    recAcc++;
    if (!replaying) { let mk = 0; for (const c of heldRec) { let i = rec.c.indexOf(c); if (i < 0 && rec.c.length < 16) { rec.c.push(c); i = rec.c.length - 1; } if (i >= 0) mk |= 1 << i; } if (rec.m.length < 0x1aa21) rec.m.push(mk); }
    else if (recIdx < rec.m.length) { const mk = rec.m[recIdx++]; for (let i = 0; i < rec.c.length; i++) { const on = (mk >> i) & 1, was = (recMask >> i) & 1; if (on !== was) dispatchEvent(new KeyboardEvent(on ? 'keydown' : 'keyup', { code: rec.c[i], cancelable: true })); } recMask = mk; }
    else if (recMask) { for (let i = 0; i < rec.c.length; i++) if ((recMask >> i) & 1) dispatchEvent(new KeyboardEvent('keyup', { code: rec.c[i] })); recMask = 0; }
  }
}
// CONFIRMED FUN_00417df0/FUN_004180e0: typed letters A-Z go into a 14-char buffer; strstr 'GRID' toggles DAT_0055a798 + message (FUN_004180c0) and the debug grid FUN_00417c30 (colour GUESS). 'FREECAM' (DAT_0055a799, free camera) is ported below (object fc).
let cheatBuf = '', gridObj = null;
// CONFIRMED FUN_00415200/FUN_0043fa30: DIMOUSESTATE lX,lY,lZ -> 0x5d7bec/f0/f4, rgbButtons[0]=left (0x5d7bd1), [1]=right (0x5d7bdc); LAlt = DIK 0x38 (0x61dde0). View matrix kept in the GAME frame (D3D row-vector, left-handed, z up); three = (x, z, y).
const fc = { on: false, M: null, v: [0, 0, 0], a7c8: 0, a7cc: 0, mx: 0, my: 0, btn: 0, alt: false, shakeFlag: false, shakeT: 0 };
addEventListener('mousemove', (e) => { fc.mx += e.movementX; fc.my += e.movementY; fc.btn = e.buttons; });
addEventListener('mousedown', (e) => { fc.btn = e.buttons; }); addEventListener('mouseup', (e) => { fc.btn = e.buttons; });
addEventListener('keydown', (e) => { if (e.code === 'AltLeft') fc.alt = true; }); addEventListener('keyup', (e) => { if (e.code === 'AltLeft') fc.alt = false; });
addEventListener('keydown', (e) => {
  if (menu.open || !/^Key[A-Z]$/.test(e.code)) return;
  cheatBuf = (cheatBuf + e.code[3]).slice(-14);
  if (cheatBuf.includes('FREECAM')) { cheatBuf = ''; fc.on = !fc.on; hudApi.message(fc.on ? 'FREECAM IS ON.' : 'FREECAM IS OFF.'); }
  if (cheatBuf.includes('GRID')) {
    cheatBuf = '';
    if (!gridObj) { gridObj = new THREE.GridHelper(G.N * CELL, G.N, 0xffffff, 0xffffff); gridObj.position.y = 0.05; gridObj.visible = false; scene.add(gridObj); }
    gridObj.visible = !gridObj.visible; hudApi.message(gridObj.visible ? 'GRID IS ON.' : 'GRID IS OFF.');
  }
});
if (!q.has('level')) menu.show(false);
function blocked(x, z) { // GUESS (kick/dance front test not decoded): single cell, flag 0x2 (solid)
  const o = G.N * CELL / 2; return !!(fl(Math.floor((x + o) / CELL), Math.floor((z + o) / CELL)) & 2);
}
const hero = { obj: null, ch: null, walk: null, stand: null, moving: false, face: 0, SCALE: 1, FACE_OFFSET: -Math.PI / 2 };
async function spawnHero(x, z) {
  const ch = new Character(await loadSkl('characters/pups.skl'), 'glavnyi_screen.jpg');
  const A = (n) => loadAnm('animations/' + n + '.anm');
  // Hero anim set exactly as loaded by the original (FUN_0041fb70): run = beg.anm (NOT walk.anm)
  hero.walk = await A('beg'); hero.stand = await A('stand'); hero.kick = await A('pinok');
  hero.idles = [hero.stand, await A('zaryadka'), await A('zaryadka2'), await A('chihanie'), await A('zevota'), await A('glavnyi_pause_time')];
  hero.dances = [await A('dance1'), await A('dance2')]; hero.wave = await A('mahanie');
  hero.push = await A('tolkanie'); hero.shock = await A('shock'); hero.deaths = [await A('death'), await A('death2')];
  ch.play(hero.stand); ch.update(0); ground(ch);
  const o = new THREE.Group(); o.add(ch.mesh); o.scale.setScalar(hero.SCALE); o.position.set(x, 0, z);
  o.rotation.y = hero.face = -Math.PI / 2; // forward +X; -PI/2 -> +z toward camera
  scene.add(o); hero.obj = o; hero.ch = ch;
}
const keys = {};
addEventListener('wheel', (e) => { if (hero.cam) hero.cam.wheel = (hero.cam.wheel || 0) - e.deltaY; }); // GUESS: wheel units/sign (exe uses _DAT_005d7bf4*0.002)
addEventListener('keydown', (e) => { keys[e.code] = true; });
addEventListener('keyup', (e) => { keys[e.code] = false; });
const SPEED = 1000 / 33; // CONFIRMED: hero moves 1.0 unit per 33 ms logic tick (FUN_00420030 pos+=vel, vel=dirVec*1.0*speed(+0x278)); GUESS: applied continuously per frame here instead of per tick
function frontBlocked() { const p = hero.obj.position, f = hero.face; return blocked(p.x + Math.sin(f) * 4, p.z + Math.cos(f) * 4); }
function startHeroAct(act, anm) { hero.act = act; hero.actAnm = anm; hero.actT = anm.F * anm.ms; hero.state = ''; }
function doKick() { // original: pinok anim, the hit lands at 40% of the anim (FUN_004237f0) if the cell in front is not blocked
  if (finished || hero.act === 'kick' || st.hp <= 0 || frontBlocked()) return;
  startHeroAct('kick', hero.kick); hero.kickDone = false; hero.kickAt = hero.actT * 0.4; // CONFIRMED FUN_004237f0: hit when remaining timer in [0.4*len, 0.4*len+33ms) i.e. 60% elapsed
}
function doDance() { if (finished || st.hp <= 0 || hero.act === 'dance') return; setTrack(10); /* CONFIRMED FUN_00421640: dance -> track 10 (order 0xf9); restored to level track when the dance ends */ startHeroAct('dance', hero.dances[rnd(3) !== 0 && !frontBlocked() ? 1 : 0]); hero.actT -= 300; /* CONFIRMED FUN_00421640: dance timer = F*ms - 300 */ }
function kickHit() { // my interpretation: enemies in front get 'shock' + knockback; the weakest (type 1 'shorty') is knocked out for good
  const p = hero.obj.position, f = hero.face, fx = Math.sin(f), fz = Math.cos(f);
  for (const e of enemies.slice()) {
    const dx = e.o.position.x - p.x, dz = e.o.position.z - p.z, d = Math.hypot(dx, dz);
    if (e.hp <= 0 || d > 14.15 || (dx * fx + dz * fz) / (d || 1) < 0.3) continue;
    enemyDamage(e, 10); // CONFIRMED kick damage 10 (FUN_004237f0 -> FUN_0042ccd0: hit flag, hp-=10); no knockback in the original; death = state 4 for 1000 ms (FUN_0042d830)
  }
}
// ---- GRID HERO MODEL (port of FUN_00420030 / FUN_00421ba0, see FORMATS.md "Hero grid model") ----
const UV = DIRI.map(([x, y]) => { const l = Math.hypot(x, y); return { x: x / l, z: y / l }; }); // CONFIRMED 0x5706f8 unit vectors
const cellFlags = fl; // REAL flag grid (was a char-derived guess)
const objAt0 = (x, y) => (x < 0 || y < 0 || x >= F.N || y >= F.N ? null : OBJ[F.i0[y * F.N + x]] || null); // static id0 object (loader +0)
const isTab = (x, y) => { const o = objAt0(x, y); return !!o && o.ch >= '1' && o.ch <= '9'; }; // CONFIRMED obj type 0x31..0x39 (FUN_00421ba0)
function cfree(x, y) { return !(vOr(x, y) & 0x12); } // CONFIRMED FUN_0040b150 (2x2 footprint x-1..x, y-1..y)
function cellOf(px, pz, d) { const h = G.N * CELL / 2, vx = (h + px) / CELL, vz = (h + pz) / CELL; return [d.x < 0 ? Math.ceil(vx) : Math.floor(vx), d.z < 0 ? Math.ceil(vz) : Math.floor(vz)]; } // CONFIRMED FUN_00406b70
function setDir(k) { // FUN_004024d0: dir = k, turn target (200 ms)
  hero.dir = k; const [dx, dy] = DIRI[k], tgt = Math.atan2(dx, dy) + hero.FACE_OFFSET;
  if (hero.tgt !== tgt) { hero.tgt = tgt; let d = tgt - hero.face; while (d > Math.PI) d -= 2 * Math.PI; while (d < -Math.PI) d += 2 * Math.PI; hero.turnW = d / 0.2; hero.turnT = 0.2; }
}
function heroKeyDir() {
  const kb = menu.keys(), dx = (keys[kb[4]] ? 1 : 0) - (keys[kb[3]] ? 1 : 0), dy = (keys[kb[6]] ? 1 : 0) - (keys[kb[5]] ? 1 : 0); // remappable keys (menu KEYBOARD screen; defaults = exe table FUN_0043f600)
  return dx || dy ? DIRI.findIndex(([a, b]) => a === dx && b === dy) : -1;
}
// CONFIRMED FUN_00420030 order: clear 0x20 at cellOf(pos,-UV[dir]) and cellOf(pos,+UV[dir]); pos += vel; damage; input/state; set 0x20 on both vertices again (not while dead: exact state-4 timer test GUESS).
function heroFp() { const d = UV[hero.dir ?? 0], p = hero.obj.position; return [cellOf(p.x, p.z, { x: -d.x, z: -d.z }), cellOf(p.x, p.z, d)]; }
function heroTick(dtTick) {
  if (hero.fp) for (const [x, y] of hero.fp) vFlagClr(x, y, 0x20); hero.fp = null;
  heroTick0(dtTick);
  if (st.hp > 0) { hero.fp = heroFp(); for (const [x, y] of hero.fp) vFlagSet(x, y, 0x20, 0); }
  if (finished && (hero.menuT = (hero.menuT || 0) + 33) > 7000 && !hero.menuShown) { hero.menuShown = true; showEndMenu(); } // CONFIRMED FUN_00414e30/FUN_00413de0: menu timer _DAT_004b56dc += 33 per logic tick, menu when > 7000
}
function heroTick0(dtTick) { // one fixed 33 ms logic tick
  if (hero.clockT > 0 && (hero.clockT -= 33) <= 0) { hero.clockT = 0; hero.speed = 1; } // CONFIRMED FUN_00420030: clock timer -= 33 per tick, at <=0 speed back to 1.0
  const p = hero.obj.position, h = G.N * CELL / 2;
  hero.vel ||= { x: 0, z: 0 }; if (hero.dir === undefined) { hero.dir = 0; hero.gst = 0; hero.ft = 0; hero.fi = 0; }
  p.x += hero.vel.x; p.z += hero.vel.z; // CONFIRMED FUN_00420030: pos += vel (vel from previous tick)
  { const d = UV[hero.dir], [cx0, cy0] = cellOf(p.x, p.z, d); if (st.hp > 0 && !finished && vAnd(cx0, cy0, 0x400) & 0x400) { heroBlood(50); st.hp = Math.max(0, st.hp - 50 / HERO_HP); heroHurt(() => rint1(3)); } } // CONFIRMED: FUN_0040b0d0(cellOf(pos,+UV), 0x400) -> damage 50 (laser beam flag)
  if (hero.gst === 7) { heroPushTick(); return; } // FUN_00420c20
  if (hero.gst === 8) { hero.vel = { x: 0, z: 0 }; return; } // FUN_00420650: vel = 0 (timer -= 33)
  const kd = heroKeyDir(), any = kd >= 0, sp = hero.speed || 1;
  if (st.hp <= 0 || finished) { hero.vel = { x: 0, z: 0 }; return; }
  if (hero.gst === 0) { hero.vel = { x: 0, z: 0 }; hero.pushing = false; if (any) { setDir(kd); hero.gst = 1; hero.ft = 0; } return; } // FUN_00421640 (move part only): dir key -> FUN_004024d0(keyDir), state 1; entry FUN_00422fc0(1): footstep timer 0
  // ---- state 1: FUN_00421ba0 ----
  if (hero.ft === 0) { play('stephero' + (hero.fi + 1)); hero.fi = (hero.fi + 1 + rint1(2)) % 3; } // CONFIRMED rule; rand = GUESS (Math.random instead of FUN_004402b0 table RNG)
  hero.ft += 33; if (380 / sp < hero.ft) hero.ft = 0;
  if (any && kd === ((hero.dir + 4) & 7)) setDir(kd);
  let dir = hero.dir; const d = UV[dir], [dx, dy] = DIRI[dir];
  let vel = { x: d.x * sp, z: d.z * sp };
  const [nx, ny] = cellOf(p.x + vel.x, p.z + vel.z, d), [cx, cy] = cellOf(p.x, p.z, d), moved = nx !== cx || ny !== cy;
  for (const [qx, qy] of [[nx, ny], [nx - 1, ny], [nx, ny - 1], [nx - 1, ny - 1]]) pickupCell(qx, qy); // FUN_00422990 x4 (order CONFIRMED)
  let stop = false;
  if (!moved && (!cfree(nx + dx, ny + dy) || hero.slide)) {
    for (const [qx, qy] of [[nx + dx, ny + dy], [nx + dx - 1, ny + dy], [nx + dx, ny + dy - 1], [nx + dx - 1, ny + dy - 1]]) { if (qx < 0 || qy < 0 || qx >= F.N || qy >= F.N) continue; const k = qy * F.N + qx; if (F.f[k] & 4) { const ob = OBJ[F.i0[k]]; if (ob) ob.touched = 1; } } // CONFIRMED FUN_00421ba0 (0x421e45..0x421f86): when not changing cell and the vertex ahead is blocked, every static (flag 4) object in its 4 cells gets +0x189 = 1 ('touched' -> lock/bush shake). Fire FUN_00411710 sets it too
    if (dir & 1) {
      const a = DIRI[(dir + 1) & 7], b = DIRI[(dir + 7) & 7], c1 = cfree(cx + a[0], cy + a[1]), c2 = cfree(cx + b[0], cy + b[1]);
      hero.slide = c1 || c2;
      if (c1) vel = { x: UV[(dir + 1) & 7].x * 0.9 * sp, z: UV[(dir + 1) & 7].z * 0.9 * sp };
      else if (c2) vel = { x: UV[(dir + 7) & 7].x * 0.9 * sp, z: UV[(dir + 7) & 7].z * 0.9 * sp };
      else stop = true;
    } else stop = true;
  }
  const orth = !(dir & 1), cond = d.x > 0 || d.z < 0, s = cond ? (dir + 6) & 7 : (dir + 2) & 7;
  const ax = nx + (d.x < 0 ? 2 : 1) * dx, ay = ny + (d.z < 0 ? 2 : 1) * dy, bx = ax + DIRI[s][0], by = ay + DIRI[s][1];
  const tab = isTab;
  if (stop) {
    vel = { x: 0, z: 0 }; hero.slide = false; hero.pushing = false;
    const fA = cellFlags(ax, ay), fB = cellFlags(bx, by);
    if (orth && (fA & fB & 2)) { if ((fA | fB) & 0x800) { hero.gst = 7; hero.ft = 0; hero.vel = { x: 0, z: 0 }; hero.pushA = hero.pushB = false; hero.pushing = true; hero.stopSetDir = false; return; } } // CONFIRMED FUN_00421ba0: (P0|P1)&0x800 -> FUN_00422fc0(7) (entry: ft=0, vel=0); push logic in heroPushTick (FUN_00420c20)
    else if (orth && !tab(ax, ay) && !tab(bx, by)) { // CONFIRMED FUN_00421ba0 corner slide
      const sd1 = cond ? (dir + 1) & 7 : (dir + 7) & 7, sd2 = cond ? (dir + 7) & 7 : (dir + 1) & 7;
      const ca = !(fA & 2) && cfree(cx + DIRI[sd1][0], cy + DIRI[sd1][1]), cb = !(fB & 2) && cfree(cx + DIRI[sd2][0], cy + DIRI[sd2][1]);
      if (ca) { dir = sd1; hero.slide = true; setDir(dir); } else if (cb) { dir = sd2; hero.slide = true; setDir(dir); } else hero.slide = false;
    }
    if (!hero.slide && any && kd !== hero.dir) setDir(kd);
    if (!any) hero.gst = 0;
  } else hero.pushing = false;
  if (moved) {
    const tc = { x: nx * CELL - h - p.x, z: ny * CELL - h - p.z }; // snap to the cell grid line
    { // CONFIRMED FUN_00421ba0 exit trigger (on a cell change): all enemies dead && flags(nx-2,ny-2)&flags(nx+1,ny+1)&4 && same id0 && obj type 'E' (0x45) -> obj+0x18a = 1, state 8
      const ia = F.i0[(ny - 2) * F.N + nx - 2], ib = F.i0[(ny + 1) * F.N + nx + 1], ex = OBJ[ia];
      if (allDeadNow() && (fl(nx - 2, ny - 2) & fl(nx + 1, ny + 1) & 4) && ia === ib && ex && ex.ch === 'E') { ex.active = 1; hero.vel = { x: 0, z: 0 }; heroEnterExit(); return; }
    }
    if (hero.slide) { vel = tc; hero.slide = false; }
    if (!cfree(nx + dx, ny + dy)) vel = tc;
    if (!any) { hero.gst = 0; vel = tc; }
    else if (kd !== hero.dir) { setDir(kd); vel = tc; }
  }
  hero.vel = vel;
}
// ---- PUSH STATE 7: port of FUN_00420c20 (flag 0x800 box push). Entry FUN_00422fc0(7): ft=0, vel=0, push anim. P0..P5 geometry CONFIRMED from decomp. ----
// Box slide: obj offset (+0x18c) advances by the half velocity UV*speed*0.5 per 33 ms tick (a 5-unit cell = 10 ticks); records move one cell each time the hero cell changes.
const boxPos = (ob) => { if (!ob.mesh) return; const o = F.N * CELL / 2; ob.mesh.position.set((ob.x + ob.w / 2) * CELL - o + ob.off.x, 0, (ob.y + ob.h / 2) * CELL - o + ob.off.z); };
function heroPushTick() {
  const p = hero.obj.position, o = F.N * CELL / 2, sp = hero.speed || 1, dir = hero.dir, d = UV[dir], [dx, dy] = DIRI[dir];
  const kd = heroKeyDir();
  if (hero.ft === 0) { play('stephero' + (hero.fi + 1)); hero.fi = (hero.fi + 1 + rint1(2)) % 3; }
  hero.ft += 33; if (380 / sp < hero.ft) hero.ft = 0;
  const hv = { x: d.x * sp * 0.5, z: d.z * sp * 0.5 }; hero.vel = hv;
  const [nx, ny] = cellOf(p.x + hv.x, p.z + hv.z, d), [cx, cy] = cellOf(p.x, p.z, d), moved = nx !== cx || ny !== cy;
  const s = (d.x > 0 || d.z < 0) ? (dir + 6) & 7 : (dir + 2) & 7;
  const P0 = [cx + (d.x < 0 ? 2 : 1) * dx, cy + (d.z < 0 ? 2 : 1) * dy], P1 = [P0[0] + DIRI[s][0], P0[1] + DIRI[s][1]];
  const P2 = [P0[0] + dx, P0[1] + dy], P3 = [P1[0] + dx, P1[1] + dy], P4 = [P2[0] + dx, P2[1] + dy], P5 = [P3[0] + dx, P3[1] + dy];
  const f = (P) => fl(P[0], P[1]), id1 = (P) => (P[0] < 0 || P[1] < 0 || P[0] >= F.N || P[1] >= F.N ? 0 : F.i1[P[1] * F.N + P[0]]);
  const orF = (P, m) => { if (P[0] >= 0 && P[1] >= 0 && P[0] < F.N && P[1] < F.N) F.f[P[1] * F.N + P[0]] |= m; };
  if (!(f(P0) & 0x12) || !(f(P1) & 0x12)) { hero.gst = 1; hero.ft = 0; hero.pushing = false; } // FUN_00422fc0(1)
  const id = id1(P0), ob = OBJ[id];
  if (ob && id === id1(P1) && id === id1(P2) && id === id1(P3) && (f(P0) & 0x80)) {
    if (!hero.pushB) {
      if (!hero.pushA) {
        if (!(f(P4) & 0x212) && !(f(P5) & 0x212)) { play('push'); ob.moving = 1; orF(P4, 2); orF(P5, 2); hero.pushA = true; hero.pushOb = ob; }
      } else { ob.off.x += hv.x; ob.off.z += hv.z; boxPos(ob); }
    } else { // finishing tick: obj offset += snap vector (exact cell), flags reset
      ob.off.x = 0; ob.off.z = 0; boxPos(ob); ob.moving = 0; /* GUESS: +0x188 cleared here (reset site not decoded) */ hero.pushB = false; hero.pushA = false;
    }
  } else hero.pushA = false;
  if (!hero.pushA) hero.vel = { x: 0, z: 0 };
  if (moved && hero.pushA) {
    const tc = { x: nx * CELL - o - p.x, z: ny * CELL - o - p.z };
    const rec = ob.rec, nr = ~rec & 0xffff;
    for (const P of [P0, P1]) if (P[0] >= 0 && P[1] >= 0 && P[0] < F.N && P[1] < F.N) F.f[P[1] * F.N + P[0]] &= nr;
    for (const P of [P4, P5]) if (P[0] >= 0 && P[1] >= 0 && P[0] < F.N && P[1] < F.N) { F.f[P[1] * F.N + P[0]] |= rec; F.i1[P[1] * F.N + P[0]] = id; }
    ob.x += dx; ob.y += dy; ob.off.x -= dx * CELL; ob.off.z -= dy * CELL; boxPos(ob); // anchor follows (visual continuous)
    hero.pushB = (f([P4[0] + dx, P4[1] + dy]) & 0x212) !== 0 || (f([P5[0] + dx, P5[1] + dy]) & 0x212) !== 0 || kd < 0 || kd !== dir || st.hp <= 0;
    if (!hero.pushB) play('push'); else hero.vel = tc;
  }
  if (!hero.pushA) { // CONFIRMED end of FUN_00420c20
    hero.pushing = false;
    if (kd < 0) { hero.gst = 0; hero.vel = { x: 0, z: 0 }; }
    if (kd >= 0 && kd !== dir) { hero.gst = 1; hero.ft = 0; setDir(kd); }
    if (st.hp <= 0) hero.gst = 0;
  }
}
function stepHero(dt) {
  if (!hero.obj) return;
  hero.acc = (hero.acc || 0) + dt * 1000; // CONFIRMED fixed 33 ms logic tick accumulator
  while (hero.acc >= 33) { hero.acc -= 33; heroTick(0.033); }
  const mv = hero.gst === 1; if (hero.gst === 7) hero.pushing = true;
  if (hero.turnT > 0) { const s = Math.min(dt, hero.turnT); hero.face += hero.turnW * s; hero.turnT -= s; if (hero.turnT <= 0) hero.face = hero.tgt; }
  if (hero.turnT !== undefined) hero.obj.rotation.y = hero.face;
  if (!mv && hero.gst !== 7) hero.pushing = false;
  if (st.hp < (hero.lastHp ?? 1) - 0.001) hero.shockT = hero.shock && hero.shock.F ? hero.shock.F * hero.shock.ms / 1000 : 0.35; // CONFIRMED FUN_00421640: hurt flag +0x381 in idle -> anim +0x290, idle timer = frames*ms (GUESS: +0x290 == 'shock' clip); no separate burning state (fire = flag 0x20 -> FUN_00423630)
  hero.lastHp = st.hp; hero.shockT = Math.max(0, (hero.shockT || 0) - dt);
  // State machine mirrors original FUN_00422fc0 / FUN_00421640: stand/idle fidgets, run(beg), push, kick(pinok), dance, shock, wave(exit)
  hero.actT = Math.max(0, (hero.actT || 0) - dt * 1000);
  if (mv || hero.shockT > 0) { if (hero.act === 'dance') setTrack(G.music); /* GUESS: interrupted dance restores level music */ hero.act = null; hero.idleN = 0; }
  const startAct = (act, anm, ms) => { hero.act = act; hero.actAnm = anm; hero.actT = ms ?? anm.F * anm.ms; hero.state = ''; };
  if (!finished && !mv && hero.shockT <= 0 && st.hp > 0) {
    if (hero.act && hero.actT <= 0) { if (hero.act === 'dance') setTrack(G.music); hero.act = null; hero.idleN = (hero.idleN || 0) + 1; }
    if (!hero.act) {
      if ((hero.idleN || 0) < 2) startAct('wait', hero.stand); // CONFIRMED FUN_00421640: first 2 cycles replay stand for exactly its anm length (F*ms), no random duration
      else {
        let k = rnd(6);
        if (k === 2 && frontBlocked()) k = 1; // zaryadka2 -> zaryadka when blocked in front (original does a cell-flag check)
        if (k === 0) startAct('wait', hero.stand); else startAct('idle', hero.idles[k]);
      }
    }
  }
  if (hero.act === 'idle' && hero.actAnm === hero.idles[3]) { const thr = hero.actAnm.F * hero.actAnm.ms * 0.68; if (!hero.chihK && hero.actT <= thr + 33) { hero.chihK = true; play('chihanie'); } } else hero.chihK = false; // CONFIRMED FUN_00421640: chihanie.ogg (2D) when remaining in (0.68*len, 0.68*len+33]
  if (hero.act === 'kick' && !hero.kickDone && hero.actT <= hero.kickAt) { hero.kickDone = true; kickHit(); }
  let want = hero.shockT > 0 ? 'shock' : hero.pushing ? 'push' : mv ? 'walk' : (hero.act || 'stand');
  if (finished) want = 'wave';
  if (want !== hero.state) {
    hero.state = want;
    if (want === 'wave') hero.ch.play(hero.wave, false);
    else if (want === 'wait') hero.ch.play(hero.stand, true);
    else if (want === 'idle' || want === 'kick' || want === 'dance') hero.ch.play(hero.actAnm, false);
    else hero.ch.play(hero[want], want === 'walk' || want === 'stand' || want === 'push', want === 'shock' ? 100 : 200); // FUN_00421640: shock FUN_00402350(.., 100.0)
  }
  eyeWander(hero.ch, dt * 1000); // CONFIRMED FUN_004232c0 (wander branch) -> bone 'L Eye' override via FUN_00401830
  hero.ch.update(dt);
  const p = hero.obj.position;
  // CAMERA = exe FUN_004158e0 (normal branch). CONFIRMED: C += (hero-C)*min(1,0.01*dt_ms); clamp gx to +-(half-80), gy to [-(half-75), half-40] (gz unclamped);
  // pitch = -138+6*zoom deg (D3DX rot, left-handed, z-up); eye = C - fwd*(D-15*zoom) - up*4.46, D=77.5; zoom in [0,1], vel+=wheel*0.002 +-0.2/frame (PgUp/PgDn), zoom+=vel*k, vel*=(1-k).
  // game (x,y,z) -> three (x,z,y). GUESS: C starts snapped on the hero (exe starts at BSS 0 and glides), hero.obj.position == exe hero pos 0x4dcfe8, dt capped 50ms by loop; death/exit cutscene camera branches not ported.
  const camS = (hero.cam ||= { c: null, zoom: 0, vel: 0 }), k = Math.min(1, 0.01 * dt * 1000), half = G.N * CELL / 2;
  camS.vel += (camS.wheel || 0) * 0.002 + (keys.PageUp ? 0.2 : 0) - (keys.PageDown ? 0.2 : 0); camS.wheel = 0;
  camS.zoom = Math.min(1, Math.max(0, camS.zoom + camS.vel * k)); camS.vel *= 1 - k;
  if (!camS.c) camS.c = new THREE.Vector3(p.x, p.y, p.z); // three coords of C
  // END CAMERA (CONFIRMED structure/constants FUN_004158e0 + FUN_004155b0; angle sign, pivot axis frame and the 5.0*f offset are GUESS):
  // f = (sin(PI*T/7000 - PI/2)+1)/2, T = end timer (<=7000). f>0: centre lerps to the hero by f (unclamped), extra rotation -15*f RADIANS (FUN_004182f0 = quaternion about X, pivot = hero),
  // distance = 60*f + (1-f)*77.5; after 7000 ms: distance += 0.002*dt_ms; at 14000 ms (camera timer _DAT_0055a7a4): free-flight FUN_004155b0: pitch -138, distance ((sin(a*t*1e-4)+1)*0.15+0.7)*77.5, random targets.
  const ending = finished || deathT >= 0; let fE = 0, extra = 0, dist = 77.5, free = false;
  if (ending) {
    camS.endT = (camS.endT || 0) + dt * 1000; const T = Math.min(camS.endT, 7000); fE = (Math.sin(Math.PI * T / 7000 - Math.PI / 2) + 1) / 2;
    // CONFIRMED FUN_004158e0 asm 0x415ece: first frame with timer>=14000 only sets flag DAT_0055a79a=1 and C(0x53d378)=(0,0,0) AFTER that frame's matrix was built; later frames call FUN_004155b0
    if (camS.fly) free = true; else { if (camS.endT >= 14000) { camS.fly = true; camS.flyInit = true; } else camS.D = camS.endT < 7000 ? 60 * fE + (1 - fE) * 77.5 : (camS.D ?? 60) + 0.002 * dt * 1000; extra = -15 * fE * 180 / Math.PI; dist = camS.D; }
  }
  if (free) { // CONFIRMED FUN_004155b0 (asm 0x4155b0): T=0x55a7d8, dir=0x55a808, ang=0x55a804, t=0x55a800 (BSS zero); C=0x53d378; stream 1 (FUN_00440320/004403a0)
    const fl2 = (camS.fl ||= { T: [0, 0, 0], D: [0, 0, 0], ang: 0, t: 0 });
    const cg = () => [camS.c.x, camS.c.z, camS.c.y], len3 = (a3, b3) => Math.hypot(a3[0] - b3[0], a3[1] - b3[1], a3[2] - b3[2]);
    if (len3(cg(), fl2.T) < 5) { // |C - T| < 5.0 (0x48c444): pick new start C and target T until |C-T| >= (N-35)*5
      for (let it = 0; it < 1000; it++) {
        const cy = prand(half - 70), cx = prand(half - 75), ty = prand(half - 70), tx = prand(half - 75); // draw order y(70) then x(75), C then T (asm 0x415637..0x4156cc)
        camS.c.set(cx, 0, cy); fl2.T = [tx, ty, 0];
        if (!(len3(cg(), fl2.T) < (G.N - 35) * 5)) break;
      }
      const dx = fl2.T[0] - camS.c.x, dy = fl2.T[1] - camS.c.z, dz = fl2.T[2] - camS.c.y, l = Math.hypot(dx, dy, dz) || 1; fl2.D = [dx / l, dy / l, dz / l]; // FUN_00403af0 normalize
      fl2.ang = prand0(4.7); // FUN_004403a0(0x4096cbe4)
    }
    fl2.t += dt * 1000; // _DAT_0055a800 += DAT_005d7c00 (frame ms)
    dist = ((Math.sin(fl2.ang * fl2.t * 1e-4) + 1) * 0.3 * 0.5 + 0.7) * 77.5; // DAT_0049e184 (0x48d3f0 = 1e-4)
    camS.c.x += fl2.D[0] * 0.015 * dt * 1000; camS.c.z += fl2.D[1] * 0.015 * dt * 1000; camS.c.y += fl2.D[2] * 0.015 * dt * 1000; // C += dir*0.015*dt (0x3c75c28f)
  } else if (fE > 0) camS.c.lerp(p, fE);
  else { camS.c.lerp(p, k); camS.c.x = Math.min(half - 80, Math.max(-(half - 80), camS.c.x)); camS.c.z = Math.min(half - 40, Math.max(-(half - 75), camS.c.z)); }
  { // CONFIRMED (FUN_004182f0 = T(-P)*R(X axis, theta)*T(P) applied to the view, theta=-15f rad): the orientation uses a_total = a + theta, the eye = base eye rotated about the hero by -theta in the game (y,z) plane, then eye += 5.0*f*U (U after rotation).
    const th = free ? 0 : -15 * fE, a0 = (free ? -138 : -138 + 6 * camS.zoom) * Math.PI / 180, a = a0 + th, d = free ? dist : dist - 15 * camS.zoom;
    const s0 = Math.sin(a0), c0 = Math.cos(a0); // game fwd (0,s,c), up (0,c,-s); three = (x, z_g, y_g)
    const gy = -s0 * d - c0 * 4.46, gz = -c0 * d + s0 * 4.46; // eye offset from C in game (y,z)
    const cy = camS.c.z, cz = camS.c.y; // C in game (y,z) = (three z, three y)
    const ry = cy + gy - p.z, rz = cz + gz - p.y, ph = -th, cp = Math.cos(ph), sp = Math.sin(ph);
    const ny = p.z + ry * cp - rz * sp, nz = p.y + ry * sp + rz * cp;
    const sn = Math.sin(a), cs = Math.cos(a), f = new THREE.Vector3(0, cs, sn), u = new THREE.Vector3(0, -sn, cs); // three coords of fwd/up
    camera.up.copy(u); camera.position.set(camS.c.x, nz, ny).addScaledVector(u, 5.0 * fE);
    camera.lookAt(camera.position.clone().add(f));
    // FREECAM + explosion shake, CONFIRMED FUN_00415200 / FUN_004158e0 (0x41592b..0x415a22) / FUN_00416450 (0x416647); matrices in the game frame (see fc).
    const sw = (a3) => [a3[0], a3[2], a3[1]]; // three <-> game (swap y/z)
    const eyeOf = (M) => [0, 1, 2].map((i) => -(M[12] * M[4 * i] + M[13] * M[4 * i + 1] + M[14] * M[4 * i + 2]));  // FUN_00418610
    const cross3 = (a3, b3) => [a3[1] * b3[2] - a3[2] * b3[1], a3[2] * b3[0] - a3[0] * b3[2], a3[0] * b3[1] - a3[1] * b3[0]];
    if (!fc.on) { // exe keeps the normal-camera matrix in 0x5faa70 (rebuilt each frame): column j = axis j (R,U,F), row3 = -eye.axis
      const eg = sw([camera.position.x, camera.position.y, camera.position.z]), fg = sw([f.x, f.y, f.z]), ug = sw([u.x, u.y, u.z]), rg = cross3(ug, fg), ax = [rg, ug, fg];
      const M = new Array(16).fill(0); for (let j = 0; j < 3; j++) { for (let i = 0; i < 3; i++) M[4 * i + j] = ax[j][i]; M[12 + j] = -(eg[0] * ax[j][0] + eg[1] * ax[j][1] + eg[2] * ax[j][2]); } M[15] = 1; fc.M = M;
    }
    { // FUN_00415200: mouse -> V (0x55a7bc) / angles (0x55a7c8,0x55a7cc), integrated by FUN_004158e0 (only effective while FREECAM)
      const M = fc.M, V = fc.v, col = (j) => [M[j], M[4 + j], M[8 + j]], R = col(0), U = col(1), F = col(2), left = fc.btn & 1, right = fc.btn & 2;
      if (fc.alt && right) { fc.a7cc += fc.my * -2.3; fc.a7c8 += fc.mx * -2.3; } // 0x48d3e8 = -2.3
      else if (right) { for (let i = 0; i < 3; i++) V[i] += F[i] * 0.3 * fc.my; } // 0x3e99999a = 0.3
      else if (left) { for (let i = 0; i < 3; i++) { V[i] += R[i] * 0.2 * fc.mx; V[i] += -U[i] * 0.2 * fc.my; } } // 0x3e4ccccd = 0.2
      fc.mx = fc.my = 0;
      const kk = Math.min(1, 0.01 * dt * 1000); // 0x48c448 = 0.01 * DAT_005d7c00 (frame ms)
      if (fc.on) {
        for (let j = 0; j < 3; j++) M[12 + j] += kk * (V[0] * M[j] + V[1] * M[4 + j] + V[2] * M[8 + j]); // FUN_00403770: view row3 += v*rows (world shifted by +v*k)
        for (let i = 0; i < 3; i++) V[i] *= 1 - kk; // FUN_0040c710(1-k)
        const eg = eyeOf(M), Fz = [M[2], M[6], M[10]], P = [eg[0] + Fz[0] * 20, eg[1] + Fz[1] * 20, eg[2] + Fz[2] * 20]; // pivot = eye + F*20 (FUN_004182c0, 00418610)
        const rot = (axis, ang) => { // FUN_004182f0: M = (Rq * T(P) with row3 -= P*Rq) * M ; q=(axis*sin(h), cos(h)) normalised, h=ang*0.5 deg
          const h = ang * 0.5 * 0.017453292, s = Math.sin(h); let q = [s * axis[0], s * axis[1], s * axis[2], Math.cos(h)]; const ql = Math.hypot(...q); if (ql > 0) q = q.map((x) => x / ql);
          const [x, y, z, w] = q, Q = [1 - 2 * (y * y + z * z), 2 * (x * y + z * w), 2 * (x * z - y * w), 0, 2 * (x * y - z * w), 1 - 2 * (x * x + z * z), 2 * (y * z + x * w), 0, 2 * (x * z + y * w), 2 * (y * z - x * w), 1 - 2 * (x * x + y * y), 0, 0, 0, 0, 1];
          for (let j = 0; j < 3; j++) Q[12 + j] = P[j] - (P[0] * Q[j] + P[1] * Q[4 + j] + P[2] * Q[8 + j]);
          const N = new Array(16).fill(0); for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) { let sum = 0; for (let t = 0; t < 4; t++) sum += Q[4 * i + t] * M[4 * t + j]; N[4 * i + j] = sum; } for (let i = 0; i < 16; i++) M[i] = N[i];
        };
        rot([M[0], M[4], M[8]], fc.a7cc * kk); rot([0, 0, 1], fc.a7c8 * kk); // 1st about the view X axis (FUN_0040c660), 2nd about game Z
      }
      fc.a7c8 *= 1 - kk; fc.a7cc *= 1 - kk; // FUN_004186c0(1-k)
      // explosion shake (FUN_00415200 tail): DAT_004d6d0c (set at bomb explode FUN_00405820) -> t=1; t>0: m=(1.1-t/600)*0.7, v=(rngf(m),rngf(m),rngf(m)) drawn z,y,x (stream 1, FUN_00440320), t+=frame ms, >600 -> 0
      let sh = [0, 0, 0]; if (fc.shakeFlag) { fc.shakeT = 1; fc.shakeFlag = false; }
      if (fc.shakeT > 0) { const m = (1.1 - fc.shakeT / 600) * 0.7, z0 = prand(m), y0 = prand(m), x0 = prand(m); sh = [x0, y0, z0]; fc.shakeT += dt * 1000; if (fc.shakeT > 600) fc.shakeT = 0; }
      if (fc.on) { for (let j = 0; j < 3; j++) M[12 + j] += sh[0] * M[j] + sh[1] * M[4 + j] + sh[2] * M[8 + j]; } // FUN_00403850 on the persistent matrix at FUN_00416450 0x416647
      else { camera.position.x -= sh[0]; camera.position.y -= sh[2]; camera.position.z -= sh[1]; } // world +v == eye -v (game y,z -> three z,y)
      if (fc.on) { const eg = eyeOf(M), a1 = [M[1], M[5], M[9]], a2 = [M[2], M[6], M[10]], pe = sw(eg); camera.up.set(...sw(a1)); camera.position.set(pe[0], pe[1], pe[2]); const fw = sw(a2); camera.lookAt(pe[0] + fw[0], pe[1] + fw[1], pe[2] + fw[2]); }
    }
  }
}
build(levelName).then(() => { window.__ready = true; if (levelName === 'menulevel') return menu3dInit({ scene, hero, loadCgo, spawnPart, stepParticles, prand, prand0, pickupAnim }); }).catch((e) => { console.error(e); window.__err = String(e.stack); });
let last = performance.now();
let stepAcc = 0, lpx = 0, lpz = 0, wasDead = false;
// CONFIRMED FUN_004232c0 (this+0x12c = L Eye override, +0x16c = R Eye override; both reset: +0x12c = identity at the top of every call).
// Hit branch (taken when +0x380 flag (set in FUN_00423630 heroHurt, after the state!=4 test) or +0x37c > 0): s = sin(PI*t/300) (t=+0x37c ms); L = identity, translate row3 += (0.5*s,0,0) (FUN_004067c0), m0=m5=m10=0.3*s+1 (FUN_00406430), R = copy of L, then FUN_004066a0 (rotation in rows 0/2: row2' = c*row2 + sn*row0, row0' = c*row0 - sn*row2, c/sn = cos/sin(deg*PI/180)) with -30*s on L and +30*s on R; t += dt ms; t > 300 -> t = 0 and flag = 0. The wander branch is NOT run while shaking (else-if); R Eye matrix is written only here and keeps its last value afterwards (never reset; initial = identity: matrix member ctor FUN_00402a00 = FUN_00402a50 identity; initial value = GUESS).
// Wander branch: L Eye matrix = RotY(a deg) then FUN_00403650(b deg); a,b lerp (dt-ms) toward random targets: t=rand[0,1700), a*=rand+-25, b*=5+rand+-17, durations 80+rand[0,80). RNG CONFIRMED stream 1 (FUN_004403a0 for 1700 and 80/80, FUN_00440320 for 25/17; call order t, a, b, da, db = prand0, prand, prand, prand0, prand0).
function eyeWander(ch, ms) {
  const e = ch.eye || (ch.eye = { t: 0, a: 0, b: 0, ta: 0, tb: 0, da: 1, db: 1, i: ch.skl.names.indexOf('L Eye'), ri: ch.skl.names.indexOf('R Eye'), m: new THREE.Matrix4(), mr: new THREE.Matrix4(), hit: 0 });
  const k = Math.PI / 180;
  if (ch.eyeHit || e.hit > 0) { // hit-shake branch (+0x380 / +0x37c)
    const s = Math.sin(e.hit / 300 * Math.PI), L = e.m.elements, R = e.mr.elements;
    L.fill(0); L[0] = L[5] = L[10] = L[15] = 1; L[12] += 0.5 * s; L[0] = L[5] = L[10] = 0.3 * s + 1;
    for (let j = 0; j < 16; j++) R[j] = L[j]; // Matrix4.elements may be a plain Array (no .set)
    const rot = (m, deg) => { const c = Math.cos(deg * k), sn = Math.sin(deg * k); for (let j = 0; j < 4; j++) { const r0 = m[j], r2 = m[8 + j]; m[8 + j] = c * r2 + sn * r0; m[j] = c * r0 - sn * r2; } }; // FUN_004066a0
    rot(L, -s * 30); rot(R, s * 30);
    e.hit += ms; if (e.hit > 300) { e.hit = 0; ch.eyeHit = false; }
    const o = ch.ovr || (ch.ovr = {}); if (e.i >= 0) o[e.i] = e.m; if (e.ri >= 0) o[e.ri] = e.mr;
    return;
  }
  if (e.i < 0) return;
  e.t -= ms;
  if (e.t < 0) { e.t = prand0(1700); e.ta = prand(25); e.tb = prand(17) + 5; e.da = prand0(80) + 80; e.db = prand0(80) + 80; }
  e.a += ((e.ta - e.a) / e.da) * ms; e.b += ((e.tb - e.b) / e.db) * ms;
  const c = Math.cos(e.a * k), sn = Math.sin(e.a * k), c2 = Math.cos(e.b * k), s2 = Math.sin(e.b * k);
  const m = e.m.elements; m.fill(0); m[0] = c; m[2] = -sn; m[5] = 1; m[8] = sn; m[10] = c; m[15] = 1; // FUN_0041beb0 (D3D row layout == three column layout)
  for (let j = 0; j < 4; j++) { const r0 = m[j], r1 = m[4 + j]; m[4 + j] = c2 * r1 - r0 * s2; m[j] = s2 * r1 + c2 * r0; } // FUN_00403650
  (ch.ovr || (ch.ovr = {}))[e.i] = e.m;
}
function loop(t) { requestAnimationFrame(loop); audioUpdate(Math.min(50, t - last), hero.obj && hero.obj.position); if (waterMat) waterMat.update(t); const dt = Math.min(0.05, (t - last) / 1000); last = t; if (menu.pausing) { for (const sp of SPQ.pool) sp.userData.want = !!sp.userData.keep; SPQ.final = true; renderer.render(scene, camera); for (const sp of SPQ.pool) { sp.userData.want = false; sp.visible = false; } SPQ.final = false; return; } /* pause: keep last frame's billboards (leaves/glows) instead of dropping them */ fpsAcc += dt * 1000; fpsN++; if (fpsAcc >= 300) { fpsVal = fpsN * 1000 / fpsAcc; fpsAcc = fpsN = 0; } if (!finished && deathT < 0) levelMs += dt * 1000; replayStep(); joyStep(); if (deathT >= 0 && deathT < 7000) { deathT += dt * 1000; if (deathT >= 7000 && !menu.open) showEndMenu(); } /* FUN_00414e30: end timer, menu at >=7000 */ if (menu.open && !menu.ending) { if (!menu.inGame) menu3d.frame(camera, dt * 1000, menu.scr, curPage()); renderer.render(scene, camera); return; } if (st.hp <= 0 && !wasDead) { wasDead = true; die(); } if (st.hp <= 0 && hero.ch) hero.ch.update(dt); if (st.hp > 0 && !hudApi.paused()) { stepHero(dt); stepEnemies(dt); stepItems(dt); stepBombs(dt); stepExit(dt); stepLasers(dt); } else if (st.hp <= 0 && !hudApi.paused()) { stepEnemies(dt); stepItems(dt); stepBombs(dt); stepLasers(dt); } /* CONFIRMED FUN_00414e30 (per 33 ms tick, no death gate): FUN_00405820 bombs, FUN_0040b470 bullets, FUN_00411710 fire/heat, FUN_0040ac10 enemy loop keep running after death/win (the enemies then see the hero at DAT_0055a7f0 instead of the real hero pos: value = tracked pos, GUESS -> port keeps the death position); only the hero tick FUN_00420030 is the death state machine. Lasers: caller not located (GUESS to keep running) */ stepParticles(dt); (window.__env ||= createEnvSprites({ RT, spriteQ, txt, camera, OBJ, hero, fl, F, enemies, heatAt: (x, y) => { const h = heat.b[heat.c]; return h ? Math.max(0, h[x * G.N + y] | 0) : 0; } }))(dt * 1000); if (heroFx && !hudApi.paused()) heroFx.update(dt * 1000, { invisMs: st.invis * 1000, hp: st.hp, finished, finishMs: (hero.menuT || 0) + (hero.acc || 0) }); drawBullets(dt * 1000); hud(); shadow.update({ hero: hero.obj, enemies: enemies.map((e) => e.o).concat(bombs.map((b) => b.o)), /* bombs cast: FUN_004056f0->FUN_004045c0 draws mesh in shadow mode (CONFIRMED) */ objs: OBJ, extra: items.filter((i) => i.sph && !i.taken).flatMap((i) => i.sph), cell: CELL }); SPQ.final = true; renderer.render(scene, camera); spriteEnd(); drawHudBombs(); }

// ---- tips, gates, bombs ----
async function loadTips(name) {
  const t = await txt('texts/tips.txt');
  let pack = null, lvl = null; const m1 = name.match(/^tutorial(\d+)/), m2 = name.match(/^p(\d+)_l(\d+)/);
  if (m1) { pack = 0; lvl = +m1[1]; } else if (m2) { pack = +m2[1]; lvl = +m2[2]; } else return {};
  const out = {}; let cp = -1, cl = -1, cur = null;
  for (const line of t.split(/\r?\n/)) {
    let m;
    if ((m = line.match(/^\[pack(\d+)\]/))) { cp = +m[1]; cur = null; continue; }
    if ((m = line.match(/^\[level(\d+)\]/))) { cl = +m[1]; cur = null; continue; }
    if ((m = line.match(/^tip(\d+)=(.*)/)) && cp === pack && cl === lvl) { cur = m[1]; out[cur] = m[2].trim(); continue; }
    if (cur && line.trim() && cp === pack && cl === lvl && !/^\[/.test(line)) out[cur] += ' ' + line.trim();
    else if (!line.trim()) cur = null;
  }
  return out;
}
const tipEl = document.createElement('div');
tipEl.style.cssText = 'position:fixed;left:50%;bottom:30px;transform:translateX(-50%);max-width:70%;background:#000c;color:#fff;font:16px sans-serif;padding:14px 18px;border-radius:8px;display:none';
document.body.appendChild(tipEl);
// CONFIRMED FUN_00420740: use-action looks at interactive cells (flag 0x4000: tablets, 'L', 'z') IN FRONT of the hero (hero cell + dir, plus neighbour, 2 layers) -- not a radius.
// GUESS: exact offsets (hero grid port pending); here layers 1..2 ahead, lateral -1..+1.
function frontCells() {
  const p = hero.obj.position, half = G.N * CELL / 2, f = hero.face, fx = Math.sin(f), fz = Math.cos(f);
  const ax = Math.abs(fx) >= Math.abs(fz) ? Math.sign(fx) : 0, az = ax ? 0 : Math.sign(fz);
  const cx = Math.floor((p.x + half) / CELL), cy = Math.floor((p.z + half) / CELL), out = [];
  for (let l = 1; l <= 2; l++) for (let s = -1; s <= 1; s++) out.push([cx + ax * l + az * s, cy + az * l + ax * s]);
  return out;
}
// CONFIRMED FUN_00420740: podskazka.ogg plays each time the hero ENTERS tablet range (flag memset every call), not on Space.
let tabNear = false;
(function tabProbe() { requestAnimationFrame(tabProbe); let n = false; if (hero.obj && st.hp > 0) for (const [x, y] of frontCells()) { const c = objAt0(x, y)?.ch; if (c >= '1' && c <= '9' && c.length === 1) n = true; } if (n && !tabNear) play('podskazka'); tabNear = n; })();
function useAction() {
  if (!hero.obj || st.hp <= 0) return true;
  const cells = frontCells();
  for (const [x, y] of cells) { // tablet 1-9 (CONFIRMED: shows podskazka.ogg + tip text)
    const c = objAt0(x, y)?.ch;
    if (c >= '1' && c <= '9' && c.length === 1) { hudApi.openTablet(G.tips[c] || ''); return true; }
  }
  for (const [x, y] of cells) { // laser: needs a battery (CONFIRMED +0x358 > 0 -> batteries--, FUN_0041dbe0 activates)
    const l = lasers.find((l) => x >= l.x && x <= l.x + 1 && y >= l.y && y <= l.y + 1);
    if (l && !l.active) { if (st.energy > 0) { st.energy--; l.active = true; l.warm = 0; return true; } return false; }
  }
  for (const [x, y] of cells) { // lock 'z'. CONFIRMED FUN_00420740 (type 0x7a branch): needs keys>0 AND the hero on the correct side of the lock (obj rot 180: lockY < heroY; 0: heroY < lockY; 90: lockX < heroX; 270: heroX < lockX), not already open; then keys-- and FUN_0041dbe0 (+0x18a=1, timer starts). No message when it fails (the port's old 'Locked' tip was invented and removed). Only the used lock opens (no neighbour flood).
    const zo = objAt0(x, y); if (!zo || zo.ch !== 'z' || zo.dead) continue;
    if (zo.open !== undefined) return true;
    const half = G.N * CELL / 2, lx = (zo.x + zo.w / 2) * CELL - half, ly = (zo.y + zo.h / 2) * CELL - half, hx = hero.obj.position.x, hy = hero.obj.position.z, r = ((Math.round(zo.rot) % 360) + 360) % 360;
    const side = (r === 180 && ly < hy) || (r === 0 && hy < ly) || (r === 90 && lx < hx) || (r === 270 && hx < lx);
    if (st.keys > 0 && side) { st.keys--; zo.open = 0; } // GUESS: lock world pos (+0x1b4/+0x1b8) taken as the footprint centre
    return true;
  }
  return false;
}
const bombs = [];
// ===== BOMBS / FIRE GRID: ported from the binary (see FORMATS.md "Bombs, fire grid") =====
// Slot == bomb type: 0 normal, 1 radio, 2 grenade. fuse/radius CONFIRMED: placement FUN_00405240 (fuse 0xaf0=2800 / 280000 / 0x578=1400 ms),
// explosion FUN_00405820 -> FUN_00411c30(cx,cy, 6 | 5 | 3). tick-sound constants CONFIRMED FUN_004049f0. Colours/spheres/explosion visuals = GUESS.
const BTYPE = [
  { name: 'BOMB', tint: 0xe6ffe6, tex: 'bomb_sphere0.jpg', tick: 'tickyellow', color: 0xffc020, fuseMs: 2800, radius: 6 },
  { name: 'RADIO', tint: 0xe6e6ff, tex: 'bomb_sphere2.jpg', tick: 'tickblue', color: 0x40a0ff, fuseMs: 280000, radius: 5, tickCd: 2500 },
  { name: 'GRENADE', tint: 0xffe6e6, tex: 'bomb_sphere1.jpg', tick: 'tickred', color: 0xff4020, fuseMs: 1400, radius: 3, tickCd: 725, tickCd0: 220 },
];
const LOGIC_MS = 33; // fixed logic step (timeSetEvent 0x21)
let logicAcc = 0;
st.ammo = [0, 0, 0]; st.sel = 0;
Object.defineProperty(st, 'bombs', { get() { return st.ammo[0]; }, set(v) { st.ammo[0] = v; } });
function cellGeom(col, row, w = 1, h = 1, n = 8) {
  const g = new THREE.PlaneGeometry(1, 1), uv = g.attributes.uv;
  const u0 = col / n, u1 = (col + w) / n, v0 = 1 - (row + h) / n, v1 = 1 - row / n;
  uv.setXY(0, u0, v1); uv.setXY(1, u1, v1); uv.setXY(2, u0, v0); uv.setXY(3, u1, v0); return g;
}
const SPARK = () => cellGeom(7, 7), CRATER = Array.from({ length: 16 }, (_, i) => cellGeom(i % 8, Math.floor(i / 8)));
// ---- fire grid (FUN_00411710 / FUN_00411c30): double-buffered short heat grid, h[x*N+y], x=column y=row ----
const heat = { g: null, b: [null, null], c: 0, N: 0 };
function heatInit() { const N = G.N; heat.g = F.f; heat.N = N; heat.b = [new Int16Array(N * N), new Int16Array(N * N)]; heat.c = 0; }
const heatWall = (x, y) => x < 1 || y < 1 || x >= G.N - 1 || y >= G.N - 1 || (fl(x, y) & 1) !== 0; // CONFIRMED FUN_00411710/00411c30: wall = cell flag 1 (real flag grid)
// ---- explosion visuals (CONFIRMED: flames FUN_00411240 spawn / FUN_004124b0 draw; smoke FUN_0042fbc0; debris emitter FUN_0042feb0 -> FUN_0042fc20 type 2 / FUN_00430490) ----
const cellW = (i) => (i + 0.5) * CELL - G.N * CELL / 2; // ((float)i + 0.5) * 5 - half  (three x, three z)
const FLAME = new Array(1024).fill(null), DEB = new Array(256).fill(null); let flameIdx = 0, debIdx = 0, spriteWhite = null;
function fireSmoke(i, j) { spawnPart(0, cellW(i), 6, cellW(j)); } // FUN_0042fbc0(i,j,0): pos z = 6
function fireDebris(i, j) { // FUN_0042fc20 type 2 (random source = stream 1, CONFIRMED)
  DEB[debIdx] = { life: 1000 + prand(500), x: cellW(i), y: 6, z: cellW(j), vx: prand(0.025), vz: prand(0.02), vy: prand(0.01) + 0.0007, ang: prand(180), av: prand(1), size: prand0(0.5) + 2, sv: -0.0003, br: 1, bv: -0.0008, g: prand(0.001) - 0.004, tm: 30, tp: 30 }; debIdx = (debIdx + 1) & 255;
}
function flameSpawn(i, j, cur) { // FUN_00411240 (cur = heat buffer of this tick)
  const N = G.N, h = (a, b) => cur[a * N + b], sq = (v) => Math.sqrt(Math.max(0, v)) * prand0(1e-4), hv = h(i, j);
  const sUp = sq(h(i, j + 1)), sDn = sq(h(i, j - 1)), sL = sq(h(i - 1, j)), sR = sq(h(i + 1, j));
  // vel(game x,y,z) = (0,0,rand01*0.002-0.004) + (-1,0,0)*s(x+1) + (1,0,0)*s(x-1) + (0,1,0)*s(y-1) + (0,-1,0)*s(y+1)
  FLAME[flameIdx] = { life: 800, ang: prand(100), av: prand(0.03), size: Math.sqrt(0.15 * hv) + 2.2, heat: hv & 255,
    x: cellW(i) + prand(1), z: cellW(j) + prand(1), y: 3, vx: sL - sR, vz: sDn - sUp, vy: prand0(0.002) - 0.004 }; flameIdx = (flameIdx + 1) & 1023;
}
function stepFire(dt) { // flames draw+update (FUN_004124b0), debris emitters update (FUN_00430490 type 2)
  const ms = dt * 1000; glowStep(ms); spriteWhite = spriteWhite || new THREE.Color(1, 1, 1);
  for (const F0 of FLAME) {
    if (!F0 || !(F0.life > 0)) continue;
    const fr = Math.round((1 - F0.life / 800) * 64); // (1 - life/800) * 8 * 8 -> atlas frame, drawn only while < 0x30
    if (fr < 0x30) spriteQ(F0.x, F0.y, F0.z, F0.ang, F0.size * 2, spriteWhite, 0, fr);
    F0.ang += ms * F0.av; F0.x += F0.vx * ms; F0.z += F0.vz * ms; F0.y += F0.vy * ms;
    F0.life -= ms / Math.sqrt(Math.sqrt(F0.heat)); if (F0.life < 0) F0.life = 0; // life -= dt / sqrt(sqrt(heat byte))
  }
  const gk = ms / (1000 / 60); // GUESS: original adds gravity per rendered frame; normalised to 60 fps
  for (const D of DEB) {
    if (!D || !(D.life > 0)) continue;
    D.tm -= ms; D.life -= ms; D.ang += ms * D.av; D.size += ms * D.sv; if (D.size < 0) D.life = 0;
    D.br += ms * D.bv; if (D.br < 0) D.life = 0;
    D.x += D.vx * ms; D.y += D.vy * ms; D.z += D.vz * ms;
    if (D.y < 0) { D.y = 0; D.vy = -D.vy * 0.8; D.av = prand(1); }
    D.vy += D.g * gk;
    if (D.tm < 0) { D.tm += D.tp; spawnPart(1, D.x, D.y, D.z); }
  }
}
const GLOWS = []; // ring of 8 records (0x558420, 0x24 B): pos, elapsed, total 0xc80 ms (FUN_00411c30); quad drawn by FUN_004122b0
function glowAdd(cx, cy) {
  const half = G.N * CELL / 2, m = new THREE.Mesh(new THREE.PlaneGeometry(80, 80), new THREE.MeshBasicMaterial({ map: tex('exploflare.jpg'), transparent: true, depthWrite: false, depthTest: false, blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor, side: THREE.DoubleSide }));
  m.renderOrder = 5; m.rotation.x = -Math.PI / 2; m.position.set(cx * CELL - half, 0.3, cy * CELL - half); // quad +-40 (FUN_004122b0), SRCALPHA/ONE, ZENABLE 0; orientation/height = GUESS (flat on ground)
  XL.position.set(m.position.x, 0, m.position.z); // light #1 position = latest explosion (FUN_004122b0 copies +0x18; height = GUESS)
  scene.add(m); GLOWS.push({ m, t: 0 }); if (GLOWS.length > 8) { const o = GLOWS.shift(); scene.remove(o.m); }
}
const XL = new THREE.PointLight(0xff8000, 0, 70, 1); scene.add(XL); // D3D light #1 FUN_004115e0: POINT diffuse (1,0.5,0), range 70, att0=att2=0, att1=sin(c*pi/2)*0.03 (FUN_004122b0, CONFIRMED); three decay/intensity mapping and att1 floor = GUESS
function glowStep(ms) {
  const last = GLOWS[GLOWS.length - 1]; // light 1 is switched off when the active record expires (FUN_00411710)
  if (last) { const c = Math.min(1, (last.t + ms) / 700), a1 = Math.max(0.003, Math.sin(c * Math.PI / 2) * 0.03); XL.intensity = Math.PI / a1; } else XL.intensity = 0;
  for (let i = GLOWS.length - 1; i >= 0; i--) { const g = GLOWS[i]; g.t += ms; const c = Math.min(1, g.t / 700); // c = min(1, t/700)
    g.m.material.opacity = 1 - c; g.m.material.color.setScalar(1); if (g.t >= 3200) { scene.remove(g.m); GLOWS.splice(i, 1); } } // record dies at 0xc80
}
function injectBlast(cx, cy, r) { // FUN_00411c30 transcribed
  glowAdd(cx, cy);
  if (heat.g !== F.f) heatInit();
  const N = G.N, h = heat.b[heat.c], add = (x, y, v) => { if (x >= 0 && y >= 0 && x < N && y < N) h[x * N + y] += v; };
  const w = (x, y) => (x < 0 || y < 0 || x >= N || y >= N) ? true : heatWall(x, y);
  for (let l = cx - 1; l > cx - r && !w(l, cy); l--) add(l, cy, r + 6 + l - cx);
  for (let l = cx - 1; l > cx - r && !w(l, cy - 1); l--) add(l, cy - 1, r + 6 + l - cx);
  for (let l = cx; l < cx - 1 + r && !w(l, cy); l++) add(l, cy, r + 6 + cx - l);
  for (let l = cx; l < cx - 1 + r && !w(l, cy - 1); l++) add(l, cy - 1, r + 6 + cx - l);
  for (let l = cy - 1; l > cy - r && !w(cx, l); l--) add(cx, l, r + 6 + l - cy);
  for (let l = cy - 1; l > cy - r && !w(cx - 1, l); l--) add(cx - 1, l, r + 6 + l - cy);
  for (let l = cy; l < cy - 1 + r && !w(cx, l); l++) add(cx, l, r + 6 + cy - l);
  for (let l = cy; l < cy - 1 + r && !w(cx - 1, l); l++) add(cx - 1, l, r + 6 + cy - l);
  if (!w(cx - 2, cy - 2)) add(cx - 2, cy - 2, 6 + r);
  if (!w(cx - 2, cy + 1)) add(cx - 2, cy + 1, 6 + r);
  if (!w(cx + 1, cy - 2)) add(cx + 1, cy - 2, 6 + r);
  if (!w(cx + 1, cy + 1)) add(cx + 1, cy + 1, 6 + r);
  fireDebris(cx, cy); fireDebris(cx - 1, cy); fireDebris(cx, cy - 1); fireDebris(cx - 1, cy - 1); // CONFIRMED FUN_00411c30 tail: 4 emitters + extras by radius
  if (r > 3) fireDebris(cx - 1, cy - 1); if (r > 4) fireDebris(cx, cy); if (r > 6) fireDebris(cx - 1, cy); if (r > 8) fireDebris(cx, cy - 1); if (r > 10) fireDebris(cx - 1, cy - 1);
}
const vtx = (p) => [Math.round((p.x + G.N * CELL / 2) / CELL), Math.round((p.z + G.N * CELL / 2) / CELL)]; // object at vertex v covers cells v-1..v (rounding = GUESS)
// CONFIRMED destroy dispatch (object vtables): box (0x48c9bc slot 8) = FUN_0040d160, generic/pickup class = FUN_0041ef40. Both zero the whole footprint's flags and run effects.
// Box also OR-s 0x204 into the cells (bx+1,by),(bx+1,by+1),(bx,by+1) for each linked pickup id (obj +0x1dc/+0x1e0/+0x1e4) and re-registers it as id0 (reveal).
// Generic: if type 0xC1 (barrel) / 0xEF / 0xF0 / 0xF1 (bomb pickups): explode2.ogg + FUN_00411c30(anchorX+1, anchorY+1, 8). 'g' and '|' only zero flags.
function destroyOb(ob) {
  if (!ob || ob.dead) return; ob.dead = true;
  for (let j = 0; j < ob.h; j++) for (let i = 0; i < ob.w; i++) fset(ob.x + i, ob.y + j, 0);
  if (ob.mesh) scene.remove(ob.mesh);
  const it = items.find((q) => q.ob === ob); if (it && !it.taken) { it.taken = true; scene.remove(it.o); if (it.g) scene.remove(it.g); }
  if (ob.ch === '#') { // CONFIRMED FUN_0040d160: smoke FUN_0042fbc0(x,y,0), 2x debris emitter FUN_0042feb0(x,y,2), 1 flame FUN_00411240(x,y) at the anchor cell
    if (heat.g !== F.f) heatInit(); fireSmoke(ob.x, ob.y); fireDebris(ob.x, ob.y); fireDebris(ob.x, ob.y); flameSpawn(ob.x, ob.y, heat.b[heat.c]);
    [[1, 0], [1, 1], [0, 1]].forEach(([dx, dy], i) => { const id = ob.links[i]; if (id > 0) { const x = ob.x + dx, y = ob.y + dy; F.f[y * F.N + x] |= 0x204; F.i0[y * F.N + x] = id; } });
  } else if ('\xc1\xef\xf0\xf1'.includes(ob.ch)) { play('explode2', ob.mesh?.position); injectBlast(ob.x + 1, ob.y + 1, 8); }
}
function heatStep() { // FUN_00411710 transcribed
  if (heat.g !== F.f) heatInit();
  const N = G.N, cur = heat.b[heat.c], nxt = heat.b[1 - heat.c], hot = new Map();
  const s4at = (x, y) => cur[(x - 1) * N + y] + cur[x * N + y - 1] + cur[x * N + y + 1] + cur[(x + 1) * N + y];
  for (let x = 1; x < N - 1; x++) for (let y = 1; y < N - 1; y++) {
    const s4 = s4at(x, y); let v = Math.sqrt(Math.max(0, s4)); if (v < 4) v = 0;
    if (v > 0) hot.set(x * N + y, v);
    if (!heatWall(x, y)) {
      const nv = s4 < 5 ? 0 : Math.trunc((s4 - 1) * 10 / 43), o = nxt[x * N + y];
      if (o < nv && nv !== 0) { flameSpawn(x, y, cur); if (nv > 2 && nv < 20) flameSpawn(x, y, cur); } // CONFIRMED FUN_00411710: flame(s) when value grows
      if (nv === 1) fireSmoke(x, y); // FUN_0042fbc0(x,y,0)
      nxt[x * N + y] = nv;
    }
  }
  { // CONFIRMED FUN_00411710: per cell with value v=sqrt(sum4)>=4: flag 0x10 -> enemy handler (vtable +0x10 of the id in the cell = FUN_0042ccd0 enemyDamage(v)), flag 0x20 -> FUN_00423630(v) on the hero
    // (hp -= v, blood v/4 puffs, herodamage sound w/ 400 ms cooldown), once PER FLAGGED CELL (enemy 2x2 = 4 cells, hero footprint cells = union of the 0x20 flags set in heroTick), not once per entity.
    for (const [k, v] of hot) {
      const x = (k / N) | 0, y = k % N, f = fl(x, y);
      if (f & 0x10) { const e = enemies.find((q) => q.id === F.ie[y * F.N + x] && q.hp > 0); if (e) enemyDamage(e, v); }
      if ((f & 0x20) && hero.obj && st.hp > 0) { heroBlood(v); st.hp = Math.max(0, st.hp - v / HERO_HP); heroHurt(() => rint1(3)); }
    }
  }
  { // CONFIRMED FUN_00411710: cells with s4 > 8 and flag 4 (id0) / 0x80 (id1) add (byte)s4 to the object counter and queue it; then per queued object: touched=1, thr <= counter -> destroy, counter = 0
    const q = [];
    for (let x = 1; x < N - 1; x++) for (let y = 1; y < N - 1; y++) {
      const s4 = s4at(x, y); if (s4 <= 8) continue; const f = fl(x, y);
      const ob = f & 4 ? OBJ[F.i0[y * N + x]] : f & 0x80 ? OBJ[F.i1[y * N + x]] : null;
      if (ob) { ob.cnt = (ob.cnt + (s4 & 255)) & 255; if (!q.includes(ob)) q.push(ob); }
    }
    for (const ob of q) { ob.touched = 1; if (ob.thr <= ob.cnt) destroyOb(ob); ob.cnt = 0; }
  }
  heat.c = 1 - heat.c;
}
// ---- bombs (FUN_00405240 place / FUN_00405820 update / FUN_004049f0 render) ----
const bombCells = (b) => [[b.cx, b.cy], [b.cx - 1, b.cy], [b.cx, b.cy - 1], [b.cx - 1, b.cy - 1]];
async function throwBomb(type = st.sel) {
  if (!hero.obj || st.ammo[type] <= 0 || st.hp <= 0) return;
  if (type === 1) { const r = bombs.find((b) => b.type === 1); if (r) { r.fuseMs = 0; return; } } // FUN_00405240: radio bomb exists -> fuse total = 0 (detonate on next tick)
  const [cx, cy] = vtx(hero.obj.position);
  if (vOr(cx, cy) & 0x40) return; // another bomb's footprint (flag 0x40); exact test of FUN_00405240 = GUESS
  const T = BTYPE[type];
  if (type !== 1) st.ammo[type]--; // radio: decremented on explosion (FUN_00405820, DAT_004dd0dc); decrement point of types 0/2 = GUESS
  const parts = await loadCgo('bomb.cgo'), o = new THREE.Group();
  for (const pt of parts) { const m = new THREE.Mesh(pt.geometry, pt.material.clone()); m.material.map = tex(T.tex); Object.assign(m.material, { color: new THREE.Color(T.tint), side: THREE.BackSide, transparent: true, depthWrite: false, blending: THREE.CustomBlending, blendSrc: THREE.SrcColorFactor, blendDst: THREE.OneFactor }); o.add(m); } // CONFIRMED FUN_004045c0/FUN_004056f0/FUN_00405690: body texture + tint per type (0: sphere0 (230,255,230), 1: sphere2 (230,230,255), 2: sphere1 (255,230,230)); states SRCCOLOR,ONE, cull flipped, zwrite off
  o.scale.setScalar(0.5); // base scale GUESS
  const half = G.N * CELL / 2, f = hero.face;
  const b = { o, type, cx, cy, px: cx * CELL - half, pz: cy * CELL - half, dx: Math.sin(f), dz: Math.cos(f), age: 0, fuseMs: T.fuseMs, heat: 0, tc: T.tickCd0 || 0, el2: 0 };
  o.position.set(b.px, 2, b.pz); scene.add(o); bombs.push(b); vFlagSet(cx, cy, 0x40); // bomb footprint flag 0x40 on the 4 cells of its vertex
}
// HUD bomb spheres (CONFIRMED FUN_00405e70): states 0x13=SRCCOLOR,0x14=ONE,0x16=cull flipped,zwrite off; matrix = scale 8, translate (x,y,45); if selected rotX sin(t/200)*70 deg, rotY sin(t/130)*50 deg
// (FUN_00406580/004066a0); bomb.cgo mesh with bomb_sphere{0,2,1}.jpg tinted like the body; then flare quad 60 (half 30) at z=40, frame (7,7)=63, angle sin(t*0.01)*90 if selected else 0, SRCALPHA,ONE.
// Orthographic UI 800x600 centred, y up (FUN_0043bd00). t = real ms (param_4 source = GUESS), viewport/z-order vs 2D icon = GUESS.
const HB = { scene: new THREE.Scene(), cam: new THREE.OrthographicCamera(-400, 400, 300, -300, -1000, 1000), meshes: null, flares: [] };
async function initHudBombs() {
  const parts = await loadCgo('bomb.cgo'); HB.meshes = [];
  for (let i = 0; i < 3; i++) {
    const T = BTYPE[i], g = new THREE.Group(); g.scale.setScalar(8);
    const pt = parts[0], m = new THREE.Mesh(pt.geometry, pt.material.clone());
    m.material.map = tex(T.tex); Object.assign(m.material, { color: new THREE.Color(T.tint), side: THREE.BackSide, transparent: true, depthWrite: false, depthTest: false, blending: THREE.CustomBlending, blendSrc: THREE.SrcColorFactor, blendDst: THREE.OneFactor }); m.material.needsUpdate = true;
    g.add(m); g.visible = false; m.renderOrder = 1; HB.scene.add(g);
    // CONFIRMED order (FUN_00416dd0 lines per slot): FUN_00436040 icon (iconbomb1 halo) THEN FUN_00405e70 sphere+flare over it -> halo drawn here in GL under the sphere (hud.js no longer draws it in the 2D overlay, which sat above GL)
    const ic = new THREE.Mesh(new THREE.PlaneGeometry(50, 50), new THREE.MeshBasicMaterial({ map: tex('iconbomb1.tga'), transparent: true, depthWrite: false, depthTest: false, side: THREE.DoubleSide })); ic.visible = false; ic.renderOrder = 0; HB.scene.add(ic); (HB.icons || (HB.icons = [])).push(ic);
    const fm = new THREE.Mesh(new THREE.PlaneGeometry(60, 60), new THREE.MeshBasicMaterial({ map: spriteTex(63), transparent: true, depthWrite: false, depthTest: false, blending: THREE.CustomBlending, blendSrc: THREE.SrcAlphaFactor, blendDst: THREE.OneFactor, side: THREE.DoubleSide }));
    fm.visible = false; fm.renderOrder = 2; HB.scene.add(fm); HB.meshes.push(g); HB.flares.push(fm);
  }
}
function drawHudBombs() {
  if (!HB.meshes) { if (!HB.loading) { HB.loading = true; initHudBombs(); } return; }
  const t = performance.now(); let x = -360;
  for (let k = 0; k < 3; k++) HB.meshes[k].visible = HB.flares[k].visible = HB.icons[k].visible = false;
  for (let i = 0; i < 3; i++) { // slot i = ammo index = BTYPE index (0 sphere0, 1 sphere2, 2 sphere1)
    if (!st.ammo[i]) continue; x += 65;
    const g = HB.meshes[i], fl = HB.flares[i], sel = i === st.sel;
    g.position.set(x, -260, 0); g.rotation.set(sel ? Math.sin(t / 200) * 70 * Math.PI / 180 : 0, sel ? Math.sin(t / 130) * 50 * Math.PI / 180 : 0, 0, 'YXZ'); g.visible = true; HB.icons[i].position.set(x, -260, -1); HB.icons[i].visible = true;
    fl.position.set(x, -260, 1); fl.rotation.z = sel ? Math.sin(t * 0.01) * 90 * Math.PI / 180 : 0; fl.visible = true;
  }
  renderer.autoClear = false; renderer.clearDepth(); renderer.render(HB.scene, HB.cam); renderer.autoClear = true;
}
function detonate(type) { for (const b of bombs) if (b.type === type) b.fuseMs = 0; }
function explode(b) {
  fc.shakeFlag = true; // CONFIRMED FUN_00405820 0x405d27: DAT_004d6d0c=1 on bomb explosion -> camera shake (FUN_00415200)
  const T = BTYPE[b.type]; scene.remove(b.o); bombs.splice(bombs.indexOf(b), 1); vFlagClr(b.cx, b.cy, 0x40);
  injectBlast(b.cx, b.cy, T.radius);
  if (b.type === 1) st.ammo[1] = Math.max(0, st.ammo[1] - 1);
  play('explode1', new THREE.Vector3(b.px, 2, b.pz));
}
function logicTick() { // one 33 ms game tick: bombs (FUN_00405820) then fire grid (FUN_00411710) (relative order = GUESS)
  const half = G.N * CELL / 2;
  for (const b of bombs.slice()) {
    let stuck = false;
    if (b.type === 2) { // grenade: 1.5 units / tick along the facing direction (FUN_00406b30/00406b70, vec length 0x3fc00000)
      const nx = b.px + b.dx * 1.5, nz = b.pz + b.dz * 1.5;
      const ncx = Math.round((nx + half) / CELL), ncy = Math.round((nz + half) / CELL);
      b.px = nx; b.pz = nz; if (ncx !== b.cx || ncy !== b.cy) { vFlagClr(b.cx, b.cy, 0x40); b.cx = ncx; b.cy = ncy; vFlagSet(ncx, ncy, 0x40); }
      stuck = (vOr(ncx, ncy) & 0x292) !== 0 || (vAnd(ncx, ncy) & 0x400) !== 0; // CONFIRMED FUN_00405820: move first, then blocked = FUN_0040b070(0x292) (OR of 4 cells, type 2 only) || FUN_0040b0d0(0x400) (AND of 4 cells)
    }
    b.age += LOGIC_MS;
    if (heat.g === F.f) { const N = G.N, h = heat.b[heat.c]; for (const [x, y] of bombCells(b)) b.heat += h[x * N + y]; }
    if (b.fuseMs <= b.age || b.heat > 100 || stuck) explode(b);
  }
  heatStep();
}
function stepBombs(dt) {
  logicAcc += dt * 1000; let n = 0;
  while (logicAcc >= LOGIC_MS && n++ < 10) { logicAcc -= LOGIC_MS; logicTick(); }
  for (const b of bombs) { // render side (FUN_004049f0)
    const T = BTYPE[b.type], ms = dt * 1000, t = b.age / 2800;
    b.o.position.set(b.px, 2, b.pz);
    // CONFIRMED FUN_004049f0: counters +0x11c/+0x120/+0x124 (c1,c2,c3) += 2*ms; FUN_00405240 inits c1=0, c2=c3=rngf(100). The pulse scale (sin(t*4.5pi)*0.3t+0.9) and the proximity xy/z scale are
    // OVERWRITTEN by the final FUN_00406430(1,1,local_48) on the +0xdc matrix (local_48=1 unless the +0xb4 vector != 0: squash = GUESS, not ported), so only the z translation -2k survives. Draw scale 0.9 (FUN_004045c0).
    b.o.scale.setScalar(0.9);
    if (b.type === 2 && (b.dx || b.dz)) { // CONFIRMED FUN_004049f0: render pos = pos + vec(+0xb4)*1.5*frac (DAT_005d7c0c); squash local_48 -> z scale (FUN_004049e0=cos, FUN_004064d0=fabs)
      const fr = logicAcc / LOGIC_MS, c1 = (b.w1 || 0) + 2 * ms; // c1 (+0x11c) is read after += 2*dt
      b.o.position.x += b.dx * 1.5 * fr; b.o.position.z += b.dz * 1.5 * fr;
      let cb = Math.cos(c1 / 2500); if (cb < 0 || c1 / 2500 > Math.PI / 2) cb = 0;
      const l5 = Math.abs(Math.cos(c1 / 220)) * (6 * cb);
      if (l5 < 4.5 && c1 / 1500 < Math.PI / 2) b.o.scale.y = 0.9 * Math.pow(l5 / 4.5, 3); // FUN_00406430(1,1,local_48) on the +0xdc matrix; game z = three y (CONFIRMED stacking: FUN_004045c0 draw matrix = Scale(0.9) * M(+0xdc) in D3D row order, M already holds diag(1,1,local_48) -> total z scale = 0.9*local_48, multiplicative; hero z = 0 CONFIRMED (see below))
    }
    b.el2 += 2 * ms; b.tc -= 2 * ms;
    if (b.w2 === undefined) { b.w2 = rngf(100); b.w3 = rngf(100); }
    b.w1 = (b.w1 || 0) + 2 * ms; b.w2 += 2 * ms; b.w3 += 2 * ms;
    { // hero proximity (CONFIRMED): dist^2 (FUN_004064f0 bomb+0xa8 - hero DAT_004dcdb4, FUN_00406540 = x^2+y^2+z^2) < 24.75 -> +0xcc; ramp +0xd0 0..200 ms (+ms, frame time); k=ramp/200; z translate -2k
      const hp = hero.obj.position, dx = b.px - hp.x, dy = 2 - 0, dz = b.pz - hp.z, near = dx * dx + dy * dy + dz * dz < 24.75; let k = 0; // hero z = 0 CONFIRMED: DAT_004dcdb4 = hero obj (static 0x4dcd90) +0x24; loader FUN_00407890 0x40a40c sets (x,y,0); only movers are dir table DAT_005706f8 (FUN_0042d600, all z=0) and FUN_00403090(x,y,0); FUN_0040ac10 swaps it temporarily on win/death
      if (!b.cc && near) { b.cc = true; b.rp = 0; }
      if (b.cc && !b.cd) { k = b.rp / 200; if (b.rp < 200) b.rp += ms; }
      if (b.cd) { k = b.rp / 200; b.rp -= ms; if (b.rp < 0) b.cd = false; }
      if (b.cc && !near) { b.cd = true; b.cc = false; }
      b.o.position.y = 2 - 2 * k;
    }
    b.o.rotation.set(Math.sin(b.w2 / 400) * 70 * Math.PI / 180, Math.sin(b.w3 / 330) * 50 * Math.PI / 180, 0, 'YXZ'); // rotX sin(c2/400)*70 (FUN_00406580), rotY sin(c3/330)*50 (FUN_004066a0) CONFIRMED
    { const c1 = b.w1, ang = Math.sin(c1 / 190 + c1 / 270) * 90, sz = Math.sin(c1 / 260 + c1 / 250) * 0.7 + 7; spriteQ(b.o.position.x, b.o.position.y, b.o.position.z, ang, sz, T.tint, 0, 63); // CONFIRMED FUN_004045c0: glow sprite frame 0x3f type 0, angle sin(c1/190+c1/270)*90, size sin(c1/260+c1/250)*0.7+7 at the bomb matrix position (tint = GUESS: current colour of FUN_004064a0)
      b.pc = (b.pc || 0) - ms; if (b.pc < 0) { b.pc += b.type === 1 ? 40 : b.type === 2 ? 30 : 75 - c1 / 70; const L = Math.sin(c1 / 2200) * 200 + 100, a = c1 / L; spawnPart(2, b.o.position.x + Math.sin(a) * 3.5, b.o.position.y, b.o.position.z + Math.cos(a) * 3.5); } } // CONFIRMED FUN_004045c0 cadence (+0x12c: type0 75-c1/70, type1 40, type2 30 ms) and particle type 2, offset (sin,cos)*3.5 with a=c1/(sin(c1/2200)*200+100); offset is relative to the bomb = GUESS
    if (b.tc < 0) { play(T.tick, b.o.position); b.tc = b.type === 0 ? 730 - b.el2 / 10 : T.tickCd; } // tick countdowns run at 2x real ms
  }
  stepFire(dt);
}
addEventListener('keydown', (e) => {
  if (e.repeat) return;
  // Original defaults (DirectInput table FUN_0043f600): LCtrl=FIRE, LShift=NEXT WEAPON, Space=USE/KICK, Q/W/E=FAST BOMB 1/2/3, D=DANCE, arrows=move.
  const kb = menu.keys();
  if (e.code === kb[2]) { e.preventDefault(); if (!useAction()) doKick(); }
  if (e.code === kb[0]) throwBomb(); // FIRE (flag 0x20) places the selected slot; with a radio bomb out, FIRE again detonates it (FUN_00405240)
  if (e.code === kb[1]) { e.preventDefault(); const o = [0, 1, 2].filter((t) => st.ammo[t] > 0); const l = o.length ? o : [0, 1, 2]; st.sel = l[(l.indexOf(st.sel) + 1) % l.length]; }
  if (e.code === 'Digit1' || e.code === 'Digit2' || e.code === 'Digit3') { st.sel = +e.code.slice(5) - 1; }
  if (e.code === kb[7]) throwBomb(0); if (e.code === kb[8]) throwBomb(1); // FAST BOMB flags 0x100/0x200/0x400 place slot 0/1/2 directly (FUN_00424380); W (slot 1) conflicts with the port's WASD movement -> not bound
  if (e.code === kb[9]) throwBomb(2);
  if (e.code === kb[10]) doDance(); // original: D (conflicts with my WASD movement)
});

requestAnimationFrame(loop);

// ---- exit & level progression ----
const LEVELS = ['tutorial01', 'tutorial02', 'tutorial03',
  ...[5, 10, 15, 5].flatMap((n, i) => Array.from({ length: n }, (_, k) => `p0${i + 1}_l${String(k + 1).padStart(2, '0')}`))];
const doneEl = document.createElement('div');
doneEl.style.cssText = 'position:fixed;inset:0;display:none;align-items:center;justify-content:center;flex-direction:column;background:#000a;color:#fff;font:32px sans-serif;text-align:center';
document.body.appendChild(doneEl);
let finished = false;
function nextLevelUrl() {
  const i = LEVELS.indexOf(levelName);
  return i >= 0 && i + 1 < LEVELS.length ? '?level=' + LEVELS[i + 1] : null;
}
const allDeadNow = () => enemies.length === 0; // DAT_004d6d15 (FUN_0040ac10: all enemy counts 0); GUESS: dead enemies leave the list after their 1000 ms death state
function stepExit() { // FUN_0040ac10: herohaha.ogg once when allDead rises
  if (!hero.obj) return;
  if (!G.allDead && enemies.length === 0 && G.hadEnemies) { G.allDead = true; play('herohaha'); }
  if (enemies.length) G.hadEnemies = true;
}
function heroEnterExit() { // CONFIRMED FUN_00422fc0(8): speed=1.0, teleport.ogg, mahanie anim, setDir(2), victory flag; FUN_00420650 then keeps vel=0; menu after 7000 ms (heroTick)
  menu.markPassed(q.get('level')); hero.gst = 8; hero.speed = 1; hero.clockT = 0; st.invis = Math.min(st.invis, 0.5); finished = true; play('teleport'); setDir(2); hero.menuT = 0;
}
// CONFIRMED FUN_00413de0: end menus 'victory' / 'defeat' of the shared menu framework (menu.js); the world keeps running behind them.
let deathT = -1;
function showEndMenu() { 
  if (menu.open) return;
  if (demoMode) { demoNext(); return; } // FUN_00414e30 -> FUN_00413fe0: next demo instead of the end menu
  const i = LEVELS.indexOf(levelName); menu.nextLevel = i + 1 < LEVELS.length ? LEVELS[i + 1] : LEVELS.find((n) => n.startsWith(LEVELS[LEVELS.length - 1].slice(0, 4))); // CONFIRMED FUN_0042ab00: idx+1; at the pack end idx=0 and pack+1, except in the LAST pack which wraps to its own level 0 (demo-only wrap of pack index 1 omitted: DEMO_GATE deviation)
  if (!replaying) { try { sessionStorage.setItem('dino_rec', JSON.stringify(rec)); sessionStorage.setItem('dino_win', finished ? '1' : '0'); } catch (e) {} }
  menu.replayEnd = false; menu.end(finished ? 'victory' : 'defeat'); // CONFIRMED FUN_00413de0: with DAT_004d6b05 (victory) / DAT_004d6d0e (death) set it opens 'victory'/'defeat' even during a replay; replaywin/replayloss only come from Esc mid-replay
}

// ---- lasers & mirrors ----
const lasers = [], mirrors = [];
const DIRS = { '>': [1, 0], '<': [-1, 0], '^': [0, -1], 'v': [0, 1] };
const beamPool = [];
function setupLasers() {
  const g = G.grid, N = G.N;
  for (let y = 0; y < N; y++) for (let x = 0; x < N; x++) {
    const c0 = g[y][x];
    if ((c0 === 'L' || c0 === '\xc7') && (g[y][x - 1] === c0 || g[y - 1]?.[x] === c0)) continue;
    if (g[y][x] === 'L') { // CONFIRMED FUN_0041c050: '+' below = initially on (timer 1000), else off until a battery is inserted; digit at below-right = blink id (+0x1e8)
      const d = g[y + 1]?.[x + 1], on = g[y + 1]?.[x] === '+';
      lasers.push({ x, y, dir: DIRS[g[y][x + 1]] || DIRS['^'], active: on, warm: on ? 1000 : 0, id: d >= '1' && d <= '9' ? +d : 0, t: 0, acc: 0, hits: new Map(), segs: [] });
    } else if (g[y][x] === '\xc7') mirrors.push({ x, y, slash: g[y][x + 1] === '/' });
  }
  for (const l of lasers) for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) g[l.y + dy][l.x + dx] = 'L';
  for (const m of mirrors) for (const [dx, dy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) g[m.y + dy][m.x + dx] = '\xc7';
}
function mirrorAt(cx, cy) { return mirrors.find((m) => cx >= m.x && cx <= m.x + 1 && cy >= m.y && cy <= m.y + 1); }
// CONFIRMED (FUN_0041c3c0, real flag grid): the beam walks cell pairs A and B=A+(|dy|,|dx|); FUN_0041c350 clears the previous 0x400 cells, every step ORs 0x400 into A and B (hero reads it: FUN_0040b0d0(...,0x400) -> damage 50).
// Per step: out of grid -> stop; enemy: fA&fB&0x10 && prevA&prevB&0x10 && ie[A]==ie[B] -> stop, enemy takes 3.0/tick; box/barrel (fA&fB&0x80, same id1, +0x188==0): types 0xC1/'#'(0x23) counter+=ticks (destroy when > thr), mirror 0xC7 reflects (slash = rot parity) restarting from the mirror anchor;
// stop if ((fA|fB)&0x800 && mov(A)==mov(B)) || fA&fB&0x800 || (fA&fB&1 && id0A==id0B) || (fA&fB&0x20 && prevA&prevB&0x20).
function clearBeam(l) { if (l.cells) for (const k of l.cells) F.f[k] &= ~0x400; l.cells = []; }
function traceBeam(l, ticks) {
  const N = G.N, half = N * CELL / 2, w = (x, y) => [(x + 0.5) * CELL - half, (y + 0.5) * CELL - half];
  clearBeam(l);
  let ox = l.x, oy = l.y, [dx, dy] = l.dir, n = dx < 1 && dy < 1 ? 0 : 1, bounces = 0, pA = 0, pB = 0;
  const pts = [w(ox + 0.5, oy + 0.5)];
  const ctr = (ax, ay) => w(ax + Math.abs(dy) / 2, ay + Math.abs(dx) / 2);
  for (let i = 0; i < 400; i++) {
    n++;
    const ax = ox + n * dx, ay = oy + n * dy, bx = ax + Math.abs(dy), by = ay + Math.abs(dx);
    if (ax < 0 || ay < 0 || bx < 0 || by < 0 || ax >= N || ay >= N || bx >= N || by >= N) { pts.push(ctr(ax - dx, ay - dy)); break; }
    const kA = ay * N + ax, kB = by * N + bx, fA = F.f[kA], fB = F.f[kB];
    const mo = (fA & fB & 0x80) && F.i1[kA] === F.i1[kB] ? OBJ[F.i1[kA]] : null;
    if (mo && mo.ch === '\xc7' && !mo.moving && bounces < 16) { // mirror (bounce cap = GUESS)
      bounces++; pts.push(w(mo.x + 0.5, mo.y + 0.5)); const slash = mo.rot === 90;
      [dx, dy] = slash ? [-dy, -dx] : [dy, dx]; ox = mo.x; oy = mo.y; n = dx < 1 && dy < 1 ? 0 : 1; pA = pB = 0; continue;
    }
    F.f[kA] |= 0x400; F.f[kB] |= 0x400; l.cells.push(kA, kB);
    if ((fA & fB & 0x10) && (pA & pB & 0x10) && F.ie[kA] === F.ie[kB]) {
      const e = enemies.find((q) => q.id === F.ie[kA]);
      if (e && ticks) { e.hp -= 3.0 * ticks; if (e.hp <= 0) { vFlagClr(e.fx, e.fy, 0x10); scene.remove(e.o); enemies.splice(enemies.indexOf(e), 1); } } // death path shortcut (web's removal) = GUESS
      pts.push(ctr(ax, ay)); return pts;
    }
    if (mo && !mo.moving && (mo.ch === '\xc1' || mo.ch === '#')) { if (ticks) { mo.cnt += ticks; if (mo.thr < mo.cnt) destroyOb(mo); } } // FUN_0041eef0(1): counter += n; thr < counter -> destroy
    const mv = (f) => (f & 0x80) !== 0;
    if ((((fA | fB) & 0x800) && mv(fA) === mv(fB)) || (fA & fB & 0x800) || ((fA & fB & 1) && F.i0[kA] === F.i0[kB]) || ((fA & fB & 0x20) && (pA & pB & 0x20))) { pts.push(ctr(ax, ay)); return pts; }
    pA = fA; pB = fB;
  }
  return pts;
}

// CONFIRMED FUN_0041de40 (type 0x7a update, t = +0x1a8 ms since opening, advanced by the frame ms at the END of each update): sounds when t crosses 2000 / 400 / 0 -> vorota1 / vorota2 / vorota3 at the lock position (FUN_00403950 +0x1b4); t > 2400: cell flags change (middle 2 cells &= 0xe7fc; the two end cells get 0x1803 one row/column to the side where the door swings: rot idx 2 -> y-1, 0 -> y+1, 3 -> x+1, 1 -> x-1); t > 3200: FUN_0040bae0 (removed from the update list only; the object keeps being drawn). Draw FUN_0041e6e0: at t >= 2000 the 4th/5th meshes (padlock, bolt) are no longer drawn.
// GUESS / NOT PORTED: door swing animation of the first three meshes (per-mesh matrices +0x80..0x90 set in the constructor, not decoded), key-insertion animation (t < 2000), sparks FUN_0042e840(type 4, 20 x type 0xe) while 2000 < t <= 2000 + frame.
function stepLocks(ms) {
  for (const o of OBJ) { // CONFIRMED FUN_0041e420 (type 0x7a, called from FUN_0041dc20 every update): shake of the lock meshes while touched; 0x19c=sh (ms), 0x1a4=sh2
    if (!o || o.ch !== 'z' || o.dead || !o.mesh) continue;
    const sh = o.sh || 0; let t = o.open === undefined ? 0 : o.open;
    if (o.touched && sh === 0) { o.sh = 1; o.touched = 0; } else if (o.touched && sh > 0) { o.sh2 = (o.sh2 || 0) + sh; o.sh = 1; o.touched = 0; }
    if (o.sh > 0 && t < 400) {
      let k = (1 - o.sh / 3000) * Math.sin(((o.sh2 || 0) + o.sh) * 0.01); if (o.open !== undefined) k *= (1 - t / 400);
      const ch = o.mesh.children, rotAbout = (c, ang) => { if (!c) return; const pv = c.geometry.userData.pv, P = new THREE.Vector3(pv[0], pv[1], pv[2]); c.rotation.y = ang; c.position.copy(P).sub(P.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), ang)); };
      if (ch[4]) { const pv = ch[4].geometry.userData.pv, a = -THREE.MathUtils.degToRad(30 * k), P = new THREE.Vector3(pv[0], pv[1], pv[2]); ch[4].rotation.z = a; ch[4].position.copy(P).sub(P.clone().applyAxisAngle(new THREE.Vector3(0, 0, 1), a)); } // +0x90 = FUN_0041beb0(30k): rotation about the engine Y axis (three Z), sign mapped for the y/z swap
      rotAbout(ch[1], THREE.MathUtils.degToRad(3 * k)); rotAbout(ch[2], THREE.MathUtils.degToRad(-3 * k)); // +0x84 = Rz(-3k), +0x88 = Rz(+3k) (three rotation.y = -Rz angle)
      if (ch[3]) ch[3].position.set(0, 0, 0.3 * k); // +0x8c = translate(0, 0.3k, 0) engine -> three +z
      o.sh += ms; if (o.sh > 3000) { o.sh = 0; o.sh2 = 0; }
    }
  }
  for (const o of OBJ) {
    if (!o || o.ch !== 'z' || o.open === undefined || o.dead) continue;
    const t = o.open, lp = o.mesh && o.mesh.position;
    if (lp) { if (t >= 2000 && t < ms + 2000) play('vorota1', lp); if (t >= 400 && t < ms + 400) play('vorota2', lp); if (t >= 0 && t < ms) play('vorota3', lp); }
    if (o.mesh && t >= 2000) { if (o.mesh.children[3]) o.mesh.children[3].visible = false; if (o.mesh.children[4]) o.mesh.children[4].visible = false; }
    if (o.mesh) { // CONFIRMED FUN_0041e420 (matrices +0x84/+0x88, mesh1/mesh2 = doorr/doorl): 2000<t<3200 f = (sin(u*PI - PI/2)+1)*0.5, u=(t-2000)/1200; rotZ(-90*f) / rotZ(+90*f); frozen at the last value once t>=3200. Pivot = mesh node origin (GUESS). rotZ(deg) -> three rotation.y = -deg
      const tt = Math.min(t, 3200);
      if (tt > 2000) { const fr = (Math.sin((tt - 2000) / 1200 * Math.PI - Math.PI / 2) + 1) * 0.5;
        [[1, 90], [2, -90]].forEach(([i, deg]) => { const c = o.mesh.children[i]; if (!c) return; const pv = c.geometry.userData.pv, a = THREE.MathUtils.degToRad(deg * fr), P = new THREE.Vector3(pv[0], pv[1], pv[2]); c.rotation.y = a; c.position.copy(P).sub(P.clone().applyAxisAngle(new THREE.Vector3(0, 1, 0), a)); }); }
      // CONFIRMED FUN_0041e6e0: key (global key.cgo model) drawn at bound KEY centre (-1.823,-5.353,3.93): 0<t<400 slides in, y = center.y - (1-f)*4, f=(sin(t/400*PI-PI/2)+1)/2; 400<t<2000 at the centre, rotated 360*f about the lock-local Y axis, f over 1600 ms (rotation sign = GUESS); not drawn otherwise
      if (!o.keyG && !o.keyLoading) { o.keyLoading = true; loadCgo('key.cgo').then((ps) => { const g = new THREE.Group(); for (const p of ps) g.add(new THREE.Mesh(p.geometry, p.material)); g.visible = false; o.mesh.add(g); o.keyG = g; }).catch(() => {}); }
      if (o.keyG) { if (t > 0 && t < 400) { const fk = (Math.sin(t / 400 * Math.PI - Math.PI / 2) + 1) * 0.5; o.keyG.visible = true; o.keyG.rotation.set(0, 0, 0); o.keyG.position.set(-1.823, 3.93, -5.353 - (1 - fk) * 4); }
        else if (t > 400 && t < 2000) { const fk = (Math.sin((t - 400) / 1600 * Math.PI - Math.PI / 2) + 1) * 0.5; o.keyG.visible = true; o.keyG.position.set(-1.823, 3.93, -5.353); o.keyG.rotation.set(0, 0, THREE.MathUtils.degToRad(360 * fk)); }
        else o.keyG.visible = false; }
      if (t > 2000 && t <= ms + 2000) { const sp = o.mesh.localToWorld(new THREE.Vector3(-1.823, 3.93, -5.353)); spawnPart(4, sp.x, sp.y, sp.z); for (let i = 0; i < 20; i++) spawnPart(0xe, sp.x, sp.y, sp.z); } // CONFIRMED FUN_0041de40: FUN_0042e840(KEY centre, 4) + 20 x 0xe while 2000 < t <= 2000 + frame ms
    }
    if (t > 2400) {
      const N = F.N, ri = ((Math.round(o.rot) % 360) + 360) % 360 / 90, f = F.f, c0 = o.x, c4 = o.y;
      const clr = (x, y) => { if (x >= 0 && y >= 0 && x < N && y < N) f[y * N + x] &= 0xe7fc; }, set = (x, y) => { if (x >= 0 && y >= 0 && x < N && y < N) f[y * N + x] |= 0x1803; };
      if (!(ri & 1)) { clr(c0 + 1, c4); clr(c0 + 2, c4); const dy = ri === 2 ? -1 : 1; set(c0, c4 + dy); set(c0 + 3, c4 + dy); }
      else { clr(c0, c4 + 1); clr(c0, c4 + 2); const dx = ri === 3 ? 1 : -1; set(c0 + dx, c4); set(c0 + dx, c4 + 3); }
    }
    o.open = t + ms;
  }
}
// CONFIRMED FUN_0041c100 (laser draw, runs before the generic mesh draw FUN_0041ee50): when active (+0x18a) the first mesh of batareyka.cgo (+0x1dc) is drawn as a spinning battery above the emitter.
// p = min(1, (warm-up ms)/1000); c = p>0.3 ? 1 : p/0.3; q = p<=0.3 ? 0 : (p-0.3)/(1-0.3); spin timer +0x1e4 += frame ms. Matrix (D3D rows): copy of the object matrix (Rz(rot)+centre), post-translate (0,(1-q)*3,4), SET m00=c m11=c m22=0.8c (only the diagonal: the exe overwrites the cos entries, sin entries stay),
// then Rz-style post-rotation by spin*0.2 degrees (FUN_00403650). GUESS: final composition with the later FUN_00403170 (assumed identity), cos/sin identity of FUN_004022c0/4022f0.
function stepBatteries(dt) {
  for (const l of lasers) {
    const ob = OBJ[F.i0[l.y * F.N + l.x]]; if (!ob || ob.ch !== 'L' || !ob.mesh) continue;
    if (!l.bat && !l.batLoading) { l.batLoading = true; loadCgo('batareyka.cgo').then((ps) => { if (!ps[0]) return; l.bat = new THREE.Mesh(ps[0].geometry, ps[0].material); l.bat.matrixAutoUpdate = false; l.bat.frustumCulled = false; scene.add(l.bat); }).catch(() => {}); }
    if (!l.bat) continue;
    l.bat.visible = !!l.active; if (!l.active) continue;
    const pr = Math.min(1, l.warm / 1000), c = pr > 0.3 ? 1 : pr / 0.3, q = pr <= 0.3 ? 0 : (pr - 0.3) / (1 - 0.3);
    l.spin = (l.spin || 0) + dt * 1000;
    const R = THREE.MathUtils.degToRad(ob.rot), cr = Math.cos(R), sr = Math.sin(R), pos = ob.mesh.position;
    let r0 = [cr, sr, 0], r1 = [-sr, cr, 0]; const r2 = [0, 0, 1], t = [pos.x, pos.z, 0]; // engine (x, y, z)
    const ty = (1 - q) * 3; t[0] += ty * r1[0]; t[1] += ty * r1[1]; t[2] += ty * r1[2] + 4;
    r0 = [c, r0[1], r0[2]]; r1 = [r1[0], c, r1[2]]; const r2s = [0, 0, 0.8 * c];
    const A = THREE.MathUtils.degToRad(l.spin * 0.2), ca = Math.cos(A), sa = Math.sin(A);
    const n1 = r1.map((v, i) => ca * v - sa * r0[i]), n0 = r0.map((v, i) => sa * r1[i] + ca * v);
    const m = new THREE.Matrix4().makeBasis(new THREE.Vector3(n0[0], n0[2], n0[1]), new THREE.Vector3(r2s[0], r2s[2], r2s[1]), new THREE.Vector3(n1[0], n1[2], n1[1]));
    m.setPosition(t[0], t[2], t[1]); l.bat.matrix.copy(m); l.bat.matrixWorldNeedsUpdate = true;
  }
}
function stepLasers(dt) { stepLocks(dt * 1000); stepBatteries(dt);
  let k = 0;
  const hp = hero.obj?.position;
  for (const l of lasers) {
    if (!l.active) { clearBeam(l); continue; }
    if (l.warm < 1000) { const was = l.warm; l.warm += dt * 1000; if (was <= 500 && l.warm > 500) play('laservkl', new THREE.Vector3(l.x * CELL - G.N * CELL / 2, 0, l.y * CELL - G.N * CELL / 2)); if (l.warm < 1000) continue; } // CONFIRMED warm-up 1000 ms, laservkl at 500 ms
    l.t += dt * 1000;
    // CONFIRMED asm 0x41c4de-0x41c519 (FUN_0041c3c0): timer +0x1ec += frame ms; if id>0 and (ftol(timer/(id*300)) & 1) != 0 the whole beam (damage, sparks) is skipped this frame
    if (l.id >= 1 && (Math.floor(l.t / (l.id * 300)) & 1) !== 0) continue;
    l.acc += dt; const ticks = Math.floor(l.acc / 0.033); l.acc -= ticks * 0.033; // fixed ~33 ms tick, 3.0 dmg per tick
    const pts = traceBeam(l, ticks);
    // CONFIRMED FUN_0041c3c0 objectspark.ogg, THREE sites each with its own cooldown (33 per visit while >0; else play at that point (height 8.5 = _DAT_0048d834) and re-arm = FUN_004403a0(50) + C, stream 1):
    //  site1 all.c:14187 beam start/emitter, timer +0x1f8, C=150 (_DAT_0048d830); site2 all.c:14373 beam END (non-mirror, with spawn type 0xd), timer +0x1f4, C=150; site3 all.c:14390 MIRROR hit (spawn type 0xc), timer +0x1f0, C=130 (_DAT_0048c44c)
    const spark = (key, e, c) => { if ((l[key] || 0) > 0) l[key] -= 33; else { play('objectspark', new THREE.Vector3(e[0], 8.5, e[1])); l[key] = prand0(50) + c; } };
    for (let tk = 0; tk < ticks && pts.length; tk++) { spark('spk1', pts[0], 150); spark('spk2', pts[pts.length - 1], 150); for (let i = 1; i + 1 < pts.length; i++) spark('spk3', pts[i], 130); }
    for (let i = 0; i + 1 < pts.length; i++) {
      const [ax, az] = pts[i], [bx, bz] = pts[i + 1], len = Math.hypot(bx - ax, bz - az); if (len < 0.01) continue;
      k = addBeamRibbon(k, ax, az, bx, bz, len, l.id); // lightning ribbon, see addBeamRibbon
    }
    if (pts.length > 1) { // CONFIRMED FUN_0041c3c0: end of the beam FUN_0042e840(pos, 0xd) at height 8.5 (_DAT_0048d834); a mirror hit spawns type 0xc (pts[1..n-2] are mirror anchors)
      const e = pts[pts.length - 1]; spawnPart(0xd, e[0], 8.5, e[1]);
      for (let i = 1; i + 1 < pts.length; i++) spawnPart(0xc, pts[i][0], 8.5, pts[i][1]); // GUESS: per-trace (not per grid step) cadence
    }
  }
  finishBeamRibbons(k);
}
// Beam drawing. CONFIRMED structure: FUN_0041c3c0 pushes (start,end) pairs to the list DAT_0053bbb0 (FUN_0040bbc0, max 32); FUN_0040bc40 (called in the frame render FUN_00416450) turns each pair into a jittered polyline by
// FUN_0040bdf0(a, b, step 5.0, 0.3, 1.9, 0.2, ...) (<=99 points, per-point random offset prand(0.2)-scaled, perpendicular axes from FUN_0040c0c0/0e0), stored in the 63-slot buffer DAT_00522bb0 and drawn by FUN_00430eb0 as a strip (FUN_0043c370 prim 5 = triangle strip, FVF 0x112 = pos+diffuse+tex1).
// Colour (FUN_004064a0, alpha 0x96): id==0 -> blue-ish (r small, b 0xff), id>0 -> red-ish (r 0xff); per-vertex random each frame. GUESS: exact random ranges, ribbon plane (horizontal here), width 1.9 (0.3 = ?), texture flare.jpg with additive SRCALPHA/ONE.
const BEAM_Q = 1600, beamGeo = new THREE.BufferGeometry(), beamPosA = new Float32Array(BEAM_Q * 12), beamColA = new Float32Array(BEAM_Q * 16), beamUvA = new Float32Array(BEAM_Q * 8);
beamGeo.setAttribute('position', new THREE.BufferAttribute(beamPosA, 3)); beamGeo.setAttribute('color', new THREE.BufferAttribute(beamColA, 4)); beamGeo.setAttribute('uv', new THREE.BufferAttribute(beamUvA, 2));
{ const ix = []; for (let q = 0; q < BEAM_Q; q++) ix.push(q * 4, q * 4 + 1, q * 4 + 2, q * 4 + 1, q * 4 + 3, q * 4 + 2); beamGeo.setIndex(ix); }
const beamMesh = new THREE.Mesh(beamGeo, new THREE.MeshBasicMaterial({ map: tex('flare.jpg'), vertexColors: true, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide }));
beamMesh.frustumCulled = false; beamMesh.renderOrder = 5; scene.add(beamMesh);
let beamQ = 0;
function addBeamRibbon(k, ax, az, bx, bz, len, id) {
  if (k === 0) beamQ = 0;
  const n = Math.max(1, Math.round(len / 5)), dx = (bx - ax) / len, dz = (bz - az) / len, nx = -dz, nz = dx, HW = 1.9 / 2, pt = [];
  for (let s = 0; s <= n; s++) { const u = s / n, o = s > 0 && s < n ? prand(0.2) * 5 : 0; pt.push([ax + (bx - ax) * u + nx * o, az + (bz - az) * u + nz * o]); }
  for (let s = 0; s < n && beamQ < BEAM_Q; s++, beamQ++) for (let c = 0; c < 4; c++) {
    const v = beamQ * 4 + c, p = pt[s + (c >> 1)], sg = c & 1 ? 1 : -1;
    beamPosA[v * 3] = p[0] + nx * HW * sg; beamPosA[v * 3 + 1] = 8.5; beamPosA[v * 3 + 2] = p[1] + nz * HW * sg;
    beamColA[v * 4] = id === 0 ? prand0(30) / 255 : 1; beamColA[v * 4 + 1] = prand0(80) / 255; beamColA[v * 4 + 2] = id === 0 ? 1 : prand0(255) / 255; beamColA[v * 4 + 3] = 0x96 / 255;
    beamUvA[v * 2] = c >> 1; beamUvA[v * 2 + 1] = c & 1;
  }
  return k + 1;
}
function finishBeamRibbons(k) { if (k === 0) beamQ = 0; beamGeo.setDrawRange(0, beamQ * 6); for (const a of ['position', 'color', 'uv']) beamGeo.attributes[a].needsUpdate = true; beamMesh.visible = beamQ > 0; }

// ---- death / respawn / game over ----
// CONFIRMED: NO lives system in the binary. hp<0 -> death anim (state 4); after 7000 ms the "defeat" menu: "restart level" / "main" (FUN_00413de0). Menu look = GUESS.
let deathShown = false;
function die() {
  const di = rnd(2); hero.state = 'death'; hero.ch.play(hero.deaths[di], false); // CONFIRMED: one of 2 death anims at random (FUN_004405d0)
  if (!deathShown) { // CONFIRMED FUN_00423b10(idx): turn to the nearest neighbouring vertex without flag 2 (scan order +0,+1,-1,+2,-2.. around dir, idx 1 -> base dir+6), then FUN_0042cac0 sets flag 2 on the footprint
    const [vx, vy] = heroV(), ok = [];
    for (let k = 0; k < 8; k++) if ((vOr(vx + DIRI[k][0], vy + DIRI[k][1]) & 2) === 0) ok.push(k);
    if (ok.length) {
      const base = di === 1 ? (hero.dir + 6) & 7 : hero.dir; let r = ok[0];
      loop5: for (let c = 0; c < 5; c++) { for (const t of [(base + c) & 7, (base + 8 - c) & 7]) if (ok.includes(t)) { r = t; break loop5; } }
      setDir(di === 1 ? (r + 6) & 7 : r);
    }
    vFlagSet(vx, vy, 2);
  }
  if (deathShown) return; setTrack(0); // CONFIRMED FUN_00422fc0 state 4: FUN_00434e60(0)
 deathShown = true;
  deathT = 0; hero.speed = 1; hero.clockT = 0; st.invis = Math.min(st.invis, 0.5); // CONFIRMED FUN_00422fc0 state 4: invisibility timer capped to 500 ms, speed 1.0, clock timer 0
}
