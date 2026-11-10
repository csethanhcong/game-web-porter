// GameObject class loader. Template merge: CONFIRMED FORMATS 'ENGINE: merge template' (G-X09): TemplateName is loaded IN PLACE when its attribute is met,
// before the children; Strategies / EventHandlers / GameObjectStates are append-only vectors (no dedupe); state lookup = first match by name;
// Properties: later overrides (map set). Class = {type, props, strategies:[spec], handlers:[handler], states:[state], view:{model}, spawnRefs:Set, footprint}
// spec = {tag, attrs}; handler = {names:[], strategies:[spec]}; state = {name, anims:[], loop, handlers:[], strategies:[], len}
import { attr, attrList, child, childrenOf, find } from '../loader/xml.js';
import { loadXml, tryLoadXml, norm, warn } from '../loader/assets.js';
import { parseMask } from './mask.js';
import { loadAnimData } from '../loader/anim.js';
import { bonusAnimData } from './strategies.js';

const classCache = new Map();
const animLenCache = new Map();

const TOPNODE = (xml) => xml.children[0];

function readStrategies(node) {
  const out = [];
  if (!node) return out;
  for (const s of node.children) out.push({ tag: s.tag, attrs: s.attrs });
  return out;
}
function readHandlers(node) {
  const out = [];
  if (!node) return out;
  for (const h of childrenOf(node, 'EventHandler')) {
    const names = []; const en = child(h, 'EventNames');
    if (en) for (const e of childrenOf(en, 'EventName')) names.push(attr(e, 'Name'));
    out.push({ names, strategies: readStrategies(child(h, 'Strategies')) });
  }
  return out;
}

async function applyState(st, el, seen) {
  for (const t of attrList(el, 'TemplateName')) {
    const x = await tryLoadXml(t); if (!x || !TOPNODE(x)) continue;
    await applyState(st, TOPNODE(x), seen); // GameObjectState root of the template file, merged in place (0x4644d0)
  }
  if (el.attrs.Name !== undefined) st.name = attr(el, 'Name');
  const view = child(el, 'GameObjectStateView');
  if (view) { const a = attrList(view, 'AnimationName'); if (a.length) st.anims = a; if (view.attrs.Loop !== undefined) st.loop = attr(view, 'Loop') !== 'false'; if (view.attrs.RandomStart !== undefined) st.randomStart = attr(view, 'RandomStart') === 'true'; } // RandomStart: GameObjectStateView 0x466036 (bool +0xfe, default false)
  st.handlers.push(...readHandlers(child(el, 'EventHandlers')));
  st.strategies.push(...readStrategies(child(el, 'Strategies')));
}

async function applyObject(cls, el, seen) {
  for (const t of attrList(el, 'TemplateName')) {
    const key = norm(t);
    if (seen.includes(key)) { warn('object template cycle ' + key); continue; }
    const x = await tryLoadXml(t); if (!x || !TOPNODE(x)) continue;
    await applyObject(cls, TOPNODE(x), [...seen, key]);
  }
  if (el.attrs.Type !== undefined) cls.type = attr(el, 'Type');
  const props = child(el, 'Properties');
  if (props) for (const p of childrenOf(props, 'Property')) cls.props[attr(p, 'Name')] = attr(p, 'Value');
  const view = child(el, 'GameObjectView'); if (view && view.attrs.ModelName) cls.view = { model: attr(view, 'ModelName') };
  else if (view && view.attrs.NodeName) cls.view = { node: attr(view, 'NodeName') };
  cls.strategies.push(...readStrategies(child(el, 'Strategies')));
  cls.handlers.push(...readHandlers(child(el, 'EventHandlers')));
  const states = child(el, 'GameObjectStates');
  if (states) for (const s of childrenOf(states, 'GameObjectState')) {
    const st = { name: '', anims: [], loop: true, handlers: [], strategies: [], len: null };
    await applyState(st, s, seen); cls.states.push(st);
  }
}

// Anim data via loader/anim.js loadAnimData: len = latest Key/Execute Time (GUESS: AnimFinished when the longest anim ends, FORMATS .anim); chans = all driven channels.
export const loadAnim = (path) => loadAnimData(path);
export async function animLength(path) { return (await loadAnim(path)).len; }

export function loadClass(path) {
  const key = norm(path);
  if (classCache.has(key)) return classCache.get(key);
  const pr = (async () => {
    const x = await loadXml(path); const el = TOPNODE(x);
    const cls = { path: key, type: '', props: {}, strategies: [], handlers: [], states: [], view: null, spawnRefs: new Set(), footprint: null };
    await applyObject(cls, el, [key]);
    const all = [...cls.strategies, ...cls.states.flatMap((s) => [...s.strategies, ...s.handlers.flatMap((h) => h.strategies)]), ...cls.handlers.flatMap((h) => h.strategies)];
    for (const sp of all) {
      if (sp.tag === 'StrategyGenerator' || /^StrategyFire/.test(sp.tag)) { const t = attr({ attrs: sp.attrs }, 'TemplateName'); if (t) cls.spawnRefs.add(t); }
      if (sp.tag === 'StrategyBonus') { const pre = attr({ attrs: sp.attrs }, 'AnimationPath', ''); if (pre) for (const n of ['active', 'passive', 'activepassive', 'passiveactive']) if (!bonusAnimData.has(pre + n)) bonusAnimData.set(pre + n, await loadAnim(pre + n + '.anim')); } // StrategyBonus anim queue files (sync access at runtime); missing file -> empty data
      if (!cls.footprint && /^Strategy(Mask|Move)/.test(sp.tag)) { const m = parseMask(attr({ attrs: sp.attrs }, 'Mask', '')); if (m.any) cls.footprint = { w: m.w, h: m.h }; }
    }
    for (const st of cls.states) { // anim length of the state = longest of its anims (GUESS: AnimFinished when all finish, FORMATS .anim)
      if (st.anims.length) { const as = await Promise.all(st.anims.map(loadAnim)); st.len = Math.max(...as.map((a) => a.len)); st.chans = as.flatMap((a) => a.chans); st.cmds = as.flatMap((a) => a.cmds || []); }
    }
    return cls;
  })();
  classCache.set(key, pr);
  return pr;
}

// Preload a class and every template reachable via Generator/Fire* (so spawning at runtime is synchronous).
export async function preloadClasses(paths) {
  const seen = new Set(); const q = [...paths]; const got = new Map();
  while (q.length) {
    const p = q.shift(); const k = norm(p); if (seen.has(k)) continue; seen.add(k);
    try { const c = await loadClass(p); got.set(k, c); for (const r of c.spawnRefs) q.push(r); } catch (e) { warn('class load failed ' + p + ': ' + e.message); }
  }
  return got;
}
