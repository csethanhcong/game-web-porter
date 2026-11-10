// Strategies. Interface (vtbl 0x4fb554 layout): enter(go) [3], exit(go) [4], process(go, dt, handler) [2]; TRUE stops the chain (0x4648b0/0x464870).
// handler=true when run from an EventHandler (dt = 0). Evidence per class in comments; GUESS parts reference config.js G-GAME-*.
import * as CFG from '../config.js';
import { attr } from '../loader/xml.js';
import { parseMask, forEachMask, DX, DY, boxW, boxH } from './mask.js';
import { warn } from '../loader/assets.js';
import { setRotationD3D, resolveTargets, applyValue, evalEnvelope } from '../loader/anim.js';
import { runCommands } from '../audio/index.js';

const toVal = (v) => { const f = Number(v); return v !== '' && Number.isFinite(f) ? f : v; };
const bool = (v, d) => (v === undefined ? d : /^(1|true|yes)$/i.test(String(v).trim()));
class S {
  constructor(spec, world) { this.spec = spec; this.world = world; this.a = (k, d) => attr({ attrs: spec.attrs }, k, d); this.n = (k, d) => { const v = this.a(k); if (v === undefined) return d; const f = parseFloat(v); return Number.isFinite(f) ? f : d; }; }
  enter() {} exit() {} process() { return false; }
}
const MAXI = 2147483647, MINI = -2147483648;
const bag = (go, w, local) => (local ? { get: (n) => go.prop(n), set: (n, v) => go.setProp(n, v) } : { get: (n) => w.g(n), set: (n, v) => w.setG(n, v) });
const counterBag = (go, w) => bag(go, w, CFG.GAME_COUNTER_LOCAL);

