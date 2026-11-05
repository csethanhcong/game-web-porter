// Main menu system replicating DinoAndAliens.exe: menu tree (menu.txt/menutext.txt, FUN_004295a0), main menu draw FUN_00428770, option-list style FUN_004284f0,
// new game FUN_004266c0, audio FUN_004279e0, other FUN_00425a70, keyboard FUN_00427740, input FUN_0042a220 / mouse FUN_00429170, actions FUN_0042ab00.
// Look constants are from the exe (see comments); items marked GUESS are not decoded. Export API kept: menu.{open,init,show,hide,inGame}.
import { txt } from './formats.js';
import { play, getMusicVol, setMusicVol, getSoundVol, setSoundVol, startTrack } from './audio.js';
import * as G from './menugfx.js';
import { demoLeftSec } from './hud.js';
import { UNLOCK_ALL, DEMOS, demoUrl } from './config.js';
import * as S from './screens.js'; // credits / info pages / joystick / video / logo / loading

// ---- original data ----
const NODES = { // menu.txt (CONFIRMED); 'main' is built from section "demomain" (FUN_0042a... strcpy "main")
  main: UNLOCK_ALL ? ['new game', 'options', 'info', 'exit'] : ['new game', 'buynow', 'options', 'demo', 'info', 'exit'],
  'new game': ['start', 'back'], // main: full game has no buynow/demo (UNLOCK_ALL)
  options: ['video', 'audio', 'keyboard', 'joystick', 'other', 'back'], info: ['history', 'bonuses', 'monsters', 'credits', 'back'],
  history: ['back'], monsters: ['back'], bonuses: ['back'], credits: ['back'],
  audio: ['apply', 'default'], other: ['apply', 'default'], keyboard: ['apply', 'default', 'cancel'], joystick: ['apply', 'default', 'cancel'], video: ['apply', 'default', 'cancel'],
  gameplay: ['resume game', 'restart level', 'options', 'main'],
  defeat: ['restart level', 'replay', 'main'], victory: ['next level', 'replay', 'restart level', 'main'], replaywin: ['resumereplay', 'next level', 'restart level', 'main'], replayloss: ['resumereplay', 'restart level', 'main'], // menu.txt CONFIRMED (FUN_00413de0 opens them)
  congratulations: ['okay'], gamenag: ['getfullversion', 'later'], startmenunag: ['getfullversion', 'later'], levelpassnag: ['getfullversion', 'later'], startgamenag: ['getfullversion', 'later'], gameplaynag: ['getfullversion', 'later'], endtrialnag: ['getfullversion', 'later'], congratulationsnag: ['getfullversion', 'later'], exitgamenag: ['getdino', 'demoexit'], // menu.txt
};
const PARENT = { 'new game': 'main', options: 'main', info: 'main', history: 'info', monsters: 'info', bonuses: 'info', credits: 'info', audio: 'options', other: 'options', keyboard: 'options', joystick: 'options', video: 'options' };
const BAR = new Set(['audio', 'other', 'keyboard', 'joystick', 'video']); // draw FUN_004284f0(0.85, 1)
// packs: numpack from .lev heads, sorted by difficulty (scanner decomp ~31300). Titles = .lev name=.
const PACKS = [
  ['pack1', [['tutorial01', 'BASIS'], ['tutorial02', 'MORE EXPERIENCE'], ['tutorial03', 'EXAMINATION']]],
  ['pack2', [['p01_l01', 'THE BEGINNING'], ['p01_l02', 'SNIPER AND LASER'], ['p01_l03', 'MIRRORS'], ['p01_l04', 'SNIPERS ATTACK'], ['p01_l05', 'LONGWISES ATTACK']]],
  ['pack3', [['p02_l01', 'SPIRAL'], ['p02_l02', 'BOMBLESS'], ['p02_l03', 'MEETING WITH BOUNCER'], ['p02_l04', 'HAT AND CLOCK'], ['p02_l05', 'ISLAND OF BOUNCERS'], ['p02_l06', 'HARD CHOICE'], ['p02_l07', 'BOXES AND LASERS'], ['p02_l08', 'BIG HARDSHIP'], ['p02_l09', 'BUT AND BEN'], ['p02_l10', 'GREENFIELD']]],
  ['pack4', [['p03_l01', 'RUN, DINO, RUN'], ['p03_l02', 'TROUBLES WITH BARRELS'], ['p03_l03', 'SWAMP'], ['p03_l04', 'CALCULATED RISK'], ['p03_l05', 'HUNT'], ['p03_l06', 'ROCKFIELD'], ['p03_l07', 'DRY GARDEN'], ['p03_l08', 'THE BARREL'], ['p03_l09', 'ISLANDS'], ['p03_l10', 'DIRECT HIT'], ['p03_l11', 'LASER CORRIDOR'], ['p03_l12', 'UNREAL PLACE'], ['p03_l13', 'BIG MAZE'], ['p03_l14', 'BRAIN POWER'], ['p03_l15', 'LAKES']]],
  ['pack5', [['p04_l01', 'LOCKED TELEPORT'], ['p04_l02', 'ARENA 1'], ['p04_l03', 'FULL SPEED'], ['p04_l04', 'HARDCORE'], ['p04_l05', 'LAST TROUBLE']]],
];
const NPACK = PACKS.length; // DAT_0060fdfc; the final "DOWNLOAD..." entry (index NPACK) is shown by the exe (FUN_0042b820 opens a URL: N/A on web)
const DEMO_GATE = !UNLOCK_ALL && false; // exe demo: packs >= 2 show "startmenunag". DELIBERATE DEVIATION: all packs allowed.
// DirectInput scancode defaults FUN_0043f600 (CONFIRMED) -> order: setbomb,nextweapon,usething,left,right,up,down,fastbomb1-3,dance,zoomin,zoomout
const KEYORDER = ['setbomb', 'nextweapon', 'usething', 'left', 'right', 'up', 'down', 'fastbomb1', 'fastbomb2', 'fastbomb3', 'dance', 'zoomin', 'zoomout'];
const DEFKEYS = [0x1d, 0x2a, 0x39, 0xcb, 0xcd, 0xc8, 0xd0, 0x10, 0x11, 0x12, 0x20, 0xc9, 0xd1];
const DIK = { 1: ['Escape', 'ESCAPE'], 0x0c: ['Minus', 'MINUS'], 0x0d: ['Equal', 'EQUALS'], 0x0e: ['Backspace', 'BACKSPACE'], 0x0f: ['Tab', 'TAB'], 0x1a: ['BracketLeft', '['], 0x1b: ['BracketRight', ']'],
  0x1c: ['Enter', 'ENTER'], 0x1d: ['ControlLeft', 'LEFT CONTROL'], 0x27: ['Semicolon', ';'], 0x28: ['Quote', "'"], 0x29: ['Backquote', '`'], 0x2a: ['ShiftLeft', 'LEFT SHIFT'], 0x2b: ['Backslash', '\\'],
  0x33: ['Comma', ','], 0x34: ['Period', '.'], 0x35: ['Slash', '/'], 0x36: ['ShiftRight', 'RIGHT SHIFT'], 0x38: ['AltLeft', 'LEFT ALT'], 0x39: ['Space', 'SPACE'], 0x3a: ['CapsLock', 'CAPS LOCK'],
  0x9d: ['ControlRight', 'RIGHT CONTROL'], 0xb8: ['AltRight', 'RIGHT ALT'], 0xc7: ['Home', 'HOME'], 0xc8: ['ArrowUp', 'UP'], 0xc9: ['PageUp', 'PAGE UP'], 0xcb: ['ArrowLeft', 'LEFT'], 0xcd: ['ArrowRight', 'RIGHT'],
  0xcf: ['End', 'END'], 0xd0: ['ArrowDown', 'DOWN'], 0xd1: ['PageDown', 'PAGE DOWN'], 0xd2: ['Insert', 'INSERT'], 0xd3: ['Delete', 'DELETE'] };
