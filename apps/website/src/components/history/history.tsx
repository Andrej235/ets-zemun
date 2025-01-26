import React, { useEffect, useMemo, useRef } from "react";
import "./history.scss";
import createCirclePath from "@utility/svg/create-circle-path";
import { animate, inView, motion, useScroll } from "motion/react";

type HistoryProps = {
  readonly children: React.JSX.Element[];
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
  const { scrollYProgress } = useScroll();
  const processedChildren = useMemo(() => {
    return React.Children.map(children, (child, i) => {
      return React.cloneElement(child, {
        even: i % 2 === 0,
      });
    });
  }, [children]);

  useEffect(() => {
    if (!historyContainerRef.current) return;

    const padding = 100;
    const pointRadius = 25;

    const container = historyContainerRef.current;
    const svg = container.children[0] as SVGElement;
    const line = svg.children[0] as SVGPathElement;
    const segments: Segment[] = [];

    const scrollAnimationsAbortController = new AbortController();

    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      if (child === svg) continue;

      const segment = child as HTMLDivElement;

      scrollAnimationsAbortController.signal.addEventListener(
        "abort",
        inView(
          segment,
          () => {
            animate(
              segment,
              {
                x: 0,
                opacity: 1,
              },
              {
                duration: 0.4,
                type: "spring",
                bounce: 0.2,
              }
            );

            console.log(i, segment.dataset.date);
          },
          {
            amount: 0.35,
          }
        )
      );

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

    let path = `M${segments[0].position.x - padding} 0 V ${
      segments[0].position.y + segments[0].size.y / 2 - pointRadius
    }`;

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const even = i % 2 === 0;

      const pointPosition: Vector2 = getPointForSegment(segment, even);
      path += createCirclePath(pointRadius, pointPosition);

      const nextSegment = segments[i + 1];
      if (!nextSegment) continue;

      const middleToNextPointY =
        segment.position.y +
        segment.size.y +
        (nextSegment.position.y - (segment.position.y + segment.size.y)) / 2;

      const nextPoint: Vector2 = getPointForSegment(nextSegment, !even);

      path += ` V ${middleToNextPointY} H ${nextPoint.x} V ${
        nextPoint.y - pointRadius
      }`;
    }

    line.setAttribute("d", path);
    //// line.style.strokeDasharray = `500px ${line.getTotalLength()}`;

    function getPointForSegment(segment: Segment, even: boolean): Vector2 {
      return {
        x: even
          ? segment.position.x - padding
          : segment.position.x + segment.size.x + padding,
        y: segment.position.y + segment.size.y / 2,
      };
    }

    return () => {
      scrollAnimationsAbortController.abort();
    };
  }, [historyContainerRef]);

  return (
    <div className="history-container" ref={historyContainerRef}>
      <svg className="history-line" stroke="#fff" fill="none">
        <motion.path style={{ pathLength: scrollYProgress }} />
      </svg>

      {processedChildren}
    </div>
  );
}

