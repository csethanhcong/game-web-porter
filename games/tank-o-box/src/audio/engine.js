// WebAudio engine core: AudioContext lifecycle (autoplay policy), master gain, buffer cache. FORMATS.md "PORT: Audio".
// Technical adaptation (not a gameplay deviation): the original plays through DirectSound at start-up (FUN_00496570 / ctor 0x498450); browsers only allow an AudioContext to run
// after a user gesture, so the context is created on the first pointerdown/mousedown/keydown/touchend and every play request before that is DROPPED silently (counted, no console error).
import { norm, warn, loadMediaIndex, BASE } from '../loader/assets.js';

export const E = {
  ctx: null, master: null, sfxGain: null, musicGain: null,
  stats: { requests: 0, dropped: 0, started: 0, stopped: 0, missing: 0, byName: {}, resumeFail: 0 },
  log: [], // last 200 starts {t, name, ch, why}
  onRunning: [], // callbacks fired once the context is running
};
export const running = () => !!E.ctx && E.ctx.state === 'running';
export function logPlay(name, ch, why) { E.log.push({ t: +(E.ctx ? E.ctx.currentTime : 0).toFixed(3), name, ch, why }); if (E.log.length > 200) E.log.shift(); E.stats.byName[name] = (E.stats.byName[name] || 0) + 1; }

function build() {
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) { warn('audio: no AudioContext'); return false; }
  E.ctx = new AC({ latencyHint: 'interactive' });
  E.master = E.ctx.createGain(); E.master.gain.value = 1; E.master.connect(E.ctx.destination);
  E.sfxGain = E.ctx.createGain(); E.sfxGain.connect(E.master);
  E.musicGain = E.ctx.createGain(); E.musicGain.connect(E.master);
  E.ctx.addEventListener('statechange', fire);
  return true;
}
function fire() { if (running() && E.onRunning.length) { const l = E.onRunning.splice(0); for (const f of l) { try { f(); } catch (e) { console.warn('[audio]', e); } } } }

const EVENTS = ['pointerdown', 'mousedown', 'keydown', 'touchend'];
function onGesture() {
  if (!E.ctx && !build()) { detach(); return; }
  if (E.ctx.state === 'running') { fire(); detach(); return; }
  E.ctx.resume().then(() => { if (running()) { fire(); detach(); } }).catch(() => { E.stats.resumeFail++; }); // stays attached: next gesture retries
}
function detach() { for (const ev of EVENTS) window.removeEventListener(ev, onGesture, true); }
let installed = false;
export function installUnlock() { if (installed || typeof window === 'undefined') return; installed = true; for (const ev of EVENTS) window.addEventListener(ev, onGesture, true); }
export function whenRunning(f) { if (running()) f(); else E.onRunning.push(f); }

// ---- sample resolution: 'data/sounds/click' -> media-index.json sounds (BASE + 'data/Sounds/click.wav'); Music 'data/music/menu' -> .xm ----
const rawCache = new Map();
async function urlOf(kind, ref) { const idx = (await loadMediaIndex())[kind]; const f = idx[norm(ref).replace(/\.(wav|xm|mp3)$/, '')]; return f ? BASE + f : null; }
// Raw file bytes (fetch is allowed before the gesture; decoding needs the context). Cached; null when missing.
export function fetchRaw(kind, ref) {
  const k = kind + ':' + norm(ref); let p = rawCache.get(k); if (p) return p;
  p = (async () => {
    const u = await urlOf(kind, ref); if (!u) { E.stats.missing++; warn('audio: missing ' + kind + ' ' + ref); return null; }
    const r = await fetch(u); if (!r.ok) { E.stats.missing++; warn('audio: HTTP ' + r.status + ' ' + u); return null; }
    return r.arrayBuffer();
  })().catch((e) => { warn('audio: fetch ' + ref + ': ' + e.message); return null; });
  rawCache.set(k, p); return p;
}
const bufCache = new Map(), bufSync = new Map();
export const bufferSync = (ref) => bufSync.get(norm(ref)) || null;
export function getBuffer(ref) {
  const k = norm(ref); let p = bufCache.get(k); if (p) return p;
  p = (async () => {
    const raw = await fetchRaw('sounds', ref); if (!raw || !E.ctx) { bufCache.delete(k); return null; }
    const b = await E.ctx.decodeAudioData(raw.slice(0)); bufSync.set(k, b); return b;
  })().catch((e) => { bufCache.delete(k); warn('audio: decode ' + ref + ': ' + e.message); return null; });
  bufCache.set(k, p); return p;
}