'1234567890'.split('').forEach((c, i) => { DIK[2 + i] = ['Digit' + c, c]; });
'QWERTYUIOP'.split('').forEach((c, i) => { DIK[0x10 + i] = ['Key' + c, c]; });
'ASDFGHJKL'.split('').forEach((c, i) => { DIK[0x1e + i] = ['Key' + c, c]; });
'ZXCVBNM'.split('').forEach((c, i) => { DIK[0x2c + i] = ['Key' + c, c]; });
for (let i = 0; i < 10; i++) DIK[0x3b + i] = ['F' + (i + 1), 'F' + (i + 1)];
const CODE2DIK = {}; for (const k in DIK) CODE2DIK[DIK[k][0]] = +k;
const store = (k, d) => { try { const v = JSON.parse(localStorage.getItem(k)); return v == null ? d : v; } catch (e) { return d; } };
const save = (k, v) => { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} };
let keys = store('dino_keys', DEFKEYS).slice(0, 13); if (keys.length !== 13) keys = DEFKEYS.slice();
let other = store('dino_other', { fps: 0, time: 0 }); // DAT_0060fdf8 showfps / DAT_0061cd90 showleveltime
let pass = store('dino_pass', {}); // DAT_0061cc10 pass flags
const isPassed = (p, l) => !!(pass[p] && pass[p][l]);
const passCount = (p) => (pass[p] ? pass[p].filter(Boolean).length : 0);
const unlocked = (p, l) => UNLOCK_ALL || l + 1 <= 3 + passCount(p); // FUN_0042b2e0: first 3 + passed count

