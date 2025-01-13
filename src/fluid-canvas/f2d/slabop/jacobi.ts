import { Vector2, WebGLRenderer } from "three";
import { Grid } from "../../types/Grid";
import { Uniforms } from "../../types/Uniforms";
import Slab from "../slab";
import Boundary from "./boundary";
import SlabopBase from "./slabopbase";

class Jacobi extends SlabopBase {
  grid: Grid;
  iterations: number;
  alpha: number;
  beta: number;
  uniforms: Uniforms;

  constructor(
    fragmentShader: string,
    grid: Grid,
    iterations: number = 50,
    alpha: number = -1,
    beta: number = 4
  ) {
    const uniforms = {
      x: { value: null },
      b: { value: null },
      gridSize: { value: new Vector2() },
      alpha: { value: 1.0 },
      beta: { value: 1.0 },
    };

    super(fragmentShader, uniforms, grid);

    this.grid = grid;
    this.iterations = iterations;
    this.alpha = alpha;
    this.beta = beta;
    this.uniforms = uniforms;
  }

  compute(
    renderer: WebGLRenderer,
    x: Slab,
    b: Slab,
    output: Slab,
    boundary: Boundary,
    scale: number
  ) {
    for (let i = 0; i < this.iterations; i++) {
      this.step(renderer, x, b, output);
      boundary.compute(renderer, output, scale, output);
    }
  }

  step(renderer: WebGLRenderer, x: Slab, b: Slab, output: Slab) {
    this.uniforms.x.value = x.read.texture;
    this.uniforms.b.value = b.read.texture;
    this.uniforms.gridSize.value = this.grid.size;
    this.uniforms.alpha.value = this.alpha;
    this.uniforms.beta.value = this.beta;

    renderer.setRenderTarget(output.write);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    output.swap();
  }
}

export default Jacobi;
