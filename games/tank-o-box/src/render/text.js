// Text node + font layout. Source of truth: FORMATS.md "ENGINE: luong man / HUD / font" section D (Text::on_change_text 0x4760e0, Letter loader 0x4d4160/0x4d36b0, lookup 0x4d3650).
//   Font header: Width(+0x48) Height(+0x44) Base(+0x4c) Size(+0x50); Letter: Code X Y Width Height(0 => font Height) BaseSkip BaseWidth(0 => Width).
//   unit = (H/Size)/W ; baseY = -1 - Base/Size ; glyphs are built toward -x (x0 = pen + BaseSkip*unit, x1 = x0 - Width*unit, pen -= BaseWidth*unit).
//   Alignment numbering LEFT/CENTER/RIGHT = 0/1/2 and "pen start = 0 | total/2 | total" CONFIRMED structure, name mapping = GUESS G-X08b.
// layoutText() is pure (no THREE, no DOM) so it can be tested under Node.
import * as THREE from 'three';
import { parseXml, attr, num, vec, child, find } from '../loader/xml.js';
import { warn } from '../loader/assets.js';
import { makeMaterial, attachD3DCull } from './material.js';

export const FONT_BASE_URL = 'assets/data/fonts/'; // tools/sync + media-index.fonts: data/fonts/<name>.font -> public/assets/data/fonts/<name>.font

export function parseFont(src) {
  const root = parseXml(src); const f = find(root, 'Font')[0];
  if (!f) throw new Error('no <Font>');
  const font = { W: num(f, 'Width', 512), H: num(f, 'Height', 512), base: num(f, 'Base', 0), size: num(f, 'Size', 70), letters: new Map() };
  for (const l of find(f, 'Letter')) {
    const L = { code: num(l, 'Code', 0), x: num(l, 'X', 0), y: num(l, 'Y', 0), w: num(l, 'Width', 0), h: num(l, 'Height', 0), skip: num(l, 'BaseSkip', 0), adv: num(l, 'BaseWidth', 0) };
    if (!L.h) L.h = font.H;   // Height 0 => font Height (FORMATS D)
    if (!L.adv) L.adv = L.w;  // BaseWidth 0 => letter Width (FORMATS D)
    font.letters.set(L.code, L);
  }
  return font;
}
// CheckLetters 0x476aa0 (CONFIRMED vong 15): char accepted only with its OWN Letter entry (Code == char, Code != 0); no Code-0 fallback (that one is for drawing only).
export function hasLetter(font, code) { const L = font.letters.get(code); return !!L && L.code !== 0; }
export function letterOf(font, code) { return font.letters.get(code) || font.letters.get(0) || null; } // missing code -> Code 0 (0x4d3650)

// -> { pos:Float32Array(n*18? no: 6 verts*3), uv, count, bounds:{x0,x1,y0,y1} }
export function layoutText(font, text, alignment = 'LEFT') {
  const W = font.W, H = font.H, unit = (H / font.size) / W; // FORMATS D: both axes divide by W (asm-confirmed)
  const ls = []; let total = 0;
  for (let i = 0; i < text.length; i++) { const L = letterOf(font, text.charCodeAt(i)); if (L) { ls.push(L); total += L.adv; } }
  total *= unit;
  let pen = alignment === 'CENTER' ? total / 2 : alignment === 'RIGHT' ? total : 0;
  const baseY = -1 - font.base / font.size;
  const pos = new Float32Array(ls.length * 18), uv = new Float32Array(ls.length * 12);
  let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity, k = 0, u = 0;
  for (const L of ls) {
    const x0 = pen + L.skip * unit, x1 = x0 - L.w * unit, y0 = baseY, y1 = baseY + L.h * unit;
    const u0 = (L.x + 0.5) / W, u1 = u0 + (L.w - 1) / W;
    const vb = 1 - (L.y + 0.5) / H - (L.h - 1) / H, vt = vb + (L.h - 1) / H;
    const P = [x0, y0, x0, y1, x1, y0, x1, y0, x0, y1, x1, y1], V = [u0, vb, u0, vt, u1, vb, u1, vb, u0, vt, u1, vt];
    for (let j = 0; j < 6; j++) { pos[k++] = P[j * 2]; pos[k++] = P[j * 2 + 1]; pos[k++] = 0; uv[u++] = V[j * 2]; uv[u++] = V[j * 2 + 1]; }
    if (L.w > 0) { minX = Math.min(minX, x0, x1); maxX = Math.max(maxX, x0, x1); minY = Math.min(minY, y0); maxY = Math.max(maxY, y1); }
    pen -= L.adv * unit;
  }
  if (!ls.length || minX === Infinity) { minX = maxX = minY = maxY = 0; }
  return { pos, uv, count: ls.length * 6, bounds: { x0: minX, x1: maxX, y0: minY, y1: maxY }, total };
}

