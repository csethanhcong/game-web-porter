// Audio = exe BASS system, replicated from the decompile (FUN_00434cd0 init, FUN_00434d80 load, FUN_00434e60/00434f40 music, FUN_00435000 queue,
// FUN_00435190 per-frame update, FUN_004350f0 3D volume/pan, FUN_00435450 global volumes). Web Audio stands in for BASS.
// CONFIRMED: all sounds are non-looping one-shots (loop arg = push 0 in FUN_00434fa0/00434fd0). 2D sound = position (0,0,0) -> default volume/pan.
// 3D sound (FUN_004350f0): d = |listener - src| (listener = DAT_004dcfe8, =hero pos per main.js camera note); vol = 100 - trunc(d); if vol<0: vol = (vol < -100 ? 0 : 1);
//   pan = trunc((src.x - listener.x) * 3) clamped to +-100 (BASS pan -100..100). Re-evaluated every frame while playing (FUN_00435190).
// Global volumes BASS_SetGlobalVolumes(music DAT_0049e194, sample DAT_0049e190) 0..100, default 0x32 = 50 (FUN_0043f190 defaults; stored in registry "settings").
// Music: MO3 (MUSIC/106) loaded with BASS_MusicLoad flags 4 (loop); track N -> order table; FUN_00434e60 = pick order + start 1200 ms fade-out (vol = timer/12) then
//   BASS_ChannelSetAttributes(vol 100) + BASS_MusicPlayEx(order, flags 0x412, reset 1). FUN_00434f40 = same but start immediately (timer 0).
// GUESS: BASS flags 0x412 bit meanings (not decoded; reset=1 -> restart module at order); BASS vs libopenmpt mixer/interpolation differences; ftol = truncation.
const ORDERS = { 0: 0, 1: 6, 2: 0x2e, 3: 0x4c, 4: 0x5c, 5: 0x70, 6: 0x87, 7: 0xa0, 8: 0xb7, 9: 0xe3, 10: 0xf9 }; // FUN_00434e60 CONFIRMED
let ctx = null, sampleGain = null, musicGain = null, panBase = null, node = null, musicReady = false, musicLoadedBuf = null;
const buffers = {}, loading = {}, voices = [];
const store = (k, d) => { try { const v = localStorage.getItem(k); return v === null ? d : +v; } catch (e) { return d; } };
let musVol = store('dino_musvol', 50), samVol = store('dino_samvol', 50); // 0..100, default 50 CONFIRMED (FUN_0043f190); persistence = localStorage instead of registry
let trackOrder = 0, fadeTimer = 0, wantPlay = false, listener = null, hurtCd = 0;
export const getMusicVol = () => musVol; export const getSoundVol = () => samVol;
export function setMusicVol(v) { musVol = Math.max(0, Math.min(100, v)); try { localStorage.setItem('dino_musvol', musVol); } catch (e) {} applyGlobal(); }
export function setSoundVol(v) { samVol = Math.max(0, Math.min(100, v)); try { localStorage.setItem('dino_samvol', samVol); } catch (e) {} applyGlobal(); }
function applyGlobal() { if (!ctx) return; sampleGain.gain.value = samVol / 100; musicGain.gain.value = musVol / 100 * (musicChan / 100); }
let musicChan = 100; // BASS channel volume 0..100
async function loadSample(n) {
  if (buffers[n] || loading[n] || !ctx) return;
  loading[n] = fetch(`${__B}assets/sounds/${n}.ogg`).then((r) => r.arrayBuffer()).then((b) => ctx.decodeAudioData(b)).then((d) => { buffers[n] = d; }).catch(() => {});
}
async function initCtx() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return; }
  const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
  ctx = new AC();
  sampleGain = ctx.createGain(); sampleGain.connect(ctx.destination);
  musicGain = ctx.createGain(); musicGain.connect(ctx.destination); applyGlobal();
  ['menu', 'menu2', 'chpok1', 'logo', 'ananas', 'apple1', 'batareyka', 'bomb', 'key1', 'invisible', 'clock', 'push', 'teleport', 'podskazka', 'herohaha', 'stephero1', 'stephero2', 'stephero3',
    'herodamage1', 'herodamage2', 'herodamage3', 'herodamage4', 'explode1', 'explode2', 'tickyellow', 'tickblue', 'tickred', 'bulletend', 'snipershot', 'objectspark', 'laservkl', 'vorota1', 'vorota2', 'vorota3',
    'vilkaataka', 'dlinnyataka', 'bugaystand', 'bugaymah', 'bugaykick', 'vilkapunish', 'sniperpunish', 'dlinnypunish', 'bugaypunish', 'chihanie'].forEach(loadSample); // BASS loads every sounds/*.ogg (FUN_00434d80)
  try {
    await ctx.audioWorklet.addModule(__B + 'vendor/music.worklet.js');
    node = new AudioWorkletNode(ctx, 'dino-mo3', { numberOfInputs: 0, outputChannelCount: [2] });
    node.connect(musicGain);
    node.port.onmessage = (e) => { if (e.data.cmd === 'loaded') musicReady = true; };
    const buf = await (await fetch(__B + 'assets/music/music.mo3')).arrayBuffer();
    node.port.postMessage({ cmd: 'load', buf }, [buf]);
  } catch (e) { console.warn('music init failed', e); }
}
for (const ev of ['pointerdown', 'keydown', 'touchstart']) addEventListener(ev, initCtx, { passive: true });
// WM_ACTIVATEAPP-style pause/resume (FUN_00435470 BASS_Pause / FUN_00435480 BASS_Start, window proc ~28954)
document.addEventListener('visibilitychange', () => { if (!ctx) return; if (document.hidden) ctx.suspend(); else ctx.resume(); });