class ChangeState extends S { // 0x4431c0
  process(go) {
    let prob = this.n('Probability', 1); const pp = this.a('ProbabilityProperty', '');
    if (pp) prob = this.world.g(pp);
    if (this.world.rng.r01() > prob) return false;
    return go.changeState(this.a('StateName'));
  }
}
class ChangeStateByCounter extends S { // 0x443bb0: [Min, Max)
  constructor(s, w, global) { super(s, w); this.global = global; }
  process(go) { const v = this.global ? this.world.g(this.a('PropertyName')) : go.prop(this.a('PropertyName')); if (v >= this.n('MinValue', MINI) && v < this.n('MaxValue', MAXI)) return go.changeState(this.a('StateName')); return false; }
}
class ChangeStateByRandomTime extends S { // 0x444110 / 0x4442a0
  enter() { this.t = 0; this.target = this.n('TimeMin', 0) + (this.n('TimeMax', 0) - this.n('TimeMin', 0)) * this.world.rng.r01(); }
  process(go, dt, h) { if (h) return false; this.t += dt; if (this.t > this.target) go.changeState(this.a('StateName')); return false; } // CONFIRMED 0x4442a0: always returns FALSE
}
class GlobalCounter extends S { // CONFIRMED (FORMATS 'Counter', G-GAME-01 closed): presence counter. enter 0x445010 g[Name]+=Step (default 1), exit 0x4450c0 g[Name]-=Step, process 0x444e70 = return false.
  // Event-handler strategies only get process -> 'GlobalCounter Step=-1' inside an EventHandler is a NO-OP.
  enter() { const n = this.a('PropertyName'); this.world.setG(n, this.world.g(n) + this.n('Step', 1)); }
  exit() { const n = this.a('PropertyName'); this.world.setG(n, this.world.g(n) - this.n('Step', 1)); }
}
class ChangeCounter extends S { // 0x443ff0 (bag: G-GAME-02)
  constructor(s, w, global) { super(s, w); this.global = global; }
  process(go) {
    const b = this.global ? bag(go, this.world, false) : counterBag(go, this.world); const sp = this.a('StepPropertyName', '');
    const step = sp ? go.prop(sp) : this.n('Step', 0); const n = this.a('PropertyName'); b.set(n, b.get(n) + step); return false;
  }
}
class CheckCounter extends S { // 0x444de0: TRUE when v<Min or v>=Max
  constructor(s, w, global) { super(s, w); this.global = global; }
  process(go) { const b = this.global ? bag(go, this.world, false) : counterBag(go, this.world); const v = Math.trunc(b.get(this.a('PropertyName'))); return v < this.n('MinValue', MINI) || v >= this.n('MaxValue', MAXI); }
}
class Transmit extends S { // 0x444b50 (G-X17)
  process() { const w = this.world, s = this.a('SourcePropertyName'), d = this.a('DestinationPropertyName'), amt = this.n('Amount', 1); if (w.g(s) > this.n('MinSourceValue', 0)) { w.setG(s, w.g(s) - amt); w.setG(d, w.g(d) + amt); } return false; }
}
class Generator extends S { // 0x491190
  process(go) {
    const w = this.world, dec = this.a('DecPropertyName'); if (w.g(dec) < 1) return false;
    w.setG(dec, w.g(dec) - 1); const inc = this.a('IncPropertyName', ''); if (inc) w.setG(inc, w.g(inc) + 1);
    w.spawn(this.a('TemplateName'), go.pos.x, go.pos.y, go.pos.dir, 0.01); // Position copy of generator, p=0.01; no free-cell test (CONFIRMED)
    const st = this.a('StateName', ''); if (st) go.changeState(st);
    return true;
  }
}
class GlobalEvent extends S { // CONFIRMED vong 19 (G-GAME-10): loader 0x454c80 (EventName +8, StartEventName +0x18, StopEventName +0x28); enter 0x454ad0 sends Start (if non-empty), exit 0x454b60 sends Stop, process 0x454bf0 sends EventName EVERY call (no once-per-state gate; same call also from handlers with dt=0); all go=NULL broadcast via level enqueue (vtbl+0xc), process returns FALSE
  send(n) { if (!n) return; const w = this.world; w.enqueue(n, null); w.log.push(n); if (w.log.length > 200) w.log.shift(); if (w.onGlobalEvent) w.onGlobalEvent(n); }
  enter() { this.send(this.a('StartEventName', '')); }
  exit() { this.send(this.a('StopEventName', '')); }
  process() { this.send(this.a('EventName', '')); return false; }
}
class SetProperty extends S { // CONFIRMED G-GAME-13 (0x444760 attrs, enter 0x444900, exit 0x444920, process 0x444940; Global variant 0x455440/0x455470/0x4554a0): StartValue on enter, StopValue on exit, ProcValue each process; raw strings, empty string is still written. QA N2: MissionStatus uses StartValue="MISSION FAILED"
  constructor(s, w, global) { super(s, w); this.global = global; }
  set(go, raw) { const v = toVal(raw); if (this.global) this.world.setG(this.a('PropertyName'), v); else go.setProp(this.a('PropertyName'), v); }
  enter(go) { const v = this.a('StartValue'); if (v !== undefined) this.set(go, v); }
  exit(go) { const v = this.a('StopValue'); if (v !== undefined) this.set(go, v); }
  process(go) { const v = this.a('ProcValue'); if (v !== undefined) this.set(go, v); return false; }
}
class TimeCounter extends S { // CONFIRMED vong 19: ctor 0x447510 (acc double +0x18=0, Min +8=0, Max +0xc=0x7fffffff, Start +0x10=0, Step +0x30=-1), loader 0x447650, vtable 0x4f67d0: enter/exit = no-op (0x45e730), process 0x447730
  constructor(spec, world) { super(spec, world); this.acc = 0; }
  process(go, dt) { // acc += dt (also with dt=0 from handlers); n = _ftol(acc) (truncation); v = n*Step + Start; clamp signed [Min,Max]; global bag[PropertyName] = int v; returns FALSE
    this.acc += dt; let v = Math.trunc(this.acc) * Math.trunc(this.n('Step', -1)) + Math.trunc(this.n('StartValue', 0));
    const mn = Math.trunc(this.n('MinValue', 0)), mx = Math.trunc(this.n('MaxValue', MAXI)); if (v < mn) v = mn; else if (v > mx) v = mx;
    this.world.setG(this.a('PropertyName'), v); return false;
  }
}
// StrategyBonus 0x4483f0 (G-X14) + its animation queue (CONFIRMED vong 22 vs decomp: enter 0x447f90, loader 0x447da0, queue push 0x45cf10, last()/front() 0x45ca20/0x45ca90, update 0x45d070, advance 0x45d010, bind/load 0x45cc10 (file = AnimationPath + name + ".anim", bound to go view node, apply at t=0), collapse 0x45cea0).
// The strategy owns a std::list<name> queue (+0xf4, size +0xf8). Missing .anim (e.g. bonusarmor_passive, all bonusfast_*) = load fails -> empty anim (len 0), skipped by advance. Value uses the FRONT name after update.
export const bonusAnimData = new Map(); // filled by template.loadClass preload: AnimationPath+name -> {len, chans, cmds}
const EMPTY_ANIM = { len: 0, chans: [], cmds: [] };
class Bonus extends S {
  constructor(s, w) { super(s, w); this.q = []; this.cur = EMPTY_ANIM; this.t = 0; this.nodes = null; this.cmdPrev = -1; this.prefix = this.a('AnimationPath', ''); }
  last() { return this.q.length ? this.q[this.q.length - 1] : ''; }
  front() { return this.q.length ? this.q[0] : ''; }
  push(go, name) { // 0x45cf10: if name already queued -> erase range [match, end) (0x45cb00), then push_back (no start); else push_back and start (load) when it is the only element
    const i = this.q.indexOf(name);
    if (i >= 0) { this.q.length = i; this.q.push(name); return; }
    this.q.push(name); if (this.q.length === 1) this.load(go);
  }
  load(go) { // 0x45cc10: reset to empty anim, load prefix+front+".anim"; failure -> false. Success: bind + apply at t=0 (0x411ed0 -> 0x411c60)
    this.cur = EMPTY_ANIM; this.t = 0; this.nodes = null; this.cmdPrev = -1;
    const d = bonusAnimData.get(this.prefix + this.front()); if (!d || (!d.chans.length && !d.cmds.length)) return false; // GUESS: "file missing" == no channels and no commands
    this.cur = d; this.apply(go, 0); return true;
  }
  apply(go, t) { // 0x411c60: channels at time t + command track (Play/Stop snd_shield)
    const root = go.sceneRoot; if (!root) return; // scene loads async in the port (engine: synchronous); retried next step
    const c = this.cur;
    if (!this.nodes) this.nodes = c.chans.map((ch) => resolveTargets(root, ch.target));
    for (let i = 0; i < c.chans.length; i++) { const tg = this.nodes[i]; if (tg && tg.length) applyValue(tg, c.chans[i].param, evalEnvelope(c.chans[i].env, t, BONUS_NC[c.chans[i].param])); }
    if (c.cmds.length) { if (t < this.cmdPrev) { runCommands(c.cmds, this.cmdPrev, Infinity, root); runCommands(c.cmds, -1, t, root); } else runCommands(c.cmds, this.cmdPrev, t, root); }
    this.cmdPrev = t;
  }
  step(go, x) { // 0x411cd0 (non-loop): returns leftover time
    let left = 0; this.t += x; const len = this.cur.len;
    if (this.t > len) { left = this.t - len; this.t = len; }
    if (this.t < 0) { left = this.t; this.t = 0; }
    this.apply(go, this.t); return left;
  }
  advance(go) { while (this.q.length >= 2) { this.q.shift(); if (this.load(go)) return; } } // 0x45d010
  update(go, dt) { // 0x45d070
    const n = this.q.length; if (n === 0) return;
    if (n < 2) { const len = this.cur.len; if (len === 0) return; this.t += dt; const k = Math.trunc(this.t / len); this.t -= k * len; this.apply(go, this.t); return; } // loop 0x411d60
    let left = this.step(go, dt);
    while (left !== 0) { if (this.q.length < 2) return; this.advance(go); left = this.step(go, left); }
  }
  enter(go) { // 0x447f90
    const t = go.prop(this.a('TimePropertyName'));
    if (t <= 0) { if (this.last() === 'passive') return; this.push(go, 'activepassive'); this.push(go, 'passive'); } else { if (this.last() === 'active') return; this.push(go, 'passiveactive'); this.push(go, 'active'); }
    if (this.q.length > 1) { this.q.splice(0, this.q.length - 1); this.load(go); } // 0x45cea0: collapse to the last queued anim
    this.apply(go, this.t);
  }
  process(go, dt) {
    const tn = this.a('TimePropertyName'); const t = go.prop(tn);
    if (t - dt > 0) { go.setProp(tn, t - dt); const l = this.last(); if (l !== 'active') { this.push(go, l === '' ? 'passiveactive' : l + 'active'); this.push(go, 'active'); } }
    else { const l = this.last(); if (l !== 'passive') { this.push(go, l === '' ? 'activepassive' : l + 'passive'); this.push(go, 'passive'); go.setProp(tn, 0); } }
    this.update(go, dt);
    go.setProp(this.a('ValuePropertyName'), this.front() === 'passive' ? this.n('NoBonusValue', 0) : this.n('BonusValue', 0)); return false;
  }
}
const BONUS_NC = { Visibility: 1, Intensity: 1, Transparency: 1, Position: 3, Rotation: 3, Scale: 3 };
class EpisodeLink extends S { process(go, dt, h) { if (h && this.world.onEpisodeLink) this.world.onEpisodeLink(this.a('LinkName')); return false; } }

