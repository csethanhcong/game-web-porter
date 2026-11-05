// Secondary menu screens ported from DinoAndAliens.exe: credits FUN_00426480, monsters/bonuses FUN_00426070, history FUN_00425c60,
// joystick FUN_004271b0, video FUN_00427d80, logo FUN_004187a0, loading FUN_00414200. Drawn through menu.js (env E supplies helpers).
// Items marked GUESS were not recoverable from the decompile (x87 ftol arguments, 3D hero, sparkle particles).
import { txt } from './formats.js';
import { play } from './audio.js';
import * as G from './menugfx.js';
import { wrap } from './font.js';
import { UNLOCK_ALL } from './config.js';

// ---- menutext.txt tagged blocks ([name/] ... [/name], FUN_004295a0) ----
const BLK = {};
export const block = (k) => BLK[k] || '';
txt('texts/menutext.txt').then((t) => {
  const re = /\[([a-z0-9_]+)\/\][ \t]*\r?\n([\s\S]*?)\[\/\1\]/g; let m;
  while ((m = re.exec(t))) BLK[m[1]] = m[2].replace(/\s+$/, '');
  // credits: blank-line separated blocks -> line1/line2 per block (DAT_0055d000 + i*0x80 / +0x40)
  CREDITS = (BLK.credits || '').split(/\r?\n\s*\r?\n/).map((b) => b.split(/\r?\n/).map((s) => s.trim()).filter((s, i, a) => s || a.slice(0, i).some((x) => x))).filter((a) => a.length && a.some(Boolean))
    .map((a) => [a[0] || '', a[1] || '']);
});
let CREDITS = [];
const pages = (pre, n) => Array.from({ length: n }, (_, i) => BLK[pre + (i + 1)] || '');

// ---- state ----
let page = 0, creditT = 0, creditLast = 0;
const COUNT = { history: 3, monsters: 4, bonuses: 9 }; // DAT_0056f310 (blocks present in menutext.txt)
export const curPage = () => page;
export const isInfo = (s) => s === 'history' || s === 'monsters' || s === 'bonuses';
export function enter(s) { page = 0; if (s === 'credits') { creditT = 0; creditLast = 0; } }
const BONUS_SND = ['bomb', 'bomb', 'bomb', 'key1', 'batareyka', 'apple1', 'ananas', 'invisible', 'clock']; // FUN_00424b60 (CONFIRMED)
/** Left/Right (FUN_0042a220): history clamps; monsters/bonuses wrap and play a sound (monsters chpok1, bonuses FUN_00424b60). */
export function step(s, d) {
  const n = COUNT[s]; if (!n) return false;
  if (s === 'history') page = Math.max(0, Math.min(n - 1, page + d));
  else { page = (page + d + n) % n; play(s === 'monsters' ? 'chpok1' : BONUS_SND[page]); }
  return true;
}
const add = (E, id, type, x, y) => { E.G.sprite(type === 6 ? 0xb : 0xc, x, y, 1.4); E.widgets.push({ id, type, rect: [x - 21, y + 21, x + 21, y - 21] }); };

/** Back button shared by the info pages (font 22, panelBtn 60 high). */
function backBtn(E, bx, top, S = 22) {
  const bw = G.tw(E.L('back'), S) + 60, ty = top - 34.5, tx = S * 0.8 + bx + 30;
  G.panelBtn({ x: bx, top: Math.trunc(top), w: Math.trunc(bw), h: 60 });
  if (E.sel() === 0) G.textHi(E.L('back'), tx, ty, S, E.pulse()); else G.text(E.L('back'), tx, ty, S);
  E.regItem(tx - S, S * 0.75 * 1.2 + ty, tx + bw - 60, ty - S * 0.75 * 0.8);
  return bw;
}
function body(text, x, top, w, S) { // FUN_004379e0: wrapped box starting at (x+S/2, top-S/2)
  G.text(wrapText(text, w, S).join('\n'), x + S * 0.5, top - S * 0.5, S);
}
const wrapText = (t, w, S) => wrap(t || '', w, S);

