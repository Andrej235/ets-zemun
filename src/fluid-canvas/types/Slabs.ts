import Slab from "../f2d/slab";

export type Slabs = {
  velocity: Slab;
  density: Slab;
  velocityDivergence: Slab;
  velocityVorticity: Slab;
  pressure: Slab;
};
