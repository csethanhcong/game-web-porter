const A = __B + 'assets/';
export const txt = async (p) => new TextDecoder('latin1').decode(await (await fetch(A + p)).arrayBuffer());
export const buf = async (p) => (await fetch(A + p)).arrayBuffer();

export function parseMsh(ab) {
  const dv = new DataView(ab);
  const V = dv.getUint32(29, true), T = dv.getUint32(33, true);
  let o = 37;
  const pos = new Float32Array(V * 3);
  for (let i = 0; i < V * 3; i++, o += 4) pos[i] = dv.getFloat32(o, true);
  const idx = new Int32Array(T * 3);
  for (let i = 0; i < T * 3; i++, o += 4) idx[i] = dv.getInt32(o, true);
  const uv = new Float32Array(T * 6);
  for (let i = 0; i < T * 6; i++, o += 4) uv[i] = dv.getFloat32(o, true);
  return { V, T, pos, idx, uv, smooth: dv.getUint8(3) !== 0, offset: [dv.getFloat32(4, true), dv.getFloat32(8, true), dv.getFloat32(12, true)] };
}

export function parseIni(s) {
  const r = {};
  for (const l of s.split(/\r?\n/)) { const m = l.match(/^\s*([^=\[\];]+?)\s*=\s*(.*?)\s*$/); if (m) r[m[1].toLowerCase()] = m[2]; }
  return r;
}

export function parseLev(s) {
  const i = s.indexOf('map=');
  const head = parseIni(s.slice(0, i));
  const rows = s.slice(i + 4).replace(/^\r?\n/, '').split(/\r?\n/);
  const N = rows[0].length;
  const blank = rows.slice(0, N).findIndex((r) => r.length === 0); // CONFIRMED FUN_00407890: main pass stops at first row whose char0 is CR
  const grid = rows.slice(0, blank >= 0 ? blank : N); while (grid.length < N) grid.push('.'.repeat(N)); // some levels have fewer rows than columns
  for (let i = 0; i < N; i++) if (grid[i].length < N) grid[i] = grid[i].padEnd(N, '.');
  return { head, N, grid };
}
