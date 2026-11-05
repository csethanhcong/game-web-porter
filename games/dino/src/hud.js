// In-game HUD, replicated from DinoAndAliens.exe FUN_00416dd0 (per-frame 2D overlay, called after the 3D scene is drawn).
// UI space: ortho 800x600 stretched to the window (FUN_0043bd00), origin centre, y up. Text via font.js (FUN_00435c70 = left, FUN_00435ff0 = centred).
// Icon quad FUN_00436040: centred on (x,y), half-size (w,h), UV 0..0.99 (0x3f7fbe77).
// CONFIRMED layout (asm of FUN_00416dd0):
//  hero icon (-360,-245) half 25 + "%i" hp% at (-350,-285) S19 ; bomb slots x=-360+65*k (only slots with ammo!=0) y=-260, count text (x+25,-285) S20 ;
//  centred row y=-260 step 65: key (count>0), battery (count>0), tablet (when facing a tablet), total n -> x0=-(n*65-65)/2 ;
//  4 enemy icons (shorty,sniper,dlinny,bugay) x=185+60*i y=-260, grey tint (158,158,158,a215) when remaining count<1, count text (x+25,-285) S20 ;
//  demo overlay (DAT_0061dea8==0): "DEMO VERSION" (-360,270) S18, "MM:SS" (-360,245) S18, "MIN. LEFT" (-289,245) S18 ;
//  tablet box FUN_00437930/FUN_00437300/FUN_004376d0 ; level intro (DAT_004d6d0d) ; PAUSE text (menutext "pause=") ; message line (FUN_004180c0).
import { TGALoader } from 'three/examples/jsm/loaders/TGALoader.js';
import { drawText, wrap, textWidth } from './font.js';
import { txt } from './formats.js';
import { UNLOCK_ALL } from './config.js';

const A = __B + 'assets/textures/';
const cv = document.createElement('canvas');
cv.style.cssText = 'position:fixed;left:0;top:0;width:100%;height:100%;pointer-events:none;z-index:5';
document.body.appendChild(cv);
const ctx = cv.getContext('2d');
function fit() { const d = devicePixelRatio || 1; cv.width = Math.round(innerWidth * d); cv.height = Math.round(innerHeight * d); }
fit(); addEventListener('resize', fit);

const IMG = {};
async function loadImg(name) {
  const url = A + name;
  if (name.endsWith('.tga')) {
    const r = new TGALoader().parse(await (await fetch(url)).arrayBuffer());
    const c = document.createElement('canvas'); c.width = r.width; c.height = r.height;
    const id = new ImageData(new Uint8ClampedArray(r.data), r.width, r.height);
    c.getContext('2d').putImageData(id, 0, 0);
    if (r.flipY === false) { /* data already top-down */ }
    return c;
  }
  return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = url; });
}
const NAMES = ['font.tga', 'iconhero.tga', 'iconbatareyka.tga', 'iconkey.tga', 'icontablo.tga', 'iconshorty.tga', 'iconsniper.tga', 'icondlinny.tga', 'iconbugay.tga',
  'iconbomb1.tga', 'menutex.tga', 'white.jpg', 'bomb_sphere0.jpg', 'bomb_sphere1.jpg', 'bomb_sphere2.jpg'];
const ready = Promise.all(NAMES.map(async (n) => { IMG[n] = await loadImg(n); })).then(() => true).catch((e) => { console.warn('hud assets', e); return false; });
let okAssets = false; ready.then((v) => { okAssets = v; });
const LBL = {};
txt('texts/menutext.txt').then((t) => { for (const l of t.split(/\r?\n/)) { const m = l.match(/^([\w. ]+?)\s*=\s*(.*)$/); if (m) LBL[m[1].toLowerCase()] = m[2]; } }).catch(() => {});

// ---- tinted copies (vertex colour modulate) ----
const tintCache = new Map();
function tinted(name, r, g, b) {
  const k = name + r + g + b; if (tintCache.has(k)) return tintCache.get(k);
  const s = IMG[name], c = document.createElement('canvas'); c.width = s.width; c.height = s.height;
  const x = c.getContext('2d'); x.drawImage(s, 0, 0); x.globalCompositeOperation = 'multiply'; x.fillStyle = `rgb(${r},${g},${b})`; x.fillRect(0, 0, c.width, c.height);
  x.globalCompositeOperation = 'destination-in'; x.drawImage(s, 0, 0); tintCache.set(k, c); return c;
}

