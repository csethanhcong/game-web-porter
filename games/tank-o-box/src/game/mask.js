// Mask parsing + Mask::for_each (0x491f80, CONFIRMED FORMATS 'ENGINE: Fire() / Mask::for_each').
// Mask string: groups of '0'/'1' separated by whitespace; w = group length, h = number of groups. idx = row*w + col.
const cache = new Map();
export function parseMask(s) {
  s = String(s === undefined ? '' : s).trim();
  if (cache.has(s)) return cache.get(s);
  const rows = s.split(/\s+/).filter(Boolean);
  const w = rows.length ? rows[0].length : 0, h = rows.length;
  const bits = rows.join('').split('').map((c) => c === '1');
  const m = { w, h, bits, any: bits.some(Boolean) };
  cache.set(s, m); return m;
}
// Rotated box size for direction d (d=1,3 swap).
export const boxW = (m, d) => (d & 1 ? m.h : m.w);
export const boxH = (m, d) => (d & 1 ? m.w : m.h);
// Calls cb(x, y, bit) for cells inside W x H (origin offset ox,oy added). Returns true if cb returned true (stop).
export function forEachMask(m, d, ox, oy, W, H, cb) {
  const Wm = m.w, Hm = m.h;
  for (let idx = 0; idx < m.bits.length; idx++) {
    let x, y;
    const r = Math.floor(idx / Wm), c = idx % Wm;
    if (d === 0) { x = c; y = r; } else if (d === 1) { x = Hm - r - 1; y = c; } else if (d === 2) { x = Wm - c - 1; y = Hm - r - 1; } else if (d === 3) { x = r; y = Wm - c - 1; } else throw new Error('Invalid direction');
    x += ox; y += oy;
    if (x >= 0 && x < W && y >= 0 && y < H) { if (cb(x, y, m.bits[idx])) return true; }
  }
  return false;
}
// Direction deltas: CONFIRMED 0x495100 (dx) / 0x495120 (dy): 0=up(dy -1) 1=right(dx +1) 2=down 3=left.
export const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0];
