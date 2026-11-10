// World = Level (FORMATS 'ENGINE: bus sự kiện + vòng update Level' 0x494890, G-X10) + GameObject (0x45ab70 update, 0x45acd0 receive, 0x45af40 ChangeState).
import * as THREE from 'three';
import * as CFG from '../config.js';
import { Rng } from './rng.js';
import { parseMask, forEachMask, boxW, boxH, DX, DY } from './mask.js';
import { norm, warn } from '../loader/assets.js';
import { loadScene } from '../loader/scene.js';
import { resolveTargets, resolvePath, applyValue, evalEnvelope } from '../loader/anim.js';
import { makeStrategy } from './strategies.js';
import { runCommands, stopTree } from '../audio/index.js';
import { stepParticles, runEmitCommands } from '../render/particles.js';

const toVal = (v) => { const f = Number(v); return v !== '' && Number.isFinite(f) ? f : v; };

export class GameObject {
  constructor(world, cls, x, y, dir, p = 0) {
    this.world = world; this.cls = cls; this.type = cls.type; this.props = {};
    for (const k in cls.props) this.props[k] = toVal(cls.props[k]);
    this.pos = { x, y, dir, p, turn: 0 };
    this.mask = null; this.occ = []; this.state = null; this.stateName = ''; this.key = '';
    this.group = null; this.sceneRoot = null; this.chanNodes = null; this.animT = 0; this.animDone = false; this.animSettled = false;
    this.inst = new Map(); this.destroyed = false; this.dirty = true; this.stoken = 0;
    this.objStrats = cls.strategies.map((s) => this.getInst(s));
  }
  getInst(spec) { let i = this.inst.get(spec); if (!i) { i = makeStrategy(spec, this.world); this.inst.set(spec, i); } return i; }
  prop(n, d = 0) { const v = this.props[n]; return v === undefined || v === '' ? d : (typeof v === 'number' ? v : (Number(v) || d)); }
  setProp(n, v) { this.props[n] = v; }
  // GameObject::on_end_node 0x45b110: ChangeState Default first, then the root strategies' enter (FORMATS 'Counter')
  start() { this.changeState('Default', true); for (const s of this.objStrats) s.enter(this); }
  // world matrix translation (D3D space) of the object's cell footprint centre (same formula as syncGroup 0x493a40)
  worldPos() { const w = this.world, p = this.pos, d = p.dir < 0 ? 0 : p.dir; const [bw, bh] = this.maskDims(); const fx = p.x + bw * 0.5 - DX[d] * p.p, fy = p.y + bh * 0.5 - DY[d] * p.p; const v = w.origin.clone().addScaledVector(w.vx, fx).addScaledVector(w.vy, fy); return [v.x, v.y, v.z]; }
  // 0x45af40
  changeState(name) {
    if (this.stateName === name && this.state) return true;
    const st = this.cls.states.find((s) => s.name === name); // first match (0x465a40)
    if (!st) { warn(`ChangeState: no state '${name}' in ${this.cls.path}`); return false; }
    if (this.state) { const l = this.state.strategies; for (let i = l.length - 1; i >= 0; i--) this.getInst(l[i]).exit(this); }
    this.state = st; this.stateName = name; this.stoken++;
    this.key = 'Collision' + this.type + name;
    // GameObjectStateView start 0x465f50 (CONFIRMED): RandomStart (attr, +0xfe, default false) -> anim.time = rnd * length (0x411de0), rnd = (LCG>>16 & 0x7fff) * (1/32767) from the view's own RNG (0x4d27f0, seeded GetTickCount at 0x4d2760); else time = 0 (0x411c60)
    this.animT = 0;
    if (st.randomStart && st.len > 0) { if (!this.animRng) this.animRng = new Rng(); this.animT = this.animRng.r01() * st.len; }
    this.animDone = false; this.animSettled = false; this.chanNodes = null; this.cmdPrev = -1;
    for (const s of st.strategies) this.getInst(s).enter(this);
    this.world.enqueue('AnimStart', this);
    return true;
  }
  runChain(list, dt, handler) { for (let i = 0; i < list.length; i++) if (this.getInst(list[i]).process(this, dt, handler)) return true; return false; }
  // 0x45acd0: object-level handlers, then current state's handlers; every matching handler runs, dt = 0.
  receive(name) {
    for (const h of this.cls.handlers) if (h.names.includes(name)) this.runChain(h.strategies, 0, true);
    if (this.state) for (const h of this.state.handlers.slice()) if (h.names.includes(name)) this.runChain(h.strategies, 0, true);
  }
  update(dt) {
    if (this.destroyed) return;
    for (const s of this.objStrats) if (s.process(this, dt, false)) break; // object-level TRUE does not block anim/state
    const st = this.state;
    // GameObjectStateView update 0x465fc0 (CONFIRMED): Loop=true (+0xfc, default true) -> 0x411d60: time += dt; time -= floor(time/length)*length (no-op when length == 0); the 'finished' flag (+0xfd, AnimFinished) is only set on the non-loop path 0x411cd0
    let wrapped = false;
    if (st.loop) { if (st.len > 0) { const t = this.animT + dt, n = Math.floor(t / st.len); wrapped = n !== 0; this.animT = t - n * st.len; } else this.animT += dt; } else { // non-loop 0x411cd0 (CONFIRMED): t=time+dt; t>length (strict) -> time=length, finished=1
      const t = this.animT + dt; if (t > st.len) { this.animT = st.len; if (st.anims.length && !this.animDone) { this.animDone = true; this.world.enqueue('AnimFinished', this); } } else this.animT = t;
    }
    this.applyAnim(st);
    // Command track 0x42ded0 (CONFIRMED): prev <= now -> fire prev < ct <= now; wrapped (prev > now) -> fire ct > prev OR ct <= now
    if (st.cmds && st.cmds.length && this.sceneRoot) {
      if (wrapped || this.animT < this.cmdPrev) { runCommands(st.cmds, this.cmdPrev, Infinity, this.sceneRoot); runEmitCommands(st.cmds, this.cmdPrev, Infinity, this.sceneRoot, resolvePath); runCommands(st.cmds, -1, this.animT, this.sceneRoot); runEmitCommands(st.cmds, -1, this.animT, this.sceneRoot, resolvePath); }
      else { runCommands(st.cmds, this.cmdPrev, this.animT, this.sceneRoot); runEmitCommands(st.cmds, this.cmdPrev, this.animT, this.sceneRoot, resolvePath); }
      this.cmdPrev = this.animT;
    } // anim Commands (Execute Play/Stop on SoundSource), src/audio; GUESS G-AUDIO-03 (event timing) // anim Commands (Execute Play/Stop on SoundSource), src/audio; GUESS G-AUDIO-03
    this.runChain(this.state.strategies, dt, false);
  }
  applyAnim(st) {
    if (!st.chans || !st.chans.length || !this.sceneRoot || (this.animSettled && !st.loop)) return;
    if (!this.chanNodes) this.chanNodes = st.chans.map((c) => resolveTargets(this.sceneRoot, c.target));
    const NC = { Visibility: 1, Intensity: 1, Transparency: 1, Position: 3, Rotation: 3, Scale: 3 };
    for (let i = 0; i < st.chans.length; i++) {
      const c = st.chans[i]; const tg = this.chanNodes[i]; if (!tg || !tg.length) continue;
      // G-GAME-09 CLOSED vong 19: anim targets are children of the view root (first Target token = child node, e.g. 'locator1', 'Camera'); the view root itself (written by gameplay via 0x45c450) is never a target -> no root filter needed
      applyValue(tg, c.param, evalEnvelope(c.env, this.animT, NC[c.param]));
    }
    if (!st.loop && this.animT >= st.len) this.animSettled = true;
  }
  maskDims() { const m = this.mask || this.cls.footprint; if (!m) return [1, 1]; const d = this.pos.dir; const ww = m.bits ? boxW(m, d < 0 ? 0 : d) : (d & 1 ? m.h : m.w), hh = m.bits ? boxH(m, d < 0 ? 0 : d) : (d & 1 ? m.w : m.h); return [ww, hh]; }
  // 0x493a40
  syncGroup() {
    if (!this.group) return; const w = this.world, p = this.pos, d = p.dir < 0 ? 0 : p.dir; const [bw, bh] = this.maskDims();
    const fx = p.x + bw * 0.5 - DX[d] * p.p, fy = p.y + bh * 0.5 - DY[d] * p.p;
    this.group.position.copy(w.origin).addScaledVector(w.vx, fx).addScaledVector(w.vy, fy);
    this.group.rotation.y = d * Math.PI / 2 + Math.PI + p.turn * 1.57; // 0x493d30 CONFIRMED vong 20: D3D ry = base(dir) - turn*1.57 (consts 0.0/1.57), three y = -ry => +turn*1.57 (not pi/2)
    this.dirty = false;
  }
  destroy() {
    if (this.destroyed) return;
    if (this.state) { const l = this.state.strategies; for (let i = l.length - 1; i >= 0; i--) this.getInst(l[i]).exit(this); }
    for (let i = this.objStrats.length - 1; i >= 0; i--) this.objStrats[i].exit(this);
    this.world.clearOcc(this); this.destroyed = true; stopTree(this.group); // G-AUDIO-04: looping SoundSources stop with the object
    if (this.group && this.group.parent) this.group.parent.remove(this.group);
  }
}

