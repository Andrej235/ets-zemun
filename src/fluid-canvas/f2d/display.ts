import { Uniforms } from "../types/Uniforms";
import * as THREE from "three";

export default class Display {
  scale: THREE.Vector3;
  material: THREE.ShaderMaterial;
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;
  uniforms: Uniforms;

  constructor(
    vertexShader: string,
    fragmentShader: string,
    scale?: THREE.Vector3,
  ) {
    this.scale = scale ?? new THREE.Vector3(1, 1, 1);

    this.uniforms = {
      read: { value: null },
      bias: { value: new THREE.Vector3() },
      scale: { value: new THREE.Vector3() },
    };

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });
    const quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), this.material);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.scene.add(quad);
  }
  render(renderer: THREE.WebGLRenderer, read: THREE.WebGLRenderTarget) {
    this.uniforms.read.value = read.texture;
    this.uniforms.scale.value = this.scale;
    renderer.render(this.scene, this.camera);
  }
}

