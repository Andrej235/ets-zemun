import { Grid } from "../types/grid";
import * as THREE from "three";

export default class Mouse {
  private grid: Grid;
  private canvasTopStart: number;
  private canvasLeftStart: number;
  private canvasHeightToScreenRatio: number;
  private canvasWidthToScreenRatio: number;

  private position: THREE.Vector2;
  private screenPosition: THREE.Vector2;
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

  isHoveringOverCanvas: boolean;
  private mouseEnter: () => void;
  private mouseLeave: () => void;

  private boundMouseMove: (event: MouseEvent) => void;
  private mouseEventListenerContainer: HTMLElement;

  constructor(
    grid: Grid,
    mouseEventListenerContainer: HTMLElement,
    canvasContainer: HTMLElement,
  ) {
    this.grid = grid;

    this.canvasTopStart = canvasContainer.offsetTop;
    this.canvasLeftStart = canvasContainer.getBoundingClientRect().left;

    this.canvasHeightToScreenRatio =
      window.innerHeight / canvasContainer.clientHeight;
    this.canvasWidthToScreenRatio =
      window.innerWidth / canvasContainer.clientWidth;

    this.position = new THREE.Vector2(0, 0);
    this.screenPosition = new THREE.Vector2(0, 0);
    this.motions = [];

    this.boundMouseMove = this.mouseMove.bind(this);
    this.mouseEventListenerContainer = mouseEventListenerContainer;

    mouseEventListenerContainer.addEventListener(
      "pointermove",
      this.boundMouseMove,
    );

    this.isHoveringOverCanvas = false;

    this.mouseEnter = (() => {
      this.isHoveringOverCanvas = true;
    }).bind(this);

    this.mouseLeave = (() => {
      this.isHoveringOverCanvas = false;
      this.motions = [];
      this.position.set(0, 0);
      this.screenPosition.set(0, 0);
    }).bind(this);

    mouseEventListenerContainer.addEventListener("mouseenter", this.mouseEnter);
    mouseEventListenerContainer.addEventListener("mouseleave", this.mouseLeave);
  }

  mouseMove(event: MouseEvent) {
    event.preventDefault();
    const x = this.screenXToCanvas(event.clientX);
    const y = this.screenYToCanvas(event.clientY);

    if (this.screenPosition.x === 0) {
      this.screenPosition.set(event.clientX, event.clientY);
      return;
    }

    const oldX = this.screenXToCanvas(this.screenPosition.x);
    const oldY = this.screenYToCanvas(this.screenPosition.y);

    this.screenPosition.set(event.clientX, event.clientY);

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

  getStaticPosition(randomness: number = 2) {
    this.motions = [
      {
        drag: {
          x: (Math.random() - 0.5) * randomness,
          y: (Math.random() - 0.5) * randomness,
        },
        position: {
          x: this.screenXToCanvas(this.screenPosition.x),
          y: this.screenYToCanvas(this.screenPosition.y),
        },
      },
    ];
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
    this.mouseEventListenerContainer.removeEventListener(
      "pointermove",
      this.boundMouseMove,
    );
    this.mouseEventListenerContainer.removeEventListener(
      "mouseenter",
      this.mouseEnter,
    );
    this.mouseEventListenerContainer.removeEventListener(
      "mouseleave",
      this.mouseLeave,
    );
  }
}

