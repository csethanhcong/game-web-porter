// Path resolver + cached fetchers. Original paths are case-insensitive and mix '\' and '/' (FORMATS.md "XML: quy ước chung"),
// so every path is normalised to lowercase '/'; data copied by tools/sync_data.mjs uses the same lowercase layout.
import { parseXml } from './xml.js';

export const BASE = 'assets/';
export const warnings = [];
export function warn(msg) { if (!warnings.includes(msg)) { warnings.push(msg); console.warn('[port]', msg); } }

export function norm(p) {
  p = String(p).trim().replace(/\\/g, '/').replace(/^\.\//, '').toLowerCase();
  return p;
}
// Pending-load tracking (FIX-R1): every async fetch/texture/model registers here; whenIdle() resolves when none are in flight.
const pending = new Set();
export function track(pr) { pending.add(pr); const done = () => pending.delete(pr); pr.then(done, done); return pr; }
export const pendingCount = () => pending.size;
export async function whenIdle() { while (pending.size) await Promise.allSettled([...pending]); }

const noData = (p) => (p.startsWith('data/') ? p.slice(5) : p);

const xmlCache = new Map();
export async function loadXml(path) {
  const key = noData(norm(path));
  if (xmlCache.has(key)) return xmlCache.get(key);
  const pr = fetch(BASE + 'xml/' + key).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status + ' ' + key); return r.text(); }).then(parseXml);
  track(pr); xmlCache.set(key, pr);
  return pr;
}
export async function tryLoadXml(path) { try { return await loadXml(path); } catch (e) { warn('missing xml: ' + path); return null; } }

let mediaIndex = null;
export async function loadMediaIndex() {
  if (!mediaIndex) mediaIndex = track(fetch(BASE + 'media-index.json').then((r) => r.json()));
  return mediaIndex;
}
// Texture refs have no extension (loader tries .bmp/.ppm/.jpg/.gif: FORMATS.md ASSETS); media-index maps lowercase ref -> file.
export async function resolveTextureUrl(ref) {
  const idx = (await loadMediaIndex()).textures;
  const k = norm(ref).replace(/\.(png|jpg|gif|bmp|ppm)$/, '');
  return idx[k] ? BASE + idx[k] : null;
}

const modelCache = new Map();
// returns {positions, normals, uv, triangleCount} (Float32Array, triangle list, no index; D3D left-handed raw data)
export function loadModel(path) {
  const key = noData(norm(path)).replace(/\.model$/, '');
  if (modelCache.has(key)) return modelCache.get(key);
  const pr = (async () => {
    const jr = await fetch(BASE + 'models/' + key + '.json'); if (!jr.ok) throw new Error('model json ' + key);
    const meta = await jr.json();
    const br = await fetch(BASE + 'models/' + key + '.bin'); if (!br.ok) throw new Error('model bin ' + key);
    const buf = await br.arrayBuffer();
    const L = meta.layout, f = (b) => new Float32Array(buf, b.offset, b.count);
    return { positions: f(L.positions), normals: f(L.normals), uv: f(L.uv0), triangleCount: meta.triangleCount };
  })();
  track(pr); modelCache.set(key, pr);
  return pr;
}
