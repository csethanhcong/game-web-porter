// SoundSource nodes + anim Commands (Execute Play/Stop). FORMATS.md "PORT: Audio".
// CONFIRMED (data): <SoundSource Name Sound ChannelType 2D|3D MinDistance MaxDistance Loop> (FORMATS XML .scene); anim <Command Target="<path>|snd"><Execute Name="Play|Stop" Time=t/></Command>.
// CONFIRMED (decompiled SoundSource defaults): ChannelType 3D, MinDistance 1, MaxDistance 1e9, Loop true when attribute absent.
// CONFIRMED (decompiled, G-AUDIO-01 closed 2026-11-09): ChannelType "2D"/"3D"/"Surround" = stereo/mono/5.1 channel types (DAT_005315d8/b8/e8, strings at 0x4fbf58). A 3D channel is a MONO DirectSound buffer with
//  DSBCAPS_CTRL3D|CTRLVOLUME|GLOBALFOCUS|GETCURRENTPOSITION2|LOCDEFER (0x4a0550: flags 0x18090|0x40000; no MUTE3DATMAXDISTANCE); a 2D channel is stereo 0x180e0 (volume/pan/freq, no 3D).
//  3D parameters: written at channel creation (0x40d3f0 via iface thunk 0x40db00 -> 0x40d2d0 with dt=1.0 + Loop/Min/Max setters) AND EVERY FRAME by the SoundSource update registrant (this+0x10c, vtbl 0x4f4be4 slot1 = 0x40d3d0 -> 0x40d2d0(dt);
//  driven from list DAT_0052be90 by 0x41c240, sole caller 0x41e380) -> channel props Position 0x531588 / Velocity 0x531538 (IDirectSound3DBuffer SetPosition/SetVelocity, DS3D_IMMEDIATE). (Round-17 claim "written once" was WRONG, corrected round 2.)
//  Position = translation of the node's WORLD matrix (0x471b30 multiplies up the parent chain), D3D left-handed units.
//  Velocity = (pos - prevPos)*(1/dt) (0x40d120), prevPos = this+0x114 (zero at ctor, set to pos on every update); dt==0 -> velocity 0 (0x40d2d0).
//  The IDirectSound3DListener is NEVER moved: hardware setter 0x4996f0 handles listener position/velocity/orientation keys (0x53161c/0x53160c/0x5315f8/0x5315a8) but no code pushes those keys (xrefs); the only per-frame listener call
//  is orientation front(0,0,1)/top(0,1,0) + Commit (0x499f30, defaults from ctor 0x499870). The scene node "SoundListener" is only stored in a weak pointer (0x458070 -> 0x40dc10 -> 0x516538) that nothing reads.
//  => listener fixed at the world origin, default DS 3D (distance factor 1, rolloff 1, doppler 1: never changed), default inverse-distance rolloff gain = min/d for d>min, clamped at MaxDistance (no mute).
// GUESS G-AUDIO-09: Doppler pitch from the Play-time velocity uses the textbook formula rate = c/(c + v_away) with c = 343 m/s (DirectSound documented constant; not in engine code).
// CONFIRMED G-AUDIO-03 (round 2): Execute handler 0x40d180: "Play" -> channel vslot 0x34 (Stop 0x4a02a0) then vslot 0x30 (Play 0x4a0c10: cursor=0, finished=0, start) = ALWAYS RESTARTS, even a playing loop; "Stop" -> Stop only.
// CONFIRMED G-AUDIO-04 (round 2): SoundSource dtor 0x40db10/0x40db30 -> channel delete 0x4a1ce0/0x4a1cf0 -> Stop 0x4a02a0: ANY sound (loop or one-shot) of a destroyed node stops.
// CONFIRMED (round 2): hardware keeps max 12 real voices (hw+0x30 = 0xc, ctor 0x499870); 3D channels are ranked by audibility (0x4a0090 -> 0x49f5f0, desc sort 0x499d00) and only the top 12 own a DS buffer (others virtual: cursor advances in software). NOT ported (see GUESS_REGISTER G-AUDIO-10).
import * as THREE from 'three';
import * as CFG from '../config.js';
import { attr, num } from '../loader/xml.js';
import { resolvePath } from '../loader/anim.js';
import { E, running, fetchRaw, getBuffer, bufferSync, logPlay } from './engine.js';

const active = new Set(); // {src, gain, panner, node, name}
const _v = new THREE.Vector3();
const C_SOUND = 343; // GUESS G-AUDIO-09 (DirectSound speed of sound, distance factor 1.0)

// <SoundSource> element -> Object3D carrying userData.sound. Prefetches the raw file (no AudioContext needed).
export function makeSoundNode(c) {
  const o = new THREE.Object3D(); o.name = attr(c, 'Name', '');
  const ref = attr(c, 'Sound', '');
  o.userData.sound = { ref, channel: attr(c, 'ChannelType', '3D'), min: num(c, 'MinDistance', 1), max: num(c, 'MaxDistance', 1e9), loop: attr(c, 'Loop', 'true') === 'true', inst: null, token: 0, prev: [0, 0, 0] };
  if (ref) fetchRaw('sounds', ref);
  return o;
}
// SoundListener node: the engine stores it (0x458070/0x40dc10) but never reads it (see header) -> intentionally unused; the Web Audio listener stays at the origin, default orientation.
export function registerListener(o) { /* CONFIRMED no-op, see header */ void o; }

