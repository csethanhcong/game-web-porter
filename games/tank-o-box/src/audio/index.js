// Audio module entry (Phase 9). Owner: src/audio/**. FORMATS.md "PORT: Audio".
import * as CFG from '../config.js';
import { E, installUnlock, running } from './engine.js';
import { tickSfx } from './sfx.js';
import { updateMusic, M } from './music.js';
export { makeSoundNode, registerListener, playRef, playSound, stopSound, stopTree, stopAll, runCommands, stepCommands } from './sfx.js';
export { setMusicProvider, getMusicFlag, setMusicFlag, toggleMusicFlag } from './music.js';

installUnlock();
let last = performance.now();
function loop(now) { requestAnimationFrame(loop); const dt = Math.min(0.1, (now - last) / 1000); last = now; tickSfx(dt); updateMusic(dt); }
requestAnimationFrame(loop);

if (CFG.DEBUG_HOOKS) window.__audio = { state: () => ({ ctx: E.ctx ? E.ctx.state : 'none', running: running(), stats: E.stats, music: { requested: M.requested, current: M.current, level: +M.level.toFixed(3), flag: M.flag, gain: +Math.sqrt(Math.max(0, Math.min(1, M.level)) * M.flag).toFixed(4), nodeGain: E.musicGain ? +E.musicGain.gain.value.toFixed(4) : null, playing: M.playing, xm: M.xm, switches: M.switches }, log: E.log.slice(-40) }) };
