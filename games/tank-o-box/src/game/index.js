// Gameplay entry: builds the World from a loaded level (buildLevel result) and runs update(dt) + render each frame.
import * as THREE from 'three';
import * as CFG from '../config.js';
import { attr, attrList, child, childrenOf, find } from '../loader/xml.js';
import { loadXml, tryLoadXml, norm, warn } from '../loader/assets.js';
import { preloadClasses } from './template.js';
import { World } from './world.js';
import { Input } from './input.js';
import { stopAll } from '../audio/index.js';

const toVal = (v) => { const f = Number(v); return v !== '' && Number.isFinite(f) ? f : v; };
const TOP = (x) => x.children[0];

export async function startGame(current, R, levelName, opts = {}) {
  const data = current.data; if (!data || !data.level) return null;
  const lvl = data.level;
  const ui = opts.ui || null; let globals = {};
  if (ui) globals = await ui.levelGlobals(data); // src/ui: shared session bag (Lives/Score carry over between screens), level Properties applied on creation
  else {
    const screen = await tryLoadXml('data/interface/game.screen');
    if (screen) for (const p of find(screen, 'Property')) globals[attr(p, 'Name')] = toVal(attr(p, 'Value', ''));
    for (const k in data.properties) globals[k] = toVal(data.properties[k]);
  }
  const lv = { objects: lvl.objects, off: lvl.offField }; // loader mergeLevel is append-only (G-X09)
  const classes = await preloadClasses([...lv.objects.map((o) => o.template), ...lv.off]);
  const objectsGroup = current.content.getObjectByName('objects');
  const world = new World({ W: lvl.width, H: lvl.height, origin: current.origin, vx: new THREE.Vector3(...lvl.vectorX), vy: new THREE.Vector3(...lvl.vectorY), objectsGroup, ctx: current.ctx, classes, globals });
  world.root = current.content; world.camera = R.camera || null; // CameraBase / SoundListener nodes + zoom projection (G-X20)
  const input = new Input(window, globals); world.input = input;
  const used = new Set();
  for (const o of lv.objects) {
    const dir = ((o.dir % 4) + 4) % 4; let g;
    const pi = current.objects.findIndex((q, i) => !used.has(i) && q.template === o.template && q.x === o.x && q.y === o.y && q.dir === dir);
    if (pi >= 0) { used.add(pi); g = current.objects[pi].group; } else g = undefined;
    const cls = classes.get(norm(o.template));
    world.spawn(o.template, o.x, o.y, dir, 0, g || (cls && cls.view ? undefined : null));
  }
  for (const t of lv.off) world.spawn(t, 0, 0, 0, 0, null);
  let last = performance.now(), raf = 0, running = true, paused = false, menuOpen = false;
  // G-X18 (hook only): the GCMenuBack handler of the LEVEL screen (0x4577d0; not a button/menu handler, FORMATS UI vong 10) pushes GameMenuLink (Level+0x2c4) via set_pending_link 0x43fc80 on top of the level (flag=1); btnReturn pops it and the level resumes. No menu UI yet:
  // Escape toggles; pausing the level while the menu is up = GUESS (flag GAME_MENU_PAUSE). 'game-menu' CustomEvent {open} for a future UI; Return = window.__game.menu(false).
  const setMenu = (v) => { menuOpen = !!v; window.dispatchEvent(new CustomEvent('game-menu', { detail: { open: menuOpen } })); };
  const onKey = (e) => { if (e.code === CFG.GAME_KEY_MENU && !e.repeat) setMenu(!menuOpen); };
  if (!ui) window.addEventListener('keydown', onKey); // with src/ui the Esc / GameMenu is owned by ui (GCMenuBack)
  const step = (dt) => { world.update(dt); if (ui) ui.onFrame(dt); };
  if (ui) {
    ui.setPause = (v) => { menuOpen = !!v; window.dispatchEvent(new CustomEvent('game-menu', { detail: { open: menuOpen } })); };
    world.onEpisodeLink = (name) => { paused = true; ui.episodeLink(name); }; // StrategyEpisodeLink (0x454a60) -> set_pending_link (0x43fc80); fixes N1 (freeze after game over anim)
    await ui.onLevelStart({ data, world, R });
  }
  const frame = (now) => {
    if (!running) return; raf = requestAnimationFrame(frame);
    let dt = (now - last) / 1000; last = now; if (CFG.GAME_DT_CLAMP > 0 && dt > CFG.GAME_DT_CLAMP) dt = CFG.GAME_DT_CLAMP;
    if (!paused && !(menuOpen && CFG.GAME_MENU_PAUSE) && dt > 0) { try { step(dt); } catch (e) { (window.__err = window.__err || []).push('game ' + (e && e.stack || e)); console.error(e); paused = true; } }
    R.render();
  };
  raf = requestAnimationFrame(frame);
  const handle = {
    world, input, step, pause: (v = true) => { paused = v; },
    menu: (v) => setMenu(v === undefined ? !menuOpen : v), isMenuOpen: () => menuOpen,
    stop() { stopAll(); running = false; cancelAnimationFrame(raf); input.dispose(); window.removeEventListener('keydown', onKey); if (ui) { ui.onLevelStop(); ui.setPause = null; } },
    stats: () => ({ menu: menuOpen, time: world.time, active: world.active.length, globals: { ...world.globals }, events: world.log.slice(-20), queue: world.queue.length }),
    // Debug hook (CFG.DEBUG_HOOKS): goes through the real pickup path: enqueues the same event the collision would ('CollisionTankBonus<kind>', 0x494550 order) to the player object; kind = Upgrade|Fast|Armor|ShtabArmor|TimeStop|AirStrike
    grantBonus: (kind = 'Upgrade', player = 1) => { if (!CFG.DEBUG_HOOKS) return false; const re = player === 2 ? /tank_player2/i : /tank_player(?!2)/i; const go = world.active.find((o) => re.test(o.cls.path) && !/upgrade/i.test(o.cls.path)); if (!go) return false; world.enqueue('CollisionTankBonus' + kind, go); return true; },
    objs: () => world.active.map((o) => ({ type: o.type, cls: o.cls.path.split('/').pop(), state: o.stateName, x: o.pos.x, y: o.pos.y, dir: o.pos.dir, p: +o.pos.p.toFixed(3) })),
  };
  return handle;
}
