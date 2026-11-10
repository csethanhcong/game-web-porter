// D3D8 fixed-function emulation (per-vertex lighting, Gouraud) as a ShaderMaterial.
// CONFIRMED from engine.exe render pass (all.c ~106290-106360, FUN_004862b0, FUN_00486260, FUN_00488xxx):
//  - D3DRS_CULLMODE(0x16)=3 CCW -> front face = CW on screen; ZFUNC LESS (opaque list) / LESSEQUAL (blended list, ZWRITE off);
//  - SPECULARENABLE(0x1d)=0, ALPHABLENDENABLE(0x1b)=1, NORMALIZENORMALS(0x9c)=1 (all.c:106168-106169, 106486);
//  - texture stage 0: COLOROP=MODULATE2X (TSS type1 value5), COLORARG1=TEXTURE, ARG2=CURRENT; ALPHAOP=MODULATE2X (FUN_004862b0 mode 0);
//  - min/mag/mip filter LINEAR (TSS 0x10/0x11/0x12 =2); blend SRCBLEND(0x13)=SRCALPHA(5), DESTBLEND(0x14)=INVSRCALPHA(6);
//  - opaque list: ALPHATEST on, ALPHAFUNC(0x19)=3 EQUAL, ALPHAREF(0x18)=0xff (FUN_00486260); blended list: alpha test off.
// CONFIRMED (FORMATS 'ENGINE: ánh sáng' / 'PORT vs ENGINE', FUN_00486b90 / 004881f0 / 00486c90):
//  - MatDiffuse = MatAmbient = Diffuse*(1-Transparency)*0.5, Emissive=0 for lit items (MODULATE2X x2 restores brightness);
//  - opaque list: alpha = 1-T, texel alpha>=0.5 passes (alpha test); blended list: alpha = (1-T)*0.5 then x2;
//  - item without Diffuse Image: Diffuse=0, Emissive=E*0.5, blend ONE; vc=sat(Ambient*MatAmbient+Emissive*0.5), rgb=tex*vc*2;
//  - POINT: Diffuse=rgb, atten coef/Intensity, Range 6 | 6I | 6sqrt(I); DIRECTIONAL: Diffuse=rgb*Intensity.
// GUESS: texture-stage mode (this+0x1008c) assumed 0 (G-R05); directional direction expressed in three space (see renderer.js).
import * as THREE from 'three';

export const MAX_LIGHTS = 8;
// Shared light uniforms (one object, referenced by every material; refreshed by renderer each frame).
export const lightUniforms = {
  uAmbient: { value: new THREE.Vector3(0, 0, 0) },
  uNumLights: { value: 0 },
  uLPos: { value: Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector3()) },
  uLCol: { value: Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector3()) },
  uLAtt: { value: Array.from({ length: MAX_LIGHTS }, () => new THREE.Vector3(1, 0, 0)) }, // a0,a1,a2
  uLType: { value: new Array(MAX_LIGHTS).fill(0) }, // 0 point, 1 directional
  uLRange: { value: new Array(MAX_LIGHTS).fill(1e9) },
};
export const renderFlags = { lighting: true };
const lightingOn = { value: 1 };
export function setLighting(on) { lightingOn.value = on ? 1 : 0; renderFlags.lighting = !!on; }

const VERT = /* glsl */ `
uniform vec3 uAmbient; uniform int uNumLights;
uniform vec3 uLPos[${MAX_LIGHTS}]; uniform vec3 uLCol[${MAX_LIGHTS}]; uniform vec3 uLAtt[${MAX_LIGHTS}]; uniform float uLType[${MAX_LIGHTS}]; uniform float uLRange[${MAX_LIGHTS}];
uniform vec3 uMatDiffuse; uniform vec3 uMatAmbient; uniform vec3 uMatEmissive; uniform float uLit;
varying vec3 vColor; varying vec2 vUv;
void main(){
  vUv = uv;
  vec4 wp = modelMatrix * vec4(position, 1.0);
  vec3 n = normalize(transpose(inverse(mat3(modelMatrix))) * normal);
  vec3 c = uMatEmissive + uAmbient * uMatAmbient;
  for (int i = 0; i < ${MAX_LIGHTS}; i++) {
    if (i >= uNumLights) break;
    vec3 L; float att = 1.0;
    if (uLType[i] < 0.5) { vec3 d = uLPos[i] - wp.xyz; float dist = length(d); L = d / max(dist, 1e-5); att = dist > uLRange[i] ? 0.0 : 1.0 / (uLAtt[i].x + uLAtt[i].y * dist + uLAtt[i].z * dist * dist); }
    else { L = -uLPos[i]; }
    c += uMatDiffuse * uLCol[i] * max(dot(n, L), 0.0) * att;
  }
  vColor = mix(vec3(0.5), clamp(c, 0.0, 1.0), uLit); // D3D clamps vertex colour to [0,1]; unlit debug = raw texture (0.5 * MODULATE2X)
  gl_Position = projectionMatrix * viewMatrix * wp;
}`;

const FRAG = /* glsl */ `
uniform sampler2D uMap; uniform float uHasMap; uniform float uAlphaMul; uniform float uOpaquePass;
varying vec3 vColor; varying vec2 vUv;
void main(){
  vec4 t = uHasMap > 0.5 ? texture2D(uMap, vUv) : vec4(1.0);
  vec3 rgb = clamp(t.rgb * vColor * 2.0, 0.0, 1.0); float a = clamp(t.a * uAlphaMul * 2.0, 0.0, 1.0); // MODULATE2X colour + alpha
  if (uOpaquePass > 0.5 && a < 0.999) discard; // opaque list alpha test (texel alpha >= 0.5 passes)
  gl_FragColor = vec4(rgb, a);
}`;

