import { Vector2, WebGLRenderer } from "three";
import { Grid } from "../../types/Grid";
import { Uniforms } from "../../types/Uniforms";
import Slab from "../slab";
import SlabopBase from "./slabopbase";

class Vorticity extends SlabopBase {
  grid: Grid;
  uniforms: Uniforms;

  constructor(fragmentShader: string, grid: Grid) {
    const uniforms = {
      velocity: { value: null },
      gridSize: { value: new Vector2() },
      gridScale: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.uniforms = uniforms;
  }

  compute(renderer: WebGLRenderer, velocity: Slab, output: Slab) {
    this.uniforms.velocity.value = velocity.read.texture;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.gridScale.value = this.grid.scale;

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

export default Vorticity;
