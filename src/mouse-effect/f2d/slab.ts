import * as THREE from "three";

export default class Slab {
  read: THREE.WebGLRenderTarget;
  write: THREE.WebGLRenderTarget;

  constructor(
    width: number,
    height: number,
    options: THREE.RenderTargetOptions
  ) {
    this.read = new THREE.WebGLRenderTarget(width, height, options);
    this.write = this.read.clone();
  }
  swap() {
    let tmp = this.read;
    this.read = this.write;
    this.write = tmp;
  }
  static make(width: number, height: number) {
    return new Slab(width, height, options);
  }
}

let options = {
  wrapS: THREE.ClampToEdgeWrapping,
  wrapT: THREE.ClampToEdgeWrapping,
  magFilter: THREE.NearestFilter,
  minFilter: THREE.NearestFilter,
  format: THREE.RGBAFormat,
  type: THREE.FloatType,
  depthBuffer: false,
  stencilBuffer: false,
  generateMipmaps: false,
  shareDepthFrom: null,
};