// ---- labels ----
const lbl = {};
txt('texts/menutext.txt').then((t) => { for (const l of t.split(/\r?\n/)) { const m = l.match(/^([^=\[\]]+)=(.*)$/); if (m) lbl[m[1].toLowerCase()] = m[2]; } });
const L = (k) => (lbl[k] ?? '').toUpperCase().replace(/^\s+|\s+$/g, (m) => m); // missing key -> empty string (FUN_0043e260)

// ---- state ----
const ING = new Set(['gameplay', 'defeat', 'victory', 'replaywin', 'replayloss']);
let onStart = null, resume = null, scr = 'main', t0 = 0, closing = 0, isOpen = false, raf = 0, inGame = false;
let sel = 0, wsel = -1, items = [], widgets = [], hits = [], packHits = [];
let pack = 0, level = 0, prevPack = 0, prevLevel = 0, fade = 0;
let edKeys = keys.slice(), capture = -1, edSfx = 0, edMus = 0, edOther = { ...other };
// Joystick settings CONFIRMED FUN_0043f190/FUN_0042b160: DAT_0049e1d0 enabled (default 1), DAT_0049e1d4 sensitivity float (default 0.5; slider 0..30 -> value/30), DAT_0065337c[3] button index for FIRE/NEXT WEAPON/USE (default 0,1,2 FUN_0043f5d0); 'apply' copies edit->live, 'default' resets both.
const JOYDEF = () => ({ en: 1, sens: 0.5, btn: [0, 1, 2] });
const loadJoy = () => { const j = store('dino_joy', null); return j && Array.isArray(j.btn) && j.btn.length === 3 ? { en: j.en ? 1 : 0, sens: +j.sens, btn: j.btn.map(Number) } : JOYDEF(); };
let joy = loadJoy(), edJoy = { ...joy, btn: joy.btn.slice() }, joyWait = -1; // joyWait = row waiting for a button press (DAT_0056e4f0)
let mouse = { x: 0, y: 0 };

function go(s, dir) {
  scr = s; sel = 0; wsel = -1; t0 = performance.now(); capture = -1;
  if (s === 'keyboard') edKeys = keys.slice();
  if (s === 'joystick') { edJoy = { ...joy, btn: joy.btn.slice() }; joyWait = -1; }
  if (s === 'other') edOther = { ...other };
  if (s === 'main') startTrack(3);
  S.enter(s);
  if (s === 'credits') startTrack(1); // FUN_0042b2e0: credits track 1 (FUN_00434e60(1)); leaving restores 3
}
function offset(now) { // CONFIRMED FUN_00428cc0: open 900 ms |cos((1-c)^2*2pi)*c^2*600|, close 300 ms (t/300)^2*600
  if (closing) { const t = Math.min(1, (now - closing) / 300); return t * t * 600; }
  const c = 1 - Math.min(1, (now - t0) / 900); return Math.abs(Math.cos((1 - c) * (1 - c) * 2 * Math.PI) * c * c * 600);
}
const regItem = (x0, top, x1, bottom) => hits.push([x0, top, x1, bottom]); // FUN_00424950

