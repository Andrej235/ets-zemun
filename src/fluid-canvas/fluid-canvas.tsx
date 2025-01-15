import * as THREE from "three";
import Solver, { SolverConfig } from "./f2d/solver";
import Display from "./f2d/display";
import FileLoader, { Files } from "./f2d/fileloader";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type FluidCanvasProps = {
  containerToApplyEventListenersTo: React.RefObject<HTMLElement>;
  gridSize: [x: number, y: number];
};

export default function FluidCanvas({
  containerToApplyEventListenersTo,
  gridSize,
}: FluidCanvasProps) {
  const defaults: SolverConfig = useMemo(
    () => ({
      timeSpeed: 0.5,
      dissipation: 0.85,
      applyViscosity: true,
      viscosity: 0.3,
      applyVorticity: true,
      vorticityCurl: 0.2,
      poissonPressureEquationIterations: 50,
      radius: 0.045,
      color: [15, 15, 30],
      applyGridBoundaries: false,
      gridScale: 3.5,
      gridResolution: gridSize,
    }),
    [gridSize],
  );

  const [shaders, setShaders] = useState<Files | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const windowSize = useMemo(
    () => new THREE.Vector2(window.innerWidth, window.innerHeight),
    [],
  );

  const fileLoader: FileLoader = useMemo(
    () =>
      new FileLoader("shaders", [
        "advect.fs",
        "basic.vs",
        "gradient.fs",
        "jacobiscalar.fs",
        "jacobivector.fs",
        "displayscalar.fs",
        "divergence.fs",
        "splat.fs",
        "vorticity.fs",
        "vorticityforce.fs",
        "boundary.fs",
      ]),
    [],
  );

  const [solver, setSolver] = useState<Solver | null>(null);

  useEffect(() => {
    if (
      !shaders ||
      !containerToApplyEventListenersTo.current ||
      !containerRef.current
    )
      return;

    const solver = new Solver(
      defaults,
      windowSize,
      shaders,
      containerToApplyEventListenersTo.current,
      containerRef.current,
    );
    setSolver(solver);
    return () => solver.dispose();
  }, [
    windowSize,
    shaders,
    containerToApplyEventListenersTo,
    containerRef,
    defaults,
  ]);

  const display = useMemo(
    () => shaders && new Display(shaders.basic, shaders.displayscalar),
    [shaders],
  );

  const renderer = useMemo(() => {
    const r = new THREE.WebGLRenderer();
    r.autoClear = false;
    r.sortObjects = false;
    r.setPixelRatio(window.devicePixelRatio);
    r.setSize(windowSize.x, windowSize.y);
    r.setClearColor(0x00ff00);
    return r;
  }, [windowSize]);

  const render = useCallback(() => {
    if (!solver || !display) return;

    display.scale.copy(solver.ink);
    display.render(renderer, solver.density.read);
  }, [solver, display, renderer]);

  const update = useCallback(() => {
    solver?.step(renderer);
    render();
    requestAnimationFrame(update);
  }, [solver, render, renderer]);

  useEffect(() => {
    fileLoader.run().then((files) => {
      const shaders: Record<string, string> = {};
      for (const name in files) {
        shaders[name.split(".")[0]] = files[name];
      }

      setShaders(shaders);
    });
  }, [fileLoader]);

  useEffect(() => void requestAnimationFrame(update), [update]);

  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.appendChild(renderer.domElement);

    function resize() {
      windowSize.set(window.innerWidth, window.innerHeight);
      renderer.setSize(windowSize.x, windowSize.y);
    }
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      renderer.domElement.remove();
      renderer.dispose();
    };
  }, [containerRef, renderer, windowSize]);

  //#region gui for debugging
  // useEffect(() => {
  // if (!import.meta.env.DEV) return;

  // if (!solver) return;
  // if (!false) return;
  // const gui: dat.GUI = new GUI();

  // gui
  //   .add(time, "step")
  //   .name("time speed")
  //   .min(0)
  //   .step(0.01)
  //   .setValue(defaults.timeSpeed);

  // gui
  //   .add(solver.advect, "dissipation", {
  //     none: 1,
  //     slow: 0.998,
  //     fast: 0.992,
  //     "very fast": 0.9,
  //     faster: 0.85,
  //     "very faster": 0.7,
  //   })
  //   .setValue(defaults.dissipation);

  // const viscosityFolder = gui.addFolder("Viscosity");
  // viscosityFolder
  //   .add(solver, "applyViscosity")
  //   .setValue(defaults.applyViscosity);
  // viscosityFolder
  //   .add(solver, "viscosity")
  //   .min(0)
  //   .step(0.01)
  //   .setValue(defaults.viscosity);

  // const vorticityFolder = gui.addFolder("Vorticity");
  // vorticityFolder
  //   .add(solver, "applyVorticity")
  //   .setValue(defaults.applyVorticity);
  // vorticityFolder
  //   .add(solver.vorticityConfinement, "curl")
  //   .min(0)
  //   .step(0.01)
  //   .setValue(defaults.vorticityCurl);

  // const poissonPressureEqFolder = gui.addFolder("Poisson Pressure Equation");
  // poissonPressureEqFolder
  //   .add(solver.poissonPressureEq, "iterations", 0, 500, 1)
  //   .setValue(defaults.poissonPressureEquationIterations);

  // const splatSettings = {
  //   color: [solver.ink.x * 255, solver.ink.y * 255, solver.ink.z * 255],
  // };
  // const splatFolder = gui.addFolder("Splat");
  // splatFolder.add(solver.splat, "radius").min(0).setValue(defaults.radius);
  // splatFolder
  //   .addColor(splatSettings, "color")
  //   .onChange(function (value) {
  //     solver.ink.set(value[0] / 255, value[1] / 255, value[2] / 255);
  //   })
  //   .setValue(defaults.color);

  // const gridFolder = gui.addFolder("Grid");
  // gridFolder
  //   .add(grid, "applyBoundaries")
  //   .setValue(defaults.applyGridBoundaries);
  // gridFolder.add(grid, "scale").setValue(defaults.gridScale);

  // return () => gui.destroy();
  // }, [solver, time, grid, defaults]);
  //#endregion

  return <div className="fluid-canvas" ref={containerRef}></div>;
}

