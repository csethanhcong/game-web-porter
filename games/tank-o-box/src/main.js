// Entry. Phase 4 + Phase 6 skeleton: static level view.  URL: ?level=Farm  [&objects=0] [&wire=1] [&light=0] [&scene=data/path.scene]
import * as THREE from 'three';
import * as CFG from './config.js';
import { createRenderer } from './renderer.js';
import { buildLevel } from './loader/level.js';
import { loadScene } from './loader/scene.js';
import { warnings, whenIdle } from './loader/assets.js';
import { createUI } from './ui/index.js';

window.__ready = false; window.__err = [];
addEventListener('error', (e) => window.__err.push(String(e.message)));
addEventListener('unhandledrejection', (e) => window.__err.push(String((e.reason && e.reason.message) || e.reason)));

const q = new URLSearchParams(location.search);
const canvas = document.getElementById('c');
const R = createRenderer(canvas);
let current = null;

function hasNode(root, key) { let f = false; root.traverse((o) => { if (o.userData[key]) f = true; }); return f; }
function pathOf(o) { const a = []; for (let p = o; p && p.parent; p = p.parent) if (p.name) a.unshift(p.name); return a.join('|'); }

// Gameplay wiring (src/game/**). ?play=0 disables it (static view, as before).
let game = null;
async function startGameplay(levelName, opts) {
  if (game) { game.stop(); game = null; window.__game = null; }
  if (q.get('play') === '0' || opts.objects === false || !current.data || !current.data.level) return;
  try { const { startGame } = await import('./game/index.js'); game = await startGame(current, R, levelName, opts); window.__game = game; }
  catch (e) { window.__err.push('game ' + (e && e.stack || e)); console.error(e); }
}

// UI flow (src/ui/**): menus, HUD, GameMenu, episode graph. ?ui=0 disables it (old static/hook behaviour).
const ui = q.get('ui') === '0' ? null : createUI({ R, canvas, loadLevel: (n, o) => load(n, o), stopLevel: () => { if (game) { game.stop(); game = null; window.__game = null; } } });
window.__ui = ui;

async function load(levelName, opts = {}) {
  window.__ready = false;
  try {
    current = await buildLevel(levelName, opts);
    await whenIdle(); // FIX-R1: nothing in flight (xml/model/texture) before first frame
    R.setContent(current.content);
    await startGameplay(levelName, opts);
    if (q.get('wire') === '1' || R.wireframe) R.setWireframe(true);
    await R.prepare(); // GPU upload + 2 rAF frames, then ready
    window.__ready = true;
  } catch (e) { window.__err.push('load ' + levelName + ': ' + (e && e.stack || e)); console.error(e); }
  return window.__ready;
}

async function loadRawScene(path) {
  window.__ready = false;
  try {
    const content = new THREE.Group(); content.name = 'rawscene';
    const ctx = {}; content.add(await loadScene(path, ctx)); current = { content, data: null, objects: [], ctx };
    await whenIdle();
    // DEBUG-ONLY (FIX-R2, not original behaviour): raw scenes lack Camera/Light nodes -> add default ambient+directional light and a bbox-framing camera.
    // DEBUG-ONLY: ?show=sub1,sub2 forces visible every node whose name contains a substring (e.g. hidden 'upgrade_*' turret/barrel nodes of tank scenes) + its ancestors.
    const showQ = (q.get('show') || '').split(',').filter(Boolean);
    if (showQ.length) content.traverse((o) => { if (o.name && showQ.some((k) => o.name.includes(k))) for (let p = o; p; p = p.parent) p.visible = true; });
    // 'effective' light = visible AMBIENT or Intensity > 0.01 (tank scenes only embed effect lights with Intensity 0 -> was black).
    let effLight = false; content.traverseVisible((o) => { const L = o.userData.light; if (L && (L.type === 'AMBIENT' || L.intensity > 0.01) && L.intensity > 0.01) effLight = true; });
    if (!effLight) {
      const a = new THREE.Object3D(); a.name = '__dbg_ambient'; a.userData.light = { type: 'AMBIENT', intensity: 0.6, attenuation: 'LINEAR', diffuse: [1, 1, 1], ambient: [1, 1, 1] };
      const d = new THREE.Object3D(); d.name = '__dbg_dir'; d.rotation.set(0.9, 0.6, 0); d.userData.light = { type: 'DIRECTIONAL', intensity: 1, attenuation: 'LINEAR', diffuse: [1, 1, 1], ambient: [0, 0, 0] };
      content.add(a, d);
    }
    R.setContent(content);
    if (!hasNode(content, 'camera')) { R.frameContent(); R.render(); }
    await R.prepare(); window.__ready = true;
  } catch (e) { window.__err.push('scene ' + path + ': ' + (e && e.stack || e)); }
}

