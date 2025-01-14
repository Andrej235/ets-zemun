import { Grid } from "../types/Grid";
import * as THREE from "three";

export default class Mouse {
  grid: Grid;
  canvasContainer: HTMLElement;
  canvasTopStart: number;
  canvasLeftStart: number;
  canvasHeightToScreenRatio: number;
  canvasWidthToScreenRatio: number;

  isActive: boolean;

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

  boundMouseMove: (event: MouseEvent) => void;
  mouseEventListenerContainer: HTMLElement;

  constructor(
    grid: Grid,
    mouseEventListenerContainer: HTMLElement,
    canvasContainer: HTMLElement,
  ) {
    this.isActive = true;

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

    this.boundMouseMove = this.mouseMove.bind(this);
    this.mouseEventListenerContainer = mouseEventListenerContainer;

    mouseEventListenerContainer.addEventListener(
      "pointermove",
      this.boundMouseMove,
    );

    this.runBaseMotions();
  }

  runBaseMotions() {
    setInterval(() => {
      if (!this.isActive || this.motions.length !== 0) return;

      this.motions = [
        {
          drag: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          position: {
            x: this.position.x,
            y: this.position.y,
          },
        },
      ];
    }, 10);
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();

    const oldX = this.position.x;
    const oldY = this.position.y;

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

    const dx = x - oldX;
    const dy = y - oldY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = 10; // Adjust this value for finer interpolation.

    for (let i = 0; i < distance; i += step) {
      const t = i / distance;
      this.addToTrail(oldX + dx * t, oldY + dy * t);
    }
    this.addToTrail(x, y);
  }

  private addToTrail(x: number, y: number) {
    const r = this.grid.scale;

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

  dispose() {
    this.isActive = false;

    this.mouseEventListenerContainer.removeEventListener(
      "pointermove",
      this.boundMouseMove,
    );
  }
}

