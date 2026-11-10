// ModelMorph: out = A + (B-A)*w on Positions, Normals, UV0 (CONFIRMED FUN_0046df20, FORMATS 'ENGINE: morph'; w=0 Source, w=1 Source2). Moved from ui/hud.js (shared by HUD bars and in-world MorphWeight anim channels).
import * as THREE from 'three';
import { loadModel } from '../loader/assets.js';

export async function prepMorph(node) { // ModelMorph: lerp(Source, Source2, MorphWeight)  (CONFIRMED FUN_0046df20, G-UI-02 closed: w=0 Source, w=1 Source2)
  const mo = node.userData.morph; if (!mo || mo.ready) return; mo.ready = true;
  const m2 = await loadModel(mo.source2); let start = 0; mo.parts = [];
  for (const mesh of node.children) {
    if (!mesh.isMesh) continue; const n = mesh.userData.draw.tris, pos = mesh.geometry.getAttribute('position');
    const nA = mesh.geometry.getAttribute('normal'), nbase = nA ? Float32Array.from(nA.array) : null; // FUN_0046df20 morphs Positions, Normals (not renormalised), UV0; NOT tangents
    const base = Float32Array.from(pos.array), tgt = m2.positions.slice(start * 9, (start + n) * 9);
    // N6 root cause (CONFIRMED by data diff, indikator2_0_0 vs _1 .model): Positions/Normals/tangents are byte-identical, ONLY the UV0 block differs => the morph animates UV, not vertex positions.
    const uvA = mesh.geometry.getAttribute('uv'), ubase = uvA ? Float32Array.from(uvA.array) : null, utgt = ubase && m2.uv ? m2.uv.slice(start * 6, (start + n) * 6) : null; start += n;
    mesh.geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(base), 3));
    if (ubase) mesh.geometry.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(ubase), 2));
    const ntgt = nbase && m2.normals ? m2.normals.slice((start - n) * 9, start * 9) : null;
    if (nbase) mesh.geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(nbase), 3));
    mo.parts.push({ mesh, base, tgt, ubase, utgt, nbase, ntgt });
  }
}
export function setMorph(node, w) {
  const mo = node.userData.morph; if (!mo || !mo.parts) return;
  for (const { mesh, base, tgt, ubase, utgt, nbase, ntgt } of mo.parts) {
    const pa = mesh.geometry.getAttribute('position'), a = pa.array; for (let i = 0; i < a.length; i++) a[i] = base[i] + (tgt[i] - base[i]) * w; pa.needsUpdate = true;
    if (nbase && ntgt) { const na = mesh.geometry.getAttribute('normal'), c = na.array; for (let i = 0; i < c.length; i++) c[i] = nbase[i] + (ntgt[i] - nbase[i]) * w; na.needsUpdate = true; }
    if (ubase && utgt) { const ua = mesh.geometry.getAttribute('uv'), b = ua.array; for (let i = 0; i < b.length; i++) b[i] = ubase[i] + (utgt[i] - ubase[i]) * w; ua.needsUpdate = true; }
  }
}
