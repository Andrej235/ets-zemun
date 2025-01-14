import { Grid } from "../types/Grid";
import * as THREE from "three";

export default class Mouse {
  grid: Grid;
  canvasContainer: HTMLElement;
  canvasTopStart: number;
  canvasLeftStart: number;
  canvasHeightToScreenRatio: number;
  canvasWidthToScreenRatio: number;

  position: THREE.Vector2;
  motions: {
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

    this.position = new THREE.Vector2();
    this.motions = [];

    mouseEventListenerContainer.addEventListener(
      "mousemove",
      this.mouseMove.bind(this),
    );
    mouseEventListenerContainer.addEventListener(
      "contextmenu",
      this.contextMenu,
    );
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
      drag,
      position,
    });

    this.position.set(x, y);
  }

  contextMenu(event: MouseEvent) {
    event.preventDefault();
  }

  dispose() {
    this.canvasContainer.removeEventListener(
      "mousemove",
      this.mouseMove.bind(this),
    );
    this.canvasContainer.removeEventListener("contextmenu", this.contextMenu);
  }
}

