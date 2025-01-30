import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
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
  date: string;
};

type SegmentHeader = {
  position: Vector2;
  dateString: string;
};

const History = memo<HistoryProps>(({ children }) => {
  const historyContainerRef = useRef<HTMLDivElement>(null);
  const dateHeadersContainerRef = useRef<HTMLDivElement>(null);
  const [individualSegmentPathLengths, setIndividualSegmentPathLengths] =
    useState<number[]>([]);
  const [totalPathLength, setTotalPathLength] = useState<number>(0);
  const [currentSegment, setCurrentSegment] = useState(-1);
  const [segmentHeaders, setSegmentHeaders] = useState<SegmentHeader[]>([]);
  const segmentPointRadius = useMemo(() => 25, []);
  const [path, setPath] = useState<string>("");

  useEffect(() => {
    adjustPathLength(
      historyContainerRef.current!.children[0].children[0] as SVGPathElement,
      totalPathLength,
      (individualSegmentPathLengths[currentSegment] ?? 0) - 10 //? -10 accounts for rounding errors
    );
  }, [currentSegment, individualSegmentPathLengths, totalPathLength]);

  const calculateSegments = useCallback(() => {
    if (!historyContainerRef.current || !dateHeadersContainerRef.current)
      return;

    const padding = 100;

    const container = historyContainerRef.current;
    const svg = container.children[0] as SVGElement;
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
        date: segment.dataset.date ?? "",
      });

      //? Set up initial animations
      segment.style.opacity = "0";
      segment.style.transform = `translateX(${i % 2 === 0 ? "-50%" : "50%"})`;
    }

    svg.setAttribute(
      "viewBox",
      `0 0 ${container.clientWidth} ${container.clientHeight}`
    );

    let path = `M${segments[0].position.x - padding} 0`;

    const pathLengths: number[] = [getPathTotalLength(path)]; //Get the initial path length
    let startingPoint: Vector2 = {
      x: segments[0].position.x - padding,
      y: 0,
    };

    const segmentHeaders: SegmentHeader[] = [];
    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];
      const even = i % 2 === 0;
      let currentPath = "";
      const currentPathStartMoveCommand = `M ${startingPoint.x} ${startingPoint.y}`;

      const pointPosition: Vector2 = getPointPositionForSegment(segment, even);
      segmentHeaders.push({
        position: {
          x:
            pointPosition.x + (even ? -segmentPointRadius : segmentPointRadius),
          y:
            pointPosition.y -
            (dateHeadersContainerRef.current.offsetTop - container.offsetTop),
        },
        dateString: segment.date,
      });

      if (startingPoint.x === pointPosition.x) {
        currentPath += `V ${
          pointPosition.y - startingPoint.y - segmentPointRadius
        }`;
        currentPath += createCirclePath(segmentPointRadius, pointPosition);
        path += currentPath;

        pathLengths.push(
          getPathTotalLength(currentPathStartMoveCommand + currentPath)
        );

        startingPoint = {
          x: pointPosition.x,
          y: pointPosition.y + segmentPointRadius,
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
      } V ${pointPosition.y - segmentPointRadius}`;
      currentPath += createCirclePath(segmentPointRadius, pointPosition);
      path += currentPath;

      pathLengths.push(
        getPathTotalLength(currentPathStartMoveCommand + currentPath)
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

    function getPointPositionForSegment(
      segment: Segment,
      even: boolean
    ): Vector2 {
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

    return {
      cumulativePathLengths,
      totalPathLength,
      segmentHeaders,
      path,
      cleanup: () => scrollAnimationsAbortController.abort(),
    };
  }, [segmentPointRadius]);

  const debounce = useCallback(
    (func: (...args: unknown[]) => void, time: number = 100) => {
      let timer: NodeJS.Timeout;
      return (...args: unknown[]) => {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => func(...args), time);
      };
    },
    []
  );

  useEffect(() => {
    if (!historyContainerRef.current || !dateHeadersContainerRef.current)
      return;

    const abortController = new AbortController();

    function setupTimeline() {
      const {
        cumulativePathLengths,
        totalPathLength,
        segmentHeaders,
        path,
        cleanup,
      } = calculateSegments()!;

      setIndividualSegmentPathLengths(cumulativePathLengths);
      setTotalPathLength(totalPathLength);
      setSegmentHeaders(segmentHeaders);
      setPath(path);
      abortController.signal.addEventListener("abort", cleanup);
    }

    window.addEventListener("resize", debounce(setupTimeline, 500), {
      signal: abortController.signal,
    });

    setupTimeline();

    return () => {
      abortController.abort();
    };
  }, [
    segmentPointRadius,
    historyContainerRef,
    dateHeadersContainerRef,
    calculateSegments,
  ]);

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
    <>
      <div className="history-container" ref={historyContainerRef}>
        <svg className="history-line" fill="none" strokeWidth={3}>
          <path d={path} />
        </svg>

        {children}
      </div>

      <div
        className="history-date-headers-container"
        ref={dateHeadersContainerRef}
      >
        {segmentHeaders.map((header, i) => (
          <div
            key={`history-segment-header-(${header.position.y}, ${header.position.y})`}
            className="history-date-header"
            style={{
              left: `${header.position.x}px`,
              top: `${header.position.y}px`,
              height: `${segmentPointRadius * 2}px`,
              opacity: currentSegment > i ? 1 : 0,
            }}
          >
            <h1>{header.dateString}</h1>
          </div>
        ))}
      </div>
    </>
  );
});

export default History;