/** History FUN_00425c60 (panel -365..135, top off+230, h 360, S 13; page counter + arrows at y=off-80). */
function drawHistory(E, off) {
  const top = Math.trunc(off) + 230, x = -365, w = 500, h = 360;
  G.panelOrn({ x, top, w, h }, 2);
  add(E, 'pprev', 6, -115 - 90, off - 80); add(E, 'pnext', 7, -115 + 90, off - 80);
  G.text(`${page + 1} / ${COUNT.history}`, -115, off - 80, 17, true);
  body(pages('history', 3)[page], x + 37, top - 42, w - 42, 13);
  const bw = G.tw(E.L('back'), 22) + 60; backBtn(E, x + w - Math.trunc(bw), top - h - 45);
}
/** Monsters/bonuses FUN_00426070 (panel x=50 w=320; monsters top off+230 h 380, bonuses off+200 h 320; S 14). */
function drawMB(E, kind, off) {
  const bon = kind === 'bonuses', top = Math.trunc(off) + 230 - (bon ? 30 : 0), x = 50, w = 320, h = 380 - (bon ? 60 : 0);
  G.panelOrn({ x, top, w, h }, 0);
  const ay = off + (bon ? -70 : -100);
  add(E, 'pprev', 6, 210 - 70, ay); add(E, 'pnext', 7, 210 + 70, ay);
  body(pages(bon ? 'bonus' : 'monster', COUNT[kind])[page], x + 37, top - 42, w - 42, 14);
  backBtn(E, x, top - h - 45); // button x = panel x (local_2c not reassigned); y offset -45 GUESS (same as history)
}
export function drawInfo(E, kind, off) { if (kind === 'history') drawHistory(E, off); else drawMB(E, kind, off); }

/** Credits FUN_00426480: y = t*0.03 - 200 (t = ms, stops at y>=1860); alpha = 200-|y-40|; first 7 blocks yellow(20)/white(23), rest white/yellow. */
export function drawCredits(E, now) {
  const dt = creditLast ? Math.min(100, now - creditLast) : 0; creditLast = now;
  let y = creditT * 0.03 - 200; if (y < 1860) creditT += dt;
  CREDITS.forEach(([a, b], i) => {
    const al = Math.max(0, Math.min(255, Math.trunc(200 - Math.abs(y - 40)))) / 255;
    const Y = [255, 255, 0], Wh = [255, 255, 255];
    if (i < 7) { G.textCol(a, 0, y, 20, true, al, Y); y -= 40; G.textCol(b, 0, y, 23, true, al, Wh); y -= 100; }
    else { G.textCol(a, 0, y, 23, true, al, Wh); y -= 40; G.textCol(b, 0, y, 20, true, al, Y); y -= 100; }
  });
}