// ---- Fire ----
function fire(st, go) { // Fire() 0x491600 + visitor 0x4914d0 (G-X15, CONFIRMED vong 22 vs decomp): 5 slots, every non-empty one fires (FUN_00491c60). Slot FireMask (+0x14): shooter dir d, bullet at cell+DX[d],DY[d], dir d. Slot FireMask k (+0x44/+0x74/+0xa4/+0xd4): mask walked with the shooter state (rotated by d) but the visitor Position has dir forced to k (0x495050(k,4)+0x495760) => bullet at (cx+DX[k], cy+DY[k]), dir k. p = shooter p, turn 0
  const w = st.world, d = go.pos.dir;
  const slot = (ms, bd) => {
    if (!ms) return; const m = parseMask(ms);
    forEachMask(m, d, go.pos.x, go.pos.y, w.W, w.H, (cx, cy, bit) => {
      if (!bit) return false; const bx = cx + DX[bd], by = cy + DY[bd];
      if (bx >= 0 && by >= 0 && bx < w.W && by < w.H) w.spawn(st.a('TemplateName'), bx, by, bd, go.pos.p); // p = shooter's p, CONFIRMED 0x4914d0->0x495760; turn=0
      return false;
    });
  };
  slot(st.a('FireMask', ''), d);
  for (let k = 0; k < 4; k++) slot(st.a('FireMask' + k, ''), k);
}
class FireByKey extends S { // 0x4908d0. R23 CONFIRMED asm 0x4909a0..: t(+0x130) += dt; fire iff (count<Max && t>MinPeriod) || t>Period (fcomp+test ah,0x41: skip when t<=limit). Defaults MinPeriod=100.0 (0x4fb658), Period=0.0 (0x4f4660), Max=1 (0x4906d0), timer init 100.0, reset to 0.0 only on fire. Data never sets MinPeriod => 1st branch dead after first shot; MaxBulletCount is inert in the engine (only Period limits). Counter +1 at bullet creation / -1 at death by bullet_*.object StrategyGlobalCounter; not read for limiting. Do NOT 'fix'.
  constructor(s, w) { super(s, w); this.t = 100; }
  process(go, dt, h) {
    if (h) return false; this.t += dt; const w = this.world; const cp = this.a('BulletCounterPropertyName', ''); const count = cp ? w.g(cp) : 0;
    const can = (count < this.n('MaxBulletCount', 1) && this.t > this.n('MinPeriod', 100)) || this.t > this.n('Period', 0);
    if (can && w.input && w.input.fireHeld(this.a('InputDevicePropertyName', ''))) { fire(this, go); this.t = 0; }
    return false;
  }
}
class FireByTime extends S { // 0x490a10 / 0x490a40
  enter() { this.timer = this.n('MinTime', 0) + (this.n('MaxTime', 0) - this.n('MinTime', 0)) * this.world.rng.r01(); }
  process(go, dt, h) { if (h) return false; this.timer -= dt; if (this.timer <= 0) { fire(this, go); this.enter(); } return false; }
}

