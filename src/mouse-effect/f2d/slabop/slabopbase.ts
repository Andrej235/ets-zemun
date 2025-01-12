import { Uniforms } from './../../types/Uniforms';
import * as THREE from "three";
import { Grid } from "../../types/Grid";

class SlabopBase {
  camera: THREE.OrthographicCamera;
  scene: THREE.Scene;

  constructor(fragmentShader: string, uniforms: Uniforms, grid: Grid) {
    const geometry = new THREE.PlaneGeometry(
      (2 * (grid.size.x - 2)) / grid.size.x,
      (2 * (grid.size.y - 2)) / grid.size.y
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

export default SlabopBase;
