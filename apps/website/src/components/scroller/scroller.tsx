import {
  useMotionValueEvent,
  useTransform,
  useScroll,
  motion,
  animate,
} from "motion/react";
import "./scroller.scss";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import Floatie from "@components/floatie/floatie";

export default function Scroller() {
  const location = useLocation(); //Only needed to retrigger the useEffect which decides whether to show the scroller

  useEffect(() => {
    const scrollScaleFactor =
      document.scrollingElement!.scrollHeight /
      document.scrollingElement!.clientHeight;

    const showScroller = scrollScaleFactor > 2;
    setIsScrollerAvailable(showScroller);
  }, [location]);

  const enterThreashold = useMemo(
    () => document.scrollingElement!.clientHeight * 0.7,
    []
  );

  const exitThreashold = useMemo(
    () => document.scrollingElement!.clientHeight * 0.6,
    []
  );

  const { scrollY } = useScroll();
  const scroll = useTransform(scrollY, (x) =>
    x < exitThreashold
      ? 0
      : (x - exitThreashold) /
        (document.scrollingElement!.scrollHeight - exitThreashold)
  );

  useMotionValueEvent(scrollY, "change", (x) => {
    if (x > enterThreashold) setIsScrollerVisible(true);
    else if (x < exitThreashold) setIsScrollerVisible(false);
  });

  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const pathRef = useRef<SVGPathElement>(null);
  const hoverAnimationProgress = useRef(0);
  const animationStartSnapshot = useRef(0);
  const shouldExitAnimationEarly = useRef(false);

  const lerp = useCallback(
    (from: number, to: number, factor: number): number =>
      from + (to - from) * factor,
    []
  );

  const setLength = useCallback(
    (pathProgress: number) => {
      animate(
        pathRef.current!,
        {
          pathLength: pathProgress,
        },
        {
          duration: 0,
        }
      );
    },
    [pathRef]
  );

  function handleMouseOver() {
    if (hoverAnimationProgress.current > 0)
      shouldExitAnimationEarly.current = true;
    setIsHovering(true);

    const to = 1;
    const from = lerp(
      animationStartSnapshot.current,
      scroll.get(),
      1 - hoverAnimationProgress.current
    );
    animationStartSnapshot.current = from;

    let time = NaN;
    const speedMultiplier = 1 / (1 - hoverAnimationProgress.current + 0.0001);
    hoverAnimationProgress.current = 0;
    requestAnimationFrame(frame);

    function frame(newTime: number) {
      if (shouldExitAnimationEarly.current) {
        shouldExitAnimationEarly.current = false;
        return;
      }

      if (isNaN(time)) {
        requestAnimationFrame(frame);
        time = newTime;
        return;
      }

      const delta = isNaN(time) ? 0 : newTime - time;
      time = newTime;

      hoverAnimationProgress.current += (delta / 1000) * speedMultiplier;
      setLength(lerp(from, to, hoverAnimationProgress.current));

      if (hoverAnimationProgress.current < 1) requestAnimationFrame(frame);
    }
  }

  function handleMouseOut() {
    if (hoverAnimationProgress.current < 1)
      shouldExitAnimationEarly.current = true;

    const from = lerp(
      animationStartSnapshot.current,
      1,
      hoverAnimationProgress.current
    );
    animationStartSnapshot.current = from;

    let time = NaN;
    const speedMultiplier = 1 / (hoverAnimationProgress.current + 0.0001);
    hoverAnimationProgress.current = 1;
    requestAnimationFrame(frame);

    function frame(newTime: number) {
      if (shouldExitAnimationEarly.current) {
        shouldExitAnimationEarly.current = false;
        return;
      }

      if (isNaN(time)) {
        requestAnimationFrame(frame);
        time = newTime;
        return;
      }

      const to = scroll.get();
      const delta = isNaN(time) ? 0 : newTime - time;
      time = newTime;

      hoverAnimationProgress.current -= (delta / 1000) * speedMultiplier;
      setLength(lerp(from, to, 1 - hoverAnimationProgress.current));

      if (hoverAnimationProgress.current > 0) requestAnimationFrame(frame);
      else setIsHovering(false);
    }
  }

  return (
    <>
      {isScrollerAvailable && (
        <Floatie
          id="scroller"
          className="scroller"
          isFloatieVisible={isScrollerVisible && isScrollerAvailable}
          onDiscardFloatie={() => setIsScrollerAvailable(false)}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={() =>
            document.scrollingElement?.scrollTo({
              behavior: "smooth",
              top: 0,
            })
          }
          overlay={{
            children: (
              <svg viewBox="0 0 24 24">
                <motion.path
                  initial={{ pathLength: scroll.get() }}
                  animate={{
                    pathLength: 1,
                  }}
                  exit={{
                    pathLength: scroll.get(),
                  }}
                  style={{
                    stroke: "white",
                    strokeWidth: 0.5,
                  }}
                  transition={{
                    duration: 1,
                  }}
                  d="M10.0512 15.75L9.51642 14.2768L9.18821 14.0137C8.15637 13.1865 7.5 11.9204 7.5 10.5C7.5 8.01472 9.51472 6 12 6C14.4853 6 16.5 8.01472 16.5 10.5C16.5 11.9204 15.8436 13.1865 14.8118 14.0137L14.4836 14.2768L13.9488 15.75H10.0512ZM9 17.25H15L15.75 15.184C17.1217 14.0844 18 12.3948 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 12.3948 6.87831 14.0844 8.25 15.184L9 17.25ZM14.25 19.5V18H9.75V19.5H14.25Z"
                />
              </svg>
            ),
            className: "scroller-drag-overlay",
            dropAnimation: {
              additionalDropAnimations: (animate, container) => {
                animate(
                  container.children[0].children[0],
                  {
                    pathLength: scroll.get(),
                  },
                  {
                    duration: 0.3,
                  }
                );
              },
            },
          }}
        >
          <svg viewBox="0 0 24 24">
            <motion.path
              ref={pathRef}
              style={{
                stroke: "white",
                strokeWidth: 0.5,
                pathLength: isHovering ? undefined : scroll,
              }}
              d="M10.0512 15.75L9.51642 14.2768L9.18821 14.0137C8.15637 13.1865 7.5 11.9204 7.5 10.5C7.5 8.01472 9.51472 6 12 6C14.4853 6 16.5 8.01472 16.5 10.5C16.5 11.9204 15.8436 13.1865 14.8118 14.0137L14.4836 14.2768L13.9488 15.75H10.0512ZM9 17.25H15L15.75 15.184C17.1217 14.0844 18 12.3948 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 12.3948 6.87831 14.0844 8.25 15.184L9 17.25ZM14.25 19.5V18H9.75V19.5H14.25Z"
            />
          </svg>
        </Floatie>
      )}
    </>
  );
}
