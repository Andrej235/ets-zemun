import { Uniforms } from "../../types/uniforms";
import { Grid } from "../../types/grid";
import SlabopBase from "./slabopbase";
import Slab from "../slab";
import { Vector2, WebGLRenderer } from "three";

export default class Advect extends SlabopBase {
  uniforms: Uniforms;
  grid: Grid;
  time: number;
  dissipation: number;

  constructor(
    fragmentShader: string,
    grid: Grid,
    time: number,
    dissipation: number = 0.998,
  ) {
    const uniforms = {
      velocity: { value: null }, // assuming you'll set this later with a texture
      advected: { value: null }, // assuming you'll set this later with a texture
      gridSize: { value: new Vector2() },
      gridScale: { value: 1.0 },
      timestep: { value: 1.0 },
      dissipation: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.time = time;
    this.dissipation = dissipation;
    this.uniforms = uniforms;
  }

  compute(
    renderer: WebGLRenderer,
    velocity: Slab,
    advected: Slab,
    output: Slab,
  ) {
    this.uniforms.velocity.value = velocity.read.texture;
    this.uniforms.advected.value = advected.read.texture;
    this.uniforms.gridSize.value = this.grid.resolution;
    this.uniforms.gridScale.value = this.grid.scale;
    this.uniforms.timestep.value = this.time;
    this.uniforms.dissipation.value = this.dissipation;

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

