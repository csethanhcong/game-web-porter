// 2D UI renderer replicating the exe's D3D8 UI layer on a canvas overlay (menu screens).
// UI space = 800x600, centre origin, y up (FUN_0043bd00 ortho); canvas stretched non-uniformly to the window like the exe
// (mouse: x = cx*800/winW - 400, y = 300 - cy*600/winH, FUN_00437d70).
import { drawText, textWidth } from './font.js';

const IMG = {};
const load = (k, src) => new Promise((res) => { const i = new Image(); i.onload = () => { IMG[k] = i; res(); }; i.onerror = res; i.src = src; });
export const ready = Promise.all([load('font', __B + 'assets/textures/font.png'), load('tex', __B + 'assets/textures/menutex.png'),
  load('glow', __B + 'assets/textures/podsvet.jpg'), load('logo', __B + 'assets/textures/menulogo.png')]);
export const cv = document.createElement('canvas');
cv.id = 'menucv';
cv.style.cssText = 'position:fixed;inset:0;width:100vw;height:100vh;display:none;z-index:20;touch-action:none';
document.body.appendChild(cv);
const ctx = cv.getContext('2d');
export function begin() {
  const d = devicePixelRatio || 1, W = (innerWidth * d) | 0, H = (innerHeight * d) | 0;
  if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; }
  ctx.setTransform(cv.width / 800, 0, 0, cv.height / 600, 0, 0);
  ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over'; ctx.clearRect(0, 0, 800, 600);
}
export const toUI = (cx, cy) => ({ x: cx * 800 / innerWidth - 400, y: 300 - cy * 600 / innerHeight });
export const tw = textWidth;
const px = (x) => x + 400, py = (y) => 300 - y;
// FUN_00436b80 sprite table (menutex.tga 4x8 cells of 64px): idx -> [x, y, w, h] cells
const SPR = { 0: [0, 0, 1, 1], 1: [1, 0, 1, 1], 2: [0, 1, 1, 1], 3: [1, 1, 1, 1], 4: [0, 2, 1, 1], 5: [1, 2, 1, 1], 6: [2, 4, 2, 1], 7: [0, 3, 1, 2], 8: [1, 3, 1, 1.5],
  9: [2, 0, 1, 4], 10: [3, 0, 1, 4], 0xb: [0, 7, 1, 1], 0xc: [1, 7, 1, 1], 0xd: [0, 5, 1, 1], 0xe: [0, 6, 1, 1], 0xf: [2, 5, 1, 1], 0x10: [3, 5, 1, 1], 0x11: [1, 6, 1, 1],
  0x12: [1, 5, 1, 1], 0x13: [3, 7, 1, 1], 0x14: [2, 7, 1, 1] };
