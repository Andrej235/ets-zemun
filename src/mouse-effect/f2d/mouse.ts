import { Grid } from "./../types/Grid";
import * as THREE from "three";

export default class Mouse {
  grid: Grid;
  left: boolean;
  right: boolean;
  position: THREE.Vector2;
  motions: {
    left: boolean;
    right: boolean;
    drag: {
      x: number;
      y: number;
    };
    position: {
      x: number;
      y: number;
    };
  }[];

  constructor(grid: Grid) {
    this.grid = grid;

    this.left = false;
    this.right = false;
    this.position = new THREE.Vector2();
    this.motions = [];

    document.addEventListener("mousedown", this.mouseDown.bind(this));
    document.addEventListener("mouseup", this.mouseUp.bind(this));
    document.addEventListener("mousemove", this.mouseMove.bind(this));
    document.addEventListener("contextmenu", this.contextMenu.bind(this));
  }

  mouseDown(event: MouseEvent) {
    this.position.set(event.clientX, event.clientY);
    this.left = event.button === 0 ? true : this.left;
    this.right = event.button === 2 ? true : this.right;
  }

  mouseUp(event: MouseEvent) {
    event.preventDefault();
    this.left = event.button === 0 ? false : this.left;
    this.right = event.button === 2 ? false : this.right;
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    let r = this.grid.scale;

    let x = event.clientX;
    let y = event.clientY;

    if (this.left || this.right) {
      let dx = x - this.position.x;
      let dy = y - this.position.y;

      let drag = {
        x: Math.min(Math.max(dx, -r), r),
        y: Math.min(Math.max(dy, -r), r),
      };

      let position = {
        x: x,
        y: y,
      };

      this.motions.push({
        left: this.left,
        right: this.right,
        drag,
        position,
      });
    }

    this.position.set(x, y);
  }

  contextMenu(event: MouseEvent) {
    event.preventDefault();
  }
}
