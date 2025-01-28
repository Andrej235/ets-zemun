import { useEffect } from "react";
import Solver, { SolverConfig } from "./fluid-canvas-internals/solver";
import { GUI, GUIController } from "dat.gui";

export default function useSolverDebugGui(solver: Solver | null) {
  useEffect(() => {
    if (!import.meta.env.DEV) return;
    if (!solver) return;

    const gui: dat.GUI = new GUI();
    gui.close();

    add(gui, solver, "timeSpeed").name("Time Speed").min(0).max(10).step(0.01);

    const gridFolder = gui.addFolder("Grid");
    add(gridFolder, solver, "gridScale").name("Grid Scale").min(0).step(0.01);
    gridFolder
      .add(solver.config.gridResolution, "0")
      .name("Grid Resolution X")
      .min(32)
      .max(2048)
      .step(32)
      .onChange((x) => {
        solver.config = {
          ...solver.config,
          gridResolution: [x, solver.config.gridResolution[1]],
        };

        solver.resetAllSlabs();
      });

    gridFolder
      .add(solver.config.gridResolution, "1")
      .name("Grid Resolution Y")
      .min(32)
      .max(2048)
      .step(32)
      .onChange((y) => {
        solver.config = {
          ...solver.config,
          gridResolution: [solver.config.gridResolution[0], y],
        };

        solver.resetAllSlabs();
      });

    const viscosityFolder = gui.addFolder("Viscosity");
    add(viscosityFolder, solver, "applyViscosity").name("Apply Viscosity");
    add(viscosityFolder, solver, "viscosity")
      .name("Viscosity")
      .min(0)
      .step(0.01);

    const vorticityFolder = gui.addFolder("Vorticity");
    add(vorticityFolder, solver, "applyVorticity").name("Apply Vorticity");
    add(vorticityFolder, solver, "vorticityCurl")
      .name("Vorticity Curl")
      .min(0)
      .step(0.01);

    add(gui, solver, "dissipation").name("Lingering").min(0).max(1).step(0.01);
    add(gui, solver, "poissonPressureEquationIterations")
      .name("Poisson Pressure Equation Iterations")
      .min(0)
      .max(500)
      .step(1);

    const splatFolder = gui.addFolder("Splat");
    add(splatFolder, solver, "radius").name("Radius").min(0).step(0.01);
    splatFolder
      .addColor(solver.config, "color")
      .name("Color")
      .onChange(getOnChangeCallback(solver, "color"));

    return () => gui.destroy();

    function add(
      gui: GUI,
      solver: Solver,
      key: keyof SolverConfig
    ): GUIController {
      return gui
        .add(wrap(solver.config[key]), "value")
        .onChange(getOnChangeCallback(solver, key));
    }

    function getOnChangeCallback<T extends keyof SolverConfig>(
      solver: Solver,
      key: T
    ): (value: SolverConfig[T]) => void {
      return (value) => (solver.config = { ...solver.config, [key]: value });
    }

    function wrap<T>(value: T): { value: T };
    function wrap<T extends object, K extends keyof T>(
      value: T,
      key: K
    ): { value: T[K] };

    function wrap<T, K extends keyof T>(
      value: T,
      key?: K
    ): { value: T[K] | T } {
      return {
        value: key ? value[key] : value,
      };
    }
  }, [solver]);
}

