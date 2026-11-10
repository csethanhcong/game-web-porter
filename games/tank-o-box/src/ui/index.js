// UI flow controller: session globals, episode graph, screen stack, level HUD, GameMenu overlay. FORMATS.md "ENGINE: luong man" A-D + "PORT: UI".
//  CONFIRMED: before_link 0x448fd0 (resolveLink), set_pending_link 0x43fc80 via EpisodeLink 0x454a60, UI stack pop/push 0x4426c0, GCMenuBack handler of the Level screen (0x4577d0) pushes GameMenuLink; real ControlButton click = 0x44a510, hit-test 0x442b80, menu input 0x43d7c0, score screen ctor 0x402940.
//  Fallback to MainMenu when a link/screen is missing = DEVIATION UI_LINK_FALLBACK_MENU (config.js). Focus/hover/press: CONFIRMED 0x43d7c0, 0x449910, 0x449b40.
import { attr, find } from '../loader/xml.js';
import { tryLoadXml, whenIdle, warn } from '../loader/assets.js';
import { parseEpisode, resolveLink } from './episode.js';
import { MenuScreen } from './screens.js';
import { Hud } from './hud.js';
import { createOverlay, addOverlay, removeOverlay, installOverlays } from './overlay.js';
import { createCursor } from './cursor.js';
import { playRef, setMusicProvider } from '../audio/index.js';
import * as CFG from '../config.js';

const toVal = (v) => { const f = Number(v); return v !== '' && v !== undefined && Number.isFinite(f) ? f : v; };
export const START_SCREEN = 'data/interface/MainMenu.screen'; // fallback target of DEVIATION UI_LINK_FALLBACK_MENU (G-UI-03)
function missing(what) { if (!CFG.UI_LINK_FALLBACK_MENU) throw new Error(what); warn('UI: ' + what + ' -> MainMenu (DEVIATION UI_LINK_FALLBACK_MENU)'); }
const GAME_MENU_DEFAULT = 'data/interface/GameMenu.screen'; // level GameMenuLink attr (common_tutorial.level) - used when the level has none

