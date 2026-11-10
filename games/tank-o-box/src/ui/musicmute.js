// ControlMusicMute (0x45e840): button <Name>+notchecked|checked|hnotchecked|hchecked (+ transitions checkedhchecked, hcheckedchecked, notcheckedhnotchecked, hnotcheckednotchecked).
// CONFIRMED (FORMATS 'ENGINE: vong 12' / data): anim selection by checked(+0x13c) and hover(+0x13d); anims carry the text "MUSIC: ON" (checked) / "MUSIC: OFF" (notchecked) as WString Param=Text and the hover transitions carry <Command Target="Snd"> Play (click.wav on hover).
// CONFIRMED (audio agent, vong 17): MusicFlag = double at Music+0x28 (default 1.0); ControlMusicMute vslot 13 = 0x44a680 (checked ? 1.0 : 0.0) -> 0x44a6a0 -> 0x440b10 -> 0x4982f0 (music volume scale) + 0x440970 (store in map);
//  click 0x45eba0 flips checked(+0x13c) then calls vslot +8 = 0x44a510 and 0x45e840 (anim choice). No intermediate value/fade (only the 3 s level fade). The setting persists across sessions (UI ctor 0x442000 loads, dtor 0x4423f0 writes XML).
// GUESS (open, G-AUDIO-06): who calls vslot 13 after the flip, and the initial source of checked (port infers checked == MusicFlag > 0); after a click the hover variant of the new state is shown (pointer still over the button).
// Factory because Button lives in screens.js (avoids a circular import at class-definition time).
import { setText, setTextEmissive } from '../render/text.js';
import { evalEnvelope, loadAnimData } from '../loader/anim.js';
import { tryLoadXml } from '../loader/assets.js';
import { find, attr } from '../loader/xml.js';
import { loadBarAnim } from './hud.js';
import { getMusicFlag, toggleMusicFlag, stepCommands } from '../audio/index.js';

const NAMES = ['notchecked', 'checked', 'hnotchecked', 'hchecked', 'checkedhchecked', 'hcheckedchecked', 'notcheckedhnotchecked', 'hnotcheckednotchecked'];
const SETTLE = { checkedhchecked: 'hchecked', hcheckedchecked: 'checked', notcheckedhnotchecked: 'hnotchecked', hnotcheckednotchecked: 'notchecked' };

export function makeMusicMute(Button) {
  return class MusicMute extends Button {
    constructor(spec, root) {
      super({ ...spec, Name: '' }, root); // empty prefix: the base class must not load norm/high/... clips (they do not exist for this control)
      this.spec = spec; this.prefix = spec.Name || ''; this.checked = getMusicFlag() > 0; this.hover = false; this.pressed = false;
      this.texts = {}; this.loaded = {}; this.cur = this.mk(this.checked ? 'checked' : 'notchecked');
      if (this.node) for (const n of NAMES) {
        const p = this.prefix + n + '.anim';
        loadBarAnim(p).then((a) => { this.anims[n] = a; });
        loadAnimData(p).then((d) => { this.cmds[n] = d.cmds; });
        tryLoadXml(p).then((x) => { if (x) for (const pa of find(x, 'PrimitiveAnimation')) if (attr(pa, 'Param') === 'Text') { const k = find(pa, 'Key')[0]; if (k) this.texts[n] = attr(k, 'Value', ''); } this.loaded[n] = true; });
      }
    }
    mk(name) { return { name, t: 0, applied: false }; }
    base() { return this.checked ? 'checked' : 'notchecked'; }
    setHover(h) { if (h === this.hover) return; this.hover = h; const b = this.base(); this.cur = this.mk(h ? b + 'h' + b : 'h' + b + b); }
    press() { this.pressed = true; }
    release() { const was = this.pressed; this.pressed = false; return was; }
    onClick() { toggleMusicFlag(); this.checked = getMusicFlag() > 0; const b = this.base(); this.cur = this.mk(this.hover ? 'h' + b : b); } // activate() in ui/index.js
    update(dt) {
      if (!this.node) return; let c = this.cur; c.t += dt;
      stepCommands(this.snd, c, this.cmds[c.name], this.node);
      if (!c.applied && this.loaded[c.name]) { c.applied = true; if (this.texts[c.name] !== undefined) setText(this.node, this.texts[c.name]); }
      const a = this.anims[c.name];
      if (a && SETTLE[c.name] && c.t >= a.len) { c = this.cur = this.mk(SETTLE[c.name]); if (this.loaded[c.name] && this.texts[c.name] !== undefined) { c.applied = true; setText(this.node, this.texts[c.name]); } }
      const an = this.anims[c.name]; if (!an) return;
      const ch = an.chans.find((x) => x.param === 'Emissive'); if (ch) setTextEmissive(this.node, evalEnvelope(ch.env, Math.min(c.t, an.len), 3));
    }
  };
}
