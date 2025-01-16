import { Uniforms } from "../../types/uniforms";
import * as THREE from "three";
import { Grid } from "../../types/grid";

export default class SlabopBase {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;

  constructor(fragmentShader: string, uniforms: Uniforms, grid: Grid) {
    const geometry = new THREE.PlaneGeometry(
      (2 * (grid.resolution.x - 2)) / grid.resolution.x,
      (2 * (grid.resolution.y - 2)) / grid.resolution.y,
    );
    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      fragmentShader: fragmentShader,
      depthWrite: false,
      depthTest: false,
      blending: THREE.NoBlending,
    });
    const quad = new THREE.Mesh(geometry, material);

    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    this.scene = new THREE.Scene();
    this.scene.add(quad);
  }
}

