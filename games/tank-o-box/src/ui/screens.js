// .screen menus (InterfaceScreenMenu / InterfaceScreenMenuScore): scene + ControlButton / ControlLabel. FORMATS.md "XML: .screen", "ENGINE: luong man" A/B.
//  Click / alias -> UI.set_pending_link(Link) (ControlButton click 0x44a510 -> 0x43fc80; hit-test 0x442b80; menu input 0x43d7c0. 0x457610/0x4577d0 are Level-screen handlers, not button code). OptionName/OptionValue -> global property (CONFIRMED FORMATS .screen).
//  ControlHiscore: ./hiscore.js. Not implemented here: ControlInputSelector, ControlMusicMute, ControlPassword, Cursor scene, click sound, Music (see report).
//  G-UI-01 CONFIRMED: hit = HitNode 0x442b80 (see Button.hit). Button state anims = prefix + norm|high|normhigh|highnorm|disabled (0x449b40); press/release 0x449910.
import * as THREE from 'three';
import { loadScene } from '../loader/scene.js';
import { attr } from '../loader/xml.js';
import { playAnim, tickAnim, evalEnvelope, loadAnimData } from '../loader/anim.js';
import { stepCommands } from '../audio/index.js';
import { makeMusicMute } from './musicmute.js';
import { setTextEmissive } from '../render/text.js';
import { Label, findNode, loadBarAnim } from './hud.js';
import { applyScoreScreen } from './episode.js';
import { ControlHiscore } from './hiscore.js';
import { ControlPassword } from './password.js';
import { InputSelector } from './inputselector.js';

const toVal = (v) => { const f = Number(v); return v !== '' && v !== undefined && Number.isFinite(f) ? f : v; };

class Button {
  constructor(spec, root) {
    this.spec = spec; this.node = findNode(root, spec.NodeName); this.alias = spec.KeyboardAlias; this.link = spec.Link;
    this.prefix = spec.Name || ''; this.anims = {}; this.cur = { name: 'norm', t: 0 }; this.hover = false; this.pressed = false;
    this.cmds = {}; this.snd = { cur: null, prev: -1 };
    if (this.prefix && this.node) for (const s of ['norm', 'high', 'normhigh', 'highnorm', 'disabled', 'disablednorm']) { loadBarAnim(this.prefix + s + '.anim').then((a) => { this.anims[s] = a; }); loadAnimData(this.prefix + s + '.anim').then((d) => { this.cmds[s] = d.cmds; }); }
  }
  enabled(g) { const n = this.spec.PropertyEnabledName; if (!n) return true; const v = g[n]; return typeof v === 'string' ? v.length > 0 : !!v; } // GUESS G-UI-11: string property (EpisodeLink) enabled when non-empty; numbers != 0 (toVal makes numeric strings numbers)
  setHover(h) { if (h === this.hover) return; this.hover = h; this.cur = { name: h ? 'normhigh' : 'highnorm', t: 0 }; }
  update(dt, g) {
    if (!this.node) return;
    const en = this.enabled(g); let c = this.cur;
    if (c.name === 'down') { /* held while pressed */ if (!en) c = this.cur = { name: 'disabled', t: 0 }; }
    else if (!en) { if (c.name !== 'disabled') c = this.cur = { name: 'disabled', t: 0 }; }
    else if (c.name === 'disabled') c = this.cur = { name: 'disablednorm', t: 0 };
    if (c.name !== 'down') c.t += dt;
    stepCommands(this.snd, c, this.cmds[c.name], this.node); // anim <Command Target="Snd"><Execute Play Time=0/>: EmissiveButton_normhigh = click.wav on HOVER enter (FORMATS 'PORT: Audio')
    const a = this.anims[c.name];
    if (a && c.t >= a.len) { if (c.name === 'normhigh') c = this.cur = { name: 'high', t: 0 }; else if (c.name === 'highnorm' || c.name === 'disablednorm') c = this.cur = { name: 'norm', t: 0 }; }
    const an = this.anims[c.name]; if (!an) return;
    const ch = an.chans.find((x) => x.param === 'Emissive'); if (ch) setTextEmissive(this.node, evalEnvelope(ch.env, Math.min(c.t, an.len), 3));
  }
  // HitNode::hit 0x442b80 (CONFIRMED FORMATS "ENGINE: UI vong 9"): (px,py) = projection of the HitNode origin (the <HitNode Position> child of the Text, world = Text world * local Position);
  // hit iff |x-px| < Width(+0x120) and |y'-py| < Height(+0x118), NDC. Engine tests -y because its screen y points down; ndcY here is already y-up, so the sign cancels. Owner invisible (+0xcc==0) -> false.
  hit(ndcX, ndcY, camera) {
    const T = this.node && this.node.userData.text; if (!T || !T.hit) return false;
    for (let o = this.node; o; o = o.parent) if (o.visible === false) return false;
    this.node.updateWorldMatrix(true, false);
    const v = new THREE.Vector3(T.hit.position[0], T.hit.position[1], T.hit.position[2]).applyMatrix4(this.node.matrixWorld).project(camera);
    return Math.abs(ndcX - v.x) < T.hit.width && Math.abs(ndcY - v.y) < T.hit.height;
  }
  // 0x449910 press: "<cur>down","down". No *down.anim asset exists in data (only norm/high/normhigh/highnorm/disabled/disablednorm) -> GUESS: hold the current emissive (name 'down' has no clip).
  press() { this.pressed = true; this.cur = { name: 'down', t: 0 }; }
  // 0x449910 release: "<cur>high","high" then on_click. GUESS: <cur> = 'down' has no clip, so play normhigh -> high (same visible result).
  release() { const was = this.pressed; this.pressed = false; if (was) this.cur = { name: 'normhigh', t: 0 }; return was; }
}