// ---- primitives ----
function icon(img, x, y, hw, hh) { // FUN_00436036: centred quad, UV 0..0.99
  const sw = img.width * 0.99, sh = img.height * 0.99;
  ctx.drawImage(img, 0, 0, sw, sh, x - hw + 400, 300 - (y + hh), hw * 2, hh * 2);
}
const text = (s, x, y, S, centred = false, img = IMG['font.tga']) => drawText(ctx, img, s, x, y, S, centred);

// menutex sprites (FUN_00436b80): [cellx, celly, cw, ch] on a 4x8 grid of 64px; UV inset by 0.005 (FUN_00436a30); drawn size cw*42 x ch*42 centred.
const SPR = { 0: [0, 0, 1, 1], 1: [1, 0, 1, 1], 2: [0, 1, 1, 1], 3: [1, 1, 1, 1], 4: [0, 2, 1, 1], 5: [1, 2, 1, 1], 6: [2, 4, 2, 1], 7: [0, 3, 1, 2], 8: [1, 3, 1, 1.5], 9: [2, 0, 1, 4], 10: [3, 0, 1, 4] };
function sprite(i, cx, cy, sx = 1, sy = 1) {
  const [u, v, w, h] = SPR[i], m = IMG['menutex.tga'], W = m.width, H = m.height;
  const u0 = u / 4 + 0.005, u1 = (u + w) / 4 - 0.005, v0 = v / 8 + 0.005, v1 = (v + h) / 8 - 0.005;
  const dw = w * 42 * sx, dh = h * 42 * sy;
  ctx.drawImage(m, u0 * W, v0 * H, (u1 - u0) * W, (v1 - v0) * H, cx - dw / 2 + 400, 300 - cy - dh / 2, dw, dh);
}
// FUN_004376d0 panel: white.jpg tinted (30,0,0,180) [value from FORMATS.md], corner sprites 0..3 at the rect corners;
// edges FUN_00436fa0 (sprites 4/5): GUESS = sprite stretched between the two corners.
function panel(x, y, w, h) {
  ctx.save(); ctx.fillStyle = 'rgba(30,0,0,' + (180 / 255) + ')'; ctx.fillRect(x + 400, 300 - y, w, h); ctx.restore();
  sprite(4, x + w / 2, y, w / 42, 1); sprite(4, x + w / 2, y - h, w / 42, 1); // GUESS edges
  sprite(5, x, y - h / 2, 1, h / 42); sprite(5, x + w, y - h / 2, 1, h / 42);
  sprite(0, x, y); sprite(1, x + w, y); sprite(2, x, y - h); sprite(3, x + w, y - h);
}
function tabletFrame(x, y, w, h) { // FUN_00437300 (param_2 = 0)
  panel(x, y, w, h);
  sprite(9, w * 0.2 + x, y + 65.1); sprite(10, w * 0.8 + x, y + 65.1); // CONFIRMED positions
  sprite(6, w * 0.8 + x, y - h); sprite(7, x, y - 70); sprite(8, x + w - 8, y - h + 50);
}

// ---- state ----
let T = 0, last = 0;                 // DAT_0055a838 (ms accumulator, +dt per frame)
let pause = false;                   // DAT_004b56d8 toggled by P (FUN_00413f30)
let tabOpen = false, tabAnim = 0, tabText = '';   // DAT_004a4c78, DAT_0055a794, tablet text
let intro = false, introT = 0, introLevel = '', introTitle = '', introStarted = '';  // DAT_004d6d0d, DAT_0055a7a8
let msg = '', msgT = 0;              // DAT_0055a750/DAT_0055a7b8 (FUN_004180c0, 5000 ms)
let justClosed = false;
let demoMs = 0;                      // DAT_0060fe10 (trial time; GUESS: starts at 0 per page load)
export const demoLeftSec = () => Math.max(0, 3600 - Math.trunc(demoMs / 1000)); // FUN_0041af20: 0xe10 - DAT_0060fe10/1000 (clamped at 0)
const lastCnt = [0, 0, 0, 0], pulseT = [0, 0, 0, 0]; // DAT_0055a828 / DAT_0055a818
export const hud = {
  showClock: false,                  // DAT_0060fdf8 (option "showleveltime", default 0)
  paused: () => pause || tabOpen || intro,
  openTablet(t) { if (!tabOpen && !justClosed) { tabOpen = true; tabText = t; } },
  message(s) { msg = s; msgT = 5000; },
};
addEventListener('keydown', (e) => {
  if (e.repeat) return;
  if (intro) { intro = false; return; }                // key during intro: FUN_00420b20 else-branch ends it (and un-pauses)
  if (tabOpen && tabAnim > 375) { tabOpen = false; justClosed = true; setTimeout(() => { justClosed = false; }, 0); return; } // any key once anim > 375 closes (DAT_0055a794 <= 375 test)
  if (e.code === 'KeyP' || e.code === 'Pause') pause = !pause; // key 0x50/0x13 with tablet closed -> FUN_00413f30
});

