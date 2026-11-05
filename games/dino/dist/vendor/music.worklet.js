// Own minimal libopenmpt player worklet (does NOT use chiptune3's amiga-resampler ctl, which is an addition).
// BASS_MusicPlayEx(handle, order, flags 0x412, reset=1) == (re)create module and start at (order,row 0). Loops (MusicLoad flags=4).
import libopenmptPromise from './libopenmpt.worklet.js';
let lib = null; libopenmptPromise().then((m) => { lib = m; }).catch((e) => console.error(e));
class Mus extends AudioWorkletProcessor {
  constructor() {
    super(); this.file = 0; this.len = 0; this.mod = 0; this.paused = true; this.L = 0; this.R = 0; this.pending = null;
    this.port.onmessage = (e) => { const d = e.data; if (d.cmd === 'load') { this.pending = d; } else if (d.cmd === 'order') { this.order = d.o; this.start = true; } else if (d.cmd === 'pause') this.paused = true; else if (d.cmd === 'resume') this.paused = false; else if (d.cmd === 'stop') { this.paused = true; this.start = false; } };
  }
  ensure() {
    if (!lib) return false;
    if (this.pending) { const b = new Uint8Array(this.pending.buf); this.pending = null; if (this.file) lib._free(this.file); this.file = lib._malloc(b.length); lib.HEAPU8.set(b, this.file); this.len = b.length; this.port.postMessage({ cmd: 'loaded' }); }
    if (this.start && this.file) {
      this.start = false;
      if (this.mod) lib._openmpt_module_destroy(this.mod);
      this.mod = lib._openmpt_module_create_from_memory(this.file, this.len, 0, 0, 0);
      if (!this.mod) { this.port.postMessage({ cmd: 'err' }); return false; }
      if (!this.L) { this.L = lib._malloc(4 * 128); this.R = lib._malloc(4 * 128); }
      lib._openmpt_module_set_repeat_count(this.mod, -1);
      lib._openmpt_module_set_position_order_row(this.mod, this.order, 0);
      this.paused = false;
    }
    return !!this.mod;
  }
  process(_i, out) {
    if (!this.ensure() || this.paused) return true;
    const l = out[0][0], r = out[0][1];
    const n = lib._openmpt_module_read_float_stereo(this.mod, sampleRate, l.length, this.L, this.R);
    if (n > 0) { l.set(lib.HEAPF32.subarray(this.L / 4, this.L / 4 + n)); r.set(lib.HEAPF32.subarray(this.R / 4, this.R / 4 + n)); }
    return true;
  }
}
registerProcessor('dino-mo3', Mus);
