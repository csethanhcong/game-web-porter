// .level loader: template chain (G-X03 GUESS: templates applied in listed order, later/own overrides earlier) + Level grid + objects.
// World position: CONFIRMED 0x493a40: out = Origin + VectorX*(x + w*0.5 - dx*progress) + VectorY*(y + h*0.5 - dy*progress); progress=0 for static.
// Direction d: 0=up,1=right,2=down,3=left (0x495100/0x495120).
import * as THREE from 'three';
import { attr, attrList, num, vec, child, childrenOf, find } from './xml.js';
import { loadXml, tryLoadXml, warn } from './assets.js';
import { loadScene } from './scene.js';
import { applyAnimT0 } from './anim.js';

const TOP = (xml) => xml.children[0];

// Merge a template chain. Returns {modelName, interfaceModelName, interfaceAnimationName, animationName, music, properties:{}, controls:[], level}
export async function loadLevelData(path) {
  const d = await loadLevelRaw(path, []);
  if (d.level) { // defaults applied once after the whole chain is merged (absent attrs must not override a template's value)
    const l = d.level;
    l.cornerNode = l.cornerNode ?? 'Corner'; l.vectorX = l.vectorX ?? [-1, 0, 0]; l.vectorY = l.vectorY ?? [0, 0, 1]; l.width = l.width ?? 45; l.height = l.height ?? 45;
  }
  return d;
}
async function loadLevelRaw(path, seen) {
  const key = path.toLowerCase().replace(/\\/g, '/');
  if (seen.includes(key)) { warn('template cycle ' + key); return {}; }
  const xml = await loadXml(path); const el = TOP(xml);
  let out = { properties: {}, controls: [], level: null };
  for (const t of attrList(el, 'TemplateName')) {
    const base = await loadLevelRaw(t, [...seen, key]);
    out = mergeLevel(out, base);
  }
  const own = {
    modelName: attr(el, 'ModelName'), interfaceModelName: attr(el, 'InterfaceModelName'), interfaceAnimationName: attr(el, 'InterfaceAnimationName'),
    animationName: attr(el, 'AnimationName'), music: attr(el, 'Music'), properties: {}, controls: [], level: null,
  };
  const props = child(el, 'Properties'); if (props) for (const p of childrenOf(props, 'Property')) own.properties[attr(p, 'Name')] = attr(p, 'Value');
  const ctl = child(el, 'Controls'); if (ctl) own.controls = ctl.children.map((c) => ({ tag: c.tag, ...c.attrs }));
  const lv = child(el, 'Level');
  if (lv) {
    own.level = {
      cornerNode: attr(lv, 'CornerNode'), vectorX: vec(lv, 'VectorX', undefined), vectorY: vec(lv, 'VectorY', undefined),
      width: num(lv, 'Width', undefined), height: num(lv, 'Height', undefined),
      objects: childrenOf(lv, 'Object').map((o) => { const p = child(o, 'Position'); return { template: attr(o, 'TemplateName'), x: num(p, 'X', 0), y: num(p, 'Y', 0), dir: parseInt(String(attr(p, 'Direction', '0')).trim().split(/\s+/)[0], 10) || 0 }; }),
      offField: childrenOf(lv, 'OffFieldObject').map((o) => attr(o, 'TemplateName')),
    };
  }
  return mergeLevel(out, own);
}
function mergeLevel(a, b) {
  const r = { ...a };
  for (const k of ['modelName', 'interfaceModelName', 'interfaceAnimationName', 'animationName', 'music']) if (b[k] !== undefined && b[k] !== null) r[k] = b[k];
  r.properties = { ...a.properties, ...b.properties };
  r.controls = [...(a.controls || []), ...(b.controls || [])];
  // FORMATS 'ENGINE: merge template' (G-X09 CONFIRMED): template content is loaded in place BEFORE own content, containers are append-only
  // (no dedupe) => Object / OffFieldObject lists = template's then own. Scalar Level attrs: own value if present, else template's.
  if (a.level && b.level) {
    const pick = (k) => (b.level[k] !== undefined ? b.level[k] : a.level[k]);
    r.level = { cornerNode: pick('cornerNode'), vectorX: pick('vectorX'), vectorY: pick('vectorY'), width: pick('width'), height: pick('height'),
      objects: [...a.level.objects, ...b.level.objects], offField: [...a.level.offField, ...b.level.offField] };
  } else r.level = b.level || a.level || null;
  return r;
}

