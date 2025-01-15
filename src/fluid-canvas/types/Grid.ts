import { Vector2 } from "three";

export type Grid = {
  size: Vector2;
  scale: number;
  applyBoundaries: boolean;
};
