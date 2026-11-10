// CONFIRMED (vong 17) mouse axis range Axis_X/Axis_Y = [-1,1], Y down (0x4274e0); GetCursorPos placement 0x4670d0.
// Keyboard input. Key lists are kept PER LAYOUT (GC_KeyboardLayout_1/2); a player's property (InputDevicePropertyName = "Player1InputDevice"/"Player2InputDevice", global bag)
// holds the layout name chosen in ControlInputSelector (src/ui/inputselector.js writes g.Player1InputDevice/g.Player2InputDevice). CONFIRMED: 0x40a0f0 (0x40b20e..0x40b3ba) only reads both properties at
// startup and, if either is empty, sets Player1InputDevice=GC_KeyboardLayout_1 and Player2InputDevice=GC_KeyboardLayout_2; MoveByKey/Fire read the key list of the device named by that property (FORMATS).
// GUESS G-GAME-17: two players on the SAME layout both read the same device key list (both tanks move/fire on the same keys); no engine code seen that arbitrates. Unknown layout name -> property default.
// CONFIRMED (vong 17): the key list is built by MoveByKey's OWN listener (sub-object +0x80, vtbl 0x4fb590 slot 1 = 0x490100): for each action event whose device == name in +0x94 (copied from the
// InputDevicePropertyName property by 0x48fdf0 via 0x440360 = GetProperty(name,out)): GCUp/GCRight/GCDown/GCLeft (0x4f7b94/9c/8c/a4) -> dir 0/1/2/3 (elem {4,dir}); state==1 (press): push_back ONLY IF NOT ALREADY IN the list
// (0x48fc00 find, 0x48fec0 push_back), else (release) remove every equal element (0x48fc40). Every MoveByKey instance receives every event (listener list), hence G-GAME-17 (same layout -> same keys) is CONFIRMED by structure.
// Direction list in press order; MoveByKey uses the most recent held key (0x48fca0 takes the LAST list element, FORMATS).
import * as CFG from '../config.js';
export class Input {
  constructor(target = window, globals = null) {
    this.g = globals;
    this.order = [[], []]; this.held = new Set();
    this.maps = [CFG.GAME_KEYS_P1, CFG.GAME_KEYS_P2];
    this.down = (e) => { if (e.repeat) { this.prevent(e); return; } this.held.add(e.code); for (let p = 0; p < 2; p++) { const d = this.dirOf(p, e.code); if (d >= 0) { if (!this.order[p].includes(d)) this.order[p].push(d); } } this.prevent(e); };
    this.up = (e) => { this.held.delete(e.code); for (let p = 0; p < 2; p++) { const d = this.dirOf(p, e.code); if (d >= 0) this.order[p] = this.order[p].filter((x) => x !== d); } this.prevent(e); };
    this.blur = () => { this.held.clear(); this.order = [[], []]; };
    this.target = target; target.addEventListener('keydown', this.down); target.addEventListener('keyup', this.up); target.addEventListener('blur', this.blur);
  }
  prevent(e) { if (/^(Arrow|Space|Control|Tab)/.test(e.code)) e.preventDefault(); }
  dirOf(p, code) { const m = this.maps[p]; return code === m.up ? 0 : code === m.right ? 1 : code === m.down ? 2 : code === m.left ? 3 : -1; }
  layoutOf(name) { const m = /keyboardlayout_?([12])/i.exec(String(name || '')); return m ? +m[1] - 1 : -1; }
  pl(dev) { // property name -> layout index (0 = GC_KeyboardLayout_1, 1 = _2)
    const l = this.g ? this.layoutOf(this.g[dev]) : -1; if (l >= 0) return l;
    return /2/.test(dev) ? 1 : 0; // default (0x40a0f0): Player1 -> Layout_1, Player2 -> Layout_2
  }
  lastDir(dev) { const o = this.order[this.pl(dev)]; return o.length ? o[o.length - 1] : -1; }
  fireHeld(dev) { return this.maps[this.pl(dev)].fire.some((c) => this.held.has(c)); }
  // debug / headless: simulate keys
  press(code) { this.down({ code, repeat: false, preventDefault() {} }); }
  release(code) { this.up({ code, preventDefault() {} }); }
  dispose() { this.target.removeEventListener('keydown', this.down); this.target.removeEventListener('keyup', this.up); this.target.removeEventListener('blur', this.blur); }
}
