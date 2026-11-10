// Level HUD + shared ControlLabel / ControlProgressBar.  FORMATS.md "ENGINE: luong man" C.
//  ControlLabel.process 0x44e960 (CONFIRMED asm 44e960-44ea56): timeout -= dt (init DBL_MAX; Timeout attr overrides); s = timeout>=0 ? global[PropertyName] as string : ""; if s != last -> Text.set(s).
//  ControlProgressBar 0x454180: t = (v-min)/(max-min); anim of the node set at t*length (0x411de0) CONFIRMED structure; Speed smoothing (move-toward, helper 0x4461a0) = GUESS G-X08b.
import * as THREE from 'three';
import { loadScene } from '../loader/scene.js';
import { loadModel, tryLoadXml } from '../loader/assets.js';
import { attr, find } from '../loader/xml.js';
import { parseKeys, evalEnvelope, applyValue, resolvePath } from '../loader/anim.js';
import { setText } from '../render/text.js';
import { createOverlay } from './overlay.js';

export function findNode(root, name) { let r = null; root.traverse((o) => { if (!r && o.name === name) r = o; }); return r; }
const valStr = (v) => (v === undefined || v === null ? '' : String(v));

export class Label {
  constructor(spec, root) {
    this.prop = spec.PropertyName; this.node = findNode(root, spec.NodeName);
    this.timeout = spec.Timeout !== undefined ? parseFloat(spec.Timeout) : Infinity; // DBL_MAX default (0x4f6800)
    this.last = null; if (!this.node) this.missing = true;
  }
  update(dt, g) {
    if (!this.node) return;
    this.timeout -= dt;
    const s = this.timeout >= 0 ? valStr(g[this.prop]) : '';
    if (s !== this.last) { setText(this.node, s); this.last = s; }
  }
}

// ---- progress bar ----
const animCache = new Map();
export async function loadBarAnim(path) { // own parse: also keeps MorphWeight (loader/anim.js ANIM_PARAMS does not)
  const k = String(path).toLowerCase(); if (animCache.has(k)) return animCache.get(k);
  const pr = (async () => {
    const x = await tryLoadXml(path); const out = { len: 0, chans: [] }; if (!x) return out;
    for (const pa of find(x, 'PrimitiveAnimation')) {
      const env = parseKeys(pa); if (!env.keys.length) continue; for (const key of env.keys) out.len = Math.max(out.len, key.time);
      out.chans.push({ param: attr(pa, 'Param'), target: attr(pa, 'Target', ''), env });
    }
    return out;
  })();
  animCache.set(k, pr); return pr;
}
import { prepMorph, setMorph } from '../render/morph.js'; // moved to src/render/morph.js (also used by anim MorphWeight in the 3D world)
export class Bar {
  constructor(spec, root) {
    this.node = findNode(root, spec.NodeName); this.root = root; this.spec = spec; this.prop = spec.PropertyName;
    this.minProp = spec.MinPropertyName; this.minV = spec.MinValue !== undefined ? parseFloat(spec.MinValue) : 0;
    this.maxProp = spec.MaxPropertyName; this.maxV = spec.MaxValue !== undefined ? parseFloat(spec.MaxValue) : 1;
    this.speed = spec.Speed !== undefined ? parseFloat(spec.Speed) : 0; this.shown = null; this.anim = null;
    if (this.node && spec.AnimationName) { loadBarAnim(spec.AnimationName).then((a) => { this.anim = a; this.dirty = true; }); prepMorph(this.node).then(() => { this.dirty = true; }); }
  }
  num(g, k, d) { const v = parseFloat(g[k]); return Number.isFinite(v) ? v : d; }
  update(dt, g) {
    if (!this.node || !this.anim) return;
    const v = this.num(g, this.prop, 0), mn = this.minProp ? this.num(g, this.minProp, this.minV) : this.minV, mx = this.maxProp ? this.num(g, this.maxProp, this.maxV) : this.maxV;
    let t = mx !== mn ? (v - mn) / (mx - mn) : 0; // no clamp (0x454180); hitpoints.anim PRE/POST CONSTANT clamps the weight
    if (this.shown === null) this.shown = t; // first frame snaps (GUESS: initial displayed value)
    else if (this.speed !== 0) { const d = t - this.shown, step = this.speed * dt; this.shown = Math.abs(d) <= step ? t : this.shown + Math.sign(d) * step; } // GUESS G-X08b
    else this.shown = t;
    if (this.last === this.shown && !this.dirty) return; this.last = this.shown; this.dirty = false;
    const at = this.shown * this.anim.len;
    for (const c of this.anim.chans) {
      const tg = c.target === '' ? [this.node] : (() => { const r = resolvePath(this.node, c.target); return r ? [r] : []; })();
      if (!tg.length) continue;
      if (c.param === 'MorphWeight') { setMorph(this.node, evalEnvelope(c.env, at, 1)[0]); continue; }
      applyValue(tg, c.param, evalEnvelope(c.env, at, c.param === 'Visibility' || c.param === 'Transparency' ? 1 : 3));
    }
  }
}

// Level HUD: scene = level data.interfaceModelName; controls = data.controls (merged template chain; Label / Bar only).
export class Hud {
  constructor() { this.labels = []; this.bars = []; this.overlay = null; }
  async load(data) {
    if (!data.interfaceModelName) return this;
    const root = await loadScene(data.interfaceModelName, {}); root.name = 'hud';
    for (const c of data.controls || []) {
      if (c.tag === 'ControlLabel') { const l = new Label(c, root); if (!l.missing) this.labels.push(l); }
      else if (c.tag === 'ControlProgressBar') { const b = new Bar(c, root); if (b.node) this.bars.push(b); }
    }
    this.root = root; this.overlay = createOverlay(root, 'hud'); return this;
  }
  update(dt, g) { for (const l of this.labels) l.update(dt, g); for (const b of this.bars) b.update(dt, g); }
}
