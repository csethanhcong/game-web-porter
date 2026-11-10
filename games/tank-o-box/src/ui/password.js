// ControlPassword (child of ControlEdit). FORMATS.md "ENGINE: vong 12 (Password...)" + "Port ControlPassword (Phase 10 / vong 13)".
//  CONFIRMED (data + 0x452d70/0x453ab0/0x453960): <ControlPassword NodeName MaxLength Link> with <Entry Password GraphNodeName LevelName EpisodeLink EpisodeName/> children;
//   parse 0x453ab0 pushes each entry into the map this+0x84 keyed by Password (0x453960). Parent ControlEdit: BackSpace 0x450c50, char 0x450ee0 (len < MaxLength), blink 0x450f40.
//  CONFIRMED (FORMATS "Password" section, 0x452410 / 0x451da0 - these two are NOT in decomp/out/all.c, read from the earlier round): lookup map(Password) -> found: write global properties
//   EpisodeName, EpisodeLink, GraphNodeName, LevelName from the entry; not found: write empty strings. GCMenuSelect 0x451da0: global GraphNodeName non-empty -> set_pending_link(Link, 0, 0).
//  GUESS G-UI-11: the lookup runs on every text change (and once at creation: empty text -> empty properties); match is case-insensitive (CONFIRMED vong 14 0x452410);
//   the edit is active by focus (CONFIRMED vong 16 0x43de40/0x451a90/0x450b70); char filter = glyph in font (CONFIRMED 0x476aa0).
//  The real consequence of a match = btnNext enabled (PropertyEnabledName=EpisodeLink) and InterfaceScreenGame (0x449500) starting episode EpisodeLink at node GraphNodeName.
import { setText, hasLetter } from '../render/text.js';
import { attr } from '../loader/xml.js';
import { findNode } from './hud.js';
import * as CFG from '../config.js';

// CONFIRMED 0x452410 (via 0x419880/0x4194e0): key = '\\' -> '/', then CharLowerA => case-insensitive match (flag UI_PASSWORD_CASE_INSENSITIVE kept only to allow turning it off).
const fold = (s) => { const n = s.replace(/\\/g, '/'); return CFG.UI_PASSWORD_CASE_INSENSITIVE ? n.toLowerCase() : n; };
// CONFIRMED 0x450ee0 + CheckLetters 0x476aa0: char accepted iff the font has its own Letter entry for it (0x4d3650 exact lookup; Code 0 rejected, vong 15).
const accepts = (ch, node) => { if (ch.length !== 1) return false; const T = node && node.userData.text; return !!(T && T.font && hasLetter(T.font, ch.charCodeAt(0))); };

export class ControlPassword {
  // el = <ControlPassword> XML element, spec = flattened attrs
  constructor(el, spec, root, g) {
    this.g = g; this.link = spec.Link || ''; this.node = findNode(root, spec.NodeName);
    const ml = parseInt(spec.MaxLength, 10); this.maxLen = Number.isFinite(ml) ? ml : 20;
    this.map = new Map(); // 0x453960: key = Password
    for (const e of el.children.filter((c) => c.tag === 'Entry')) {
      const k = fold(attr(e, 'Password', '')); if (this.map.has(k)) continue; // std::map insert keeps the first
      this.map.set(k, { EpisodeName: attr(e, 'EpisodeName', ''), EpisodeLink: attr(e, 'EpisodeLink', ''), GraphNodeName: attr(e, 'GraphNodeName', ''), LevelName: attr(e, 'LevelName', '') });
    }
    this.active = true; // CONFIRMED 0x43de40 (screen focus: first control, vfunc+0x10 canFocus, then vfunc+0xc(1)) -> ControlPassword slot 0x451a90 -> 0x450b70(active=1). Default +0x74 = 0 (ctor 0x451140), so active from screen creation. Focus loss -> active=0 + '_' pad to MaxLength (0x451a90); never happens here (single control)
    this.text = ''; this.time = 0; this.shown = null; this.process(); this.refresh();
  }
  process() { // 0x452410
    const e = this.map.get(fold(this.text)), g = this.g;
    g.EpisodeName = e ? e.EpisodeName : ''; g.EpisodeLink = e ? e.EpisodeLink : ''; g.GraphNodeName = e ? e.GraphNodeName : ''; g.LevelName = e ? e.LevelName : '';
    this.matched = !!e;
  }
  // Returns {consumed, link?}. BackSpace 0x450c50, char 0x450ee0, GCMenuSelect 0x451da0.
  key(e) {
    if (e.code === 'Backspace') { if (this.active && this.text.length) { this.text = this.text.slice(0, -1); this.process(); } return { consumed: true }; }
    if (e.code === 'Enter' || e.code === 'NumpadEnter') { if (this.g.GraphNodeName !== '' && this.g.GraphNodeName !== undefined && this.link) return { consumed: true, link: this.link }; return { consumed: false }; }
    if (!e.ctrlKey && !e.metaKey && !e.altKey && accepts(e.key, this.node) && this.text.length < this.maxLen) { this.text += e.key; this.process(); return { consumed: true }; }
    return { consumed: false };
  }
  update(dt) { this.time += dt; this.refresh(); }
  refresh() {
    if (!this.node) return;
    const s = this.text + (this.active && Math.floor(this.time) % 2 === 1 ? '_' : ''); // CONFIRMED 0x450f40: '_' on ODD whole seconds of +0x60; ControlEdit active (+0x74) = 1 by focus (CONFIRMED 0x43de40/0x451a90)
    if (s !== this.shown) { this.shown = s; setText(this.node, s); }
  }
}
