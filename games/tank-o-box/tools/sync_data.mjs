// Copy XML data + models_json into public/assets/{xml,models} with LOWERCASE paths (resolver = lowercase, FORMATS.md "XML: quy ước chung").
// Usage: node tools/sync_data.mjs   (idempotent). Không sửa extracted/.
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const XSRC = path.join(root, 'extracted/data/Data'), MSRC = path.join(root, 'extracted/models_json');
const XDST = path.join(root, 'public/assets/xml'), MDST = path.join(root, 'public/assets/models');
const XEXT = new Set(['.scene', '.level', '.object', '.state', '.screen', '.episode', '.anim']);
function* walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) yield* walk(p); else yield p; } }
let nx = 0, nm = 0; const levels = [];
for (const f of walk(XSRC)) {
  const rel = path.relative(XSRC, f).split(path.sep).join('/').toLowerCase();
  if (!XEXT.has(path.extname(rel))) continue;
  fs.mkdirSync(path.dirname(path.join(XDST, rel)), { recursive: true }); fs.copyFileSync(f, path.join(XDST, rel)); nx++;
  if (/^levels\/[^/]+\.level$/.test(rel)) levels.push(path.basename(f, '.level'));
}
for (const f of walk(MSRC)) {
  const rel = path.relative(MSRC, f).split(path.sep).join('/').toLowerCase();
  if (rel === 'index.json' || !/\.(json|bin)$/.test(rel)) continue;
  fs.mkdirSync(path.dirname(path.join(MDST, rel)), { recursive: true }); fs.copyFileSync(f, path.join(MDST, rel)); nm++;
}
levels.sort(); fs.writeFileSync(path.join(XDST, 'levels/index.json'), JSON.stringify(levels));
console.log(`xml ${nx}, model files ${nm}, levels ${levels.length}`);
