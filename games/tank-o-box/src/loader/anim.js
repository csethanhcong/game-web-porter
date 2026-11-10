// .anim support. applyAnimT0 (static phase) applies Visibility / Intensity at t=0 via the envelope evaluator below.
// Envelope evaluator: CONFIRMED FORMATS.md 'ENGINE: envelope .anim' (0x410840/0x410ad0): pick first key k with key[k+1].Time >= t,
// dt = t - key[k].Time, value = Value + dt*(Linear + dt*(Quadratic + dt*Cubic)) (per component for Vector3).
// Behave enum name -> case mapping CONFIRMED (0x4f0270 -> table 0x516668): CONSTANT=0 LINEAR=1 REPEAT=2 OSCILLATE=3 OFFSET=4; all five ported below (data only uses CONSTANT/REPEAT).
// Channels driven: Visibility, Intensity, Position, Rotation (setRotationD3D = the ONE place for the Rotation convention, G-R04), Scale, Transparency.
// Not driven (later): Diffuse/Emissive/ParticlesPerSec/Emit/MorphWeight/Text/Commands.
// API for gameplay: loadAnimData(path), applyChannel(root, chan, v), AnimPlayer / playAnim(root, names, {loop}) with tick(dt) and .finished (AnimFinished).
import { attr, find } from './xml.js';
import { tryLoadXml, norm } from './assets.js';
import { setTransparency, setDiffuse } from '../render/material.js';
import { prepMorph, setMorph } from '../render/morph.js';
import { loadTexture } from './scene.js'; // cycle (scene -> audio -> anim -> scene) is safe: only used at call time

function findByName(obj, name) {
  for (const c of obj.children) {
    if (c.name === name) return c;
    if (c.name === '' && c.children.length) { const r = findByName(c, name); if (r) return r; }
  }
  return null;
}
export function resolvePath(root, path) {
  let o = root;
  for (const part of path.split('|')) { o = findByName(o, part); if (!o) return null; }
  return o;
}
// Rotation channel convention (CONFIRMED G-R04, same as scene.js applyTRS): M_col = Rz*Ry(-ry)*Rx -> three Euler 'ZYX' with y negated.
export function setRotationD3D(o, r) { o.rotation.order = 'ZYX'; o.rotation.set(r[0], -r[1], r[2]); }

// keys: [{time, v:number[]}] with v = [Value], [Linear], [Quadratic], [Cubic] arrays-of-components; returns component array.
export function parseKeys(pa) {
  const comp = (s) => String(s === undefined ? '0' : s).trim().split(/\s+/).map(Number);
  const keys = find(pa, 'Key').map((k) => ({ time: parseFloat(attr(k, 'Time', '0')), v: comp(attr(k, 'Value')), l: comp(attr(k, 'Linear')), q: comp(attr(k, 'Quadratic')), c: comp(attr(k, 'Cubic')) }));
  const env = find(pa, 'Envelope')[0];
  return { keys, pre: env ? attr(env, 'PreBehave', 'CONSTANT') : 'CONSTANT', post: env ? attr(env, 'PostBehave', 'CONSTANT') : 'CONSTANT' };
}
// Behave enum (CONFIRMED: static init 0x4f0270 fills table 0x516668 = {name, name_end, value}: CONSTANT=0, REPEAT=2, OSCILLATE=3, OFFSET=4, LINEAR=1).
const BEHAVE = { CONSTANT: 0, LINEAR: 1, REPEAT: 2, OSCILLATE: 3, OFFSET: 4 };
const behaveCode = (s) => (s in BEHAVE ? BEHAVE[s] : 0); // unknown name: not seen in data (engine enum parse failure not decompiled) -> CONSTANT (GUESS, G-X07)
// FUN_004104a0 (wrap): d = Tn-T0; d==0 -> (T0, n=0); else n = floor((t-T0)/d) (FUN_004a98c0 = floor, 004a99e4 = ftol), t' = t - n*d.
function wrapT(t, T0, Tn) { const d = Tn - T0; if (d === 0) return [T0, 0]; const n = Math.floor((t - T0) / d); return [t - n * d, n]; }
// Out-of-range handling shared by 0x410840 (double), 0x410ad0 (Vector3), 0x410e60 (string). Returns {hold: edge key} for an early return, or {t, n} (new time and OFFSET cycle count).
// Pre (t < T0) uses PreBehave (+8), Post (t >= Tn) uses PostBehave (+0xc). CONFIRMED all five cases; WString version: 0/1 hold, 2/4 wrap (no offset), 3 oscillate.
function behave(env, K, t, str) {
  const n = K.length, T0 = K[0].time, Tn = K[n - 1].time;
  let code, edge;
  if (t < T0) { code = behaveCode(env.pre); edge = K[0]; } else if (t >= Tn) { code = behaveCode(env.post); edge = K[n - 1]; } else return { t, n: 0 };
  switch (code) {
    case 0: return { hold: edge };
    case 1: return str ? { hold: edge } : { hold: edge, lin: t - edge.time }; // LINEAR: Value + (t - T_edge)*Linear of the edge key
    case 2: return { t: wrapT(t, T0, Tn)[0], n: 0 };
    case 3: { let [w, c] = wrapT(t, T0, Tn); if (Math.abs(c) % 2 === 1) w = (Tn - T0) - w; return { t: w, n: 0 }; } // original reflects with (Tn-T0)-w, not +T0 (0x410840 LAB_004109a4)
    case 4: { const [w, c] = wrapT(t, T0, Tn); return { t: w, n: str ? 0 : c }; } // OFFSET: + (Vlast - Vfirst)*cycles (numeric only)
    default: return { t, n: 0 }; // code outside 0..4: falls to the plain key lookup (switch default)
  }
}
// String envelopes (Image / ShadowSource; filesystem::String): step function, key chosen like 0x410e60 (CONFIRMED FORMATS 'ENGINE: envelope', WString = bac thang): first k with key[k+1].Time >= t.
function stepString(env, t) {
  const K = env.keys, n = K.length; if (!n) return '';
  if (n === 1) return K[0].s;
  const r = behave(env, K, t, true); if (r.hold) return r.hold.s; t = r.t;
  let k = 0; while (k < n - 2 && K[k + 1].time < t) k++;
  return K[k].s;
}
export function evalEnvelope(env, t, ncomp = 1) {
  if (env.str) return [stepString(env, t)];
  const K = env.keys, n = K.length;
  if (!n) return new Array(ncomp).fill(0);
  if (n === 1) return K[0].v.slice();
  const r = behave(env, K, t, false);
  if (r.hold) { const e = r.hold; return r.lin === undefined ? e.v.slice() : e.v.map((v, i) => v + r.lin * (e.l[i] || 0)); }
  t = r.t;
  let k = 0; while (k < n - 2 && K[k + 1].time < t) k++;
  const dt = t - K[k].time, a = K[k];
  const out = a.v.map((v, i) => v + dt * ((a.l[i] || 0) + dt * ((a.q[i] || 0) + dt * (a.c[i] || 0))));
  if (r.n) for (let i = 0; i < out.length; i++) out[i] += ((K[n - 1].v[i] || 0) - (K[0].v[i] || 0)) * r.n; // OFFSET (0x410840 tail / 0x410ad0 tail)
  return out;
}

