// Music (.xm via libopenmpt AudioWorklet from chiptune3) + MusicFlag. FORMATS.md "PORT: Audio".
// CONFIRMED (decomp/out/all.c): UserInterface ctor 0x442000 creates Music at this+0x90 (ctor 0x498450: fade speed = 1.0/3.0 s, level=1.0, flag(+0x28)=1.0);
//  UI::update 0x4426c0 copies the TOP screen's Music name (+0x260) into the Music requested name ONLY when it is non-empty (0x498400; empty -> keep previous, so GameMenu keeps the level music), then Music::update 0x498300:
//   requested == current -> level = min(1, level + dt*speed);
//   else level -= dt*speed; volume = level * MusicFlag; if level >= 0 and channel still playing -> return; else stop, current = requested, and if non-empty: level = 1.0, volume = level*flag, play.
//  MusicFlag default 1.0 (0x40d600), set by 0x4982f0 (called from the property hook 0x440b10, which then stores the property: 0x440970).
//  CONFIRMED G-AUDIO-06 (2026-11-09): MusicFlag is a double (Music+0x28), written only as 0.0/1.0 by ControlMusicMute 0x44a680 -> 0x44a6a0 -> 0x440b10 (= checked?1:0); no fade on the flag (only `level` fades); loaded in UI ctor 0x442000, saved by UI dtor 0x4423f0 (XML 'settings' in %local_appdata%) => persistence is original behaviour, localStorage emulates it.
// GUESS G-AUDIO-02: XM loops forever (original loop flag of the XM channel not found). GUESS G-AUDIO-05: volume = level*flag is linear gain (original passes it to the DirectSound channel property "Volume").
// DEVIATION SETTINGS_LOCALSTORAGE: MusicFlag persisted in localStorage (original: settings.dat 0x40c660 / properties.xml 0x4556d0).
import * as CFG from '../config.js';
import { warn, BASE } from '../loader/assets.js';
import { E, running, fetchRaw, whenRunning, logPlay } from './engine.js';

const FADE = 3.0; // 0x4f6180 (ctor 0x498450 stores 1.0/FADE at +0x20)
const KEY = 'tankobox.settings';
export const M = { requested: '', current: '', level: 1, flag: 1, playing: false, xm: 'idle', node: null, pending: null, updates: 0, switches: 0 };

try { if (CFG.SETTINGS_LOCALSTORAGE) { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); if (s.MusicFlag === 0 || s.MusicFlag === 1) M.flag = s.MusicFlag; } } catch (e) { /* storage blocked: default 1.0 */ }
export const getMusicFlag = () => M.flag;
export function setMusicFlag(v) { // 0x4982f0 + persist
  M.flag = v ? 1 : 0; applyVolume();
  try { if (CFG.SETTINGS_LOCALSTORAGE) { const s = JSON.parse(localStorage.getItem(KEY) || '{}'); s.MusicFlag = M.flag; localStorage.setItem(KEY, JSON.stringify(s)); } } catch (e) { /* ignore */ }
}
export const toggleMusicFlag = () => setMusicFlag(M.flag ? 0 : 1);
function applyVolume() { if (E.musicGain) E.musicGain.gain.value = Math.sqrt(Math.max(0, Math.min(1, M.level)) * M.flag); }
// CONFIRMED (DirectSound mB = 1000*log10(v) => amplitude sqrt(v))

// ---- libopenmpt worklet (files copied from node_modules/chiptune3 by tools/copy_chiptune.mjs to assets/audio/) ----
function ensureNode() {
  if (M.xm !== 'idle') return;
  M.xm = 'loading';
  E.ctx.audioWorklet.addModule(BASE + 'audio/chiptune3.worklet.js').then(() => {
    const n = new AudioWorkletNode(E.ctx, 'libopenmpt-processor', { numberOfInputs: 0, numberOfOutputs: 1, outputChannelCount: [2] });
    n.port.onmessage = (m) => { const c = m.data && m.data.cmd; if (c === 'err') warn('audio: libopenmpt error ' + m.data.val); }; // 'pos' (every render quantum) ignored
    n.port.postMessage({ cmd: 'config', val: { repeatCount: -1, stereoSeparation: 100, interpolationFilter: 0 } }); // repeatCount -1 = loop forever (G-AUDIO-02)
    n.connect(E.musicGain); M.node = n; M.xm = 'ready';
    if (M.pending) { const p = M.pending; M.pending = null; n.port.postMessage({ cmd: 'play', val: p }); }
  }).catch((e) => { M.xm = 'failed'; M.playing = false; warn('audio: music worklet failed: ' + (e && e.message || e)); });
}
function stopTrack() { M.playing = false; M.pending = null; if (M.node) M.node.port.postMessage({ cmd: 'stop' }); }
function playTrack(name) {
  M.playing = true; M.switches++; logPlay(name, 'music', 'xm');
  fetchRaw('music', name).then((raw) => {
    if (!raw || M.current !== name) { if (!raw && M.current === name) M.playing = false; return; }
    const buf = raw.slice(0); ensureNode();
    if (M.node) M.node.port.postMessage({ cmd: 'play', val: buf }); else M.pending = buf;
  });
}

// UI::update 0x4426c0 -> provider returns the top screen's Music ('' when the screen has none).
let provider = () => '';
export function setMusicProvider(f) { provider = f; }
export function updateMusic(dt) {
  const name = provider(); if (name) M.requested = String(name).toLowerCase();
  if (!running()) return; // nothing audible yet (autoplay policy): no time passes
  M.updates++;
  const speed = 1 / FADE;
  if (M.requested === M.current) { // fade-in branch (0x498300 first branch)
    M.level = Math.min(1, M.level + dt * speed); applyVolume(); return;
  }
  M.level -= dt * speed; applyVolume();
  if (M.level >= 0 && M.playing) return;
  stopTrack(); M.current = M.requested;
  if (M.current) { M.level = 1; applyVolume(); playTrack(M.current); }
}
whenRunning(applyVolume);