/** FUN_00434e60: choose order for track n and start fade-out (1200 ms) of the current music; the new track starts when the timer runs out. */
export function setTrack(n) { trackOrder = ORDERS[n] ?? trackOrder; fadeTimer = 1200; wantPlay = true; }
/** FUN_00434f40: set track and start immediately. */
export function startTrack(n) { trackOrder = ORDERS[n] ?? trackOrder; fadeTimer = 0; musicChan = 100; applyGlobal(); wantPlay = true; }
const zero = (p) => !p || (p.x === 0 && p.y === 0 && p.z === 0);
function mix(pos) { // FUN_004350f0 -> {vol 0..100 | -1 default, pan -1..1}
  if (zero(pos) || !listener) return { vol: 100, pan: 0 };
  const d = Math.hypot(listener.x - pos.x, listener.y - pos.y, listener.z - pos.z);
  let v = 100 - Math.trunc(d); if (v < 0) v = v < -100 ? 0 : 1;
  const p = Math.max(-100, Math.min(100, Math.trunc((pos.x - listener.x) * 3)));
  return { vol: v, pan: p / 100 };
}
/** Play sound `name` (without .ogg). pos = three.js Vector3-like (game pos mapped x,z,y) for 3D sounds (FUN_00434fd0) or omitted for 2D (FUN_00434fa0). */
export function play(name, pos) {
  if (!ctx || ctx.state !== 'running') return;
  const b = buffers[name]; if (!b) { loadSample(name); return; }
  const src = ctx.createBufferSource(); src.buffer = b;
  const g = ctx.createGain(), pn = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
  src.connect(g); if (pn) { g.connect(pn); pn.connect(sampleGain); } else g.connect(sampleGain);
  const v = { src, g, pn, pos: zero(pos) ? null : { x: pos.x, y: pos.y, z: pos.z } };
  const m = mix(v.pos); g.gain.value = m.vol / 100; if (pn) pn.pan.value = m.pan;
  src.onended = () => { const i = voices.indexOf(v); if (i >= 0) voices.splice(i, 1); };
  voices.push(v); src.start();
}
/** FUN_00423630: hero hurt sound, cycling herodamage1..4, 400 ms cooldown (+0x2c8 = 0x43c80000). idx' = (idx + 1 + rand(3)) & 3 (FUN_004402b0(3), stream 1). dtMs decrement is in update(). */
let hurtIdx = 0;
export function heroHurt(r3) { if (hurtCd <= 0) { play('herodamage' + (hurtIdx + 1)); hurtIdx = (hurtIdx + 1 + (r3 ? r3() : 0)) & 3; hurtCd = 400; } } // CONFIRMED: FUN_004402b0(3) = RNG stream 1, passed in by main.js
/** FUN_00435190 per frame: update 3D voices with listener, run music fade/start. dtMs = real frame ms. */
export function update(dtMs, listenerPos) {
  listener = listenerPos; if (hurtCd > 0) hurtCd -= dtMs;
  for (const v of voices) if (v.pos) { const m = mix(v.pos); v.g.gain.value = m.vol / 100; if (v.pn) v.pn.pan.value = m.pan; }
  if (!ctx || !node || !musicReady) return;
  if (fadeTimer > 0) {
    fadeTimer -= dtMs;
    if (fadeTimer > 0) { musicChan = Math.trunc(fadeTimer / 12); applyGlobal(); return; }
  }
  if (wantPlay) { musicChan = 100; applyGlobal(); node.port.postMessage({ cmd: 'order', o: trackOrder }); wantPlay = false; }
}
export const pick = (base, n) => base + (1 + Math.floor(Math.random() * n));
