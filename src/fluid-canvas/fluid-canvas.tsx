import * as THREE from "three";
import Mouse from "./f2d/mouse";
import Solver from "./f2d/solver";
import Display from "./f2d/display";
import FileLoader, { Files } from "./f2d/fileloader";
import { Grid } from "./types/Grid";
import { Time } from "./types/Time";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { GUI } from "dat.gui";

type DisplaySettings = {
  slab: "density" | "velocity" | "divergence" | "pressure";
};

export default function FluidCanvas() {
  const [shaders, setShaders] = useState<Files | null>(null);
  const [mouse, setMouse] = useState<Mouse | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  const grid: Grid = useMemo(
    () => ({
      size: new THREE.Vector2(512, 256),
      scale: 1,
      applyBoundaries: true,
    }),
    [],
  );

  const displaySettings: DisplaySettings = useMemo(
    () => ({
      slab: "density",
    }),
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
        "displayvector.fs",
        "divergence.fs",
        "splat.fs",
        "vorticity.fs",
        "vorticityforce.fs",
        "boundary.fs",
      ]),
    [],
  );

  const time: Time = useMemo(
    () => ({
      step: 1,
    }),
    [],
  );

  const windowSize = useMemo(
    () => new THREE.Vector2(window.innerWidth, window.innerHeight),
    [],
  );

  const solver = useMemo(
    () => shaders && Solver.make(grid, time, windowSize, shaders),
    [grid, time, windowSize, shaders],
  );

  const displayScalar = useMemo(
    () => shaders && new Display(shaders.basic, shaders.displayscalar),
    [shaders],
  );

  const displayVector = useMemo(
    () => shaders && new Display(shaders.basic, shaders.displayvector),
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
    if (!solver || !displayScalar || !displayVector) return;

    let display;
    let read;

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
  }, [displaySettings, solver, displayScalar, displayVector, renderer]);

  const update = useCallback(() => {
    if (!solver || !mouse) return null;

    solver.step(renderer, mouse);
    render();
    requestAnimationFrame(update);
  }, [solver, mouse, render, renderer]);

  useEffect(() => {
    fileLoader.run().then((files) => {
      const shaders: Record<string, string> = {};
      for (const name in files) {
        shaders[name.split(".")[0]] = files[name];
      }

      setShaders(shaders);
    });
  }, [fileLoader]);

  useEffect(() => {
    if (!containerRef.current) return;

    setMouse((mouse) => {
      mouse?.dispose();
      return new Mouse(grid, containerRef.current!);
    });
  }, [containerRef, grid]);

  useEffect(() => void (update && requestAnimationFrame(update)), [update]);

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
  useEffect(() => {
    if (!solver) return;
    const gui: dat.GUI = new GUI();

    gui.add(displaySettings, "slab", [
      "density",
      "velocity",
      "divergence",
      "pressure",
    ]);
    gui.add(time, "step").min(0).step(0.01);

    const advectFolder = gui.addFolder("Advect");
    advectFolder.add(solver.advect, "dissipation", {
      none: 1,
      slow: 0.998,
      fast: 0.992,
      "very fast": 0.9,
    });

    const viscosityFolder = gui.addFolder("Viscosity");
    viscosityFolder.add(solver, "applyViscosity");
    viscosityFolder.add(solver, "viscosity").min(0).step(0.01);

    const vorticityFolder = gui.addFolder("Vorticity");
    vorticityFolder.add(solver, "applyVorticity");
    vorticityFolder.add(solver.vorticityConfinement, "curl").min(0).step(0.01);

    const poissonPressureEqFolder = gui.addFolder("Poisson Pressure Equation");
    poissonPressureEqFolder.add(
      solver.poissonPressureEq,
      "iterations",
      0,
      500,
      1,
    );

    // we need a splat color "adapter" since we want values between 0 and
    // 1 but also since dat.GUI requires a JavaScript array over a Three.js
    // vector
    const splatSettings = {
      color: [solver.ink.x * 255, solver.ink.y * 255, solver.ink.z * 255],
    };
    const splatFolder = gui.addFolder("Splat");
    splatFolder.add(solver.splat, "radius").min(0);
    splatFolder.addColor(splatSettings, "color").onChange(function (value) {
      solver.ink.set(value[0] / 255, value[1] / 255, value[2] / 255);
    });

    const gridFolder = gui.addFolder("Grid");
    gridFolder.add(grid, "applyBoundaries");
    gridFolder.add(grid, "scale");

    return () => {
      gui.destroy();
    };
  }, [solver, displaySettings, time, grid]);
  //#endregion

  return <div className="fluid-canvas" ref={containerRef}></div>;
}