const pad2 = (n) => String(n).padStart(2, '0');
// s: {hp (0..1), ammo[3], sel, keys, bat, enemies[4], facing:{tablet,lock,laser}, title, level, packIdx, lvlIdx}
let rT = 0;
export function drawHud(s) {
  const now = performance.now(), dt = last ? Math.min(100, now - last) : 0; last = now;
  const d = cv.width / 800, d2 = cv.height / 600;
  ctx.setTransform(d, 0, 0, d2, 0, 0); ctx.clearRect(0, 0, 800, 600);
  if (!okAssets) return;
  if (s.title && introStarted !== s.level) { introStarted = s.level; intro = true; introT = 0; introLevel = s.lvlIdx; introTitle = s.title; } // FUN_00407890 + DAT_004d6d0d=1
  T += dt;
  if (!UNLOCK_ALL && !pause && !tabOpen && !intro) demoMs += dt;
  const F = IMG['font.tga'];
  ctx.globalAlpha = 1;
  // hero hp
  icon(IMG['iconhero.tga'], -360, -260 + 15, 25, 25);
  let hp = s.hp * 100; if (hp < 1 && hp > 0) hp = 1;           // FUN_00416dd0: 0<v<1 -> 1
  text(String(Math.trunc(hp)), -360 + 10, -260 - 25, 19);
  // bomb slots
  let x = -360; const SL = [['bomb_sphere0.jpg', [230, 255, 230]], ['bomb_sphere2.jpg', [230, 230, 255]], ['bomb_sphere1.jpg', [255, 230, 230]]];
  for (let i = 0; i < 3; i++) {
    if (!s.ammo[i]) continue;
    x += 65; // iconbomb1 halo is drawn in GL by main.js drawHudBombs (under the 3D sphere, as in the exe)
    // FUN_00405e70 sphere + flare: 3D, drawn by main.js drawHudBombs() (bomb.cgo scale 8)
    text(String(s.ammo[i]), x + 25, -260 - 25, 20);
  }
  // keys / batteries / tablet row
  const f = s.facing || {}, pulse = () => (Math.sin(T * 0.04) + 1) * 3;
  let n = 0; if (s.keys > 0) n++; if (s.bat > 0) n++; if (f.tablet) n++;
  let rx = n > 0 ? n * 65 - 65 : 0; rx = -rx / 2;
  if (s.keys > 0) { const p = f.lock ? pulse() : 0; icon(IMG['iconkey.tga'], rx, -260, 25 + p, 25 + p); text(String(s.keys), rx + 25, -285, 20); rx += 65; }
  if (s.bat > 0) { const p = f.laser ? pulse() : 0; icon(IMG['iconbatareyka.tga'], rx, -260, 25 + p, 25 + p); text(String(s.bat), rx + 25, -285, 20); rx += 65; }
  if (f.tablet) { const p = tabOpen ? 0 : pulse(); icon(IMG['icontablo.tga'], rx, -260, 25 + p, 25 + p); }
  // remaining enemies per type
  const EI = ['iconshorty.tga', 'iconsniper.tga', 'icondlinny.tga', 'iconbugay.tga'];
  for (let i = 0; i < 4; i++) {
    const c = s.enemies[i], ex = i * 60 + 185; let img = IMG[EI[i]];
    ctx.globalAlpha = 1;
    if (c < 1) { img = tinted(EI[i], 158, 158, 158); ctx.globalAlpha = 215 / 255; }
    if (lastCnt[i] !== c) pulseT[i] = 500;
    let ex2 = 0; const A3 = Math.sin(pulseT[i] / 1000 * Math.PI) * 3;
    if (pulseT[i] > 0) ex2 = Math.sin(pulseT[i] / 5) * A3 + Math.sin(pulseT[i] / 7) * A3;
    icon(img, ex, -260, 25 + ex2, 25 + ex2); ctx.globalAlpha = 1;
    text(String(c), ex + 25, -285, 20);
    lastCnt[i] = c; pulseT[i] = Math.max(0, pulseT[i] - dt);
  }
  // level clock (optional)
  if (hud.showClock && s.levelMs !== undefined) { const ms = s.levelMs, sec = Math.trunc(ms / 1000); text(`${pad2(Math.trunc(sec / 60))}:${pad2(sec % 60)}:${pad2(Math.trunc((ms - sec * 1000) / 10))}`, -360, 210, 20); }
  // FUN_00414030: "%.1f FPS" + "%i TRI" at x=-360, y=215 (165 when the level clock is shown), size 17, TRI 25 lower
  if (s.showFps) { const y = hud.showClock ? 165 : 215; text(`${s.fps.toFixed(1)} FPS`, -360, y, 17); text(`${s.tri} TRI`, -360, y - 25, 17); }
  // demo overlay (DAT_0061dea8 == 0)
  if (!UNLOCK_ALL) {
  text('DEMO VERSION', -360, 270, 18);
  let left = 3600 - Math.trunc(demoMs / 1000); if (left < 0) left = 0;
  text(`${pad2(Math.trunc(left / 60))}:${pad2(left % 60)}`, -360, 245, 18);
  text('MIN. LEFT', -289, 245, 18);
  }
  // CONFIRMED (FUN_00416dd0 @ all.c:11216): DAT_0061dea8 != 0 && DAT_004a4cac == 0 (menu/nag closed) -> FUN_00435c70 (LEFT-aligned, x=360 is the left edge, S = sin(t*0.01)*10+40 via FUN_00415880 = fsin, t = DAT_0055a838 += dt per HUD frame) draws "R" (DAT_0048d320) at (360,230).
  // DAT_0061dea8 = playback flag: set 1 by FUN_0043f5b0 (replay start 0x55970e; also the random-level playback modes exitgamenag/0x55970d/0x559718 in FUN_00413a70), cleared 0 by FUN_0043f500 (normal level start); also gates input playback (FUN_0043fa30 reads recorded mask DAT_0061df38) and the DEMO overlay (drawn only when 0). So 'R' = replay indicator (NOT 'registered').
  rT += dt; if (s.replaying && !pause) text('R', 360, 230, Math.sin(rT * 0.01) * 10 + 40);
  // tablet box: slides in over 750 ms (DAT_0055a794), bounce y = 200 + |cos(2*pi*k)(k-1)^2*400|
  if (tabOpen) tabAnim = tabAnim >= 750 ? 750 : tabAnim + dt; else if (tabAnim > 0) tabAnim -= dt; else tabAnim = 0;
  if (tabOpen || tabAnim > 0) {
    const k = tabAnim / 750, y = 200 + Math.trunc(Math.abs(Math.cos(2 * Math.PI * k) * (k - 1) * (k - 1) * 400));
    const S = 14, w = 400, bx = -200, lines = wrap(tabText, w - 63, S); // FUN_00437930: wrap width w-63
    let hh = 0; for (let i = 0; i < lines.length; i++) hh += i < lines.length - 1 ? 1.4 * S : 0.5 * S;
    const h = Math.trunc(hh) + 84;
    tabletFrame(bx, y, w, h);
    text(lines.join('\n'), S * 0.5 + bx + 42, y - 42 - S * 0.5, S);
  }
  const key = s.level;
  if (intro) { // FUN_00416dd0 level intro: 4000 ms; texts slide with k = t/4000*6.8-3.4, x = prod(k-3..k+3)
    const u = introT / 4000, k = u * 6.8 - 3.4, px = (k + 3) * (k + 2) * (k + 1) * k * (k - 3) * (k - 2) * (k - 1);
    const al = Math.trunc(255 * Math.sin(Math.PI * u)) / 255;
    const pk = LBL['pack' + (s.packIdx + 1)] || '';
    ctx.globalAlpha = Math.max(0, al); text(pk.toUpperCase(), px, 20, 23, true, tinted('font.tga', 155, 155, 255));
    text(`${LBL['level'] || 'LEVEL'} ${s.lvlIdx} : ${introTitle}`.toUpperCase(), -px, -20, 23, true);
    ctx.globalAlpha = 1; introT += dt; if (introT > 4000) intro = false;
  } else if (pause && !tabOpen) { // pause text FUN_00435ff0(0,0, 2*sin(T*0.01)+30)
    text(LBL['pause'] || 'PAUSE', 0, 0, 2 * Math.sin(T * 0.01) + 30, true);
  }
  if (msgT > 0) { const k = msgT / 5000; ctx.globalAlpha = k * k * k; text(msg, -350, -200, 18); ctx.globalAlpha = 1; msgT -= dt; }
  void key; void textWidth; void F;
}