// ---- joystick FUN_004271b0 (layout CONFIRMED; no gamepad on web -> inert) ----
const st = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
const sv = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
export function drawJoystick(E, off) {
  const top = Math.trunc(off) + 180; G.panelOrn({ x: -275, top, w: 350, h: 280 }, 0);
  const J = E.joy.ed; // CONFIRMED FUN_004271b0/FUN_0042b160: edit copies DAT_0056bc30 (enable), DAT_0055e248 (sens = slider/30, default 0.5), DAT_0055e254[3] (button idx, -1 = unassigned)
  E.checkbox(-180, top - 60, 'joyen', !!J.en); G.text(E.L('joyenable'), -180 + 40, top - 60, 15);
  G.text(E.L('joysens'), -100, top - 110, 15, true);
  E.slider(-180, -20, top - 135, Math.round(J.sens * 30), 30, 'joysens'); // max 0x1e; value = DAT_0055e248*30
  G.text('-                          +', -100, top - 155, 14, true);
  ['setbomb', 'nextweapon', 'usething'].forEach((k, i) => { // row labels DAT_0056c0a8 (GUESS: first 3 key actions)
    const y = top - 188 - 25 * i, lab = E.L(k);
    G.text(lab, -100 - G.tw(lab, 14), y, 14);
    if (E.joy.wait === i) G.textHi('_', -100 + 28, y, 14, E.pulse()); // waiting for a press: "_" (DAT_0048dd00)
    else G.text(J.btn[i] < 0 ? '????' : `${E.L('joybutton')} ${J.btn[i] + 1}`, -100 + 28, y, 14, false, 0x9b / 255); // "%s %i" (joybutton, idx+1); unassigned (-1) -> "????"
    E.widgets.push({ id: 'jb' + i, type: 3, rect: [-100, y + 14, 20, y - 14] });
  });
}
// ---- video FUN_00427d80 (layout CONFIRMED; resolution/bit-depth are display-only on the web) ----
let bits32 = true;
export function drawVideo(E, off) {
  const top = Math.trunc(off) + 180; G.panelOrn({ x: -275, top, w: 350, h: 300 }, 0);
  G.text(E.L('resolution'), -100, top - 45, 15, true);
  E.slider(-180, -20, top - 70, 0, 2, 'res');
  G.text(`${innerWidth} X ${innerHeight}`, -100, top - 95, 15, true);
  E.checkbox(-200, top - 140, 'bit32', bits32); E.checkbox(-45, top - 140, 'bit16', !bits32);
  G.text(`32 ${E.L('bit')}`, -200 + 40, top - 140, 15); G.text(`16 ${E.L('bit')}`, -45 + 40, top - 140, 15);
  G.text(E.L('gamma'), -100, top - 180, 15, true);
  E.slider(-180, -20, top - 205, st('dino_gamma', 25), 50, 'gamma');
  E.checkbox(-180, top - 255, 'vsync', !!st('dino_vsync', 0)); G.text(E.L('vsync'), -180 + 40, top - 255, 15);
}
/** Widgets owned by these screens; returns true when handled. */
export function widget(E, w) {
  if (w.type === 6) return step(E.scr(), -1) || true;
  if (w.type === 7) return step(E.scr(), 1) || true;
  if (w.id === 'joyen') { E.joy.ed.en = E.joy.ed.en ? 0 : 1; play('menu'); return true; }
  if (w.type === 3 && /^jb\d$/.test(w.id)) { E.joy.wait = E.joy.wait === +w.id[2] ? -1 : +w.id[2]; play('menu'); return true; } // widget click case 3 (menu input handler): DAT_0056e4f0=1 (wait for a joystick button)
  if (w.id === 'bit32' || w.id === 'bit16') { bits32 = w.id === 'bit32'; play('menu'); return true; }
  if (w.id === 'res' || (w.type === 3)) return true;
  return false;
}
export function slide(w, v, E) { if (w.id === 'joysens') { E.joy.ed.sens = v / 30; return true; } return w.id === 'res'; }

// ---- logo FUN_004187a0: timeline 0..4100 ms, then main menu (state 0xd). Projection: fov 45 deg, quads at z=130 ----
const K = 300 / (130 * Math.tan(Math.PI / 8)); // ui px per world unit at z=130 (square pixels assumed: GUESS for non-4:3)
let logoT = 0, logoLast = 0;
export function logoStart() { logoT = 0; logoLast = 0; play('logo'); }
/** returns true when finished */
export function drawLogo(now) {
  logoT += logoLast ? Math.min(100, now - logoLast) : 0; logoLast = now;
  G.fill(-400, 300, 800, 600, 0, 0, 0, 255);
  const a = logoT >= 1800 ? 1 : logoT / 1800; // alpha ramp: ftol arg not recovered (linear GUESS)
  G.image(G.getImg(__B + 'assets/textures/nevologo.jpg'), 0, 10 * K, 25 * K, 25 * K, a);
  G.image(G.getImg(__B + 'assets/textures/nevosoft.jpg'), 0, -20 * K, 30 * K, 30 * K / 4, a);
  // sparkle streaks (additive alpha 8, count from (1-t)*t*4): GUESS omitted
  return logoT > 4100;
}

