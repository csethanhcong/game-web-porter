// .scene loader -> three.js graph in D3D (left-handed) coordinates. The renderer puts the whole graph under a mirror root (x -> -x).
// Rotation: CONFIRMED G-R04: Euler 'ZYX' with y negated (see applyTRS).
import * as THREE from 'three';
import { attr, attrList, num, vec, child, childrenOf } from './xml.js';
import { loadXml, loadModel, resolveTextureUrl, track, warn } from './assets.js';
import { makeMaterial, attachD3DCull } from '../render/material.js';
import { registerBillboard } from '../render/billboard.js';
import { buildText } from '../render/text.js';
import { buildParticleSystem } from '../render/particles.js';
import { makeSoundNode, registerListener } from '../audio/index.js';

const texCache = new Map();
const texLoader = new THREE.TextureLoader();
export function loadTexture(ref) {
  const k = ref.trim().replace(/\\/g, '/').toLowerCase();
  if (texCache.has(k)) return texCache.get(k);
  const pr = (async () => {
    const url = await resolveTextureUrl(ref);
    if (!url) { warn('missing texture: ' + ref); return null; }
    const tex = await texLoader.loadAsync(url);
    // FORMATS.md ASSETS: D3D wrap default, trilinear, full mips; texture rows are stored bottom-up in D3D => three flipY=true is the ONE flip. No colour management (D3D8 is raw).
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping; tex.minFilter = THREE.LinearMipmapLinearFilter; tex.magFilter = THREE.LinearFilter;
    tex.generateMipmaps = true; tex.flipY = true; tex.colorSpace = THREE.NoColorSpace; tex.anisotropy = 1;
    return { tex, url };
  })();
  track(pr); texCache.set(k, pr);
  return pr;
}

function applyTRS(o, el) {
  const p = vec(el, 'Position', [0, 0, 0]), r = vec(el, 'Rotation', [0, 0, 0]), s = vec(el, 'Scale', [1, 1, 1]);
  o.position.set(p[0], p[1], p[2]);
  o.rotation.order = 'ZYX'; // CONFIRMED G-R04 (FORMATS 'ENGINE ... G-R04', 0x471a70/0x471b30): R = Rx(rx)*Ry(-ry)*Rz(rz) row-vector = Rz*Ry(-ry)*Rx column
  o.rotation.set(r[0], -r[1], r[2]);
  o.scale.set(s[0], s[1], s[2]);
  if (attr(el, 'Visibility') === 'false') o.visible = false;
}

async function buildShaderItems(modelEl, model, group, stats) {
  const shadersEl = child(modelEl, '#Shaders#');
  const shaders = shadersEl ? childrenOf(shadersEl, 'Shader') : [];
  if (!shaders.length) { stats.noShader++; warn('ModelFixed without Shaders (not drawn): ' + attr(modelEl, 'Source')); return; }
  let tri = 0;
  for (const sh of shaders) {
    const count = Math.round(num(sh, 'TrianglesCount', 0));
    const start = tri; tri += count;
    if (start + count > model.triangleCount) { warn(`shader range ${start}+${count} > model tris ${model.triangleCount} (${attr(modelEl, 'Source')})`); }
    const n = Math.max(0, Math.min(count, model.triangleCount - start));
    if (!n) continue;
    // Consecutive triangle ranges per Shader in declaration order: GUESS (FORMATS.md MODEL; totals match 191/192). Only declared triangles are drawn (G-MDL-1).
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(model.positions.subarray(start * 9, (start + n) * 9), 3));
    g.setAttribute('normal', new THREE.BufferAttribute(model.normals.subarray(start * 9, (start + n) * 9), 3));
    g.setAttribute('uv', new THREE.BufferAttribute(model.uv.subarray(start * 6, (start + n) * 6), 2));
    g.boundingSphere = null;
    const mat = child(sh, 'Material');
    const diffuse = mat ? vec(mat, 'Diffuse', [1, 1, 1]) : [1, 1, 1];
    const emissive = mat ? vec(mat, 'Emissive', [0, 0, 0]) : [0, 0, 0];
    const transparency = mat ? num(mat, 'Transparency', 0) : 0;
    const dEl = child(sh, 'Diffuse'), eEl = child(sh, 'Emissive');
    const dTex = dEl && dEl.attrs.Image ? await loadTexture(attr(dEl, 'Image')) : null;
    const eTex = eEl && eEl.attrs.Image ? await loadTexture(attr(eEl, 'Image')) : null;
    const mk = (mode, t) => {
      const blended = transparency !== 0; // CONFIRMED G-R02: list chosen ONLY by Material Transparency (==0 opaque w/ alpha test, !=0 blended)
      const m = makeMaterial({ name: attr(sh, 'Name', ''), map: t ? t.tex : null, diffuse, emissive, transparency, mode, transparent: blended, emissiveAlphaMultiply: attr(sh, 'EmissiveAlphaMultiply') === 'true' });
      const mesh = new THREE.Mesh(g, m); mesh.name = attr(sh, 'Name', '') + (mode === 'emissive' ? ':emissive' : '');
      mesh.frustumCulled = false; attachD3DCull(mesh);
      mesh.userData.draw = { shader: attr(sh, 'Name', ''), mode, tris: n, texture: t ? t.url : null, blended };
      group.add(mesh); stats.draws++;
    };
    // CONFIRMED G-R03 (FUN_00486c90): item with Diffuse Image -> lit; otherwise Diffuse=0, Emissive*0.5, blend ONE, Emissive Image or default white.
    if (dTex) mk('lit', dTex); else mk('emissive', eTex);
  }
}