// ---- objects ----
const objCache = new Map();
// Resolve an .object template chain -> {viewModel, defaultAnim, mask:{w,h}|null, type}
export async function loadObjectInfo(path, seen = []) {
  const key = path.toLowerCase().replace(/\\/g, '/');
  if (objCache.has(key)) return objCache.get(key);
  const pr = (async () => {
    const xml = await tryLoadXml(path); if (!xml || !TOP(xml)) return { viewModel: null };
    const el = TOP(xml);
    let info = { viewModel: null, defaultAnim: null, mask: null, type: attr(el, 'Type') };
    for (const t of attrList(el, 'TemplateName')) { if (!seen.includes(key)) { const b = await loadObjectInfo(t, [...seen, key]); info = { ...info, ...stripNull(b) }; } }
    const view = child(el, 'GameObjectView'); if (view && view.attrs.ModelName) info.viewModel = attr(view, 'ModelName');
    const states = child(el, 'GameObjectStates');
    if (states) {
      const def = childrenOf(states, 'GameObjectState').find((s) => attr(s, 'Name') === 'Default');
      const sv = def && child(def, 'GameObjectStateView');
      if (sv && sv.attrs.AnimationName) info.defaultAnim = attr(sv, 'AnimationName');
    }
    // footprint = first StrategyMask containing a '1' (rows = groups separated by space -> h, cols = group length -> w): GUESS G-R07
    for (const m of find(el, 'StrategyMask')) {
      const mask = String(attr(m, 'Mask', '')).trim(); if (!/1/.test(mask) || /%/.test(mask)) continue;
      const rows = mask.split(/\s+/); info.mask = { w: rows[0].length, h: rows.length }; break;
    }
    if (!info.mask) { // decorative objects (rail_2x4: Mask "00 00 00 00"): no '1' but the mask dims still give the footprint box (GUESS G-R07: box = mask dims)
      for (const m of find(el, 'StrategyMask')) { const mask = String(attr(m, 'Mask', '')).trim(); if (!/^[01]+( [01]+)*$/.test(mask)) continue; const rows = mask.split(/\s+/); info.mask = { w: rows[0].length, h: rows.length }; break; }
    }
    return info;
  })();
  objCache.set(key, pr);
  return pr;
}
const stripNull = (o) => Object.fromEntries(Object.entries(o).filter(([, v]) => v !== null && v !== undefined));

// Build the whole level. Returns {content: Group (D3D space), data, origin, grid, objects:[{group, template, x,y,dir,w,h}], ctx}
export async function buildLevel(name, opts = {}) {
  const lvlPath = /[\\/]/.test(name) ? name : `data/levels/${name}.level`;
  const data = await loadLevelData(lvlPath);
  if (!data.modelName) throw new Error('level has no ModelName: ' + lvlPath);
  const ctx = {};
  const content = new THREE.Group(); content.name = 'level';
  const terrain = await loadScene(data.modelName, ctx); terrain.name = 'terrain'; content.add(terrain);
  const objectsGroup = new THREE.Group(); objectsGroup.name = 'objects'; content.add(objectsGroup);
  // Origin = Corner node (CornerNode attr); its world position in D3D space.
  content.updateMatrixWorld(true);
  const corner = findNode(terrain, data.level ? data.level.cornerNode : 'Corner');
  const origin = new THREE.Vector3(); if (corner) corner.getWorldPosition(origin); else warn('Corner node not found');
  content.worldToLocal(origin); // corner world pos expressed in content (D3D) space
  const lv = data.level, placed = [];
  if (lv && opts.objects !== false) {
    const vx = new THREE.Vector3(...lv.vectorX), vy = new THREE.Vector3(...lv.vectorY);
    for (const o of lv.objects) {
      const info = await loadObjectInfo(o.template);
      if (!info.viewModel) continue;
      let w = info.mask ? info.mask.w : 1, h = info.mask ? info.mask.h : 1;
      if (!info.mask) warn('no footprint mask for ' + o.template);
      const d = ((o.dir % 4) + 4) % 4; if (d === 1 || d === 3) [w, h] = [h, w]; // rotated footprint (GUESS G-R07; walls: Y step 3 at dir 1)
      const pos = origin.clone().addScaledVector(vx, o.x + w * 0.5).addScaledVector(vy, o.y + h * 0.5);
      const g = new THREE.Group(); g.name = o.template.split(/[\\/]/).pop().replace(/\.object$/i, '');
      g.position.copy(pos); g.rotation.y = d * Math.PI / 2 + Math.PI; // CONFIRMED G-R08 (FORMATS 'ENGINE: yaw object', 0x493d30): engine Rotation.y = pi - d*pi/2, matrix uses Ry(-ry), model default = +z D3D
      try { g.add(await loadScene(info.viewModel, ctx)); } catch (e) { warn('object scene failed ' + info.viewModel + ': ' + e.message); continue; }
      if (info.defaultAnim) await applyAnimT0(g, info.defaultAnim);
      objectsGroup.add(g); placed.push({ group: g, template: o.template, x: o.x, y: o.y, dir: d, w, h });
    }
  }
  return { content, data, origin, grid: lv ? { w: lv.width, h: lv.height } : null, objects: placed, ctx };
}
function findNode(root, name) { let r = null; root.traverse((o) => { if (!r && o.name === name) r = o; }); return r; }
