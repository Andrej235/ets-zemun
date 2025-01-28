import * as THREE from "three";
import SlabopBase from "./slabopbase";
import { Grid } from "../../types/grid";
import { Uniforms } from "../../types/uniforms";
import Slab from "../slab";

export default class VorticityConfinement extends SlabopBase {
  grid: Grid;
  time: number;
  epsilon: number;
  curl: number;
  uniforms: Uniforms;

  constructor(
    fragmentShader: string,
    grid: Grid,
    time: number,
    epsilon?: number,
    curl?: number,
  ) {
    const uniforms = {
      velocity: { value: null },
      vorticity: { value: null },
      gridSize: { value: new THREE.Vector2() },
      gridScale: { value: 1.0 },
      timestep: { value: 1.0 },
      epsilon: { value: 1.0 },
      curl: { value: new THREE.Vector2() },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.time = time;
    this.epsilon = epsilon === undefined ? 2.4414e-4 : epsilon;
    this.curl = curl === undefined ? 0.3 : curl;
    this.uniforms = uniforms;
  }

  compute(
    renderer: THREE.WebGLRenderer,
    velocity: Slab,
    vorticity: Slab,
    output: Slab,
  ) {
    this.uniforms.velocity.value = velocity.read.texture;
    this.uniforms.vorticity.value = vorticity.read.texture;
    this.uniforms.gridSize.value = this.grid.resolution;
    this.uniforms.gridScale.value = this.grid.scale;
    this.uniforms.timestep.value = this.time;
    this.uniforms.epsilon.value = this.epsilon;
    this.uniforms.curl.value.set(
      this.curl * this.grid.scale,
      this.curl * this.grid.scale,
    );

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