// ---- drawing ----
function drawMain(its, off) { // FUN_00428770 (CONFIRMED asm)
  const S = 22, N = its.length; let maxW = 0;
  for (let i = 0; i < N; i++) maxW = Math.max(maxW, G.tw(L(its[i]), S));
  const W = maxW + 60, x = 230 - Math.trunc(W / 2), top = Math.trunc(off) + 180;
  G.panelOrn({ x, top, w: Math.trunc(W), h: Math.trunc(2 * S * 0.75 * (N - 2) + S + 60) }, 0);
  let y = top - 30 - 0.7 * S;
  for (let i = 0; i < N - 1; i++) {
    const w = G.tw(L(its[i]), S), tx = 0.8 * S + 230 - w * 0.5;
    if (sel === i) G.textHi(L(its[i]), tx, y, S, pulse()); else G.text(L(its[i]), tx, y, S);
    regItem(tx - S, 0.75 * S * 1.2 + y, tx + maxW, y - 0.75 * S * 0.8);
    y -= 2 * S * 0.75;
  }
  const k = N - 1, w2 = G.tw(L(its[k]), S) + 60; y -= 54;
  G.panelBtn({ x, top: Math.trunc(y), w: Math.trunc(w2), h: 60 });
  y -= 34.5; const tx = 0.8 * S + x + 30;
  if (sel === k) G.textHi(L(its[k]), tx, y, S, pulse()); else G.text(L(its[k]), tx, y, S);
  regItem(tx - S, 0.75 * S * 1.2 + y, tx + w2 - 60, y - 0.75 * S * 0.8);
}
function drawList(its, s, mode, off, cx = 220, top0 = 180) { // FUN_004284f0(scale, mode)
  const S = 22 * s, m = 30 * s, N = its.length; let maxW = 0;
  for (const it of its) maxW = Math.max(maxW, G.tw(L(it), S));
  const W = 2 * m + maxW, x = cx - Math.trunc(W / 2), top = Math.trunc(off) + top0;
  G.panelOrn({ x, top, w: Math.trunc(W), h: Math.trunc(2 * S * 0.75 * (N - 1) + S + 2 * m) }, mode); // height GUESS (analogue of FUN_00428770)
  const tx = S * 0.8 + x + m; let y = top - m - S * 0.7;
  its.forEach((it, i) => {
    if (sel === i) G.textHi(L(it), tx, y, S, pulse()); else G.text(L(it), tx, y, S);
    regItem(tx - S, S * 0.75 * 1.2 + y, tx + W - 2 * m, y - S * 0.75 * 0.8); y -= 2 * S * 0.75;
  });
}
const pulse = () => 0.6 + 0.4 * (Math.sin(performance.now() * 0.008) * 0.5 + 0.5); // FUN_00424a70 pulse sin(t*0.008); alpha mapping GUESS
function slider(x0, x1, y, val, max, id) { // FUN_00437a40 (arrows/knob offsets approximate)
  const step = (x1 - x0) / (max - 1);
  G.sprite(4, (x0 + x1) / 2, y, 0.5); // track, scale 0.5 (CONFIRMED). GUESS: stretch between ends
  G.sprite(0xb, x0 - 21, y); G.sprite(0xc, x1 + 21, y); G.sprite(0x10, x0 + step * val, y);
  widgets.push({ id, type: 0, x0, x1, y, max, val, rect: [x0 - 42, y + 15, x1 + 42, y - 15], step });
}
function checkbox(x, y, id, on) { G.sprite(0x12 - (on ? 1 : 0), x, y); widgets.push({ id, type: 1, rect: [x - 21, y + 21, x + 21, y - 21], x, y }); }