if (CFG.DEBUG_HOOKS) {
  window.__dbg = {
    THREE, R, warnings,
    levels: [],
    loadLevel: (n, o) => load(n, o),
    loadScene: (p) => loadRawScene(p),
    state: () => current && ({ level: current.data && current.data.modelName, grid: current.grid, origin: current.origin && current.origin.toArray(), objects: current.objects.length, draws: current.ctx.stats, camera: R.camInfo, props: current.data && current.data.properties }),
    // camera: D3D world coords (mirrored internally). fov = horizontal radians like the scene file.
    setCamera: ({ position, lookAt, fov, up = [0, 1, 0] }) => {
      const p = new THREE.Vector3(-position[0], position[1], position[2]), t = new THREE.Vector3(-lookAt[0], lookAt[1], lookAt[2]);
      R.setCameraOverride(new THREE.Matrix4().lookAt(p, t, new THREE.Vector3(...up)).setPosition(p).toArray());
      if (fov && R.camInfo) R.camInfo.fov = fov; R.render();
    },
    resetCamera: () => { R.setCameraOverride(null); R.render(); },
    cameraMatrix: () => R.cameraMatrix().toArray(),
    wireframe: (on) => { R.setWireframe(on); R.render(); },
    lighting: (on) => { R.setLighting(on); R.render(); },
    objectsVisible: (on) => { if (current && current.content.getObjectByName('objects')) current.content.getObjectByName('objects').visible = !!on; R.render(); },
    listNodes: (maxDepth = 3) => { const out = []; (function w(o, d) { if (d > maxDepth) return; for (const c of o.children) { if (c.name) out.push({ path: pathOf(c), visible: c.visible, type: c.userData.light ? 'light' : c.userData.camera ? 'camera' : c.isMesh ? 'mesh' : 'node' }); w(c, d + 1); } })(current.content, 0); return out; },
    listDraws: () => { const out = []; current.content.traverse((o) => { if (o.isMesh) { let vis = true; for (let p = o; p; p = p.parent) if (!p.visible) vis = false; out.push({ node: pathOf(o), visible: vis, ...o.userData.draw }); } }); return out; },
    listObjects: () => current.objects.map((o) => ({ name: o.group.name, x: o.x, y: o.y, dir: o.dir, w: o.w, h: o.h, world: o.group.position.toArray() })),
    render: () => R.render(),
    screenshot: () => { R.render(); return canvas.toDataURL('image/png'); },
    lights: () => { const L = []; current.content.traverse((o) => { if (o.userData.light) L.push({ name: o.name, ...o.userData.light, pos: o.position.toArray() }); }); return L; },
  };
  fetch('assets/xml/levels/index.json').then((r) => r.json()).then((l) => { window.__dbg.levels = l; }).catch(() => {});
}

const rawScene = q.get('scene');
if (rawScene) loadRawScene(rawScene);
else if (ui && (q.get('episode') || q.get('screen') || q.get('menu') === '1')) {
  window.__ready = false; // ?episode=data/levels/episode1.episode | ?screen=data/interface/MainMenu.screen | ?menu=1 (MainMenu)
  (q.get('episode') ? ui.beginEpisode(q.get('episode')) : ui.begin(q.get('screen') || undefined)).then(() => R.prepare()).then(() => { window.__ready = true; });
} else {
  load(q.get('level') || 'Farm', { objects: q.get('objects') !== '0', ui }).then(() => { if (q.get('light') === '0') window.__dbg && window.__dbg.lighting(false); });
}
