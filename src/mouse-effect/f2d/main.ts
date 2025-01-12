import * as THREE from "three";
import * as dat from "dat.gui";
import Mouse from "./mouse";
import Solver from "./solver";
import Display from "./display";
import FileLoader from "./fileloader";
import { Grid } from "../types/Grid";
import { Time } from "../types/Time";

let windowSize = new THREE.Vector2(window.innerWidth, window.innerHeight);

let renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.autoClear = false;
renderer.sortObjects = false;
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(windowSize.x, windowSize.y);
renderer.setClearColor(0x00ff00);
document.body.appendChild(renderer.domElement);

let grid: Grid = {
  size: new THREE.Vector2(512, 256),
  scale: 1,
  applyBoundaries: true,
};
let time: Time = {
  step: 1,
};
let displayScalar: Display;
let displayVector: Display;
let displaySettings: {
  slab: "density" | "velocity" | "divergence" | "pressure";
} = {
  slab: "density",
};

let solver: Solver;
let gui: dat.GUI;
let mouse = new Mouse(grid);

function init(shaders: Record<string, string>) {
  solver = Solver.make(grid, time, windowSize, shaders);

  displayScalar = new Display(shaders.basic, shaders.displayscalar);
  displayVector = new Display(shaders.basic, shaders.displayvector);

  gui = new dat.GUI();
  gui.add(displaySettings, "slab", [
    "density",
    "velocity",
    "divergence",
    "pressure",
  ]);
  gui.add(time, "step").min(0).step(0.01);

  let advectFolder = gui.addFolder("Advect");
  advectFolder.add(solver.advect, "dissipation", {
    none: 1,
    slow: 0.998,
    fast: 0.992,
    "very fast": 0.9,
  });

  let viscosityFolder = gui.addFolder("Viscosity");
  viscosityFolder.add(solver, "applyViscosity");
  viscosityFolder.add(solver, "viscosity").min(0).step(0.01);

  let vorticityFolder = gui.addFolder("Vorticity");
  vorticityFolder.add(solver, "applyVorticity");
  vorticityFolder.add(solver.vorticityConfinement, "curl").min(0).step(0.01);

  let poissonPressureEqFolder = gui.addFolder("Poisson Pressure Equation");
  poissonPressureEqFolder.add(
    solver.poissonPressureEq,
    "iterations",
    0,
    500,
    1
  );

  // we need a splat color "adapter" since we want values between 0 and
  // 1 but also since dat.GUI requires a JavaScript array over a Three.js
  // vector
  let splatSettings = {
    color: [solver.ink.x * 255, solver.ink.y * 255, solver.ink.z * 255],
  };
  let splatFolder = gui.addFolder("Splat");
  splatFolder.add(solver.splat, "radius").min(0);
  splatFolder.addColor(splatSettings, "color").onChange(function (value) {
    solver.ink.set(value[0] / 255, value[1] / 255, value[2] / 255);
  });

  let gridFolder = gui.addFolder("Grid");
  gridFolder.add(grid, "applyBoundaries");
  gridFolder.add(grid, "scale");

  requestAnimationFrame(update);
}

function update() {
  solver.step(renderer, mouse);
  render();
  requestAnimationFrame(update);
}

function render() {
  let display, read;
  switch (displaySettings.slab) {
    case "velocity":
      display = displayVector;
      display.scaleNegative();
      read = solver.velocity.read;
      break;
    case "density":
      display = displayScalar;
      display.scale.copy(solver.ink);
      display.bias.set(0, 0, 0);
      read = solver.density.read;
      break;
    case "divergence":
      display = displayScalar;
      display.scaleNegative();
      read = solver.velocityDivergence.read;
      break;
    case "pressure":
      display = displayScalar;
      display.scaleNegative();
      read = solver.pressure.read;
      break;
  }
  display.render(renderer, read);
}

function resize() {
  windowSize.set(window.innerWidth, window.innerHeight);
  renderer.setSize(windowSize.x, windowSize.y);
}
window.onresize = resize;

let loader = new FileLoader("shaders", [
  "advect.fs",
  "basic.vs",
  "gradient.fs",
  "jacobiscalar.fs",
  "jacobivector.fs",
  "displayscalar.fs",
  "displayvector.fs",
  "divergence.fs",
  "splat.fs",
  "vorticity.fs",
  "vorticityforce.fs",
  "boundary.fs",
]);
loader.run((files) => {
  // remove file extension before passing shaders to init
  let shaders: Record<string, string> = {};
  for (let name in files) {
    shaders[name.split(".")[0]] = files[name];
  }
  init(shaders);
});