function drawAudio(off) { // FUN_004279e0
  const top = Math.trunc(off) + 180;
  G.panelOrn({ x: -275, top, w: 350, h: 200 }, 0);
  G.text(L('sfxvolume'), -100, top - 50, 15, true);
  slider(-180, -20, top - 75, Math.trunc(getSoundVol() / 10), 10, 'sfx'); // value = vol/10, max 10 (CONFIRMED)
  G.text(L('musicvolume'), -100, top - 125, 15, true);
  slider(-180, -20, top - 150, Math.trunc(getMusicVol() / 10), 10, 'mus');
}
function drawOther(off) { // FUN_00425a70
  const top = Math.trunc(off) + 180;
  G.panelOrn({ x: -320, top, w: 380, h: 180 }, 0);
  checkbox(-130, top - 60, 'time', !!edOther.time); G.text(L('showleveltime'), -130 + 40, top - 60, 16); // CONFIRMED FUN_00425a70: 1st = showleveltime (DAT_0060fdf8), 2nd = showfps (DAT_0061cd90)
  checkbox(-130, top - 120, 'fps', !!edOther.fps); G.text(L('showfps'), -130 + 40, top - 120, 16);
}
function drawKeyboard(off) { // FUN_00427740 (panel/row numbers CONFIRMED; key-name x GUESS)
  const top = Math.trunc(off) + 180;
  G.panelOrn({ x: -285, top, w: 370, h: 320 }, 0);
  KEYORDER.forEach((k, i) => {
    const y = top - 40 - 20 * i, lab = L(k);
    G.text(lab, -100 - G.tw(lab, 14), y, 14);
    const nm = capture === i ? '_' : (DIK[edKeys[i]] ? DIK[edKeys[i]][1] : '?');
    if (capture === i || wsel === i) G.textHi(nm, -100 + 28, y, 14, pulse()); else G.text(nm, -100 + 28, y, 14);
    widgets.push({ id: 'k' + i, type: 2, idx: i, rect: [-285, y + 10, 85, y - 10] });
  });
}
const BTNS = { start: 0, back: 1 };
function drawNewGame(off) { // FUN_004266c0 (numbers from asm; unknown-constant spots noted)
  const top = Math.trunc(off) + 180, S = 22, P = PACKS[pack];
  const nl = P ? P[1].length : 0;
  // buttons START (item 0) / BACK (item 1)
  const bt = top - 270 - 53;
  [['start', -145 - 160, 0], ['back', 205 - 115, 1]].forEach(([k, bx, i]) => {
    const w = G.tw(L(k), S) + 60; G.panelBtn({ x: bx, top: Math.trunc(bt), w: Math.trunc(w), h: 60 });
    const tx = S * 0.8 + bx + 30, ty = bt - 34.5;
    if (sel === i) G.textHi(L(k), tx, ty, S, pulse()); else G.text(L(k), tx, ty, S);
    regItem(tx - S, S * 0.75 * 1.2 + ty, tx + w - 60, ty - S * 0.75 * 0.8);
  });
  G.panelOrn({ x: -145 - 160, top, w: 320, h: 270 }, 2); G.panelOrn({ x: 205 - 115, top, w: 230, h: 270 }, 0);
  if (pack < NPACK) {
    G.sprite(0xb, -245, top - 40, 1.2); widgets.push({ id: 'lprev', type: 4, rect: [-245 - 21, top - 40 + 21, -245 + 21, top - 40 - 21] });
    G.sprite(0xc, -45, top - 40, 1.2); widgets.push({ id: 'lnext', type: 5, rect: [-45 - 21, top - 40 + 21, -45 + 21, top - 40 - 21] });
    G.text(`${L('level')} ${level + 1} / ${nl}`, -145, top - 40 - 3, 16, true);
    const ly = top - 135, url = `${__B}assets/preview/${P[1][level][0]}.jpg`;
    G.image(G.getImg(url), -145, ly, 100, 75); // FUN_00436040 200x150 (crossfade over 200 ms in exe, FUN_004266c0; fade GUESS: omitted)
    const st = isPassed(pack, level) ? L('completed') : unlocked(pack, level) ? L('notpassedyet') : L('notavailable');
    G.text(st, -145, ly - 65, 9, true); G.text(P[1][level][1], -145, ly - 100, 16, true);
  } else { G.text(S.block('startdownload') || L('download'), -145, top - 40 + 3, 16, true); // CONFIRMED FUN_004266c0 @18714: the download pack shows the [startdownload/] block (FUN_00435ff0, S=16, y+3); the line spacing of the multi-line text is GUESS (same as G.text)
 G.image(G.getImg(__B + 'assets/preview/download.jpg'), -145, top - 135, 100, 75); }
  // pack list (S=19, step 28, alpha 0x9b for packs>=2 in the demo)
  let y = top - (270 - NPACK * 28) / 2; packHits = [];
  for (let i = 0; i <= NPACK; i++) {
    const name = i === NPACK ? L('download') : L(PACKS[i][0]), a = (DEMO_GATE && i >= 2 && i < NPACK) ? 0x9b / 255 : 1;
    const tx = 215 - G.tw(name, 19) / 2 + 19 * 0.2; // FUN_00435de0 centred highlight
    if (i === pack) G.textHi(name, 215 - G.tw(name, 19) / 2 + 9.5, y, 19, pulse()); else G.text(name, 215, y, 19, true, a);
    packHits.push([i, 215 - 60, y + 19, 215 + 60, y - 19]); y -= 28;
  }
}