// opts: {map, diffuse[3], emissive[3], transparency, mode:'lit'|'emissive', transparent:boolean(blended list), name}
export function makeMaterial(o) {
  const emissiveMode = o.mode === 'emissive';
  const T = o.transparency || 0, d = (o.diffuse || [1, 1, 1]).map((x) => x * (1 - T) * 0.5), em = o.emissiveAlphaMultiply ? 1 - T : 1, e = (o.emissive || [0, 0, 0]).map((x) => x * 0.5 * em); // EmissiveAlphaMultiply: Emissive*(1-T) (CONFIRMED FORMATS G-R03, FUN_00484420)
  const m = new THREE.ShaderMaterial({
    name: o.name || '',
    vertexShader: VERT, fragmentShader: FRAG,
    uniforms: {
      ...lightUniforms,
      uMap: { value: o.map || null }, uHasMap: { value: o.map ? 1 : 0 },
      uAlphaMul: { value: o.transparent ? (1 - T) * 0.5 : 1 - T }, uOpaquePass: { value: o.transparent ? 0 : 1 },
      uMatDiffuse: { value: emissiveMode ? new THREE.Vector3(0, 0, 0) : new THREE.Vector3(...d) }, // emissive item: Diffuse=0 (G-R03)
      uMatAmbient: { value: new THREE.Vector3(...d) },
      uMatEmissive: { value: emissiveMode ? new THREE.Vector3(...e) : new THREE.Vector3(0, 0, 0) },
      uLit: lightingOn,
    },
    side: THREE.FrontSide, depthTest: true,
    transparent: !!o.transparent, depthWrite: !o.transparent, depthFunc: o.transparent ? THREE.LessEqualDepth : THREE.LessDepth,
  });
  m.userData.opts = o;
  if (emissiveMode) { m.blending = THREE.CustomBlending; m.blendEquation = THREE.AddEquation; m.blendSrc = THREE.OneFactor; m.blendDst = THREE.OneMinusSrcAlphaFactor; }
  else if (o.transparent) { m.blending = THREE.CustomBlending; m.blendEquation = THREE.AddEquation; m.blendSrc = THREE.SrcAlphaFactor; m.blendDst = THREE.OneMinusSrcAlphaFactor; }
  else m.blending = THREE.NoBlending;
  return m;
}

// D3D cull (CCW culled => front = CW on screen) must hold regardless of the sign of the world determinant.
// three flips GL frontFace by det(matrixWorld)<0; the mirror root makes det<0 for normal meshes (FrontSide then == CW front),
// meshes with an extra mirrored ancestor (det>0) need BackSide. Evaluated per mesh in onBeforeRender.
export function attachD3DCull(mesh) {
  mesh.onBeforeRender = function (r, s, c, g, mat) { mat.side = this.matrixWorld.determinant() < 0 ? THREE.FrontSide : THREE.BackSide; };
}

// Runtime Transparency (anim channel 'Transparency'): list choice follows the CURRENT value (CONFIRMED G-R02: T==0 opaque list, T!=0 blended list).
export function setTransparency(mesh, T) {
  const m = mesh.material, o = m.userData.opts; if (!o) return;
  o.transparency = T; const u = m.uniforms, blended = T !== 0, d = (o.diffuse || [1, 1, 1]).map((x) => x * (1 - T) * 0.5);
  u.uAlphaMul.value = blended ? (1 - T) * 0.5 : 1 - T; u.uOpaquePass.value = blended ? 0 : 1;
  if (o.mode !== 'emissive') u.uMatDiffuse.value.set(d[0], d[1], d[2]);
  else { const em = o.emissiveAlphaMultiply ? 1 - T : 1, e = o.emissive || [0, 0, 0]; u.uMatEmissive.value.set(e[0] * 0.5 * em, e[1] * 0.5 * em, e[2] * 0.5 * em); }
  u.uMatAmbient.value.set(d[0], d[1], d[2]);
  if (blended !== m.transparent) {
    m.transparent = blended; m.depthWrite = !blended; m.depthFunc = blended ? THREE.LessEqualDepth : THREE.LessDepth;
    if (o.mode !== 'emissive') { if (blended) { m.blending = THREE.CustomBlending; m.blendEquation = THREE.AddEquation; m.blendSrc = THREE.SrcAlphaFactor; m.blendDst = THREE.OneMinusSrcAlphaFactor; } else m.blending = THREE.NoBlending; }
    m.needsUpdate = true;
  }
}

// Runtime Diffuse (anim channel 'Diffuse', Vector3 on '#Shaders#|<shader>'; setter at 0x46b870 -> Material Diffuse): same derivation as makeMaterial (Diffuse*(1-T)*0.5, FUN_00484420/G-R03).
export function setDiffuse(mesh, rgb) {
  const m = mesh.material, o = m.userData.opts; if (!o) return;
  o.diffuse = [rgb[0], rgb[1], rgb[2]]; const T = o.transparency || 0, u = m.uniforms, d = o.diffuse.map((x) => x * (1 - T) * 0.5);
  if (o.mode !== 'emissive') u.uMatDiffuse.value.set(d[0], d[1], d[2]);
  u.uMatAmbient.value.set(d[0], d[1], d[2]);
}