function src(idx) { // FUN_00436a30
  const [x, y, w, h] = SPR[idx], u0 = x / 4 + 0.005, u1 = (x + w) / 4 - 0.005, v0 = y / 8 + 0.005, v1 = (y + h) / 8 - 0.005;
  return [u0 * 256, v0 * 512, (u1 - u0) * 256, (v1 - v0) * 512];
}
/** FUN_00436e10: quad centred on (x,y), half extent scale*w*42/2 x scale*h*42/2. */
export function sprite(idx, x, y, scale = 1) {
  const [, , w, h] = SPR[idx], hw = scale * w * 21, hh = scale * h * 21, s = src(idx);
  ctx.drawImage(IMG.tex, s[0], s[1], s[2], s[3], px(x) - hw, py(y) - hh, hw * 2, hh * 2);
}
/** FUN_00436fa0 edge: stretched between end points. GUESS: end-point offsets / thickness not fully decoded (thickness scale*42*0.9). */
function edge(idx, x0, y0, x1, y1, scale = 1) {
  const s = src(idx), t = scale * 42 * 0.9;
  if (idx === 5) ctx.drawImage(IMG.tex, s[0], s[1], s[2], s[3], px(x0) - t / 2, py(Math.max(y0, y1)), t, Math.abs(y1 - y0));
  else ctx.drawImage(IMG.tex, s[0], s[1], s[2], s[3], px(Math.min(x0, x1)), py(y0) - t / 2, Math.abs(x1 - x0), t);
}
export const fill = (x, top, w, h, r, g, b, a) => { ctx.fillStyle = `rgba(${r},${g},${b},${a / 255})`; ctx.fillRect(px(x), py(top), w, h); };
/** FUN_004376d0 */
export function panel(r) {
  const { x, top, w, h } = r;
  fill(x, top, w, h, 30, 0, 0, 180);
  edge(4, x, top, x + w, top); edge(4, x, top - h, x + w, top - h); edge(5, x, top, x, top - h); edge(5, x + w, top, x + w, top - h);
  sprite(0, x, top); sprite(1, x + w, top); sprite(2, x, top - h); sprite(3, x + w, top - h);
}
/** FUN_00437300 */
export function panelOrn(r, mode) {
  panel(r); const { x, top, w, h } = r;
  if (mode === 0) { sprite(9, x + w * 0.2, top + 65.1); sprite(10, x + w * 0.8, top + 65.1); sprite(6, x + w * 0.8, top - h); sprite(7, x, top - 70); sprite(8, x + w - 8, top - h + 50); }
  else if (mode === 1) sprite(6, x + w * 0.5, top - h);
  else { sprite(8, x + w - 8, top - h + 50); sprite(8, x - 8, top - 70); sprite(6, x + w * 0.5, top - h); sprite(9, x + w * 0.2, top + 65.1); sprite(10, x + w * 0.8, top + 65.1); }
}
/** FUN_00437230 */
export function panelBtn(r) { panel(r); sprite(7, r.x + r.w * 0.2, r.top + 21); sprite(7, r.x + r.w * 0.8, r.top + 21); }
export function text(s, x, y, S, centred = false, alpha = 1) { ctx.globalAlpha = alpha; drawText(ctx, IMG.font, s, x, y, S, centred); ctx.globalAlpha = 1; }
const tint = document.createElement('canvas'); tint.width = 64; tint.height = 32;
/** FUN_00435e30: text + additive podsvet glow (colour DAT_0056f31c is GUESS). */
export function textHi(s, x, y, S, a = 1, col = [255, 200, 100]) {
  text(s, x, y, S, false, a);
  const l = x + S * 0.2 - S * 3, r = x + S * 0.2 + textWidth(s, S) + S;
  const k = tint.getContext('2d'); k.globalCompositeOperation = 'source-over'; k.clearRect(0, 0, 64, 32); k.drawImage(IMG.glow, 0, 0, 64, 32);
  k.globalCompositeOperation = 'multiply'; k.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`; k.fillRect(0, 0, 64, 32);
  ctx.globalCompositeOperation = 'lighter'; ctx.globalAlpha = a; ctx.drawImage(tint, px(l), py(y + 5 + S), r - l, 2 * S);
  ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
}
export function glow(x0, top, x1, bottom, a) { // FUN_00424a70 widget highlight (255,200,100) additive
  ctx.globalCompositeOperation = 'lighter'; ctx.fillStyle = `rgba(255,200,100,${a})`; ctx.fillRect(px(x0), py(top), x1 - x0, top - bottom);
  ctx.globalCompositeOperation = 'source-over';
}
export function image(im, cx, cy, hw, hh, a = 1) { if (!im) return; ctx.globalAlpha = a; ctx.drawImage(im, px(cx) - hw, py(cy) - hh, hw * 2, hh * 2); ctx.globalAlpha = 1; }
export const logo = () => IMG.logo;
const cache = {};
export function getImg(url) { const c = cache[url]; if (c) return c.ok ? c.i : null; const i = new Image(); cache[url] = { i, ok: false }; i.onload = () => { cache[url].ok = true; }; i.src = url; return null; }
/** FUN_00435c20 colour (r,g,b) applied to text (vertex colour modulates white glyphs): scratch tint pass. */
const sc = document.createElement('canvas'), sx = sc.getContext('2d');
const mk = document.createElement('canvas'), mx = mk.getContext('2d');
export function textCol(s, x, y, S, centred, alpha, col) {
  if (alpha <= 0) return;
  if (sc.width !== cv.width || sc.height !== cv.height) { sc.width = mk.width = cv.width; sc.height = mk.height = cv.height; }
  const T = [cv.width / 800, 0, 0, cv.height / 600, 0, 0];
  sx.setTransform(1, 0, 0, 1, 0, 0); sx.globalCompositeOperation = 'source-over'; sx.clearRect(0, 0, sc.width, sc.height);
  sx.setTransform(...T); drawText(sx, IMG.font, s, x, y, S, centred);           // glyph shading
  mx.setTransform(1, 0, 0, 1, 0, 0); mx.globalCompositeOperation = 'source-over'; mx.clearRect(0, 0, mk.width, mk.height);
  mx.setTransform(...T); drawText(mx, IMG.font, s, x, y, S, centred);           // glyph alpha mask
  sx.setTransform(1, 0, 0, 1, 0, 0); sx.globalCompositeOperation = 'multiply'; sx.fillStyle = `rgb(${col[0]},${col[1]},${col[2]})`; sx.fillRect(0, 0, sc.width, sc.height);
  sx.globalCompositeOperation = 'destination-in'; sx.drawImage(mk, 0, 0);       // single mask pass (per-glyph destination-in erased the rest)
  sx.globalCompositeOperation = 'source-over';
  const m = ctx.getTransform(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = alpha; ctx.drawImage(sc, 0, 0); ctx.globalAlpha = 1; ctx.setTransform(m);
}