function frame(now) {
  if (!isOpen) return; raf = requestAnimationFrame(frame);
  if (logoOn) { G.begin(); hits = []; widgets = []; if (S.drawLogo(now)) { logoOn = false; t0 = now; startTrack(3); } return; } // FUN_004187a0 -> main menu
  if (closing && now - closing >= 300) { finishClose(); return; }
  if (joyWait >= 0 && navigator.getGamepads) { // FUN_0043f970: first pressed joystick button index (scan 0..0x7f)
    for (const gp of navigator.getGamepads()) { if (!gp) continue; const i = gp.buttons.findIndex((b) => b.pressed); if (i >= 0) { menu.joyAssign(i); break; } }
  }
  G.begin(); hits = []; widgets = []; packHits = [];
  const off = offset(now);
  if (!inGame || !ING.has(scr)) G.image(G.logo(), -300, -220, 100, 100); // FUN_00419940: FUN_00436040(-300,-220,100,100,menulogo)
  if (!UNLOCK_ALL && (scr === 'main' || ING.has(scr))) { G.text('DEMO VERSION', 250, -258, 16); G.text(String(Math.trunc(demoLeftSec() / 60)), 250, -280, 16); G.text('MIN. LEFT', 283, -280, 16); } // FUN_0041af20 CONFIRMED: (250,-258) / "%u" minutes (250,-280) / "MIN. LEFT" (283,-280), S16; DAT_0060fe10 source = GUESS (hud demoMs)
  const key = scr;
  if (key === 'main') drawMain(items, off);
  else if (ING.has(key)) drawList(items, 1, 0, off);
  else if (key === 'new game') drawNewGame(off);
  else if (key === 'audio') drawAudio(off); else if (key === 'other') drawOther(off);
  else if (key === 'keyboard') drawKeyboard(off); else if (key === 'video') S.drawVideo(E, off);
  else if (key === 'joystick') S.drawJoystick(E, off);
  else if (S.isNag(key)) S.drawNag(E, key, items, off); else if (S.isInfo(key)) S.drawInfo(E, key, off); else if (key === 'credits') S.drawCredits(E, now);
  else drawMain(items, off); // options / info use the generic list draw (FUN_00428cc0 default branch)
  if (BAR.has(key)) drawList(items, 0.85, 1, off); // FUN_004284f0(0.85, 1)
  // selected widget highlight FUN_00424a70
  if (wsel >= 0 && widgets[wsel]) { const r = widgets[wsel].rect; G.glow(r[0], r[1], r[2], r[3], 0.25 + 0.25 * Math.sin(now * 0.008)); }
  // cursor FUN_00437d70: red arrow, yellow when hovering something
  G.sprite(hoverAny() ? 0x14 : 0x13, mouse.x + 9, mouse.y - 12, 0.6);
}
let logoOn = false, logoShown = false; // logo screen runs once at start (no ?level)
const E = { joy: { get ed() { return edJoy; }, get wait() { return joyWait; }, set wait(v) { joyWait = v; } }, packName: () => (PACKS[pack] ? L(PACKS[pack][0]) : ''), G, L, slider, checkbox, regItem, get widgets() { return widgets; }, sel: () => sel, pulse, scr: () => scr };
const hoverAny = () => hits.some((h) => inR(h, mouse)) || widgets.some((w) => inR(w.rect, mouse)) || packHits.some((h) => inR(h.slice(1), mouse));
const inR = (r, p) => p.x >= r[0] && p.x <= r[2] && p.y <= r[1] && p.y >= r[3];