// ---- loading FUN_00414200: black screen + loading.bmp 204x52 centred, shown until the level is built ----
(function loading() {
  if (typeof document === 'undefined' || !/[?&]level=/.test(location.search)) return;
  const d = document.createElement('div'); d.style.cssText = 'position:fixed;inset:0;background:#000;z-index:40;display:flex;align-items:center;justify-content:center';
  const i = document.createElement('img'); i.src = __B + 'assets/loading.bmp'; i.style.cssText = `width:${(204 / 8).toFixed(2)}vw;height:${(52 / 6).toFixed(2)}vh;image-rendering:auto`;
  d.appendChild(i); document.body.appendChild(d);
  const t = setInterval(() => { if (window.__ready) { clearInterval(t); d.remove(); } }, 50);
})();

// ---- congratulations FUN_00424c10 and demo nags FUN_00425470 (optional; switched by FLAGS, default off like DEMO_GATE) ----
export const FLAGS = { congrat: false, nags: false }; // UNLOCK_ALL: nags are never shown (no caller in main.js; menu 'buynow' gated)
export const NAGS = ['gamenag', 'startmenunag', 'levelpassnag', 'startgamenag', 'gameplaynag', 'endtrialnag', 'congratulationsnag', 'exitgamenag'];
export const isNag = (s) => NAGS.includes(s) || s === 'congratulations';
const NAGBODY = { gamenag: 'gamenagtext', gameplaynag: 'gamenagtext', startmenunag: 'startmenunagtext', congratulationsnag: 'startmenunagtext' }; // others -> levelpassnagtext (DAT_0056f0f8: GUESS)
/** Button row: font 22, panelBtn 60 high (button x/y positions: ftol args not recovered -> GUESS, centred under the panel). */
function btnRow(E, items, top) {
  const S = 22, ws = items.map((k) => G.tw(E.L(k), S) + 60), gap = 20, tot = ws.reduce((a, b) => a + b, 0) + gap * (items.length - 1);
  let bx = -tot / 2;
  items.forEach((k, i) => {
    const bw = ws[i], ty = top - 34.5, tx = S * 0.8 + bx + 30;
    G.panelBtn({ x: Math.trunc(bx), top: Math.trunc(top), w: Math.trunc(bw), h: 60 });
    if (E.sel() === i) G.textHi(E.L(k), tx, ty, S, E.pulse()); else G.text(E.L(k), tx, ty, S);
    E.regItem(tx - S, S * 0.75 * 1.2 + ty, tx + bw - 60, ty - S * 0.75 * 0.8); bx += bw + gap;
  });
}
export function drawNag(E, s, items, off) {
  if (s === 'congratulations') { // panel top off+180 h235 mode 0; title yellow S22, "YOU'VE PASSED" white S19, pack name yellow S22 (w=400 and line steps GUESS)
    const top = Math.trunc(off) + 180, h = 235; G.panelOrn({ x: -200, top, w: 400, h }, 0);
    let y = top - 55; G.textCol(E.L('congratulations'), 0, y, 22, true, 1, [255, 255, 0]);
    const ln = (BLK.congrat_text || '').split(/\r?\n/).map((t) => t.trim()).filter(Boolean);
    y -= 45; G.text(ln[0] || '', 0, y, 19, true); y -= 35; G.textCol(E.packName ? E.packName() : '', 0, y, 22, true, 1, [255, 255, 0]);
    y -= 35; G.text(ln[3] || '', 0, y, 19, true);
    btnRow(E, items, top - h - 53); return;
  }
  const top = Math.trunc(off) + 230, h = 335; G.panelOrn({ x: -250, top, w: 500, h }, 2);
  let y = top - 45; G.textCol(E.L(s === 'endtrialnag' ? 'endtrialnagtitle' : s === 'exitgamenag' ? 'exitnagtitle' : 'gamenagtitle'), 0, y, 20, true, 1, [255, 255, 0]);
  y -= 60; const w = wrap(BLK[NAGBODY[s] || 'levelpassnagtext'] || '', 500 - 84, 14).join('\n'); G.textCol(w, -250 + 42 + 7, y - 7, 14, false, 1, [255, 250, 250]);
  G.textCol(BLK.benefits || '', -190, y - 60, 14, false, 1, [125, 255, 125]); // FUN_00425470: x=cx-190 (DAT_0048c3e0), y=body y-60 (DAT_0048cbe0), DAT_0056d858=benefits; CONFIRMED consts
  btnRow(E, items, top - h - 53);
}