export function createUI({ R, loadLevel, stopLevel, canvas }) {
  installOverlays(R);
  const cursor = createCursor({ R, canvas, onShot: () => playRef('data/sounds/tank_fire_bullet') }); // 0x40b94f sound of the mouse shot (audio, GUESS G-AUDIO-07) // src/ui/cursor.js: change_cursor 0x469690 + mouse holes 0x40b4e0 (audio agent may set cursor.onShot)
  const g = {}; // session global property bag (shared by reference with World)
  const ui = { g, ep: null, epPath: null, curId: null, screen: null, menuStack: [], hud: null, mode: 'none', token: 0, exited: false, level: null, pauseLevel: null };
  let defaultsLoaded = false;

  async function ensureDefaults() { // game.screen Properties = initial session globals (FORMATS .screen; G-X12)
    if (defaultsLoaded) return; defaultsLoaded = true;
    const x = await tryLoadXml('data/interface/game.screen'); if (x) for (const p of find(x, 'Property')) g[attr(p, 'Name')] = toVal(attr(p, 'Value', ''));
  }
  const applyProps = (el) => { for (const c of el.children.filter((c) => c.tag === 'Properties')) for (const p of c.children) g[attr(p, 'Name')] = toVal(attr(p, 'Value', '')); };

  function clearScreens() {
    if (ui.hud && ui.hud.overlay) removeOverlay(R, ui.hud.overlay); ui.hud = null;
    for (const m of ui.menuStack) if (m.overlay) removeOverlay(R, m.overlay); ui.menuStack = []; ui.screen = null;
  }

  // ---- screen loading by root tag ----
  async function loadScreen(path, tok) {
    if (/\.level$/i.test(path)) return startLevel(path, tok);
    const x = await tryLoadXml(path); const el = x && x.children[0];
    if (!el) { if (path !== START_SCREEN) { missing('Failed to load screen ' + path); return loadScreen(START_SCREEN, tok); } throw new Error('MainMenu missing'); }
    if (el.tag === 'InterfaceScreenGame') { // game.screen / game_extra / game_tutorial: reset session globals, start episode at 'Start'
      applyProps(el); if (g.EpisodeLink) await startEpisode(String(g.EpisodeLink), tok); else return loadScreen(START_SCREEN, tok);
      return;
    }
    if (el.tag === 'InterfaceScreenLevelSquare') return startLevel(path, tok);
    await stopLevel(); if (tok !== ui.token) return; clearScreens();
    const s = new MenuScreen(path, el, false); await s.load(g, createOverlay); await whenIdle(); if (tok !== ui.token) return; cursor.change(attr(el, 'Cursor', ''));
    ui.screen = s; ui.mode = 'menu'; R.setContent(s.content); // the menu scene's own CameraPerspective
  }

  async function startEpisode(path, tok) {
    const x = await tryLoadXml(path); if (!x) { missing('Failed to load episode ' + path); return loadScreen(START_SCREEN, tok); }
    ui.ep = parseEpisode(x); ui.epPath = path;
    g.ScoreLifeCost = toVal(ui.ep.props.ScoreLifeCost || 500); // episode Properties (G-X12); engine default 500
    return enterNode(g.GraphNodeName ? String(g.GraphNodeName) : 'Start', tok); // 0x449500: global GraphNodeName (empty -> "Start"); set by ControlPassword
  }
  async function enterNode(id, tok) {
    const n = ui.ep && ui.ep.nodes.get(id); if (!n) { missing('Failed to find episode node: ' + id); return loadScreen(START_SCREEN, tok); }
    ui.curId = id; g.GraphNodeName = id; return loadScreen(n.screen, tok);
  }

  // set_pending_link(name) -> before_link (0x448fd0)
  async function link(name) {
    const tok = ++ui.token; const r = resolveLink(ui.ep, ui.curId, name);
    try {
      if (r.kind === 'restart') return await loadScreen(r.screen, tok);
      if (r.kind === 'load') return await loadScreen(r.path, tok);
      if (r.kind === 'node') return await enterNode(r.id, tok);
      missing('unknown episode link ' + (r.name || name)); return await loadScreen(START_SCREEN, tok);
    } catch (e) { (window.__err = window.__err || []).push('ui link ' + name + ': ' + (e && e.stack || e)); console.error(e); }
  }

  // ---- level ----
  async function startLevel(path, tok) {
    clearScreens(); ui.mode = 'level'; ui.menuOpen = false; cursor.change('data/interface/cursor'); // 0x40c470 hard-coded
    await loadLevel(path, { ui }); // main.load -> startGame(.., {ui}) -> ui.levelGlobals / onLevelStart
  }
  ui.levelGlobals = async (data) => { await ensureDefaults(); for (const k in data.properties) g[k] = toVal(data.properties[k]); ui.level = data; return g; }; // level Properties applied on screen creation
  ui.onLevelStart = async ({ data, world }) => {
    ui.world = world; ui.mode = 'level';
    const hud = new Hud(); await hud.load(data); ui.hud = hud; if (hud.overlay) addOverlay(R, hud.overlay);
  };
  ui.onLevelStop = () => { if (ui.hud && ui.hud.overlay) removeOverlay(R, ui.hud.overlay); ui.hud = null; ui.world = null; };
  ui.onFrame = (dt) => { if (ui.hud && !ui.menuOpen) ui.hud.update(dt, g); };
  ui.episodeLink = (name) => link(name);

  // ---- GameMenu (GCMenuBack in a level pushes GameMenuLink, G-X18) ----
  ui.openGameMenu = async () => {
    if (ui.mode !== 'level' || ui.menuOpen || ui.menuLoading) return; ui.menuLoading = true;
    try {
      const path = (ui.level && ui.level.gameMenuLink) || GAME_MENU_DEFAULT; const x = await tryLoadXml(path); if (!x) return;
      const s = new MenuScreen(path, x.children[0], true); await s.load(g, createOverlay); await whenIdle(); cursor.change(attr(x.children[0], 'Cursor', ''));
      ui.menuStack.push(s); addOverlay(R, s.overlay); ui.menuOpen = true; ui.screen = s; if (ui.setPause) ui.setPause(true);
    } finally { ui.menuLoading = false; }
  };
  ui.closeMenu = () => { // Return pops the stacked screen (UI update 0x4426c0 pops the top screen, the level below resumes; 'Return' is never loaded as a screen, 0x43f930 / FORMATS vong 10 muc 2)
    const s = ui.menuStack.pop(); if (s && s.overlay) removeOverlay(R, s.overlay);
    ui.screen = ui.menuStack[ui.menuStack.length - 1] || null; if (!ui.menuStack.length) { ui.menuOpen = false; if (ui.setPause) ui.setPause(false); }
  };

  // ---- activate a button ----
  async function activate(b) {
    const sp = b.spec; if (!b.enabled(g)) return;
    if (b.onClick) { b.onClick(); return; } // ControlMusicMute (src/ui/musicmute.js): flips MusicFlag
    if (b.selector) { b.selector.next(); return; } // ControlInputSelector click 0x4505e0 (G-UI-12)
    if (sp.OptionName) g[sp.OptionName] = toVal(sp.OptionValue !== undefined ? sp.OptionValue : '');
    // on_click 0x44a510: SelectLinkPropertyName non-empty and value <= 0 -> Link2, else Link; empty link -> nothing.
    const l = sp.SelectLinkPropertyName && !(Number(g[sp.SelectLinkPropertyName]) > 0) ? sp.Link2 : sp.Link; if (l === undefined || l === '') return;
    return follow(l, sp.PushScreen === 'true');
  }
  async function follow(l, push) {
    if (l === 'Return') { if (ui.menuStack.length) ui.closeMenu(); return; }
    if (l === 'Exit') { await doExit(); return; }
    if (push && ui.mode !== 'none') { // PushScreen: stacked on top (G-UI-05: pushed screen replaces the visible overlay)
      const x = await tryLoadXml(l); if (!x) return; const s = new MenuScreen(l, x.children[0], true); await s.load(g, createOverlay); await whenIdle(); cursor.change(attr(x.children[0], 'Cursor', ''));
      const top = ui.menuStack[ui.menuStack.length - 1]; if (top && top.overlay) top.overlay.visible = false;
      ui.menuStack.push(s); addOverlay(R, s.overlay); ui.screen = s; ui.menuOpen = true; return;
    }
    // leaving through a link from a stacked GameMenu: drop the stack and the level (screen replacement)
    if (ui.menuStack.length) { for (const m of ui.menuStack) if (m.overlay) removeOverlay(R, m.overlay); ui.menuStack = []; ui.menuOpen = false; }
    await link(l);
  }
  // GUESS G-UI-06: Exit (original: leave main loop / process). Web: stop level, show nothing but a message.
  async function doExit() {
    ui.exited = true; await stopLevel(); clearScreens(); ui.mode = 'exit';
    window.dispatchEvent(new CustomEvent('game-exit')); const d = document.createElement('div');
    d.style.cssText = 'position:fixed;inset:0;display:flex;align-items:center;justify-content:center;background:#000;color:#ccc;font:16px sans-serif;z-index:9';
    d.textContent = 'Game exited. Reload the page to play again.'; document.body.appendChild(d);
  }

  // ---- input (P1 only: CONFIRMED G-X21; P2 has no menu actions) ----
  // Focus is a member of each screen (0x43de40: current control at this+0x1d4, NULL on creation) - never shared between screens (N11 root cause: it used to be one closure variable).
  const cur = () => ui.screen;
  const setFocus = (s, i) => { s.focus = i; s.hover(i >= 0 ? s.buttons[i] : null); };
  const alias = (a) => { const s = cur(); const b = s && s.byAlias(a, g); if (b) activate(b); return !!b; };
  function onKey(e) {
    if (ui.exited || e.repeat) return; const s = cur();
    if (e.code === CFG.GAME_KEY_MENU) { // GCMenuBack
      if (ui.mode === 'level' && !ui.menuOpen) { ui.openGameMenu(); e.preventDefault(); return; }
      if (s && alias('GCMenuBack')) e.preventDefault(); else if (ui.menuOpen && ui.menuStack.length) { ui.closeMenu(); e.preventDefault(); } // GameMenu Esc = btnReturn alias
      return;
    }
    if (!s || !(ui.mode === 'menu' || ui.menuOpen)) return;
    const en = s.buttons.map((b, i) => (b.enabled(g) ? i : -1)).filter((i) => i >= 0);
    if (s.password) { const r = s.password.key(e); if (r.consumed) { e.preventDefault(); if (r.link) follow(r.link, false); return; } } // ControlPassword (ControlEdit keys + GCMenuSelect 0x451da0)
    if (s.hiscore && s.hiscore.key(e)) { e.preventDefault(); return; } // ControlEdit/ControlHiscore keys (0x450c50, 0x450ee0, GCMenuSelect 0x44d490 consumed when it commits)
    if (e.code === 'Enter' || e.code === 'NumpadEnter') { // GCMenuSelect
      if (s.hiscore && s.hiscore.editing) { e.preventDefault(); return; } // GUESS G-UI-09: empty nick while editing -> Enter ignored
      if (!alias('GCMenuSelect') && s.focus >= 0 && s.buttons[s.focus]) activate(s.buttons[s.focus]); e.preventDefault(); return;
    }
    const d = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.code]; // GCMenuUp/Down/Left/Right; focus walk CONFIRMED 0x43de40 (G-UI-04)
    if (d && en.length) {
      const p = en.indexOf(s.focus); let n;
      if (s.focus < 0) { // 0x43de40 focus==NULL: first control in the list takes focus whatever the direction; if it is not a focusable button, walk from it
        const first = s.firstIsButton && en[0] === 0; n = first ? 0 : (d > 0 ? en[0] : en[en.length - 1]); // GUESS: non-button first control (e.g. ControlHiscore) walked as 'before first'
      } else n = en[(p < 0 ? (d > 0 ? 0 : en.length - 1) : (p + d + en.length) % en.length)];
      setFocus(s, n); e.preventDefault();
    }
  }
  const ndc = (e) => { const r = canvas.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)]; };
  const camOf = () => { const s = cur(); if (!s) return null; if (s.overlay) return s.overlay.camera; return R.camera || null; };
  function onMove(e) {
    const s = cur(); if (!s || !(ui.mode === 'menu' || ui.menuOpen)) return; const cam = camOf(); if (!cam) return; const [x, y] = ndc(e);
    const b = s.buttonAt(x, y, cam, g); canvas.style.cursor = cursor.active() ? 'none' : (b ? 'pointer' : '');
    if (b) setFocus(s, s.buttons.indexOf(b)); // 0x43d7c0 Axis_X/Y: a hit focusable control takes focus (hover = focus); no hit -> focus unchanged
  }
  function onDown(e) {
    const s = cur(); if (!s || e.button !== 0 || !(ui.mode === 'menu' || ui.menuOpen)) return; const cam = camOf(); if (!cam) return; const [x, y] = ndc(e);
    // 0x43d7c0 "Left Button" press: only when the hit control is the focus control -> GCMenuSelect pressed (anim down).
    const b = s.buttonAt(x, y, cam, g); if (b && s.buttons.indexOf(b) === s.focus) { b.press(); pressedBtn = b; }
  }
  function onUp(e) { // release: GCMenuSelect released to the focus control -> on_click (0x449910)
    if (e.button !== 0 || !pressedBtn) return; const b = pressedBtn; pressedBtn = null; if (b.release()) activate(b);
  }
  let pressedBtn = null;
  window.addEventListener('keydown', onKey); canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mousedown', onDown); window.addEventListener('mouseup', onUp);
  ui.cursor = cursor;
  ui.dispose = () => { cursor.dispose(); window.removeEventListener('keydown', onKey); canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mousedown', onDown); window.removeEventListener('mouseup', onUp); };

  // ---- standalone loop for menu screens (level frames are driven by game/index.js -> ui.onFrame) ----
  let last = performance.now();
  const tick = (now) => {
    requestAnimationFrame(tick); const dt = Math.min(0.1, (now - last) / 1000); last = now;
    if (ui.mode === 'menu' && ui.screen) { ui.screen.update(dt, g); R.render(); }
    else if (ui.menuOpen) for (const m of ui.menuStack) m.update(dt, g);
  };
  requestAnimationFrame(tick);

  // ---- entry points ----
  ui.begin = async (path) => { const tok = ++ui.token; await ensureDefaults(); try { await loadScreen(path || START_SCREEN, tok); } catch (e) { (window.__err = window.__err || []).push('ui ' + (e && e.stack || e)); console.error(e); } };
  ui.beginEpisode = async (path) => { const tok = ++ui.token; await ensureDefaults(); for (const k in g) delete g[k]; defaultsLoaded = false; await ensureDefaults(); try { await startEpisode(path, tok); } catch (e) { (window.__err = window.__err || []).push('ui ' + (e && e.stack || e)); } };
  // Music of the TOP screen (UI::update 0x4426c0 reads +0x260; empty = keep the previous request, handled in src/audio/music.js). Top = last stacked screen, else the menu screen, else the level.
  setMusicProvider(() => {
    if (ui.exited) return '';
    const top = ui.menuStack.length ? ui.menuStack[ui.menuStack.length - 1] : (ui.mode === 'menu' ? ui.screen : null);
    if (top) return attr(top.el, 'Music', '');
    return ui.mode === 'level' && ui.level ? (ui.level.music || '') : '';
  });
  ui.state = () => ({ mode: ui.mode, curId: ui.curId, epPath: ui.epPath, screen: ui.screen && ui.screen.path, menuOpen: ui.menuOpen, stack: ui.menuStack.map((m) => m.path), g: { ...g } });
  return ui;
}