// ---- actions ----
function setItems() { items = NODES[scr]; }
function back() { if (scr === 'main' || ING.has(scr)) return; if (scr === 'credits') startTrack(3); let p = PARENT[scr] || 'main'; if (p === 'main' && inGame) p = 'gameplay'; go(p); setItems(); }
function act(key) { // FUN_0042ab00
  play('menu');
  switch (key) {
    case 'new game': go('new game'); setItems(); break;
    case 'options': case 'info': case 'video': case 'audio': case 'keyboard': case 'joystick': case 'other': case 'history': case 'bonuses': case 'monsters': case 'credits': go(key); setItems(); break;
    case 'back': case 'cancel': back(); break;
    case 'apply': if (scr === 'joystick') { joy = { ...edJoy, btn: edJoy.btn.slice() }; save('dino_joy', joy); } if (scr === 'keyboard') { keys = edKeys.slice(); save('dino_keys', keys); } if (scr === 'other') { other = { ...edOther }; save('dino_other', other); } back(); break;
    case 'default': // FUN_0042b160
      if (scr === 'joystick') { joy = JOYDEF(); edJoy = JOYDEF(); joyWait = -1; save('dino_joy', joy); } else if (scr === 'keyboard') edKeys = DEFKEYS.slice(); else if (scr === 'audio') { setSoundVol(50); setMusicVol(50); } else if (scr === 'other') edOther = { fps: 0, time: 0 }; else if (scr === 'video') { save('dino_gamma', 25); save('dino_vsync', 0); }
      break;
    case 'start': startLevel(); break;
    case 'resume game': menu.hide(); break;
    case 'restart level': try { sessionStorage.removeItem('dino_rec'); } catch (e) {} location.reload(); break; // FUN_0042ab00: DAT_004d6d14=1
    case 'next level': try { sessionStorage.removeItem('dino_rec'); } catch (e) {} if (menu.nextLevel) location.search = '?level=' + menu.nextLevel; else location.reload(); break; // FUN_0042ab00 level+1 (wrap)
    case 'resumereplay': menu.hide(); break; // CONFIRMED FUN_0042ab00: 'resume game' and 'resumereplay' both call FUN_00413de0 (toggle = close menu + unpause)
    case 'replay': try { sessionStorage.setItem('dino_replay', '1'); } catch (e) {} location.reload(); break; // FUN_00413f80 -> DAT_0055970e: restart level and play back the recorded input (recording lives in main.js)
    case 'main': try { if (scr === 'victory' && menu.nextLevel) sessionStorage.setItem('dino_next', menu.nextLevel); } catch (e) {} location.search = ''; break; // victory + main -> main menu preselects the next level
    case 'exit': try { window.close(); } catch (e) {} break; // FUN_00413fc0 quit flag; N/A on web
    case 'okay': case 'later': back(); break; // nags / congratulations (FLAGS in screens.js); getfullversion/getdino/demoexit open a store URL: N/A on web
    case 'buynow': if (!UNLOCK_ALL && S.FLAGS.nags) { go('startgamenag'); setItems(); } break;
    case 'demo': location.search = demoUrl(Math.floor(Math.random() * DEMOS.length)); break; // CONFIRMED FUN_0042ab00 'demo' -> FUN_00413fa0 (DAT_00559718) -> FUN_00413a70: random .rec from the list, level started with DAT_0061dea8=1 (replay)
  }
}
function startLevel() { // "start": FUN_0042ab00 (pack < 2 starts; DEMO_GATE off)
  if (pack >= NPACK) return;
  if (!unlocked(pack, level)) return; // start inert when locked (CONFIRMED)
  isOpen = false; cv_hide(); onStart && onStart(PACKS[pack][1][level][0]);
}
const cv_hide = () => { cancelAnimationFrame(raf); G.cv.style.display = 'none'; };
function finishClose() { isOpen = false; closing = 0; cv_hide(); resume && resume(); }
function sliderSet(w, v) {
  if (S.slide(w, Math.max(0, Math.min(w.max - 1, v)), E)) return;
  v = Math.max(0, Math.min(w.max - 1, v));
  if (w.id === 'sfx') { if (v * 10 !== getSoundVol()) { setSoundVol(v * 10); play('chpok1'); } } else if (w.id === 'mus') setMusicVol(v * 10);
  else if (w.id === 'gamma') save('dino_gamma', v);
}
function widgetClick(w, p) {
  if (S.widget(E, w)) return;
  if (w.type === 0) { if (p.x < w.x0) sliderSet(w, w.val - 1); else if (p.x > w.x1) sliderSet(w, w.val + 1); else sliderSet(w, Math.round((p.x - w.x0) / w.step)); play('menu'); }
  else if (w.type === 1) { if (w.id === 'fps') edOther.fps = edOther.fps ? 0 : 1; else if (w.id === 'time') edOther.time = edOther.time ? 0 : 1; else save('dino_vsync', store('dino_vsync', 0) ? 0 : 1); play('menu'); }
  else if (w.type === 2) { capture = capture === w.idx ? -1 : w.idx; play('menu'); }
  else if (w.type === 4) { changeLevel(-1); } else if (w.type === 5) { changeLevel(1); }
}
function changeLevel(d) { const n = PACKS[pack][1].length; level = (level + d + n) % n; play('menu'); }
function setPack(p) { pack = (p + NPACK + 1) % (NPACK + 1); level = Math.min(level, pack < NPACK ? PACKS[pack][1].length - 1 : 0); play('menu2'); }