const MusicMute = makeMusicMute(Button); // ControlMusicMute (0x45e840), src/ui/musicmute.js

export class MenuScreen {
  constructor(path, el, overlayMode) { this.path = path; this.el = el; this.tag = el.tag; this.overlayMode = overlayMode; this.buttons = []; this.labels = []; this.content = null; this.overlay = null; this.unsupported = []; this.hiscore = null; this.password = null; this.selectors = []; this.focus = -1; this.firstIsButton = false; }
  async load(g, createOverlay) {
    const el = this.el;
    // Properties are (re)initialised when the screen is created (FORMATS .screen / G-X12); the score screen then folds the score once (0x402940).
    for (const p of el.children.filter((c) => c.tag === 'Properties').flatMap((c) => c.children)) g[attr(p, 'Name')] = toVal(attr(p, 'Value', ''));
    if (this.tag === 'InterfaceScreenMenuScore') applyScoreScreen(g);
    const content = new THREE.Group(); content.name = 'screen'; this.content = content;
    if (attr(el, 'ModelName')) content.add(await loadScene(attr(el, 'ModelName'), {}));
    const ctl = el.children.find((c) => c.tag === 'Controls'); this.firstIsButton = !!(ctl && ctl.children[0] && ctl.children[0].tag === 'ControlButton');
    for (const c of ctl ? ctl.children : []) {
      const spec = { tag: c.tag, ...Object.fromEntries(Object.entries(c.attrs).map(([k, v]) => [k, Array.isArray(v) ? v[v.length - 1] : v])) };
      if (c.tag === 'ControlButton') { const b = new Button(spec, content); if (b.node) this.buttons.push(b); }
      else if (c.tag === 'ControlLabel') { const l = new Label(spec, content); if (!l.missing) this.labels.push(l); }
      else if (c.tag === 'ControlHiscore') this.hiscore = new ControlHiscore(spec, content, g);
      else if (c.tag === 'ControlPassword') this.password = new ControlPassword(c, spec, content, g); // vong 12/13, src/ui/password.js
      else if (c.tag === 'ControlInputSelector') { const b = new Button(spec, content); if (b.node) { b.selector = new InputSelector(spec, content, g); this.buttons.push(b); this.selectors.push(b.selector); } } // src/ui/inputselector.js (ControlButton child)
      else if (c.tag === 'ControlMusicMute') { const b = new MusicMute(spec, content); if (b.node) this.buttons.push(b); }
      else this.unsupported.push(c.tag);
    }
    if (attr(el, 'AnimationName')) await playAnim(content, attr(el, 'AnimationName'), { loop: false }); // looping by the envelope's own REPEAT behave
    if (this.overlayMode) this.overlay = createOverlay(content, 'menu:' + this.path);
    this.update(0, g);
    return this;
  }
  update(dt, g) { tickAnim(this.content, dt); if (this.hiscore) this.hiscore.update(dt); if (this.password) this.password.update(dt); for (const x of this.selectors) x.update(dt); for (const l of this.labels) l.update(dt, g); for (const b of this.buttons) b.update(dt, g); }
  buttonAt(ndcX, ndcY, camera, g) { for (const b of this.buttons) if (b.enabled(g) && b.hit(ndcX, ndcY, camera)) return b; return null; }
  hover(b) { for (const x of this.buttons) x.setHover(x === b); }
  byAlias(alias, g) { return this.buttons.find((b) => b.alias === alias && b.enabled(g)) || null; }
}
