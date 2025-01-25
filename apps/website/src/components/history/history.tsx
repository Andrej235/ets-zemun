import React, { useEffect, useRef } from "react";
import "./history.scss";
import createCirclePath from "@utility/svg/create-circle-path";

type HistoryProps = {
  readonly children: React.ReactNode;
};

type Vector2 = {
  x: number;
  y: number;
};

type Segment = {
  position: Vector2;
  size: Vector2;
};

export default function History({ children }: HistoryProps) {
  const historyContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!historyContainerRef.current) return;

    const container = historyContainerRef.current;
    const svg = container.children[0] as SVGElement;
    const line = svg.children[0] as SVGPathElement;
    const segments: Segment[] = [];

    for (const child of container.children) {
      if (child === svg) continue;
      const segment = child as HTMLDivElement;

      segments.push({
        position: {
          x: segment.offsetLeft,
          y: segment.offsetTop,
        },
        size: {
          x: segment.offsetWidth,
          y: segment.offsetHeight,
        },
      });
    }

    svg.setAttribute(
      "viewBox",
      `0 0 ${container.scrollWidth} ${container.scrollHeight}`
    );

    const start: Vector2 = {
      x: segments[0].position.x,
      y: segments[0].position.y + segments[0].size.y / 2,
    };

    let path = createCirclePath(10, start);

    line.setAttribute("d", path);
  }, [historyContainerRef]);

  return (
    <div className="history-container" ref={historyContainerRef}>
      <svg className="history-line" stroke="#fff" fill="none">
        <path></path>
      </svg>

      {children}
    </div>
  );
}