// Returns an unnamed Group holding the scene's top-level nodes (name '' so anim target paths skip it).
export async function loadScene(path, ctx = {}, depth = 0) {
  if (depth > 12) { warn('scene nesting too deep: ' + path); return new THREE.Group(); }
  const stats = ctx.stats || (ctx.stats = { draws: 0, noShader: 0, skipped: {} });
  const xml = await loadXml(path);
  const sceneEl = xml.children.find((c) => c.tag === 'Scene');
  const root = new THREE.Group(); root.name = ''; root.userData.scene = path;
  if (!sceneEl) { warn('no <Scene> in ' + path); return root; }
  await buildChildren(sceneEl, root, ctx, depth);
  return root;
}

async function buildChildren(el, parent, ctx, depth) {
  for (const c of el.children) {
    if (c.tag === '#Shaders#') continue;
    const o = await buildElement(c, ctx, depth);
    if (o) parent.add(o);
  }
}

async function buildElement(c, ctx, depth) {
  const stats = ctx.stats;
  switch (c.tag) {
    case 'Node': {
      const o = new THREE.Group(); o.name = attr(c, 'Name', ''); applyTRS(o, c);
      const ch = attr(c, 'Children');
      if (ch) { try { o.add(await loadScene(ch, ctx, depth + 1)); } catch (e) { warn('Children scene failed ' + ch + ': ' + e.message); } }
      await buildChildren(c, o, ctx, depth);
      return o;
    }
    case 'ModelFixed': case 'ModelMorph': { // ModelMorph: Source only (Source2/MorphWeight not handled) GUESS
      const o = new THREE.Group(); o.name = attr(c, 'Name', ''); applyTRS(o, c);
      const src = attr(c, 'Source');
      if (c.tag === 'ModelMorph' && attr(c, 'Source2')) o.userData.morph = { source2: attr(c, 'Source2') }; // used by ui/hud.js (MorphWeight bars)
      try { await buildShaderItems(c, await loadModel(src), o, stats); } catch (e) { warn('model failed ' + src + ': ' + e.message); }
      await buildChildren(c, o, ctx, depth);
      return o;
    }
    case 'Light': {
      const o = new THREE.Object3D(); o.name = attr(c, 'Name', ''); applyTRS(o, c);
      o.userData.light = {
        type: attr(c, 'Type', 'POINT'), intensity: num(c, 'Intensity', 1), attenuation: attr(c, 'Attenuation', 'LINEAR'),
        diffuse: vec(c, 'Diffuse', [1, 1, 1]), ambient: vec(c, 'Ambient', [1, 1, 1]),
      };
      (ctx.lights || (ctx.lights = [])).push(o);
      return o;
    }
    case 'Billboard': { // container like Node (children = ModelFixed...); orientation updated per frame by render/billboard.js (GUESS G-R10)
      const o = new THREE.Group(); o.name = attr(c, 'Name', ''); applyTRS(o, c); o.userData.billboard = true;
      await buildChildren(c, o, ctx, depth); registerBillboard(o);
      return o;
    }
    case 'CameraPerspective': {
      const o = new THREE.Object3D(); o.name = attr(c, 'Name', ''); applyTRS(o, c);
      o.userData.camera = { fov: num(c, 'Fov', 0.66), aspect: num(c, 'Aspect', 0.75), near: num(c, 'NearPlane', 0.5), far: num(c, 'FarPlane', 200) };
      return o;
    }
    case 'ParticleSystem': { // src/render/particles.js (engine 0x475200 etc.); node carries TRS, quads are parented to the EmitterLevel ancestor
      const o = new THREE.Group(); o.name = attr(c, 'Name', ''); applyTRS(o, c);
      return buildParticleSystem(c, o, loadTexture);
    }
    default: { // Text, ParticleSystem, SoundSource, SoundListener, HitNode: later phases
      if (c.tag === 'SoundSource') return makeSoundNode(c); // src/audio (Phase 9): played by anim Commands / button hover
      stats.skipped[c.tag] = (stats.skipped[c.tag] || 0) + 1;
      if (c.tag === 'Text' || c.tag === 'HitNode' || c.tag === 'SoundListener') {
        const o = new THREE.Object3D(); o.name = attr(c, 'Name', ''); applyTRS(o, c);
        if (c.tag === 'Text') { await buildText(c, o, loadTexture); for (const k of c.children) if (k.tag === 'SoundSource') o.add(makeSoundNode(k)); } // src/render/text.js (Text::on_change_text 0x4760e0); Text child <SoundSource Name="Snd"> = button click (Phase 9)
        if (c.tag === 'SoundListener') registerListener(o);
        return o;
      }
      return null;
    }
  }
}