// ---- input ----
function pt(e) { const r = G.toUI(e.clientX, e.clientY); mouse = r; return r; }
G.cv.addEventListener('pointermove', (e) => { // FUN_00429170 hover
  const p = pt(e); const i = hits.findIndex((h) => inR(h, p));
  if (i >= 0 && i !== sel) { sel = i; wsel = -1; play('menu2'); }
  const w = widgets.findIndex((x) => inR(x.rect, p)); if (w >= 0) wsel = w;
});
G.cv.addEventListener('pointerdown', (e) => {
  const p = pt(e); if (closing) return;
  const i = hits.findIndex((h) => inR(h, p)); if (i >= 0) { sel = i; act(items[i]); return; }
  const w = widgets.find((x) => inR(x.rect, p)); if (w) { widgetClick(w, p); return; }
  if (scr === 'new game') { const h = packHits.find((x) => inR(x.slice(1), p)); if (h) { pack = h[0]; level = Math.min(level, pack < NPACK ? PACKS[pack][1].length - 1 : 0); play('menu2'); } }
});
addEventListener('keydown', (e) => { // FUN_0042a220
  if (!isOpen || closing || logoOn) return;
  if (capture >= 0) { // key assignment (DirectInput scancode capture, FUN_0043f8f0)
    e.preventDefault(); e.stopImmediatePropagation();
    const d = CODE2DIK[e.code]; if (d && e.code !== 'Escape') edKeys[capture] = d; capture = -1; return;
  }
  const n = items.length, k = e.code; let used = true;
  if (k === 'ArrowDown') { if (scr === 'new game') setPack(pack + 1); else { sel = (sel + 1) % n; wsel = -1; play('menu2'); } }
  else if (k === 'ArrowUp') { if (scr === 'new game') setPack(pack - 1); else { sel = (sel + n - 1) % n; wsel = -1; play('menu2'); } }
  else if (k === 'Tab') { if (scr === 'new game') sel = (sel + 1) % n; else if (widgets.length) wsel = (wsel + 1) % widgets.length; else sel = (sel + 1) % n; }
  else if (k === 'Enter' || k === 'Space') { if (wsel >= 0 && widgets[wsel]) widgetClick(widgets[wsel], { x: widgets[wsel].x0 ?? 0, y: 0 }); else act(items[sel]); }
  else if (k === 'Escape') { if (scr === 'main') used = false; else if (scr === 'gameplay') menu.hide(); else if (scr === 'defeat' || scr === 'victory' || (menu.replayEnd && (scr === 'replaywin' || scr === 'replayloss'))) used = true; else if (scr === 'replaywin' || scr === 'replayloss') menu.hide(); else back(); } // FUN_00417df0: Esc ignored while victory/defeat shown
  else if (k === 'ArrowLeft' || k === 'ArrowRight') {
    const d = k === 'ArrowLeft' ? -1 : 1;
    if (scr === 'new game') changeLevel(d); else if (S.step(scr, d)) { /* FUN_0042a220 page arrows */ } else if (wsel >= 0 && widgets[wsel] && widgets[wsel].type === 0) sliderSet(widgets[wsel], widgets[wsel].val + d); else used = false;
  } else used = false;
  if (used) { e.preventDefault(); e.stopImmediatePropagation(); }
}, true);
addEventListener('contextmenu', (e) => { if (isOpen) e.preventDefault(); });

function present(s) {
  isOpen = true; closing = 0; G.cv.style.display = 'block'; go(s); setItems();
  G.ready.then(() => { if (isOpen) { cancelAnimationFrame(raf); raf = requestAnimationFrame(frame); } });
}
const cur = () => { let q = new URLSearchParams(location.search).get('level'); if (!q) { try { q = sessionStorage.getItem('dino_next'); sessionStorage.removeItem('dino_next'); } catch (e) {} } if (!q) return; PACKS.forEach((p, pi) => p[1].forEach((l, li) => { if (l[0] === q) { pack = pi; level = li; } })); };
export const menu = {
  nextLevel: null, // set by main.js: name of the level after the current one
  get open() { return isOpen; },
  get scr() { return scr; }, // current screen id (menu3d mode mapping)
  get pausing() { return isOpen && (scr === 'gameplay' || scr === 'replaywin' || scr === 'replayloss'); }, // CONFIRMED FUN_00413de0: only 'gameplay'/'replaywin'/'replayloss' (opened with Esc) set DAT_005d7bf8=1 (freeze); victory/defeat do not
  get joy() { return joy; }, // applied joystick settings {en, sens, btn[3]} for main.js
  joyAssign(i) { // FUN_0042ab00 loop @0x42a (DAT_0056e4f0 branch): pressed button idx -> clear other slots using it, store in the waiting row
    if (joyWait < 0) return; for (let k = 0; k < 3; k++) if (edJoy.btn[k] === i) edJoy.btn[k] = -1; edJoy.btn[joyWait] = i; joyWait = -1; play('menu');
  },
  get ending() { return isOpen && (scr === 'defeat' || scr === 'victory' || (this.replayEnd && (scr === 'replaywin' || scr === 'replayloss'))); }, replayEnd: false,
  get inGame() { return inGame; }, set inGame(v) { inGame = !!v; },
  init(start, res) { onStart = start; resume = res; cur(); },
  show(ig) { inGame = ig !== undefined ? !!ig : inGame; cur(); if (!inGame && !logoShown) { logoShown = logoOn = true; S.logoStart(); } else if (!inGame) startTrack(3); present(inGame ? 'gameplay' : 'main'); }, // FUN_0041be50: music track 3
  end(kind) { inGame = true; present(kind); }, // 'defeat' | 'victory' (FUN_00413de0)
  screen(n) { inGame = true; present(n); }, // show a secondary screen (congratulations / nags) over the game
  hide() { if (!isOpen || !inGame) return; closing = performance.now(); },
  // gameplay integration
  keys: () => keys.map((d) => (DIK[d] ? DIK[d][0] : null)), // KeyboardEvent.code per action index (KEYORDER)
  KEYORDER, options: () => other,
  markPassed(name) { PACKS.forEach((p, pi) => p[1].forEach((l, li) => { if (l[0] === name) { (pass[pi] = pass[pi] || [])[li] = true; save('dino_pass', pass); } })); },
};
