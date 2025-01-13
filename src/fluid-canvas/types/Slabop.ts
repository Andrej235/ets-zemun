import Advect from "../f2d/slabop/advect";
import Boundary from "../f2d/slabop/boundary";
import Divergence from "../f2d/slabop/divergence";
import Gradient from "../f2d/slabop/gradient";
import Jacobi from "../f2d/slabop/jacobi";
import Splat from "../f2d/slabop/splat";
import Vorticity from "../f2d/slabop/vorticity";
import VorticityConfinement from "../f2d/slabop/vorticityconfinement";

export type Slabop = {
  advect: Advect;
  diffuse: Jacobi;
  divergence: Divergence;
  poissonPressureEq: Jacobi;
  gradient: Gradient;
  splat: Splat;
  vorticity: Vorticity;
  vorticityConfinement: VorticityConfinement;
  boundary: Boundary;
};
