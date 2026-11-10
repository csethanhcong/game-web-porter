// ControlInputSelector (Controls.screen / ControlsInGame.screen). FORMATS.md "ENGINE: vong 12" + "Port ControlInputSelector (vong 13)".
//  CONFIRMED on_attribute 0x44ec10: SelectorModelNode(+0xa4) HardwareModelPath(+0x98) DefaultHardwareName(+0xb4) HardwarePropertyName(+0xc0), the rest = ControlButton (0x44a030).
//  CONFIRMED init 0x450440: device name = global property HardwarePropertyName; empty -> DefaultHardwareName (and that default is written back to the property); then display_hardware.
//  CONFIRMED display_hardware 0x44fdb0: loads HardwareModelPath+name+".scene" (node "Scene" of the selector's scene node SelectorModelNode, replacing the previous one), then
//   HardwareModelPath+name+".anim" bound to that scene (errors: "Failed to load input hardware scene/animation", "Failed to bind input hardware animation").
//  CONFIRMED (partial) change 0x4505e0: walks a device list (DAT_0052bdd4) for entries of category "GameConstructor" and matches the current name, stores the new name in the property
//   and calls display_hardware. The list is the machine's real input hardware; its ordering/wrap rule was not fully read.
//  DEVIATION INPUT_DEVICES_WEB (config.js): web has only the two keyboard layouts (GC_KeyboardLayout_1/2); gamepads (Joystick_0..3.scene exist) are NOT offered.
//  CONFIRMED vong 16 0x4505e0: click = NEXT entry (cyclic, std::map name order of DAT_0052bdd4, copy 0x44ed90; current erased, rotated list = after-current then before-current, 0x44ece0) whose type
//   is "GameConstructor" (0x4f7098); no previous direction. Current name not in the list -> DefaultHardwareName (+0x1b4), then property set + display_hardware 0x44fdb0.
//   Joysticks (DirectInput 0x41dca0 -> 0x42cb40) are not "GameConstructor" type, so the engine list is exactly GC_KeyboardLayout_1/2 (the web list matches).
//  Gameplay side: the chosen name lives in g.Player1InputDevice / g.Player2InputDevice, read by pl(dev) in src/game/input.js (wired). CONFIRMED 0x40a0f0 only checks that the device name is registered and sets the
//   defaults GC_KeyboardLayout_1/2 at startup (it does not read the choice for gameplay).
import { loadScene } from '../loader/scene.js';
import { playAnim, tickAnim } from '../loader/anim.js';
import { warn } from '../loader/assets.js';
import { findNode } from './hud.js';
import * as CFG from '../config.js';

export class InputSelector {
  constructor(spec, root, g) {
    this.g = g; this.holder = findNode(root, spec.SelectorModelNode); this.path = spec.HardwareModelPath || ''; this.def = spec.DefaultHardwareName || ''; this.prop = spec.HardwarePropertyName || '';
    this.model = null; this.devices = CFG.INPUT_DEVICES_WEB; this.token = 0;
    this.init();
  }
  init() { // 0x450440
    let name = this.prop ? this.g[this.prop] : ''; if (name === undefined || name === null || name === '') { name = this.def; if (this.prop) this.g[this.prop] = name; }
    this.display(String(name));
  }
  async display(name) { // 0x44fdb0
    const tok = ++this.token; if (!this.holder) return;
    try {
      const sc = await loadScene(this.path + name + '.scene', {}); if (tok !== this.token) return;
      if (this.model) this.holder.remove(this.model);
      this.model = sc; this.holder.add(sc);
      await playAnim(sc, this.path + name + '.anim', { loop: false });
    } catch (e) { warn('ControlInputSelector.display_hardware ' + name + ': ' + (e && e.message || e)); }
  }
  next() { // 0x4505e0 CONFIRMED
    const cur = String(this.g[this.prop] || this.def); const i = this.devices.findIndex((d) => d.toLowerCase() === cur.toLowerCase());
    const n = i < 0 ? this.def : this.devices[(i + 1) % this.devices.length]; // not found -> DefaultHardwareName
    if (this.prop) this.g[this.prop] = n; this.display(n);
  }
  update(dt) { if (this.model) tickAnim(this.model, dt); }
}