const fontCache = new Map();
export function loadFont(path) { // 'data/fonts/bc.font' (case-insensitive)
  const name = String(path).trim().replace(/\\/g, '/').toLowerCase().replace(/^data\/fonts\//, '');
  if (!fontCache.has(name)) fontCache.set(name, fetch(FONT_BASE_URL + name).then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status + ' font ' + name); return r.text(); }).then(parseFont));
  return fontCache.get(name);
}

function buildGeometry(lay) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(lay.pos, 3));
  const n = new Float32Array(lay.count * 3); for (let i = 0; i < lay.count; i++) n[i * 3 + 2] = 1; // normal (0,0,1) (FORMATS D)
  g.setAttribute('normal', new THREE.BufferAttribute(n, 3));
  g.setAttribute('uv', new THREE.BufferAttribute(lay.uv, 2));
  g.boundingSphere = null; return g;
}

// c = <Text> XML element, o = Object3D already given TRS by the scene loader, loadTexture = scene.js loadTexture (injected to avoid an import cycle).
// Child shape: <#Shader#><Material Transparency Emissive/><Emissive Image/> (or Diffuse Image)</#Shader#> (same item rules as buildShaderItems: CONFIRMED G-R02/G-R03).
export async function buildText(c, o, loadTexture) {
  const fontPath = attr(c, 'Font'); const T = { str: attr(c, 'Text', ''), alignment: attr(c, 'Alignment', 'LEFT'), font: null, mesh: null, bounds: { x0: 0, x1: 0, y0: 0, y1: 0 } };
  o.userData.text = T;
  const hn = child(c, 'HitNode'); if (hn) T.hit = { position: vec(hn, 'Position', [0, 0, 0]), width: num(hn, 'Width', 0), height: num(hn, 'Height', 0) }; // HitNode semantics CONFIRMED 0x442b80 (used by ui/screens.js Button.hit)
  try { T.font = await loadFont(fontPath); } catch (e) { warn('font failed ' + fontPath + ': ' + e.message); return; }
  const sh = child(c, '#Shader#'); const mat = sh && child(sh, 'Material'); const dEl = sh && child(sh, 'Diffuse'), eEl = sh && child(sh, 'Emissive');
  const transparency = mat ? num(mat, 'Transparency', 0) : 0, emissive = mat ? vec(mat, 'Emissive', [0, 0, 0]) : [0, 0, 0], diffuse = mat ? vec(mat, 'Diffuse', [1, 1, 1]) : [1, 1, 1];
  const imgEl = dEl && dEl.attrs.Image ? dEl : eEl && eEl.attrs.Image ? eEl : null;
  const tex = imgEl ? await loadTexture(attr(imgEl, 'Image')) : null;
  const mode = dEl && dEl.attrs.Image ? 'lit' : 'emissive';
  const m = makeMaterial({ name: 'text', map: tex ? tex.tex : null, diffuse, emissive, transparency, mode, transparent: transparency !== 0, emissiveAlphaMultiply: sh ? attr(sh, 'EmissiveAlphaMultiply') === 'true' : false });
  const mesh = new THREE.Mesh(new THREE.BufferGeometry(), m); mesh.name = '#text'; mesh.frustumCulled = false; attachD3DCull(mesh);
  mesh.userData.draw = { shader: 'text', mode, tris: 0, texture: tex ? tex.url : null, blended: transparency !== 0 };
  o.add(mesh); T.mesh = mesh; T.str = null; setText(o, attr(c, 'Text', ''));
}

// Rebuild the glyph quads (Text::on_change_text). No-op when the string is unchanged.
export function setText(o, str) {
  const T = o.userData.text; if (!T || !T.mesh || !T.font) return false;
  str = String(str === undefined || str === null ? '' : str);
  if (T.str === str) return false; T.str = str;
  const lay = layoutText(T.font, str, T.alignment); T.bounds = lay.bounds;
  T.mesh.geometry.dispose(); T.mesh.geometry = buildGeometry(lay); T.mesh.visible = lay.count > 0; T.mesh.userData.draw.tris = lay.count / 3;
  return true;
}
export function getText(o) { const T = o.userData.text; return T ? T.str : null; }
// Emissive colour override (button states); same factor as makeMaterial (Emissive*0.5).
export function setTextEmissive(o, rgb) {
  const T = o.userData.text; if (!T || !T.mesh) return; const u = T.mesh.material.uniforms.uMatEmissive.value; u.set(rgb[0] * 0.5, rgb[1] * 0.5, rgb[2] * 0.5);
}
