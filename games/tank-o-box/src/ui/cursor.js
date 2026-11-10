// Cursor scene + mouse bullet holes. FORMATS.md "ENGINE: vong 12" (Cursor) + "Port Cursor (vong 13)".
//  CONFIRMED Application::change_cursor 0x469690(name): loads <name>.scene, finds node "Cursor" (else throws "Cursor node not found"), keeps it (this+0x148) with its camera (+0x144).
//   Callers: screen change (0x442630, 0x43fdd0/0x43f910; every .screen declares Cursor="data/interface/cursor"), 0x40b480, 0x40c470 (level start: hard-coded "data/interface/cursor").
//  CONFIRMED data/interface/cursor.scene: CameraPerspective + Node "Cursor" Position (0,0,-11.1787) with one ModelFixed (cursor_cursor.model, texture cursor_shot, emissive).
//  CONFIRMED (vong 17) per-frame helper 0x4670d0 (called from Application update 0x4555c0) places the Cursor node from GetCursorPos each frame (G-UI-08 closed);
//   mouse axis range Axis_X/Axis_Y = [-1,1], Y down (0x4274e0) - same NDC convention as ndc() below.
//  Port: node on the cursor camera ray through the mouse NDC at the node's original depth; last overlay pass; hidden until first mouse move / mouse leaves canvas.
//  CONFIRMED ApplicationTanks::on_input_event 0x40b4e0: "Mouse" "Left Button" state 1 -> loads data/hole.scene (node "Scene"), places it at (camera position + normalized unprojected mouse ray)
//   (0x40be80/0x40bd00/0x40bd90/0x40bc70/0x40bcd0/0x40ba60) and plays data/sounds/tank_fire_bullet (sound = audio agent: hook ui.onMouseShot).
//  CONFIRMED (vong 17) guard: the hole + shot sound only run while app+0x238 (pending-load counter) != 0, i.e. only while the engine shows its Loading screen
//   (vtbl 0x4f4700 +0x10 0x40c470 start / +0x14 0x455670 progress / +0x18 0x40b480 end). The port has no Loading screen, so UI_MOUSE_HOLES is a DEVIATION (see FORMATS, config.js).
//   Hole camera = app+0x5a8 (probably the Loading scene camera) -> GUESS G-UI-13. Distance 1.0 = CONFIRMED (0x4f4a44); holes live in the shown scene (vanish with it); cap UI_MOUSE_HOLES_MAX not original.
import * as THREE from 'three';
import { loadScene } from '../loader/scene.js';
import { warn } from '../loader/assets.js';
import { createOverlay, updateOverlayCamera } from './overlay.js';
import { findNode } from './hud.js';
import * as CFG from '../config.js';

export function createCursor({ R, canvas, onShot }) {
  const st = { name: null, ov: null, node: null, z: 0, shown: false, token: 0, holes: [] };
  const ndc = (e) => { const r = canvas.getBoundingClientRect(); return [((e.clientX - r.left) / r.width) * 2 - 1, -(((e.clientY - r.top) / r.height) * 2 - 1)]; };
  const api = { active: () => !!(st.ov && st.shown), onShot };

  api.change = async (name) => { // 0x469690
    if (!name || name === st.name) return; const tok = ++st.token;
    try {
      const sc = await loadScene(name + '.scene', {}); const node = findNode(sc, 'Cursor');
      if (!node) throw new Error('Cursor node not found'); if (tok !== st.token) return;
      const ov = createOverlay(sc, 'cursor'); updateOverlayCamera(ov); node.updateWorldMatrix(true, false);
      st.z = node.getWorldPosition(new THREE.Vector3()).project(ov.camera).z; st.ov = ov; st.node = node; st.name = name; ov.visible = st.shown; R.invalidate && R.invalidate(2);
    } catch (e) { warn('change_cursor ' + name + ': ' + (e && e.message || e)); }
  };
  function place(e) {
    if (!st.ov) return; const [x, y] = ndc(e); updateOverlayCamera(st.ov);
    const p = new THREE.Vector3(x, y, st.z).unproject(st.ov.camera); st.node.position.copy(st.node.parent.worldToLocal(p)); st.node.updateMatrixWorld(true);
  }
  const onMove = (e) => { st.shown = true; if (st.ov) { st.ov.visible = true; place(e); } canvas.style.cursor = api.active() ? 'none' : canvas.style.cursor; R.invalidate && R.invalidate(1); };
  const onLeave = () => { st.shown = false; if (st.ov) st.ov.visible = false; canvas.style.cursor = ''; R.invalidate && R.invalidate(1); };

  // 0x40b4e0: left press -> hole
  async function hole(e) {
    if (!CFG.UI_MOUSE_HOLES || e.button !== 0 || !R.content) return;
    const [x, y] = ndc(e); const cam = R.camera; if (!cam) return;
    cam.updateMatrixWorld(true); const camPos = new THREE.Vector3().setFromMatrixPosition(cam.matrixWorld);
    const dir = new THREE.Vector3(x, y, 0.5).unproject(cam).sub(camPos).normalize(); const w = camPos.add(dir); // CONFIRMED 0x40ba60: hole = cam + dir*1.0
    const content = R.content;
    try {
      const h = await loadScene('data/hole.scene', {}); if (R.content !== content) return;
      content.updateMatrixWorld(true); h.position.copy(content.worldToLocal(w)); content.add(h); st.holes.push(h);
      st.holes = st.holes.filter((o) => o.parent); while (st.holes.length > CFG.UI_MOUSE_HOLES_MAX) { const o = st.holes.shift(); o.parent.remove(o); }
      R.invalidate && R.invalidate(1);
    } catch (err) { warn('hole.scene: ' + (err && err.message || err)); }
    if (api.onShot) api.onShot({ x, y });
  }
  const onDown = (e) => { hole(e); };
  canvas.addEventListener('mousemove', onMove); canvas.addEventListener('mouseleave', onLeave); canvas.addEventListener('mousedown', onDown);
  api.dispose = () => { canvas.removeEventListener('mousemove', onMove); canvas.removeEventListener('mouseleave', onLeave); canvas.removeEventListener('mousedown', onDown); };

  const base = R.render; // last pass: the cursor over everything
  R.render = () => {
    base(); if (!st.ov || !st.ov.visible || !R.content || !updateOverlayCamera(st.ov)) return;
    const gl = R.gl, prev = gl.autoClear; gl.autoClear = false; gl.clearDepth(); gl.render(st.ov.scene, st.ov.camera); gl.autoClear = prev;
  };
  return api;
}
