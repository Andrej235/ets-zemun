import React, { useEffect, useRef, useState } from "react";
import "./history.scss";
import createCirclePath from "@utility/svg/create-circle-path";
import { inView } from "motion/react";
import getPathTotalLength from "@utility/svg/get-path-length";

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
  const individualSegmentPathLengths = useRef<number[]>([]);
  const [totalPathLength, setTotalPathLength] = useState<number>(0);
  const [currentSegment, setCurrentSegment] = useState(-1);

  useEffect(() => {
    console.log(
      `Current segment path length: ${
        individualSegmentPathLengths.current[currentSegment] ?? 0
      }`,
      currentSegment
    );

    adjustPathLength(
      historyContainerRef.current!.children[0].children[0] as SVGPathElement,
      totalPathLength,
      individualSegmentPathLengths.current[currentSegment] ?? 0
    );
  }, [currentSegment, individualSegmentPathLengths]);

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
      //? Set up initial animations
      segment.style.opacity = "0";
      segment.style.transform = `translateX(${i % 2 === 0 ? "-50%" : "50%"})`;

      scrollAnimationsAbortController.signal.addEventListener(
        "abort",
        inView(
          segment,
          () => {
            handleComeInView(segment, i);
            return () => handleLeaveView(segment, i);
          },
          {
            amount: 0.3,
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

    let path = `M${segments[0].position.x - padding} 0`;

    const pathLengths: number[] = [getPathTotalLength(path)]; //Get the initial path length
    let startingPoint: Vector2 = {
      x: segments[0].position.x - padding,
      y: 0,
    };

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const even = i % 2 === 0;
      let currentPath = "";
      const currentPathStartMoveCommand = `M ${startingPoint.x} ${startingPoint.y}`;

      const pointPosition: Vector2 = getPointForSegment(segment, even);

      if (startingPoint.x === pointPosition.x) {
        currentPath += `V ${pointPosition.y - startingPoint.y - pointRadius}`;
        currentPath += createCirclePath(pointRadius, pointPosition);
        path += currentPath;

        pathLengths.push(
          getPathTotalLength(currentPathStartMoveCommand + currentPath)
        );

        startingPoint = {
          x: pointPosition.x,
          y: pointPosition.y + pointRadius,
        };

        continue;
      }

      const previousSegment = segments[i - 1];
      if (!previousSegment) continue;

      const middleToPreviousPointY =
        previousSegment.position.y +
        previousSegment.size.y +
        (segment.position.y -
          (previousSegment.position.y + previousSegment.size.y)) /
          2;

      currentPath += ` V ${middleToPreviousPointY} h ${
        pointPosition.x - startingPoint.x
      } V ${pointPosition.y - pointRadius}`;
      currentPath += createCirclePath(pointRadius, pointPosition);
      path += currentPath;

      pathLengths.push(
        getPathTotalLength(currentPathStartMoveCommand + currentPath)
      );

      startingPoint = {
        x: pointPosition.x,
        y: pointPosition.y + pointRadius,
      };
    }

    const cumulativePathLengths: number[] = [];
    const totalPathLength = pathLengths.reduce((acc, length) => {
      acc += length;
      cumulativePathLengths.push(acc);
      return acc;
    }, 0);

    individualSegmentPathLengths.current = cumulativePathLengths;
    setTotalPathLength(totalPathLength);

    line.setAttribute("d", path);

    function getPointForSegment(segment: Segment, even: boolean): Vector2 {
      return {
        x: even
          ? segment.position.x - padding
          : segment.position.x + segment.size.x + padding,
        y: segment.position.y + segment.size.y / 2,
      };
    }

    function handleComeInView(segment: HTMLDivElement, i: number) {
      setCurrentSegment((currentSegment) => Math.max(currentSegment, i));
      segment.style.opacity = "1";
      segment.style.transform = "translateX(0)";
    }

    function handleLeaveView(segment: HTMLDivElement, i: number) {
      setCurrentSegment((currentSegment) =>
        currentSegment === i ? currentSegment - 1 : currentSegment
      );

      segment.style.opacity = "0";
      segment.style.transform = `translateX(${i % 2 === 0 ? "-50%" : "50%"})`;
    }

    return () => {
      scrollAnimationsAbortController.abort();
    };
  }, [historyContainerRef]);

  function adjustPathLength(
    element: SVGPathElement,
    totalLength: number,
    desiredLength: number
  ): void {
    let dashArray: string;

    if (desiredLength <= 0) {
      dashArray = `0 ${totalLength}`;
    } else if (desiredLength >= totalLength) {
      dashArray = `${totalLength} 0`;
    } else {
      dashArray = `${desiredLength} ${totalLength - desiredLength}`;
    }

    element.style.strokeDasharray = dashArray;
    element.style.strokeDashoffset = "0";
  }

  return (
    <div className="history-container" ref={historyContainerRef}>
      <svg className="history-line" stroke="#fff" fill="none">
        <path />
      </svg>

      {children}
    </div>
  );
}

