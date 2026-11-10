// Billboard nodes (<Billboard Name Position> containing ModelFixed children; 16 in data: score popups objects/200.scene etc.).
// GUESS G-R10 (no engine evidence, see GUESS_REGISTER): a Billboard node takes the ORIENTATION of the camera node (same world axes as the D3D camera,
// i.e. local +x = screen right, +y = screen up, +z = view direction), keeps its own Position. Flag: config.BILLBOARD_FACE_CAMERA (false => static node, as before).
import * as THREE from 'three';
import { BILLBOARD_FACE_CAMERA, BILLBOARD_YAW_FLIP } from '../config.js';

const registry = new Set();
export function registerBillboard(o) {
  if (!BILLBOARD_FACE_CAMERA) return;
  o.updateMatrix(); o.matrixAutoUpdate = false; registry.add(o);
}
const M_CZ = new THREE.Matrix4().makeScale(1, 1, -1), FLIP = new THREE.Matrix4().makeRotationY(Math.PI);
const rw = new THREE.Matrix4(), pinv = new THREE.Matrix4(), ex = new THREE.Vector3(), ey = new THREE.Vector3(), ez = new THREE.Vector3();
// camMatrix = three camera.matrix (= D3D camera node matrixWorld * diag(1,1,-1)), root = scene root (to drop detached billboards).
export function orientBillboards(root, camMatrix) {
  if (!registry.size) return;
  rw.copy(camMatrix).multiply(M_CZ); // back to the D3D camera node frame (three space, det<0 like every object under the mirror root)
  rw.extractBasis(ex, ey, ez); ex.normalize(); ey.normalize(); ez.normalize(); rw.makeBasis(ex, ey, ez);
  if (BILLBOARD_YAW_FLIP) rw.multiply(FLIP);
  for (const o of registry) {
    let top = o; while (top.parent) top = top.parent;
    if (top !== root) { registry.delete(o); continue; }
    o.parent.updateWorldMatrix(true, false);
    pinv.copy(o.parent.matrixWorld).invert().multiply(rw);
    o.matrix.copy(pinv).setPosition(o.position);
    o.matrixWorldNeedsUpdate = true; o.updateMatrixWorld(true);
  }
}
