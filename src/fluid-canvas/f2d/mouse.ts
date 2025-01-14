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

  screenPosition: THREE.Vector2;
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

    this.screenPosition = new THREE.Vector2();
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
            x: this.screenXToCanvas(this.screenPosition.x),
            y: this.screenYToCanvas(this.screenPosition.y),
          },
        },
      ];
    }, 10);
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    this.screenPosition.set(event.clientX, event.clientY);

    const oldX = this.screenXToCanvas(this.screenPosition.x);
    const oldY = this.screenYToCanvas(this.screenPosition.y);

    const x = this.screenXToCanvas(event.clientX);
    const y = this.screenYToCanvas(event.clientY);

    const dx = x - oldX;
    const dy = y - oldY;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = 10; // Adjust this value for finer interpolation.

    for (let i = 0; i < distance; i += step) {
      const t = i / distance;
      const curX = oldX + dx * t;
      const curY = oldY + dy * t;
      this.addToTrail(curX, curY, curX - oldX, curY - oldY);
    }
    this.addToTrail(x, y, dx, dy);
  }

  private screenXToCanvas(x: number) {
    const mouseHorizontalOffset =
      this.canvasLeftStart - document.scrollingElement!.scrollLeft;

    x -= mouseHorizontalOffset;
    x *= this.canvasWidthToScreenRatio;
    return x;
  }

  private screenYToCanvas(y: number) {
    const mouseVerticalOffset =
      this.canvasTopStart - document.scrollingElement!.scrollTop;

    y -= mouseVerticalOffset;
    y *= this.canvasHeightToScreenRatio;
    return y;
  }

  private addToTrail(x: number, y: number, dx: number, dy: number) {
    const r = this.grid.scale;

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
  }

  dispose() {
    this.isActive = false;

    this.mouseEventListenerContainer.removeEventListener(
      "pointermove",
      this.boundMouseMove,
    );
  }
}