// ---- Mask / Move* ----
class Mask extends S { // 0x48fb00
  constructor(s, w) { super(s, w); this.mask = parseMask(this.a('Mask', '')); this.every = bool(this.a('EveryTime'), false); }
  enter(go) { this.world.place(go, this.mask); }
  exit(go) { this.world.unplace(go); }
  process(go) { if (this.every) this.world.place(go, this.mask); return false; }
}
function moveFind(rng, cx, cy, tx, ty) { // 0x495140
  if (rng.r01() <= 0.5) { if (ty < cy) return 0; if (ty > cy) return 2; if (tx > cx) return 1; if (tx < cx) return 3; return rng.mod(4); }
  if (cx < tx) return 1; if (tx < cx) return 3; if (ty < cy) return 0; if (ty > cy) return 2; return rng.mod(4);
}
class MoveBase extends Mask { // 0x495390 + mover 0x493380 (FORMATS 'MoveBase ... pseudo-code')
  constructor(s, w, turn, stop) { super(s, w); this.turn = turn; this.stop = bool(this.a('CollisionStop'), stop); this.standing = this.a('StandingStateName', ''); this.moving = this.a('MovingStateName', ''); }
  budget(go, dt) { return go.prop('Speed') * dt; }
  choose(go) { return go.pos.dir; }
  process(go, dt, h) {
    if (h) return false; const w = this.world, pos = go.pos; if (!go.mask) return false;
    const tok = go.stoken; const b = { v: this.budget(go, dt) };
    let nd = this.choose(go, dt, false); if (go.stoken !== tok) return false;
    let dv = pos.dir; // "current dir" var = copy of P0.dir (asm 0x4953f3..0x4953f6: [X+0x10]); chooser arg6 and dir of every mover call except B (CONFIRMED asm 0x495390)
    if (CFG.GAME_REVERSE_MIDCELL && nd === (dv < 0 ? -1 : (dv + 2) % 4)) { // 0x495090/0x4950c0: idx(newDir) == idx(opposite(lastDir)); -1 <-> -1 too; NO p>0 guard in engine (CONFIRMED asm 0x495473..0x495484)
      const TS = this.turn, half = TS === 0 ? 0 : 3.14 / TS, bb = { v: 2 * pos.p };
      this.mover(go, dv, bb, 0); // A (0x495550) lastDir
      const ok = this.mover(go, nd, bb, 0); // B (0x49557f) newDir
      if (ok) this.mover(go, dv, bb, 0); // C (0x4955f2) lastDir
      else { bb.v = half; this.mover(go, dv, bb, TS); dv = nd; } // D (0x4955b7) lastDir, then lastDir := newDir (asm 0x4955bc..0x4955c8)
    }
    let before = b.v, ok = this.mover(go, dv, b), guard = 0; // first normal mover uses dir var (asm 0x495608..0x49562f); equals port's old mover(nd) whenever pos.p>0 (mover ignores dir then)
    while (ok && guard++ < 64) {
      const moved = b.v === before; nd = this.choose(go, dt, moved, dv); if (go.stoken !== tok) return false;
      if (nd === dv && b.v === before) { if (this.standing) go.changeState(this.standing); return false; } // 0x4950c0(newDir, dirVar) && budget unchanged (0x495640..0x49569c)
      dv = nd; before = b.v; ok = this.mover(go, dv, b);
    }
    if (this.moving) go.changeState(this.moving);
    return false;
  }
  mover(go, dir, b, tsOv) {
    const w = this.world, pos = go.pos, m = go.mask === this.mask ? this.mask : this.mask;
    if (b.v <= 0) return false;
    if (dir < 0) return true;
    go.dirty = true;
    if (pos.p !== 0) { const r = pos.p - b.v; if (r >= 0) { b.v = 0; pos.p = r; return false; } b.v -= pos.p; pos.p = 0; return true; }
    const ts = tsOv === undefined ? this.turn : tsOv;
    if (ts !== 0) {
      const maxA = ts * b.v * 0.636943; let a;
      if (dir !== pos.dir) { let dl = dir - pos.dir; if (dl > 2) dl -= 4; else if (dl < -2) dl += 4; a = -dl; } else a = pos.turn;
      if (a !== 0) {
        if (Math.abs(a) >= maxA) { const step = ts * b.v; a = a > 0 ? Math.max(0, a - step) : Math.min(0, a + step); b.v = 0; pos.dir = dir; pos.turn = a; return false; }
        b.v -= Math.abs(a) * 1.57 / ts; pos.turn = 0;
      }
    }
    const nx = pos.x + DX[dir], ny = pos.y + DY[dir];
    if (nx < 0 || ny < 0 || w.W - boxW(m, dir) < nx || w.H - boxH(m, dir) < ny) { pos.dir = dir; return true; } // border: no event
    w.clearOcc(go);
    const cnt = w.collide(go, m, nx, ny, dir, 1);
    if (cnt > 0 && this.stop) { w.writeOcc(go, m, pos.x, pos.y, pos.dir < 0 ? dir : pos.dir); pos.dir = dir; return true; }
    if (b.v > 1) { b.v -= 1; pos.p = 0; } else { pos.p = 1 - b.v; b.v = 0; }
    pos.x = nx; pos.y = ny; pos.dir = dir; pos.turn = 0; w.writeOcc(go, m, nx, ny, dir);
    return b.v !== 0;
  }
}
class MoveByKey extends MoveBase { // 0x48fdf0 / chooser 0x48fca0: instant turn, last pressed key wins
  constructor(s, w) { super(s, w, 0, true); this.dev = this.a('InputDevicePropertyName', ''); }
  choose() { return this.world.input ? this.world.input.lastDir(this.dev) : -1; }
  budget(go, dt) { // 0x48fdf0 (CONFIRMED): no key held (+0xa8==0) -> budget = clamp(p - 0.01 [0x4f6748], 0, Speed*dt): coast to 0.01 from cell centre then stop; needed because 0x495390's first mover uses the dir var (= pos.dir), not the chooser result
    const b = go.prop('Speed') * dt;
    if (this.choose() >= 0) return b;
    const c = go.pos.p - 0.01; return c >= 0 ? Math.min(b, c) : 0;
  }
}
class MoveRandom extends MoveBase { // 0x490310 / 0x4902e0
  constructor(s, w) { super(s, w, 1.57, true); }
  enter(go) { super.enter(go); this.timer = 0; this.dir = -1; }
  process(go, dt, h) { if (!h) this.timer -= dt; return super.process(go, dt, h); }
  pick(go) { const w = this.world, r = w.rng; return moveFind(r, go.pos.x, go.pos.y, r.mod(w.W), r.mod(w.H)); }
  choose(go) {
    if (this.timer < 0) { this.dir = this.pick(go); this.timer = this.n('MinTime', 0) + (this.n('MaxTime', 0) - this.n('MinTime', 0)) * this.world.rng.r01(); }
    return this.dir;
  }
}
class MoveFind extends MoveRandom { // 0x492c20
  pick(go) {
    // 0x492c20 (CONFIRMED): target = nearest (Manhattan 0x495890, strictly smaller wins) active object of TargetType (0x4939e0 + predicate 0x492b70); point = target pos + rng.mod(box h) (y first), + rng.mod(box w) (x) (0x491b70/0x491ba0); none -> MoveRandom
    const w = this.world, t = w.nearestOfType(this.a('TargetType', ''), go);
    if (t) { const [bw, bh] = t.maskDims(); const ty = t.pos.y + w.rng.mod(bh), tx = t.pos.x + w.rng.mod(bw); return moveFind(w.rng, go.pos.x, go.pos.y, tx, ty); }
    return super.pick(go);
  }
}
class MoveBullet extends MoveBase { // 0x490c20 (CONFIRMED): CollisionStop=0; moved(budget unchanged) && idx(lastDir)==live pos.dir -> ChangeState(CollisionState)
  constructor(s, w) { super(s, w, 1.57, false); }
  choose(go, dt, moved, lastDir) { if (moved && lastDir === go.pos.dir) go.changeState(this.a('CollisionState', 'Explode')); return go.pos.dir; }
}


