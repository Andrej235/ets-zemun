import { Grid } from "../types/Grid";
import * as THREE from "three";

export default class Mouse {
  grid: Grid;
  canvasContainer: HTMLElement;
  canvasTopStart: number;
  canvasLeftStart: number;
  canvasHeightToScreenRatio: number;
  canvasWidthToScreenRatio: number;

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

  constructor(
    grid: Grid,
    mouseEventListenerContainer: HTMLElement,
    canvasContainer: HTMLElement,
  ) {
    this.grid = grid;
    this.canvasContainer = canvasContainer;

    this.canvasTopStart = canvasContainer.offsetTop;
    this.canvasLeftStart = canvasContainer.getBoundingClientRect().left;

    this.canvasHeightToScreenRatio =
      window.innerHeight / canvasContainer.clientHeight;
    this.canvasWidthToScreenRatio =
      window.innerWidth / canvasContainer.clientWidth;

    this.left = false;
    this.right = false;
    this.position = new THREE.Vector2();
    this.motions = [];

    mouseEventListenerContainer.addEventListener(
      "mousedown",
      this.mouseDown.bind(this),
    );
    mouseEventListenerContainer.addEventListener(
      "mouseup",
      this.mouseUp.bind(this),
    );
    mouseEventListenerContainer.addEventListener(
      "mousemove",
      this.mouseMove.bind(this),
    );
    mouseEventListenerContainer.addEventListener(
      "contextmenu",
      this.contextMenu,
    );
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
    const r = this.grid.scale;

    let x = event.clientX;
    let y = event.clientY;

    const mouseVerticalOffset =
      this.canvasTopStart - document.scrollingElement!.scrollTop;

    const mouseHorizontalOffset =
      this.canvasLeftStart - document.scrollingElement!.scrollLeft;

    x -= mouseHorizontalOffset;
    x *= this.canvasWidthToScreenRatio;

    y -= mouseVerticalOffset;
    y *= this.canvasHeightToScreenRatio;

    if (this.left || this.right) {
      const dx = x - this.position.x;
      const dy = y - this.position.y;

      const drag = {
        x: Math.min(Math.max(dx, -r), r),
        y: Math.min(Math.max(dy, -r), r),
      };

      const position = {
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

  dispose() {
    this.canvasContainer.removeEventListener("mousedown", this.mouseDown);
    this.canvasContainer.removeEventListener("mouseup", this.mouseUp);
    this.canvasContainer.removeEventListener(
      "mousemove",
      this.mouseMove.bind(this),
    );
    this.canvasContainer.removeEventListener("contextmenu", this.contextMenu);
  }
}

