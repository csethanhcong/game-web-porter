// Bitmap font, replicated from DinoAndAliens.exe FUN_00435ab0 (init), FUN_004361b0 (glyph quads),
// FUN_00436450 (centred), FUN_004367b0 (width), FUN_00436800 (word wrap). UI space: ortho 800x600, centre origin, y up.
// Tables are the contents of Data_Demo/font.dat (cell=10, width bytes, glyph-index bytes).
const CELL = 10;
const WB = [44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 13, 12, 20, 30, 22, 44, 30, 9, 16, 16, 24, 32, 10, 22, 10, 22, 24, 16, 24, 22, 25, 22, 22, 21, 25, 24, 12, 10, 30, 29, 30, 20, 32, 24, 24, 24, 25, 21, 20, 25, 25, 12, 20, 26, 18, 34, 26, 24, 24, 25, 26, 22, 20, 25, 24, 36, 24, 24, 24, 21, 26, 21, 21, 33, 9, 21, 21, 18, 22, 20, 13, 20, 21, 10, 12, 21, 9, 32, 20, 20, 21, 21, 13, 17, 13, 21, 20, 30, 20, 20, 18, 25, 12, 24, 26, 44, 44, 44, 24, 44, 28, 36, 22, 20, 44, 29, 44, 10, 44, 44, 44, 44, 44, 25, 32, 13, 16, 32, 12, 9, 44, 18, 44, 9, 44, 44, 44, 44, 28, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 44, 9, 44, 44, 44, 44, 44, 44, 44, 44, 24, 22, 24, 16, 25, 21, 40, 22, 26, 26, 25, 24, 34, 26, 24, 26, 24, 24, 20, 22, 34, 24, 28, 24, 38, 40, 30, 36, 24, 22, 38, 28, 21, 18, 20, 16, 18, 20, 32, 18, 24, 24, 21, 20, 30, 21, 20, 22, 21, 18, 18, 20, 32, 20, 22, 20, 32, 33, 22, 29, 18, 18, 32, 21];
const GI = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 0, 59, 0, 0, 60, 61, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 62, 0, 63, 0, 0, 0, 0, 64, 0, 65, 66, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 67, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131];
const WSCALE = 1.65 / (512 / CELL); // FUN_00435ab0: byte * 1.65 / (512/cell)
export const charW = (c) => WB[c & 255] * WSCALE;
// text width at size S (FUN_004367b0)
export function textWidth(text, S) { let w = 0; for (const ch of text) w += S * charW(ch.charCodeAt(0)); return w; }
// Quads for one text (FUN_004361b0). (x,y)=cursor P, left-aligned; '\n' = line step 1.4*S (original uses CRLF).
// Returns [{x0,y0,x1,y1,u0,v0,u1,v1}] in UI units; quad is centred on cursor, 2S wide, 1.6S high.
export function layout(text, x, y, S, centred = false) {
  const q = []; const lines = text.split(/\r?\n/); let py = y;
  for (const ln of lines) {
    let adv = centred ? S / 2 - textWidth(ln, S) / 2 : 0;
    for (const ch of ln) {
      const c = ch.charCodeAt(0) & 255, gi = GI[c], px = x + adv;
      const col = gi % CELL, row = (gi / CELL) | 0, u0 = col * 0.1 - 0.01, v0 = row * 0.1;
      q.push({ x0: px - S, y0: py + S * 0.8, x1: px + S, y1: py - S * 0.8, u0, v0, u1: u0 + 0.09, v1: v0 + 0.1 });
      adv += S * charW(c);
    }
    py -= 1.4 * S;
  }
  return q;
}
// Draw on a 2D canvas whose context is already scaled so that 800x600 fills it (origin top-left; converts centre/y-up).
export function drawText(ctx, img, text, x, y, S, centred = false) {
  for (const q of layout(text, x, y, S, centred)) {
    ctx.drawImage(img, q.u0 * 512, q.v0 * 512, (q.u1 - q.u0) * 512, (q.v1 - q.v0) * 512,
      q.x0 + 400, 300 - q.y0, q.x1 - q.x0, q.y0 - q.y1);
  }
}
// FUN_00436800 word wrap (maxWidth, S): returns lines; space width = S*charW(' ').
export function wrap(text, maxW, S) {
  const out = []; for (const para of text.split(/\r?\n/)) {
    let line = '', lw = 0; const sp = S * charW(32);
    for (const word of para.split(' ')) { const ww = textWidth(word, S);
      if (line && lw + sp + ww > maxW) { out.push(line); line = word; lw = ww; } else { line = line ? line + ' ' + word : word; lw = line ? textWidth(line, S) : 0; } }
    out.push(line);
  } return out;
}
