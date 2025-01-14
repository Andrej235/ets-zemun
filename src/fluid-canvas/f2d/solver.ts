import * as THREE from "three";
import Slab from "./slab";
import Boundary from "./slabop/boundary";
import Advect from "./slabop/advect";
import Divergence from "./slabop/divergence";
import Gradient from "./slabop/gradient";
import Splat from "./slabop/splat";
import Vorticity from "./slabop/vorticity";
import VorticityConfinement from "./slabop/vorticityconfinement";
import Jacobi from "./slabop/jacobi";
import { Grid } from "../types/Grid";
import { Time } from "../types/Time";
import { Slabs } from "../types/Slabs";
import { Slabop } from "../types/Slabop";
import Mouse from "./mouse";

class Solver {
  grid: Grid;
  time: Time;
  windowSize: THREE.Vector2;

  velocity: Slab;
  density: Slab;
  velocityDivergence: Slab;
  velocityVorticity: Slab;
  pressure: Slab;

  advect: Advect;
  diffuse: Jacobi;
  divergence: Divergence;
  poissonPressureEq: Jacobi;
  gradient: Gradient;
  splat: Splat;
  vorticity: Vorticity;
  vorticityConfinement: VorticityConfinement;
  boundary: Boundary;

  viscosity: number;
  applyViscosity: boolean;
  applyVorticity: boolean;

  source: THREE.Vector3;
  ink: THREE.Vector3;

  constructor(
    grid: Grid,
    time: Time,
    windowSize: THREE.Vector2,
    slabs: Slabs,
    slabop: Slabop,
  ) {
    this.grid = grid;
    this.time = time;
    this.windowSize = windowSize;

    // slabs
    this.velocity = slabs.velocity;
    this.density = slabs.density;
    this.velocityDivergence = slabs.velocityDivergence;
    this.velocityVorticity = slabs.velocityVorticity;
    this.pressure = slabs.pressure;

    // slab operations
    this.advect = slabop.advect;
    this.diffuse = slabop.diffuse;
    this.divergence = slabop.divergence;
    this.poissonPressureEq = slabop.poissonPressureEq;
    this.gradient = slabop.gradient;
    this.splat = slabop.splat;
    this.vorticity = slabop.vorticity;
    this.vorticityConfinement = slabop.vorticityConfinement;
    this.boundary = slabop.boundary;

    this.viscosity = 0.3;
    this.applyViscosity = false;
    this.applyVorticity = false;

    // density attributes
    this.source = new THREE.Vector3(0.8, 0.0, 0.0);
    this.ink = new THREE.Vector3(0.0, 0.06, 0.19);
  }

  step(renderer: THREE.WebGLRenderer, mouse: Mouse) {
    // we only want the quantity carried by the velocity field to be
    // affected by the dissipation
    const temp = this.advect.dissipation;
    this.advect.dissipation = 1;
    this.advect.compute(renderer, this.velocity, this.velocity, this.velocity);
    this.boundary.compute(renderer, this.velocity, -1, this.velocity);

    this.advect.dissipation = temp;
    this.advect.compute(renderer, this.velocity, this.density, this.density);

    this.addForces(renderer, mouse);

    if (this.applyVorticity) {
      this.vorticity.compute(renderer, this.velocity, this.velocityVorticity);
      this.vorticityConfinement.compute(
        renderer,
        this.velocity,
        this.velocityVorticity,
        this.velocity,
      );
      this.boundary.compute(renderer, this.velocity, -1, this.velocity);
    }

    if (this.applyViscosity && this.viscosity > 0) {
      const s = this.grid.scale;

      this.diffuse.alpha = (s * s) / (this.viscosity * this.time.step);
      this.diffuse.beta = 4 + this.diffuse.alpha;
      this.diffuse.compute(
        renderer,
        this.velocity,
        this.velocity,
        this.velocity,
        this.boundary,
        -1,
      );
    }

    this.project(renderer);
  }

  addForces(renderer: THREE.WebGLRenderer, mouse: Mouse) {
    const point = new THREE.Vector2();
    const force = new THREE.Vector3();

    if (mouse.motions.length === 0) mouse.getStaticPosition(1);

    for (let i = 0; i < mouse.motions.length; i++) {
      const motion = mouse.motions[i];

      point.set(motion.position.x, this.windowSize.y - motion.position.y);
      // normalize to [0, 1] and scale to grid size
      point.x = (point.x / this.windowSize.x) * this.grid.size.x;
      point.y = (point.y / this.windowSize.y) * this.grid.size.y;

      force.set(motion.drag.x, -motion.drag.y, 0);
      this.splat.compute(renderer, this.velocity, force, point, this.velocity);
      this.boundary.compute(renderer, this.velocity, -1, this.velocity);

      this.splat.compute(
        renderer,
        this.density,
        this.source,
        point,
        this.density,
      );
    }
    mouse.motions = [];
  }

  // solve poisson equation and subtract pressure gradient
  project(renderer: THREE.WebGLRenderer) {
    this.divergence.compute(renderer, this.velocity, this.velocityDivergence);

    // 0 is our initial guess for the poisson equation solver
    this.clearSlab(renderer, this.pressure);

    this.poissonPressureEq.alpha = -this.grid.scale * this.grid.scale;
    this.poissonPressureEq.compute(
      renderer,
      this.pressure,
      this.velocityDivergence,
      this.pressure,
      this.boundary,
      1,
    );

    this.gradient.compute(
      renderer,
      this.pressure,
      this.velocity,
      this.velocity,
    );
    this.boundary.compute(renderer, this.velocity, -1, this.velocity);
  }

  clearSlab(renderer: THREE.WebGLRenderer, slab: Slab) {
    renderer.setRenderTarget(slab.write);
    renderer.clear(true, false, false);
    slab.swap();
  }

  static make(
    grid: Grid,
    time: Time,
    windowSize: THREE.Vector2,
    shaders: Record<string, string>,
  ) {
    const w = grid.size.x,
      h = grid.size.y;

    const slabs = {
      // vec2
      velocity: Slab.make(w, h),
      // scalar
      density: Slab.make(w, h),
      velocityDivergence: Slab.make(w, h),
      velocityVorticity: Slab.make(w, h),
      pressure: Slab.make(w, h),
    };

    const slabop = {
      advect: new Advect(shaders.advect, grid, time),
      diffuse: new Jacobi(shaders.jacobivector, grid),
      divergence: new Divergence(shaders.divergence, grid),
      poissonPressureEq: new Jacobi(shaders.jacobiscalar, grid),
      gradient: new Gradient(shaders.gradient, grid),
      splat: new Splat(shaders.splat, grid),
      vorticity: new Vorticity(shaders.vorticity, grid),
      vorticityConfinement: new VorticityConfinement(
        shaders.vorticityforce,
        grid,
        time,
      ),
      boundary: new Boundary(shaders.boundary, grid),
    };

    return new Solver(grid, time, windowSize, slabs, slabop);
  }
}

export default Solver;