export class World {
  constructor({ W, H, origin, vx, vy, objectsGroup, ctx, classes, globals }) {
    Object.assign(this, { W, H, origin, vx, vy, objectsGroup, ctx, classes });
    this.globals = globals; this.grid = new Array(W * H).fill(null);
    this.active = []; this.fresh = []; this.queue = []; this.rng = new Rng(); this.time = 0; this.log = [];
  }
  g(n, d = 0) { const v = this.globals[n]; return v === undefined || v === '' ? d : (typeof v === 'number' ? v : (Number(v) || d)); }
  setG(n, v) { this.globals[n] = v; }
  enqueue(name, go) { this.queue.push({ name, go }); } // 0x494670 FIFO
  cls(path) { const c = this.classes.get(norm(path)); if (!c) warn('class not preloaded: ' + path); return c; }
  // 0x494b50: create object at Position and enter Default; goes into 'fresh' (active next update)
  // group: undefined = create view from the class model; null = no view; Group = adopt an existing one (level objects built by loader)
  spawn(path, x, y, dir, p = 0, group) {
    const cls = this.cls(path); if (!cls) return null;
    const go = new GameObject(this, cls, x, y, dir, p);
    if (cls.view && cls.view.node && this.root) { go.node = this.root.getObjectByName(cls.view.node) || null; if (go.node) go.sceneRoot = go.node; } // GameObjectView NodeName (level_camera: CameraBase)
    if (group) { go.group = group; go.sceneRoot = group; } else if (group === undefined && cls.view && cls.view.model) {
      go.group = new THREE.Group(); go.group.name = path.split(/[\\/]/).pop().replace(/\.object$/i, '');
      this.objectsGroup.add(go.group);
      // The engine loads the object's scene synchronously at creation; here it is async, so the object's update is held until the view is ready (QA sweep 4 B1: HiddenUpgrade0 anim finished before sceneRoot existed)
      go.viewPending = true;
      loadScene(cls.view.model, this.ctx).then((sc) => { if (go.destroyed) return; go.group.add(sc); go.sceneRoot = go.group; go.chanNodes = null; go.dirty = true; }).catch((e) => warn('spawn scene ' + e.message)).finally(() => { go.viewPending = false; });
    }
    this.fresh.push(go); go.start(); go.syncGroup();
    return go;
  }
  // ---- occupancy grid ----
  clearOcc(go) { for (const i of go.occ) if (this.grid[i] === go) this.grid[i] = null; go.occ = []; }
  // collision callback 0x494550: enqueue (self.key -> other) then (other.key -> self); count up to limit
  collide(go, mask, x, y, dir, limit) {
    let count = 0; const W = this.W;
    forEachMask(mask, dir, x, y, W, this.H, (cx, cy, bit) => {
      if (!bit) return false; const o = this.grid[cy * W + cx];
      if (o && o !== go) { this.queue.push({ name: go.key, go: o }); this.queue.push({ name: o.key, go }); count++; if (count >= limit) return true; }
      return false;
    });
    return count;
  }
  writeOcc(go, mask, x, y, dir) {
    const W = this.W; go.occ = [];
    forEachMask(mask, dir, x, y, W, this.H, (cx, cy, bit) => { if (bit) { const i = cy * W + cx; if (!this.grid[i]) { this.grid[i] = go; go.occ.push(i); } } return false; });
  }
  // 0x493120 StrategyMask enter / EveryTime
  place(go, mask) {
    this.clearOcc(go); go.mask = mask; go.dirty = true; if (!mask) return;
    const p = go.pos, d = p.dir < 0 ? 0 : p.dir;
    this.collide(go, mask, p.x, p.y, d, mask.w * mask.h);
    this.writeOcc(go, mask, p.x, p.y, d);
  }
  unplace(go) { this.clearOcc(go); }
  // ---- Level::update 0x494890 ----
  update(dt) {
    this.time += dt;
    while (this.fresh.length) this.active.push(this.fresh.pop());
    for (let i = 0; i < this.active.length; i++) {
      const go = this.active[i];
      if (go.stateName === 'Dead') { this.queue = this.queue.filter((e) => e.go !== go); go.destroy(); this.active.splice(i, 1); i--; }
    }
    for (let i = this.active.length - 1; i >= 0; i--) {
      this.drain();
      const go = this.active[i]; if (!go || go.destroyed) continue;
      if (go.viewPending) continue;
      go.update(dt);
    }
    for (const go of this.active) if (go.dirty && go.group) go.syncGroup();
    for (const go of this.fresh) if (go.dirty && go.group) go.syncGroup();
    stepParticles(dt); // ParticleSystem simulation, variable dt (0x475200); systems of destroyed objects are disposed
  }
  drain() {
    let guard = 0;
    while (this.queue.length && guard++ < 10000) {
      const ev = this.queue.shift();
      if (ev.go === null) { for (const o of this.active.slice()) if (!o.destroyed) o.receive(ev.name); } else if (!ev.go.destroyed) ev.go.receive(ev.name);
    }
  }
  objectsOfType(t) { return [...this.active, ...this.fresh].filter((o) => !o.destroyed && o.type === t && o.stateName !== 'Dead'); }
  // NDC of a D3D-space point with the current render camera (scene is mirrored in x for three); null = behind camera
  project(p) { const c = this.camera; if (!c) return [0, 0]; const v = new THREE.Vector3(-p[0], p[1], p[2]); const e = v.clone().applyMatrix4(c.matrixWorldInverse); if (e.z >= 0) return null; v.project(c); return [v.x, v.y]; }
  // 0x492c20 + 0x4939e0 + 0x495890: nearest (Manhattan, strictly smaller wins) active object of type
  nearestOfType(type, from) { let best = null, bd = 0; for (const o of this.active) { if (o.destroyed || o.type !== type || o.stateName === 'Dead') continue; const d = Math.abs(o.pos.x - from.pos.x) + Math.abs(o.pos.y - from.pos.y); if (!best || d < bd) { best = o; bd = d; } } return best; }
  find(type) { return this.active.find((o) => o.type === type && o.stateName !== 'Dead') || this.fresh.find((o) => o.type === type) || null; }
}
