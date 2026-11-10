#!/usr/bin/env node
// Extract all .model (liba::lib3d::model::Model, loader FUN_0047edc0 / Float decoder FUN_00480a60) to JSON + .bin.
// Usage: node tools/extract_models.mjs [dataDir=extracted/data/Data] [outDir=extracted/models_json]
// File format (see FORMATS.md "MODEL (.model)"):
//   '<?xml version="1.0"?>\n<?v1?>\n\n<Model>\n' then blocks  '\t<Float Name="N" Type="Float">' ';' f32LE*k '</Float>\n' ... '</Model>\n'
// Non-indexed triangle list: Positions 9 floats/tri, Normals same count, UV0 6 floats/tri.
// Scene cross-check: sum of Shader TrianglesCount of an element whose Source=*.model must equal tri count.
import fs from 'node:fs';
import path from 'node:path';

const dataDir = path.resolve(process.argv[2] || 'extracted/data/Data');
const outDir = path.resolve(process.argv[3] || 'extracted/models_json');

function walk(d, ext, o = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p, ext, o); else if (p.toLowerCase().endsWith(ext)) o.push(p);
  }
  return o;
}

export function parseModel(buf) {
  const HEAD = '<?xml version="1.0"?>\n<?v1?>\n\n<Model>\n';
  if (buf.latin1Slice(0, HEAD.length) !== HEAD) throw new Error('bad header');
  const blocks = {};
  let pos = HEAD.length;
  const TAIL = '</Model>';
  for (;;) {
    while (buf[pos] === 0x09 || buf[pos] === 0x0a || buf[pos] === 0x0d || buf[pos] === 0x20) pos++;
    if (buf.latin1Slice(pos, pos + TAIL.length) === TAIL) break;
    const m = /^<(Float|Short|Char) Name="([\w-]+)" Type="(\w+)">/.exec(buf.latin1Slice(pos, pos + 80));
    if (!m) throw new Error('bad block at ' + pos);
    if (m[1] !== m[3]) throw new Error('tag/type mismatch');
    pos += m[0].length;
    if (buf[pos] !== 0x3b) throw new Error('missing ; at ' + pos); // loader: "Semicolon nor found at the start of data"
    pos++;
    const end = buf.indexOf('</' + m[1] + '>', pos, 'latin1');
    if (end < 0) throw new Error('no closing tag');
    const n = end - pos;
    if (m[1] !== 'Float') throw new Error('unsupported type ' + m[1]);
    if (n % 4) throw new Error('float block size % 4'); // loader FUN_00480a60: (size & 3) != 0 -> reject
    const f = new Float32Array(n / 4);
    new Uint8Array(f.buffer).set(buf.subarray(pos, end)); // little endian host assumed
    blocks[m[2]] = f;
    pos = end + m[1].length + 3;
  }
  return blocks;
}

// ---- scenes: Source -> triangle counts ----
const sceneTri = new Map(); // normalized source path -> Set of totals
for (const sf of walk(dataDir, '.scene')) {
  const s = fs.readFileSync(sf, 'latin1');
  // elements may be nested without closing, so take the <#Shaders#> block directly following the element's start tag
  const re = /<(\w+)\s[^>]*?Source="([^"]+\.model)"[^>]*>\s*<#Shaders#>([\s\S]*?)<\/#Shaders#>/gi;
  let m;
  while ((m = re.exec(s))) {
    let tot = 0, any = false;
    for (const t of m[3].matchAll(/<Shader\b[^>]*TrianglesCount="(\d+)"/g)) { tot += +t[1]; any = true; }
    if (!any) continue;
    const key = m[2].toLowerCase().replace(/^data\//, '');
    if (!sceneTri.has(key)) sceneTri.set(key, []);
    sceneTri.get(key).push({ scene: path.relative(dataDir, sf), total: tot, shaders: [...m[3].matchAll(/<Shader\b[^>]*TrianglesCount="(\d+)"/g)].map(t => +t[1]) });
  }
}

fs.mkdirSync(outDir, { recursive: true });
const index = [];
let ok = 0, fail = 0, matched = 0, mismatched = 0, noscene = 0;
for (const f of walk(dataDir, '.model').sort()) {
  const rel = path.relative(dataDir, f).split(path.sep).join('/');
  const key = rel.toLowerCase();
  try {
    const b = parseModel(fs.readFileSync(f));
    const P = b.Positions, N = b.Normals, U = b.UV0, UT = b['U-Tangents'], VT = b['V-Tangents'];
    if (!P || !N || !U || !UT || !VT) throw new Error('missing Positions/Normals/UV0/U-Tangents/V-Tangents');
    if (P.length % 9) throw new Error('positions->size() % 9 != 0');
    if (N.length !== P.length) throw new Error('normals->size() != positions->size()');
    const nv = P.length / 3, tri = nv / 3;
    if (U.length !== nv * 2) throw new Error('UV0 size != 2*vertices');
    if (UT.length !== P.length || VT.length !== P.length) throw new Error('tangent size != positions size');
    const bmin = [1e30, 1e30, 1e30], bmax = [-1e30, -1e30, -1e30];
    for (let i = 0; i < P.length; i++) { const a = i % 3; if (P[i] < bmin[a]) bmin[a] = P[i]; if (P[i] > bmax[a]) bmax[a] = P[i]; }
    const outBin = rel.replace(/\.model$/i, '.bin');
    fs.mkdirSync(path.dirname(path.join(outDir, outBin)), { recursive: true });
    // .bin = Positions | Normals | UV0 | U-Tangents | V-Tangents as raw f32 LE, in this order
    fs.writeFileSync(path.join(outDir, outBin), Buffer.concat([P, N, U, UT, VT].map(a => Buffer.from(a.buffer, a.byteOffset, a.byteLength))));
    const sc = sceneTri.get(key) || [];
    let check = 'no-scene';
    if (sc.length) check = sc.every(x => x.total === tri) ? 'match' : 'MISMATCH';
    if (check === 'match') matched++; else if (check === 'MISMATCH') mismatched++; else noscene++;
    const meta = { source: rel, vertexCount: nv, triangleCount: tri, blockOrder: Object.keys(b), bounds: { min: bmin, max: bmax },
      bin: outBin, layout: { positions: { offset: 0, count: P.length }, normals: { offset: P.length * 4, count: N.length }, uv0: { offset: (P.length + N.length) * 4, count: U.length },
      uTangents: { offset: (P.length + N.length + U.length) * 4, count: UT.length }, vTangents: { offset: (P.length + N.length + U.length + UT.length) * 4, count: VT.length } },
      sceneCheck: check, scenes: sc.map(x => ({ scene: x.scene, shaderTriangles: x.shaders })) };
    fs.writeFileSync(path.join(outDir, rel.replace(/\.model$/i, '.json')), JSON.stringify(meta));
    index.push({ source: rel, vertices: nv, triangles: tri, sceneCheck: check });
    ok++;
  } catch (e) { fail++; index.push({ source: rel, error: String(e.message) }); console.error('FAIL', rel, e.message); }
}
fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 1));
console.log(JSON.stringify({ ok, fail, sceneMatch: matched, sceneMismatch: mismatched, noScene: noscene }));
