import * as THREE from "three";
import Solver, { SolverConfig } from "./fluid-canvas-internals/solver";
import FileLoader, { Files } from "./fluid-canvas-internals/fileloader";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import useSolverDebugGui from "./use-solver-debug-gui";
import useIsUsingMobile from "@hooks/use-is-mobile";

type FluidCanvasProps = {
  containerToApplyEventListenersTo: React.RefObject<HTMLElement>;
  gridSize: [x: number, y: number];
};

const FluidCanvas = memo<FluidCanvasProps>((props) => {
  const isUsingMobile = useIsUsingMobile();

  return !isUsingMobile && <NonMobileCanvas {...props} />;
});

const NonMobileCanvas = memo<FluidCanvasProps>(
  ({ containerToApplyEventListenersTo, gridSize }) => {
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
        ]),
      [],
    );

    const [solver, setSolver] = useState<Solver | null>(null);
    useSolverDebugGui(solver);

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
      if (!containerRef.current || !solver) return;

      containerRef.current.appendChild(solver.canvas);
    }, [solver, containerRef]);

    return <div className="fluid-canvas" ref={containerRef}></div>;
  },
);

export default FluidCanvas;

