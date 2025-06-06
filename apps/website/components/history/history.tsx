"use client";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "./history.scss";
import createCirclePath from "@/lib/svg/create-circle-path";
import { inView } from "motion/react";
import getPathTotalLength from "@/lib/svg/get-path-length";
import createRoundedCornerPath from "@/lib/svg/create-rounded-path";

type TimelineStyle = "alternating" | "left" | "right" | "center";

type HistoryProps = {
  readonly children: React.JSX.Element[];
  readonly timelineConfig?: {
    readonly animateOnlyOnce?: boolean;
    readonly pointRadius?: number;
    readonly pointPadding?: number;
    readonly minimumDistanceBetweenPointAndHeading?: number;
    readonly corderArcRadius?: number;
    readonly timelineStyle?: {
      [key: `${number}px`]: TimelineStyle;
    };
  };
};

type Vector2 = {
  x: number;
  y: number;
};

type Segment = {
  domElement: HTMLDivElement;
  position: Vector2;
  size: Vector2;
  date: string;
};

const History = memo<HistoryProps>(({ children, timelineConfig }) => {
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const dateHeadersContainerRef = useRef<HTMLDivElement>(null);
  const [individualSegmentPathLengths, setIndividualSegmentPathLengths] =
    useState<number[]>([]);
  const [totalPathLength, setTotalPathLength] = useState<number>(0);
  const [currentSegment, setCurrentSegment] = useState(-1);
  const segmentPointRadius = useMemo(
    () => timelineConfig?.pointRadius ?? 25,
    [timelineConfig],
  );

  const pathRef = useRef<SVGPathElement>(null);
  const [timelineStyle, setTimelineStyle] =
    useState<TimelineStyle>("alternating");

  useEffect(() => {
    if (!pathRef.current) return;

    if (pathRef.current.style.transition === "none")
      pathRef.current.style.transition = "0.5s ease-in-out";
    adjustPathLength(
      historyContainerRef.current!.children[0].children[0] as SVGPathElement,
      totalPathLength,
      (individualSegmentPathLengths[currentSegment] ?? 0) - 10, //? -10 accounts for rounding errors
    );
  }, [pathRef, currentSegment, individualSegmentPathLengths, totalPathLength]);

  const calculateSegments = useCallback(() => {
    type SegmentsResult = {
      cumulativePathLengths: number[];
      totalPathLength: number;
      path: string;
      cleanup: () => void;
    };

    if (!historyContainerRef.current || !dateHeadersContainerRef.current)
      return;

    const style = getCurrentSyle();
    setTimelineStyle(style);

    const container = historyContainerRef.current;
    container.classList.remove("alternating");
    container.classList.remove("left");
    container.classList.remove("right");
    container.classList.remove("center");
    container.classList.add(style);

    dateHeadersContainerRef.current.style.height = `${container.clientHeight}px`;
    const svg = container.children[0] as SVGElement | null;
    if (!svg) return;

    const segments: Segment[] = [];

    const abortController = new AbortController();
    for (let i = 0; i < container.children.length; i++) {
      const child = container.children[i];
      if (child === svg) continue;

      const segment = child as HTMLDivElement;

      abortController.signal.addEventListener(
        "abort",
        inView(
          segment,
          () => {
            handleComeInView(segment, i);
            return () => handleLeaveView(segment, i);
          },
          {
            amount: 0.3,
          },
        ),
      );

      segments.push({
        domElement: segment,
        position: {
          x: segment.offsetLeft,
          y: segment.offsetTop,
        },
        size: {
          x: segment.offsetWidth,
          y: segment.offsetHeight,
        },
        date: segment.dataset.date ?? "",
      });

      segment.style.opacity = "0";
      switch (style) {
        case "alternating":
        case "center":
          segment.style.transform = `translateX(${
            i % 2 === 0 ? "-50%" : "50%"
          })`;
          break;

        case "left":
          segment.style.transform = `translateX(50%)`;
          break;

        case "right":
          segment.style.transform = `translateX(-50%)`;
          break;

        default:
          console.error(`Invalid timeline style: ${style}`);
          segment.style.transform = `translateX(${
            i % 2 === 0 ? "-50%" : "50%"
          })`;
          break;
      }

      //? Set up initial animations
    }

    svg.setAttribute(
      "viewBox",
      `0 0 ${container.clientWidth} ${container.clientHeight}`,
    );

    switch (style) {
      case "alternating":
        return getForAlternating();

      case "left":
        return getForLeft();

      case "right":
        return getForRight();

      case "center":
        return getForcenter();

      default:
        console.error(`Invalid timeline style: ${style}`);
        return getForAlternating();
    }

    function getForAlternating(): SegmentsResult {
      const firstSegmentPadding = getPaddingForSegment(segments[0], true);
      let path = `M${segments[0].position.x - firstSegmentPadding} 0`;

      const pathLengths: number[] = [getPathTotalLength(path)]; //Get the initial path length
      let startingPoint: Vector2 = {
        x: segments[0].position.x - firstSegmentPadding,
        y: 0,
      };

      for (let i = 0; i < segments.length; i++) {
        const segment = segments[i];
        const even = i % 2 === 0;
        let currentPath = "";
        const currentPathStartMoveCommand = `M ${startingPoint.x} ${startingPoint.y}`;

        const pointPosition: Vector2 = getPointPositionForSegment(
          segment,
          even,
        );
        const segmentHeaderCleanup = createHeaderForSegment(
          segment,
          pointPosition,
          even,
        );
        abortController.signal.addEventListener("abort", segmentHeaderCleanup);

        if (startingPoint.x === pointPosition.x) {
          currentPath += `V ${
            pointPosition.y - startingPoint.y - segmentPointRadius
          }`;
          currentPath += createCirclePath(segmentPointRadius, pointPosition);
          path += currentPath;

          pathLengths.push(
            getPathTotalLength(currentPathStartMoveCommand + currentPath),
          );

          startingPoint = {
            x: pointPosition.x,
            y: pointPosition.y + segmentPointRadius,
          };

          continue;
        }

        const previousSegment = segments[i - 1];
        if (!previousSegment) continue;

        const centerToPreviousPointY =
          previousSegment.position.y +
          previousSegment.size.y +
          (segment.position.y -
            (previousSegment.position.y + previousSegment.size.y)) /
            2;

        currentPath += createRoundedCornerPath(
          startingPoint.x,
          startingPoint.y,
          [
            {
              type: "vertical",
              value: centerToPreviousPointY,
            },
            {
              type: "horizontal",
              value: pointPosition.x,
            },
            {
              type: "vertical",
              value: pointPosition.y - segmentPointRadius,
            },
          ],
          timelineConfig?.corderArcRadius ?? 15,
        );

        currentPath += createCirclePath(segmentPointRadius, pointPosition);
        path += currentPath;

        pathLengths.push(
          getPathTotalLength(currentPathStartMoveCommand + currentPath),
        );

        startingPoint = {
          x: pointPosition.x,
          y: pointPosition.y + segmentPointRadius,
        };
      }

      const cumulativePathLengths: number[] = [];
      const totalPathLength = pathLengths.reduce((acc, length) => {
        acc += length;
        cumulativePathLengths.push(acc);
        return acc;
      }, 0);

      function getPaddingForSegment(segment: Segment, even: boolean): number {
        let padding = timelineConfig?.pointPadding ?? 100;

        if (!even) {
          const maxPadding =
            container.clientWidth - (segment.position.x + segment.size.x);
          padding = maxPadding < padding * 2.5 ? maxPadding / 2 : padding;
        } else {
          const maxPadding = segment.position.x;
          padding = maxPadding < padding * 2.5 ? maxPadding / 2 : padding;
        }

        return padding;
      }

      function createHeaderForSegment(
        segment: Segment,
        pointPosition: Vector2,
        even: boolean,
      ): () => void {
        const minimunDistanceToPoint =
          timelineConfig?.minimumDistanceBetweenPointAndHeading ?? 15;
        const distanceToEdge = even
          ? pointPosition.x - segmentPointRadius
          : container.clientWidth - (pointPosition.x + segmentPointRadius);

        const header = document.createElement("div");
        header.className = "history-date-header";
        header.style.height = `${segmentPointRadius * 2}px`;

        const headerText = document.createElement("h1");
        headerText.textContent = segment.date;
        header.appendChild(headerText);

        dateHeadersContainerRef.current!.appendChild(header);

        const headerWidth = header.offsetWidth;

        let position;

        if (distanceToEdge < headerWidth + minimunDistanceToPoint) {
          position = {
            x: pointPosition.x,
            y:
              pointPosition.y -
              (dateHeadersContainerRef.current!.offsetTop -
                container.offsetTop) -
              segmentPointRadius * 2 -
              minimunDistanceToPoint,
          };
        } else {
          position = {
            x:
              pointPosition.x +
              (even
                ? -headerWidth / 2 - segmentPointRadius - minimunDistanceToPoint
                : +headerWidth / 2 +
                  segmentPointRadius +
                  minimunDistanceToPoint),
            y:
              pointPosition.y -
              (dateHeadersContainerRef.current!.offsetTop -
                container.offsetTop),
          };
        }

        header.style.left = `${position.x}px`;
        header.style.top = `${position.y}px`;

        const headerAnimationCleanup = inView(
          segment.domElement,
          () => {
            onEnterViewport();
            return onLeaveViewport;
          },
          {
            amount: 0.3,
          },
        );

        function onEnterViewport() {
          header.style.opacity = "1";
        }

        function onLeaveViewport() {
          if (timelineConfig?.animateOnlyOnce) return;
          header.style.opacity = "0";
        }

        return () => {
          headerText.remove();
          header.remove();
          headerAnimationCleanup();
        };
      }

      function getPointPositionForSegment(
        segment: Segment,
        even: boolean,
      ): Vector2 {
        const padding = getPaddingForSegment(segment, even);

        return {
          x: even
            ? segment.position.x - padding
            : segment.position.x + segment.size.x + padding,
          y: segment.position.y + segment.size.y / 2,
        };
      }

      return {
        cumulativePathLengths,
        totalPathLength,
        path,
        cleanup: () => abortController.abort(),
      };
    }

    function getForLeft(): SegmentsResult {
      const universalX = segments.reduce((min, segment) => {
        const padding = getPaddingForSegment(segment);
        return Math.min(min, padding);
      }, Infinity);

      let path = `M${universalX} 0`;

      const pathLengths: number[] = [getPathTotalLength(path)]; //Get the initial path length
      let startingPointY = 0;

      for (const segment of segments) {
        let currentPath = "";
        const currentPathStartMoveCommand = `M ${universalX} ${startingPointY}`;

        const pointPosition: Vector2 = {
          x: universalX,
          y: segment.position.y + segment.size.y / 2,
        };

        const segmentHeaderCleanup = createHeaderAboveSegmentPoint(
          segment,
          pointPosition,
        );
        abortController.signal.addEventListener("abort", segmentHeaderCleanup);

        currentPath += `v ${
          pointPosition.y - startingPointY - segmentPointRadius
        }`;
        currentPath += createCirclePath(segmentPointRadius, pointPosition);
        path += currentPath;

        pathLengths.push(
          getPathTotalLength(currentPathStartMoveCommand + currentPath),
        );

        startingPointY = pointPosition.y + segmentPointRadius;
      }

      const cumulativePathLengths: number[] = [];
      const totalPathLength = pathLengths.reduce((acc, length) => {
        acc += length;
        cumulativePathLengths.push(acc);
        return acc;
      }, 0);

      function getPaddingForSegment(segment: Segment): number {
        let padding = timelineConfig?.pointPadding ?? 100;

        const maxPadding = segment.position.x;
        padding = maxPadding < padding * 2.5 ? maxPadding / 2 : padding;

        return padding;
      }

      return {
        cumulativePathLengths,
        totalPathLength,
        path,
        cleanup: () => abortController.abort(),
      };
    }

    function getForRight(): SegmentsResult {
      const universalX = segments.reduce((min, segment) => {
        const padding = getPaddingForSegment(segment);
        return Math.max(min, padding);
      }, 0);

      let path = `M${universalX} 0`;

      const pathLengths: number[] = [getPathTotalLength(path)]; //Get the initial path length
      let startingPointY = 0;

      for (const segment of segments) {
        let currentPath = "";
        const currentPathStartMoveCommand = `M ${universalX} ${startingPointY}`;

        const pointPosition: Vector2 = {
          x: universalX,
          y: segment.position.y + segment.size.y / 2,
        };

        const segmentHeaderCleanup = createHeaderAboveSegmentPoint(
          segment,
          pointPosition,
        );
        abortController.signal.addEventListener("abort", segmentHeaderCleanup);

        currentPath += `v ${
          pointPosition.y - startingPointY - segmentPointRadius
        }`;
        currentPath += createCirclePath(segmentPointRadius, pointPosition);
        path += currentPath;

        pathLengths.push(
          getPathTotalLength(currentPathStartMoveCommand + currentPath),
        );

        startingPointY = pointPosition.y + segmentPointRadius;
      }

      const cumulativePathLengths: number[] = [];
      const totalPathLength = pathLengths.reduce((acc, length) => {
        acc += length;
        cumulativePathLengths.push(acc);
        return acc;
      }, 0);

      function getPaddingForSegment(segment: Segment): number {
        let padding = timelineConfig?.pointPadding ?? 100;

        const maxPadding =
          container.clientWidth - (segment.position.x + segment.size.x);
        padding = maxPadding < padding * 2.5 ? maxPadding / 2 : padding;

        return segment.position.x + segment.size.x + padding;
      }

      return {
        cumulativePathLengths,
        totalPathLength,
        path,
        cleanup: () => abortController.abort(),
      };
    }

    function getForcenter(): SegmentsResult {
      const universalX = window.innerWidth / 2;

      let path = `M${universalX} 0`;

      const pathLengths: number[] = [getPathTotalLength(path)]; //Get the initial path length
      let startingPointY = 0;

      for (const segment of segments) {
        let currentPath = "";
        const currentPathStartMoveCommand = `M ${universalX} ${startingPointY}`;

        const pointPosition: Vector2 = {
          x: universalX,
          y: segment.position.y - segmentPointRadius - 1.5,
        };

        const segmentHeaderCleanup = createHeaderAboveSegmentPoint(
          segment,
          pointPosition,
        );
        abortController.signal.addEventListener("abort", segmentHeaderCleanup);

        currentPath += `v ${
          pointPosition.y - startingPointY - segmentPointRadius
        }`;
        currentPath += createCirclePath(segmentPointRadius, pointPosition);
        path += currentPath;

        pathLengths.push(
          getPathTotalLength(currentPathStartMoveCommand + currentPath),
        );

        startingPointY = pointPosition.y + segmentPointRadius;
      }

      const cumulativePathLengths: number[] = [];
      const totalPathLength = pathLengths.reduce((acc, length) => {
        acc += length;
        cumulativePathLengths.push(acc);
        return acc;
      }, 0);

      return {
        cumulativePathLengths,
        totalPathLength,
        path,
        cleanup: () => abortController.abort(),
      };
    }

    function createHeaderAboveSegmentPoint(
      segment: Segment,
      pointPosition: Vector2,
    ): () => void {
      const minimunDistanceToPoint =
        timelineConfig?.minimumDistanceBetweenPointAndHeading ?? 15;

      const header = document.createElement("div");
      header.className = "history-date-header";
      header.style.height = `${segmentPointRadius * 2}px`;

      const headerText = document.createElement("h1");
      headerText.textContent = segment.date;
      header.appendChild(headerText);

      dateHeadersContainerRef.current!.appendChild(header);

      const position = {
        x: pointPosition.x,
        y:
          pointPosition.y -
          (dateHeadersContainerRef.current!.offsetTop - container.offsetTop) -
          segmentPointRadius * 2 -
          minimunDistanceToPoint,
      };

      header.style.left = `${position.x}px`;
      header.style.top = `${position.y}px`;

      const headerAnimationCleanup = inView(
        segment.domElement,
        () => {
          onEnterViewport();
          return onLeaveViewport;
        },
        {
          amount: 0.3,
        },
      );

      function onEnterViewport() {
        header.style.opacity = "1";
      }

      function onLeaveViewport() {
        if (timelineConfig?.animateOnlyOnce) return;
        header.style.opacity = "0";
      }

      return () => {
        headerText.remove();
        header.remove();
        headerAnimationCleanup();
      };
    }

    function handleComeInView(segment: HTMLDivElement, i: number) {
      setCurrentSegment((currentSegment) => Math.max(currentSegment, i));
      segment.style.opacity = "1";
      segment.style.transform = "translateX(0)";
    }

    function handleLeaveView(segment: HTMLDivElement, i: number) {
      if (timelineConfig?.animateOnlyOnce) return;

      setCurrentSegment((currentSegment) =>
        currentSegment === i ? currentSegment - 1 : currentSegment,
      );

      segment.style.opacity = "0";
      segment.style.transform = `translateX(${i % 2 === 0 ? "-50%" : "50%"})`;
    }

    function getCurrentSyle(): TimelineStyle {
      const styles = timelineConfig?.timelineStyle;
      if (!styles) return "alternating";

      const sizeBreakpoints = Object.keys(styles)
        .map((x) => ({
          breakpoint: parseInt(x),
          style: styles[x as keyof typeof styles],
        }))
        .sort((a, b) => a.breakpoint - b.breakpoint);

      for (const { breakpoint, style } of sizeBreakpoints)
        if (window.innerWidth <= breakpoint) return style;

      return "alternating";
    }
  }, [segmentPointRadius, timelineConfig]);

  const debounce = useCallback(
    (func: (...args: unknown[]) => void, time: number = 100) => {
      let timer: NodeJS.Timeout;
      return (...args: unknown[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => func(...args), time);
      };
    },
    [],
  );

  useEffect(() => {
    if (!historyContainerRef.current || !dateHeadersContainerRef.current)
      return;

    let previousWidth = window.innerWidth;
    const abortController = new AbortController();
    let prevCleanup = () => {};

    function setupTimeline() {
      if (!pathRef.current) return;

      prevCleanup();
      const { cumulativePathLengths, totalPathLength, path, cleanup } =
        calculateSegments()!;

      prevCleanup = cleanup;

      setIndividualSegmentPathLengths(cumulativePathLengths);
      setTotalPathLength(totalPathLength);

      pathRef.current.setAttribute("d", path);
      pathRef.current.style.transition = "none";
      pathRef.current.style.strokeDasharray = `0 ${totalPathLength}`;

      abortController.signal.addEventListener("abort", cleanup);
    }

    window.addEventListener(
      "resize",
      () => {
        if (previousWidth === window.innerWidth) return;
        previousWidth = window.innerWidth;

        debounce(setupTimeline, 500)();
      },
      {
        signal: abortController.signal,
      },
    );

    setupTimeline();

    return () => {
      abortController.abort();
    };
  }, [
    pathRef,
    segmentPointRadius,
    historyContainerRef,
    dateHeadersContainerRef,
    calculateSegments,
    debounce,
  ]);

  function adjustPathLength(
    element: SVGPathElement,
    totalLength: number,
    desiredLength: number,
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
    <>
      <div
        className={`history-container ${timelineStyle}`}
        ref={historyContainerRef}
        data-search-key="istorija"
      >
        <svg className="history-line" fill="none" strokeWidth={3}>
          <path ref={pathRef} />
        </svg>

        {children}
      </div>

      <div
        className="history-date-headers-container"
        ref={dateHeadersContainerRef}
      />
    </>
  );
});

History.displayName = "History";
export default History;