const vec3 = (v, d = [0, 0, 0]) => { if (v === undefined || v === '') return d.slice(); const a = String(v).trim().split(/\s+/).map(Number); return [a[0] || 0, a[1] || 0, a[2] || 0]; };
const approach = (a, b, st) => (Math.abs(b - a) < st ? b : a + Math.sign(b - a) * st); // 0x4472a0 helper
// StrategyCameraFollow (process 0x454ee0, loader 0x4551e0, CONFIRMED FORMATS G-X20): writes the owner's node position (local, parent treated as identity).
class CameraFollow extends S {
  process(go, dt) {
    const node = go.node; if (!node) return false; const w = this.world;
    const tgt = w.objectsOfType(this.a('TargetType', ''))[0], stick = vec3(this.a('Stick')), sp = vec3(this.a('Speed')), start = vec3(this.a('Start'));
    const T = tgt ? (() => { const p = tgt.worldPos(); return [p[0] + stick[0], p[1] + stick[1], p[2] + stick[2]]; })() : start;
    if (sp[0] === 0 && sp[1] === 0 && sp[2] === 0) node.position.set(T[0], T[1], T[2]);
    else { const c = node.position.toArray(), o = c.slice(); for (let i = 0; i < 3; i++) { const m = sp[i] * dt; o[i] = c[i] + Math.max(-m, Math.min(m, T[i] - c[i])); } node.position.set(o[0], o[1], o[2]); }
    return false;
  }
}
// StrategyCameraAngle (process 0x446630, CONFIRMED FORMATS G-X20; GUESS: 3D normalise/clamp, projection order, init when first target arrives)
class CameraAngle extends S {
  process(go, dt) {
    const node = go.node; if (!node ) return false; const w = this.world, cs = w.camState || (w.camState = { init: false, dist: 0, angX: 0, angZ: 0, smooth: [0, 0, 0], prev: [0, 0, 0], lastP: [0, 0, 0] });
    const start = vec3(this.a('Start')), minD = this.n('MinDistance', 0), tg = w.objectsOfType(this.a('TargetType', ''));
    if (!cs.init) { cs.init = true; cs.dist = minD; cs.smooth = start.slice(); cs.prev = start.slice(); cs.lastP = start.slice(); }
    if (!tg.length) { node.position.set(cs.lastP[0], cs.lastP[1], cs.lastP[2]); return false; }
    const pos = tg.map((t) => t.worldPos()); const C = [0, 1, 2].map((i) => pos.reduce((a, p) => a + p[i], 0) / pos.length);
    const adv = tg.length === 1 ? this.n('Advance', 0) : 0; const dv = [C[0] - cs.prev[0], C[1] - cs.prev[1], C[2] - cs.prev[2]], ln = Math.hypot(dv[0], dv[1], dv[2]);
    const off = ln > 0 ? dv.map((x) => x / ln * adv) : [0, 0, 0]; cs.prev = C.slice();
    let minX = 1e9, maxX = -1e9, minY = 1e9, maxY = -1e9;
    for (const p of pos) { const n = w.project(p); if (!n) { minX = -1; maxX = 1; minY = -1; maxY = 1; break; } minX = Math.min(minX, n[0]); maxX = Math.max(maxX, n[0]); minY = Math.min(minY, n[1]); maxY = Math.max(maxY, n[1]); }
    const zoom = w.camera ? Math.max(0, Math.min(1, Math.max(maxX - minX, maxY - minY) - 0.5)) : 0;
    const box = vec3(this.a('Box')), bc = vec3(this.a('BoxCenter')); for (let i = 0; i < 3; i++) C[i] = Math.max(bc[i] - box[i] / 2, Math.min(bc[i] + box[i] / 2, C[i]));
    const mS = this.n('MovementShift', 0), mSS = this.n('MovementShiftSpeed', 1); const offLen = Math.hypot(off[0], off[1], off[2]); let target, spd;
    if (offLen <= 0.01) { target = minD; spd = mS <= 1e-6 ? mSS : Math.abs(minD - cs.dist) * mSS / Math.abs(mS); } else { target = minD + mS; spd = mSS; }
    cs.dist = approach(cs.dist, target, spd * dt);
    const P = [(C[0]) * (1 - zoom) + start[0] * zoom, (C[1] + 0.8 * cs.dist) * (1 - zoom) + start[1] * zoom, (C[2] + 0.5 * cs.dist) * (1 - zoom) + start[2] * zoom]; // BACK=(0,0.8,0.5) CONFIRMED asm 0x446630 (G-GAME-12 closed)
    const d = [P[0] - cs.smooth[0], P[1] - cs.smooth[1], P[2] - cs.smooth[2]], dl = Math.hypot(d[0], d[1], d[2]), step = Math.sqrt(dl) * this.n('Speed', 1) * dt;
    cs.smooth = dl > step ? [cs.smooth[0] + d[0] / dl * step, cs.smooth[1] + d[1] / dl * step, cs.smooth[2] + d[2] / dl * step] : P;
    const mAX = this.n('MaxAngleX', 0), mZ1 = this.n('MaxAngleZ1', 0), mZ2 = this.n('MaxAngleZ2', 0), asX = this.n('AngleSpeedX', 0.04), asZ = this.n('AngleSpeedZ', 0.04); let tX, sX, tZ, sZ;
    if (off[0] > 0.01) { tX = -mAX; sX = asX; } else if (off[0] < -0.01) { tX = mAX; sX = asX; } else { tX = 0; sX = Math.abs(mAX) <= 1e-5 ? asX : Math.abs(cs.angX) * asX / Math.abs(mAX); }
    cs.angX = approach(cs.angX, tX, sX * dt);
    if (off[2] > 0.01) { tZ = mZ1; sZ = asZ; } else if (off[2] < -0.01) { tZ = mZ2; sZ = asZ; } else { tZ = 0; sZ = (Math.abs(mZ1) > 1e-5 || Math.abs(mZ2) > 1e-5) ? Math.abs(cs.angZ) * asZ * 2 / (Math.abs(mZ1) + Math.abs(mZ2)) : asZ; }
    cs.angZ = approach(cs.angZ, tZ, sZ * dt);
    node.position.set(cs.smooth[0], cs.smooth[1], cs.smooth[2]); setRotationD3D(node, [cs.angZ, 0, cs.angX]); cs.lastP = cs.smooth.slice();
    return false;
  }
}
class CheckUpgrade extends S { // CONFIRMED process 0x40d040 / attrs 0x40cf40 (FORMATS 'CheckUpgrade'): TRUE (stop chain) when HP out of [MinHP,MaxHP) AND upgrade out of [MinUpgrade,MaxUpgrade). Min/Max defaults = 0 CONFIRMED vong 19 (ctor 0x40ca20: +0x18 MaxHP, +0x1c MinHP, +0x30 MaxUpgrade, +0x34 MinUpgrade all 0)
  process() {
    const w = this.world, hp = Math.trunc(w.g(this.a('HPPropertyName'))), up = Math.trunc(w.g(this.a('UpgradePropertyName')));
    return (hp < this.n('MinHP', 0) || hp >= this.n('MaxHP', 0)) && (up < this.n('MinUpgrade', 0) || up >= this.n('MaxUpgrade', 0));
  }
}
class Randomize extends S { // CONFIRMED enter 0x448e50, attrs 0x448ec0 (4 vector attrs via 0x4453f0), lerp 0x448de0, defaults ctor 0x448c60; mapping to node.scale / rotation of the scene child = GUESS (G-GAME-15)
  // N10 fix: attrs are 3-component vectors ("0.9 0.8 0.9"); each axis has its own [min,max]; rng draws z,y,x (0x448de0), scale first then rotation (0x448e50). Missing components = 0 (GUESS, data always has 3).
  enter(go) {
    const rr = (a, b) => a + this.world.rng.r01() * (b - a);
    const vv = (k, d) => { const v = this.a(k); return v === undefined || v === '' ? [d, d, d] : vec3(v); };
    const draw = (mn, mx) => { const o = [0, 0, 0]; for (let i = 2; i >= 0; i--) o[i] = rr(mn[i], mx[i]); return o; };
    const S3 = draw(vv('ScaleMin', 0), vv('ScaleMax', 1));
    const R3 = draw(vv('RotationMin', 0), vv('RotationMax', 3.14159));
    // G-GAME-15 CLOSED vong 20: engine node vslot+8 (0x47a420) writes Scale->node+0xc0, Rotation->node+0xb4; Position sync 0x45c450 (0x495a80 right after root enter, 0x495a20 at the start of every object update) overwrites node+0xb4..bc with the dir/turn yaw => Randomize Rotation is never visible: apply Scale only (R3 still drawn for rng order)
    const apply = () => { const n = go.group && go.group.children[0]; if (!n) return false; n.scale.set(S3[0], S3[1], S3[2]); return true; };
    this.S3 = S3; this.R3 = R3;
    if (!apply()) { const iv = setInterval(() => { if (go.destroyed || apply()) clearInterval(iv); }, 50); }
  }
}
// StrategyShadow (vtbl 0x4f43cc; attrs 0x490dd0 MainNode/ShadowName; process 0x490e30 CONFIRMED by disassembly 2026-11-06): once-only (+0x20 set in ctor, cleared at first process), always FALSE.
// Name = ShadowName + "_" (0x4fb760) + suffix; FOUR INDEPENDENT checks of the scene-root Rotation.y (node+0xb8) with eps 1e-4 (0x4fb758): |ry|<eps -> "0" (0x4f4d94), |ry-pi|<eps -> "180" (0x4fb74c),
// |ry-pi/2|<eps -> "90" (0x4fb748), |ry+pi/2|<eps -> "270" (0x4fb744). Then node = child(root, MainNode) (0x4719a0 recursive), shadow = child(node, name), shadow.Visibility(+0xcc)=1.
// ry (D3D) = pi - dir*pi/2 (0x493d30, FORMATS yaw): d0 -> pi -> "180", d1 -> pi/2 -> "90", d2 -> 0 -> "0", d3 -> -pi/2 -> "270". Closes G-GAME-16.
class Shadow extends S {
  constructor(s, w) { super(s, w); this.pending = true; }
  process(go) {
    if (!this.pending) return false;
    const root = go.sceneRoot; if (!root || !root.children.length) return false; // scene not loaded yet: retry (engine loads synchronously)
    this.pending = false;
    const d = go.pos.dir < 0 ? 0 : go.pos.dir, ry = Math.PI - (d + go.pos.turn) * Math.PI / 2, E = 1e-4;
    let sfx = '';
    if (Math.abs(ry) < E) sfx += '0';
    if (Math.abs(ry - 3.1415926) < E) sfx += '180';
    if (Math.abs(ry - 1.5707963) < E) sfx += '90';
    if (Math.abs(ry + 1.5707963) < E) sfx += '270';
    const find = (o, n) => { let r = null; o.traverse((c) => { if (!r && c !== o && c.name === n) r = c; }); return r; };
    const main = find(root, this.a('MainNode', '')); const sh = main && find(main, this.a('ShadowName', '') + '_' + sfx);
    if (sh) sh.visible = true;
    return false;
  }
}
class ForceEffect extends S { // StrategyForceEffect (DirectInput force feedback, .ffe) CONFIRMED vong 24: loader 0x448ab0 (EffectName +0x18, InputDevicePropertyName +0x8); enter 0x448b10 creates the effect via the device (0x4d2820 -> 0x41ccd0, CreateEffect failure logs "effect not created, res=" 0x436b0e and leaves the pointer NULL), starts it (0x4d2850, NULL-safe), finished(+0x28)=0; process 0x4489f0: if !finished && !effect.isPlaying (0x4d2860 returns FALSE for a NULL effect) -> sends "EffectFinished" (string 0x4f690c) TARGETED at this go (arg1, same pattern as AnimStart 0x464380) and finished=1; returns FALSE. Web has no FF device (haptics = GUESS G-GAME-24, no visible effect) -> effect NULL -> EffectFinished on the first process tick, so level_force_effects returns to Default.
  enter() { this.done = false; }
  process(go) { if (!this.done) { this.done = true; this.world.enqueue('EffectFinished', go); } return false; }
}
const TABLE = {
  StrategyMask: (s, w) => new Mask(s, w), StrategyChangeState: (s, w) => new ChangeState(s, w),
  StrategyChangeStateByCounter: (s, w) => new ChangeStateByCounter(s, w, false), StrategyChangeStateByGlobalCounter: (s, w) => new ChangeStateByCounter(s, w, true),
  StrategyChangeStateByRandomTime: (s, w) => new ChangeStateByRandomTime(s, w), StrategyGlobalCounter: (s, w) => new GlobalCounter(s, w),
  StrategyChangeCounter: (s, w) => new ChangeCounter(s, w, false), StrategyChangeGlobalCounter: (s, w) => new ChangeCounter(s, w, true),
  StrategyCheckCounter: (s, w) => new CheckCounter(s, w, false), StrategyCheckGlobalCounter: (s, w) => new CheckCounter(s, w, true),
  StrategyTransmitGlobalCounter: (s, w) => new Transmit(s, w), StrategyGenerator: (s, w) => new Generator(s, w), StrategyGlobalEvent: (s, w) => new GlobalEvent(s, w),
  StrategySetProperty: (s, w) => new SetProperty(s, w, false), StrategySetGlobalProperty: (s, w) => new SetProperty(s, w, true),
  StrategyTimeCounter: (s, w) => new TimeCounter(s, w), StrategyBonus: (s, w) => new Bonus(s, w), StrategyEpisodeLink: (s, w) => new EpisodeLink(s, w),
  StrategyCameraFollow: (s, w) => new CameraFollow(s, w), StrategyCameraAngle: (s, w) => new CameraAngle(s, w), StrategyFireByKey: (s, w) => new FireByKey(s, w), StrategyFireByTime: (s, w) => new FireByTime(s, w),
  StrategyMoveByKey: (s, w) => new MoveByKey(s, w), StrategyMoveRandom: (s, w) => new MoveRandom(s, w), StrategyMoveFind: (s, w) => new MoveFind(s, w), StrategyMoveBullet: (s, w) => new MoveBullet(s, w),
  StrategyCheckUpgrade: (s, w) => new CheckUpgrade(s, w), StrategyRandomize: (s, w) => new Randomize(s, w), StrategyShadow: (s, w) => new Shadow(s, w), StrategyForceEffect: (s, w) => new ForceEffect(s, w),
};
const STUBS = new Set([]);
export function makeStrategy(spec, world) {
  const f = TABLE[spec.tag]; if (f) return f(spec, world);
  if (!STUBS.has(spec.tag)) warn('Unknown strategy: ' + spec.tag);
  return new S(spec, world);
}
