// Copies the chiptune3 AudioWorklet files (libopenmpt build) from node_modules to public/assets/audio/ (served as plain files; the worklet imports ./libopenmpt.worklet.js relatively, which a bundler would break).
import fs from 'node:fs'; import path from 'node:path';
const root = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const src = path.join(root, 'node_modules/chiptune3'), dst = path.join(root, 'public/assets/audio');
if (!fs.existsSync(src)) { console.warn('copy_chiptune: node_modules/chiptune3 missing (npm install)'); process.exit(0); }
fs.mkdirSync(dst, { recursive: true });
for (const f of ['chiptune3.worklet.js', 'libopenmpt.worklet.js', 'LICENSE']) fs.copyFileSync(path.join(src, f), path.join(dst, f));
console.log('chiptune3 worklet files ->', path.relative(root, dst));
