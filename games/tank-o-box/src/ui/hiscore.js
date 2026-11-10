// ControlHiscore + ControlEdit key handling. FORMATS.md "ENGINE: vong 11" + "DEVIATION: HISCORE_LOCALSTORAGE".
//  CONFIRMED loader attrs 0x44b7e0 (ScoreNodeName, NickNodeName, EntryCount, PlayerScorePropertyName, PlayerCount, NickPropertyName, ScorePropertyName, TopScoreCandidateMessage, ProductName, GameMode) + ControlEdit attr MaxLength 0x4510f0.
//  CONFIRMED init 0x44d5e0: EntryCount rows, row i = {nick: property NickPropertyName+i, score: property ScorePropertyName+i} (defaults from global properties; absent -> '' / 0), then candidate 0x44c6b0, then update 0x44cbc0.
//  CONFIRMED candidate 0x44c6b0: rank = upper_bound over rows (descending, 0x44aec0: advance while playerScore <= row.score, so ties go AFTER); rank >= EntryCount -> no candidate (control inert); else insert {nick:'', score} at rank and the candidate node is nick<rank>.
//  CONFIRMED update 0x44cbc0: rows sorted (0x44bb10), then node score<i> <- row.score, nick<i> <- row.nick for every i. (the 'num' nodes keep their static "1." .. "10." text.)
//  CONFIRMED ControlEdit: BackSpace 0x450c50 removes the last char (only when active +0x74 and the string is non-empty); char 0x450ee0 appends when length < MaxLength (+0x70) and the filter accepts; blink 0x450f40 (cursor char picked by parity of time +0x60).
//  CONFIRMED GCMenuSelect 0x44d490: non-empty nick -> commit row (0x4628b0), return TRUE (consumed); otherwise falls to ControlEdit.
import { setText, hasLetter } from '../render/text.js';
import { findNode } from './hud.js';
import * as CFG from '../config.js';

const num = (v, d) => { const f = parseInt(v, 10); return Number.isFinite(f) ? f : d; };
// CONFIRMED 0x450ee0 + CheckLetters 0x476aa0: accepted iff the font has its OWN Letter entry for the char (0x4d3650 exact lookup; Letter.Code(+8)==0 rejected, vong 15 CONFIRMED).
const accepts = (ch, node) => { if (ch.length !== 1) return false; const T = node && node.userData.text; return !!(T && T.font && hasLetter(T.font, ch.charCodeAt(0))); };

export class ControlHiscore {
  constructor(spec, root, g) {
    this.spec = spec; this.g = g; this.count = Math.max(0, num(spec.EntryCount, 10)); this.maxLen = num(spec.MaxLength, 20);
    this.scoreName = spec.ScoreNodeName || 'score'; this.nickName = spec.NickNodeName || 'nick';
    this.nodes = []; for (let i = 0; i < this.count; i++) this.nodes.push({ nick: findNode(root, this.nickName + i), score: findNode(root, this.scoreName + i) });
    this.storeKey = 'tankobox.hiscore.' + (spec.ProductName || '') + '.' + (spec.GameMode || '') + '.' + (spec.ScorePropertyName || '');
    this.rows = []; this.cand = -1; this.active = false; this.time = 0; this.shown = [];
    this.init();
  }
  init() { // 0x44d5e0
    const g = this.g, sn = this.spec.ScorePropertyName, nn = this.spec.NickPropertyName; const saved = this.loadStore();
    for (let i = 0; i < this.count; i++) {
      const s = saved && saved[i]; // DEVIATION HISCORE_LOCALSTORAGE overrides the property defaults (original: %local_appdata%/%app_name%/*.xml|.results via InternetHiscore 0x462430)
      this.rows.push(s ? s : { nick: String(g[nn + i] === undefined ? '' : g[nn + i]), score: num(g[sn + i], 0) });
    }
    this.candidate(); this.refresh();
  }
  // GUESS G-UI-09 (vong 17 re-checked): no data file writes Property 'ScoreTotal' and engine.exe has only strings MenuScoreTotal (0xf42a0) / ScoreTotal0 (0xf42e4); 'ScoreTotal' is probably the MSVC-pooled tail of MenuScoreTotal -> close by xref of VA(0xf42a4); use g.ScoreTotal when defined else MenuScoreTotal.
  playerScore() { const g = this.g, k = this.spec.PlayerScorePropertyName; return num(g[k] !== undefined ? g[k] : g.MenuScoreTotal, 0); }
  candidate() { // 0x44c6b0
    const sc = this.playerScore(); let r = 0; while (r < this.rows.length && sc <= this.rows[r].score) r++;
    if (r >= this.count) { this.cand = -1; this.active = false; return; }
    this.rows.splice(r, 0, { nick: '', score: sc }); this.rows.length = this.count; this.cand = r; this.active = true; // +0x1e0 node = nick<rank>, edit active (+0x74)
    // Message (+0x200 'TopScoreCandidateMessage' only for the internet Top100 check 0x4600e0): GUESS G-UI-09 offline = empty.
    this.g.TopScoreCandidateMessage = '';
  }
  loadStore() {
    if (!CFG.HISCORE_LOCALSTORAGE) return null;
    try { const a = JSON.parse(window.localStorage.getItem(this.storeKey) || 'null'); if (Array.isArray(a)) return a.slice(0, this.count).map((r) => ({ nick: String(r && r.nick || ''), score: num(r && r.score, 0) })); } catch (e) { /* no storage: render with defaults */ }
    return null;
  }
  saveStore() { if (!CFG.HISCORE_LOCALSTORAGE) return; try { window.localStorage.setItem(this.storeKey, JSON.stringify(this.rows)); } catch (e) { /* ignore */ } }
  get editing() { return this.active && this.cand >= 0; }
  // ControlEdit keys (only while active, 0x450c50 / 0x450ee0). Returns true when consumed.
  key(e) {
    if (!this.editing) return false; const row = this.rows[this.cand];
    if (e.code === 'Backspace') { if (row.nick.length) row.nick = row.nick.slice(0, -1); return true; }
    if ((e.code === 'Enter' || e.code === 'NumpadEnter')) { // GCMenuSelect 0x44d490
      if (!row.nick.length) return false; this.saveStore(); this.active = false; this.cand = -1; return true; // TRUE: consumed, row committed
    }
    if (!e.ctrlKey && !e.metaKey && !e.altKey && accepts(e.key, this.nodes[this.cand] && this.nodes[this.cand].nick) && row.nick.length < this.maxLen) { row.nick += e.key; return true; }
    return false;
  }
  update(dt) { // 0x44cbc0 + blink 0x450f40
    this.time += dt; this.refresh();
  }
  refresh() {
    const blink = this.editing && (Math.floor(this.time) % 2 === 1); // CONFIRMED 0x450f40: '_' (0x4f70c4) on odd ftol(+0x60) seconds, ' ' (0x4f70c0) on even; only while active (+0x74)
    for (let i = 0; i < this.count; i++) {
      const r = this.rows[i], n = this.nodes[i]; const nick = r.nick + (i === this.cand && blink ? '_' : ''), sc = String(r.score);
      const k = nick + '\u0001' + sc; if (this.shown[i] === k) continue; this.shown[i] = k;
      if (n.nick) setText(n.nick, nick); if (n.score) setText(n.score, sc);
    }
  }
}