// 0x40d2d0: position = world translation, velocity = (pos-prev)/dt (0 if dt==0). D3D (left-handed, +z fwd) -> Web Audio (-z fwd): z negated; scene root x-mirrored so D3D x = -world x.
function apply3D(node, d, panner, src, dt) {
  node.getWorldPosition(_v); const px = -_v.x, py = _v.y, pz = _v.z;
  const dist = Math.hypot(px, py, pz), k = dist > d.max && dist > 0 ? d.max / dist : 1; // DS clamps attenuation at MaxDistance
  panner.positionX.value = px * k; panner.positionY.value = py * k; panner.positionZ.value = -pz * k;
  const vx = dt === 0 ? 0 : (px - d.prev[0]) / dt, vy = dt === 0 ? 0 : (py - d.prev[1]) / dt, vz = dt === 0 ? 0 : (pz - d.prev[2]) / dt; d.prev = [px, py, pz];
  if (dist > 0) { const away = (vx * px + vy * py + vz * pz) / dist; if (C_SOUND + away > 0) src.playbackRate.value = C_SOUND / (C_SOUND + away); } // GUESS G-AUDIO-09
}
function start(node, buf) {
  const d = node.userData.sound, ctx = E.ctx;
  const src = ctx.createBufferSource(); src.buffer = buf; src.loop = d.loop;
  const gain = ctx.createGain(); let panner = null;
  if (d.channel === '3D' && CFG.AUDIO_3D) {
    panner = new PannerNode(ctx, { panningModel: 'equalpower', distanceModel: 'inverse', refDistance: Math.max(0.01, d.min), maxDistance: 1e6, rolloffFactor: 1 });
    src.connect(panner); panner.connect(gain);
    // D3D (left-handed, forward +z, right +x) -> Web Audio default listener (forward -z, right +x): z negated. scene root is x-mirrored (FORMATS 'Handedness'), so D3D x = -world x.
    node.userData.__panner = panner;
  } else src.connect(gain);
  gain.connect(E.sfxGain);
  const inst = { src, gain, panner, node, name: d.ref };
  d.inst = inst; active.add(inst);
  src.onended = () => { active.delete(inst); if (d.inst === inst) d.inst = null; try { src.disconnect(); gain.disconnect(); if (panner) panner.disconnect(); } catch (e) { /* ignore */ } };
  if (panner) apply3D(node, d, panner, src, 1.0); // channel creation: dt=1.0 (0x40d3f0)
  src.start(); E.stats.started++; logPlay(d.ref, d.channel, d.loop ? 'loop' : 'one');
}

export function playSound(node) {
  const d = node && node.userData.sound; if (!d || !d.ref) return false;
  E.stats.requests++;
  if (!running()) { E.stats.dropped++; return false; } // autoplay policy: no gesture yet -> dropped silently
  stopSound(node); const tok = d.token;
  const b = bufferSync(d.ref);
  if (b) start(node, b); else getBuffer(d.ref).then((buf) => { if (buf && d.token === tok && !d.inst) start(node, buf); });
  return true;
}
export function stopSound(node) {
  const d = node && node.userData.sound; if (!d) return; d.token++;
  const i = d.inst; if (i) { d.inst = null; try { i.src.stop(); } catch (e) { /* ignore */ } active.delete(i); E.stats.stopped++; }
}
// Object destroyed: CONFIRMED G-AUDIO-04 (0x4a1ce0 -> Stop): every sound in the tree stops.
export function stopTree(root) { if (root) root.traverse((o) => { if (o.userData.sound) stopSound(o); }); }
export function stopAll() { for (const i of [...active]) stopSound(i.node); }

// Per-frame (0x40d3d0 -> 0x40d2d0(dt)): refresh position/velocity of every playing 3D sound. dt = audio-loop frame delta (GUESS: original dt source of 0x41e380 not verified; 0 -> velocity 0).
export function tickSfx(dt) {
  for (const i of active) { const d = i.node.userData.sound; if (i.panner && d) apply3D(i.node, d, i.panner, i.src, dt || 0); }
}

// ---- anim Commands ----
// cmds = [{target, name, time}] (loader/anim.js loadAnimData().cmds). Fires those with prev < time <= now on nodes resolved under root.
export function runCommands(cmds, prev, now, root) {
  if (!cmds || !cmds.length || !root) return;
  for (const c of cmds) {
    if (!(c.time > prev && c.time <= now)) continue;
    if (c.name !== 'Play' && c.name !== 'Stop') continue; // 'Emit' targets ParticleSystem (not built yet)
    const cache = root.userData.__sndT || (root.userData.__sndT = new Map());
    let n = cache.get(c.target); if (!n) { n = resolvePath(root, c.target); if (n) cache.set(c.target, n); }
    if (!n || !n.userData.sound) continue;
    if (c.name === 'Play') playSound(n); else stopSound(n);
  }
}
// Button-style anims advanced by the owner (cur = {name,t} object replaced on every anim switch): st = {cur:null, prev:-1}
export function stepCommands(st, cur, cmds, root) {
  if (st.cur !== cur) { st.cur = cur; st.prev = -1; }
  runCommands(cmds, st.prev, cur.t, root); st.prev = cur.t;
}

// One-shot 2D by sample ref (no scene node): mouse shot 0x40b4e0 creates the channel with &DAT_005315d8 (="2D", push at 0x40b962) for data/sounds/tank_fire_bullet -> CONFIRMED 2D.
export function playRef(ref) {
  const n = new THREE.Object3D(); n.userData.sound = { ref, channel: '2D', min: 1, max: 0, loop: false, inst: null, token: 0, prev: [0, 0, 0] };
  fetchRaw('sounds', ref); return playSound(n);
}
