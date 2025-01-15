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
import Mouse from "./mouse";

export type SolverConfig = {
  timeSpeed: number;
  applyGridBoundaries: boolean;
  gridScale: number;
  gridResolution: [x: number, y: number];

  applyViscosity: boolean;
  viscosity: number;
  applyVorticity: boolean;
  vorticityCurl: number;

  dissipation: number;
  poissonPressureEquationIterations: number;
  radius: number;
  color: [number, number, number];
};

export default class Solver {
  private innerConfig: SolverConfig;

  private grid: Grid;
  private mouse: Mouse;
  private timeSpeed: number;
  private windowSize: THREE.Vector2;

  private velocity: Slab;
  density: Slab;
  private velocityDivergence: Slab;
  private velocityVorticity: Slab;
  private pressure: Slab;

  private advect: Advect;
  private diffuse: Jacobi;
  private divergence: Divergence;
  private poissonPressureEq: Jacobi;
  private gradient: Gradient;
  private splat: Splat;
  private vorticity: Vorticity;
  private vorticityConfinement: VorticityConfinement;
  private boundary: Boundary;

  private viscosity: number;
  private applyViscosity: boolean;
  private applyVorticity: boolean;

  private source: THREE.Vector3;
  ink: THREE.Vector3;

  public get config(): SolverConfig {
    return this.innerConfig;
  }

  public set config(config: SolverConfig) {
    this.innerConfig = config;

    this.timeSpeed = config.timeSpeed;
    this.grid.applyBoundaries = config.applyGridBoundaries;
    this.grid.scale = config.gridScale;
    this.grid.size.set(...config.gridResolution);
    this.windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);
    this.applyViscosity = config.applyViscosity;
    this.viscosity = config.viscosity;
    this.applyVorticity = config.applyVorticity;
    this.vorticityConfinement.curl = config.vorticityCurl;
    this.advect.dissipation = config.dissipation;
    this.poissonPressureEq.iterations =
      config.poissonPressureEquationIterations;
    this.splat.radius = config.radius;
    this.ink = new THREE.Vector3(
      config.color[0] / 255,
      config.color[1] / 255,
      config.color[2] / 255,
    );
  }

  constructor(
    config: SolverConfig,
    windowSize: THREE.Vector2,
    shaders: Record<string, string>,
    containerToApplyEventListenersTo: HTMLElement,
    containerRef: HTMLElement,
  ) {
    this.innerConfig = config;

    const grid = {
      size: new THREE.Vector2(
        config.gridResolution[0],
        config.gridResolution[1],
      ),
      scale: config.gridScale,
      applyBoundaries: config.applyGridBoundaries,
    };

    const mouse = new Mouse(
      grid,
      containerToApplyEventListenersTo,
      containerRef,
    );

    const timeSpeed = config.timeSpeed;

    this.timeSpeed = timeSpeed;
    this.grid = grid;
    this.mouse = mouse;
    this.windowSize = windowSize;

    const gridWidth = grid.size.x;
    const gridHeight = grid.size.y;

    //?slabs
    this.velocity = Slab.make(gridWidth, gridHeight); //?vec2
    this.density = Slab.make(gridWidth, gridHeight);
    this.velocityDivergence = Slab.make(gridWidth, gridHeight);
    this.velocityVorticity = Slab.make(gridWidth, gridHeight);
    this.pressure = Slab.make(gridWidth, gridHeight);

    //?slab operations
    this.advect = new Advect(shaders.advect, grid, timeSpeed);
    this.diffuse = new Jacobi(shaders.jacobivector, grid);
    this.divergence = new Divergence(shaders.divergence, grid);
    this.poissonPressureEq = new Jacobi(shaders.jacobiscalar, grid);
    this.gradient = new Gradient(shaders.gradient, grid);
    this.splat = new Splat(shaders.splat, grid);
    this.vorticity = new Vorticity(shaders.vorticity, grid);
    this.vorticityConfinement = new VorticityConfinement(
      shaders.vorticityforce,
      grid,
      timeSpeed,
    );
    this.boundary = new Boundary(shaders.boundary, grid);

    //?config
    this.applyViscosity = config.applyViscosity;
    this.viscosity = config.viscosity;
    this.applyVorticity = config.applyVorticity;
    this.vorticityConfinement.curl = config.vorticityCurl;
    this.advect.dissipation = config.dissipation;
    this.poissonPressureEq.iterations =
      config.poissonPressureEquationIterations;
    this.splat.radius = config.radius;
    this.ink = new THREE.Vector3(
      config.color[0] / 255,
      config.color[1] / 255,
      config.color[2] / 255,
    );

    //?density attributes
    this.source = new THREE.Vector3(0.8, 0.0, 0.0);
  }

  step(renderer: THREE.WebGLRenderer) {
    // we only want the quantity carried by the velocity field to be
    // affected by the dissipation
    const temp = this.advect.dissipation;
    this.advect.dissipation = 1;
    this.advect.compute(renderer, this.velocity, this.velocity, this.velocity);
    this.boundary.compute(renderer, this.velocity, -1, this.velocity);

    this.advect.dissipation = temp;
    this.advect.compute(renderer, this.velocity, this.density, this.density);

    this.addForces(renderer, this.mouse);

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

      this.diffuse.alpha = (s * s) / (this.viscosity * this.timeSpeed);
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

  private addForces(renderer: THREE.WebGLRenderer, mouse: Mouse) {
    const point = new THREE.Vector2();
    const force = new THREE.Vector3();

    if (mouse.isHoveringOverCanvas && mouse.motions.length === 0)
      mouse.getStaticPosition(1);

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
  private project(renderer: THREE.WebGLRenderer) {
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

  private clearSlab(renderer: THREE.WebGLRenderer, slab: Slab) {
    renderer.setRenderTarget(slab.write);
    renderer.clear(true, false, false);
    slab.swap();
  }

  dispose() {
    this.mouse.dispose();
  }
}