// ---- target resolution incl. '#Shaders#|<shader>' tail (Transparency channels): shader items are meshes named like the Shader (or 'name:emissive') under the ModelFixed group.
export function resolveTargets(root, path) {
  const parts = path.split('|'); let o = root;
  for (let i = 0; i < parts.length; i++) {
    if (parts[i] === '#Shaders#') {
      const sh = parts[i + 1]; const out = [];
      for (const c of o.children) if (c.isMesh && (sh === undefined || c.name === sh || c.name === sh + ':emissive')) out.push(c);
      return out;
    }
    o = findByName(o, parts[i]); if (!o) return [];
  }
  return [o];
}
// + ParticleSystem animated doubles (CONFIRMED setter 0x472a70); other params (e.g. Param="Emit") are ignored like the engine.
export const ANIM_PARAMS = new Set(['Visibility', 'Intensity', 'Position', 'Rotation', 'Scale', 'Transparency', 'ParticlesPerSec', 'ParticlesEmit', 'ParticlesEmitNow', 'SizeStart', 'SizeEnd', 'SizeVar', 'AlphaStart', 'AlphaEnd', 'AlphaVar', 'Speed', 'SpeedVar', 'LifeTime', 'LifeVar', 'EmitterLevel', 'MorphWeight', 'Diffuse', 'Image', 'ShadowSource']);
// Apply one channel value (v = component array) to resolved targets. Position/Scale absolute (replace the node's TRS component).
export function applyValue(targets, param, v) {
  for (const t of targets) {
    switch (param) {
      case 'Visibility': t.visible = v[0] > 0.5; break;
      case 'Intensity': if (t.userData.light) t.userData.light.intensity = v[0]; break;
      case 'Position': t.position.set(v[0], v[1], v[2]); break;
      case 'Rotation': setRotationD3D(t, v); break;
      case 'Scale': t.scale.set(v[0], v[1], v[2]); break;
      case 'Transparency': if (t.isMesh) setTransparency(t, v[0]); break;
      case 'MorphWeight': if (t.userData.morph) { prepMorph(t); setMorph(t, v[0]); } break; // ModelMorph out=A+(B-A)*w (FUN_0046df20, render/morph.js)
      case 'Diffuse': if (t.isMesh) setDiffuse(t, v); break; // Material Diffuse setter 0x46b870 (R4)
      case 'Image': if (t.isMesh) setImage(t, v[0]); break; // image node setter 0x47d8f0 (R3): texture looked up by name from the Image string
      case 'ShadowSource': break; // ModelFixed attr 0x4f86f0, data always "" (clears shadow source); the port has no shadow-source feature -> no-op (G-R15)
      default: if (t.userData.ps) t.userData.ps.setParam(param, v[0]); break;
    }
  }
}
function setImage(mesh, ref) {
  if (mesh.userData.imgRef === ref) return; mesh.userData.imgRef = ref; const u = mesh.material.uniforms; if (!u || !u.uMap) return;
  if (!ref) { u.uMap.value = null; u.uHasMap.value = 0; return; }
  loadTexture(ref).then((r) => { if (r && mesh.userData.imgRef === ref) { u.uMap.value = r.tex; u.uHasMap.value = 1; } }).catch(() => {});
}
const dataCache = new Map();
// -> {len, chans:[{param,target,env}]} ; len = latest Key/Execute Time (same rule as game/template.js)
export function loadAnimData(path) {
  const k = norm(path); if (dataCache.has(k)) return dataCache.get(k);
  const pr = (async () => {
    const x = await tryLoadXml(path); const out = { len: 0, chans: [], cmds: [] }; if (!x) return out;
    // cmds (Phase 9 audio): <Command Target><Execute Name Time/></Command> -> [{target, name, time}] fired by src/audio/sfx.js runCommands
    for (const cm of find(x, 'Command')) for (const ex of find(cm, 'Execute')) out.cmds.push({ target: attr(cm, 'Target', ''), name: attr(ex, 'Name', ''), time: parseFloat(attr(ex, 'Time', '0')) || 0 });
    for (const pa of find(x, 'PrimitiveAnimation')) {
      const param = attr(pa, 'Param');
      if (param === 'Image' || param === 'ShadowSource') { // string keys
        const keys = find(pa, 'Key').map((k) => ({ time: parseFloat(attr(k, 'Time', '0')), s: attr(k, 'Value', '') })); const en = find(pa, 'Envelope')[0];
        for (const key of keys) out.len = Math.max(out.len, key.time);
        if (keys.length) out.chans.push({ param, target: attr(pa, 'Target', ''), env: { str: true, keys, pre: en ? attr(en, 'PreBehave', 'CONSTANT') : 'CONSTANT', post: en ? attr(en, 'PostBehave', 'CONSTANT') : 'CONSTANT' } });
        continue;
      }
      const env = parseKeys(pa); for (const key of env.keys) out.len = Math.max(out.len, key.time);
      if (ANIM_PARAMS.has(param) && env.keys.length) out.chans.push({ param, target: attr(pa, 'Target', ''), env });
    }
    for (const ex of find(x, 'Execute')) out.len = Math.max(out.len, parseFloat(attr(ex, 'Time', '0')) || 0);
    return out;
  })();
  dataCache.set(k, pr); return pr;
}
const NC = { Visibility: 1, Intensity: 1, Transparency: 1, Position: 3, Rotation: 3, Scale: 3 };
// Plays one or more .anim files in parallel on a group. tick(dt) advances time; finished = all anims past their length (non-loop) -> gameplay enqueues AnimFinished.
export class AnimPlayer {
  constructor(root) { this.root = root; this.chans = []; this.t = 0; this.len = 0; this.loop = false; this.finished = false; this.playing = false; }
  async play(names, { loop = false } = {}) {
    const list = Array.isArray(names) ? names : [names];
    const datas = await Promise.all(list.map(loadAnimData));
    this.chans = datas.flatMap((d) => d.chans).map((c) => ({ ...c, targets: null }));
    this.len = datas.length ? Math.max(...datas.map((d) => d.len)) : 0;
    this.t = 0; this.loop = loop; this.finished = false; this.playing = true; this.apply();
    return this;
  }
  apply() {
    for (const c of this.chans) {
      if (!c.targets) c.targets = resolveTargets(this.root, c.target); // resolved lazily (scene may still be loading)
      if (c.targets.length) applyValue(c.targets, c.param, evalEnvelope(c.env, this.t, NC[c.param]));
    }
  }
  tick(dt) {
    if (!this.playing) return this.finished;
    this.t += dt; this.apply();
    if (!this.loop && this.t >= this.len) { this.finished = true; this.playing = false; }
    return this.finished;
  }
  stop() { this.playing = false; }
}
// Convenience: stores the player on root.userData.animPlayer (replaces the previous one).
export async function playAnim(root, names, opts) { const p = new AnimPlayer(root); root.userData.animPlayer = p; return p.play(names, opts); }
export function tickAnim(root, dt) { const p = root.userData.animPlayer; return p ? p.tick(dt) : true; }

export async function applyAnimT0(root, animPath) {
  const d = await loadAnimData(animPath); let n = 0;
  for (const c of d.chans) { const tg = resolveTargets(root, c.target); if (!tg.length) continue; applyValue(tg, c.param, evalEnvelope(c.env, 0, NC[c.param])); n++; }
  return n;
}
