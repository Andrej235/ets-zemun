import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import "./scroller.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { animate } from "motion";
import { createPortal } from "react-dom";
import Icon from "@components/icon/icon";

export default function Scroller() {
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  const { scrollY } = useScroll();
  const scroll = useTransform(scrollY, (x) => {
    const exitThreashold = document.scrollingElement!.clientHeight * 0.6;
    if (x < exitThreashold) return 0;
    else
      return (
        (x - exitThreashold) /
        (document.scrollingElement!.scrollHeight - exitThreashold)
      );
  });

  useMotionValueEvent(scrollY, "change", (x) => {
    const enterThreashold = document.scrollingElement!.clientHeight * 0.7;
    const exitThreashold = document.scrollingElement!.clientHeight * 0.6;

    if (x > enterThreashold) setIsScrollerVisible(true);
    else if (x < exitThreashold) setIsScrollerVisible(false);
  });

  //Only needed to retrigger the useEffect which decides whether to show the scroller
  const location = useLocation();
  useEffect(() => {
    const scrollScaleFactor =
      document.scrollingElement!.scrollHeight /
      document.scrollingElement!.clientHeight;

    const showScroller = scrollScaleFactor > 2;
    setIsScrollerAvailable(showScroller);
  }, [location]);

  function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  const earlyEnd = useRef(false);
  const snapshot = useRef(0);

  function setLength(pathProgress: number) {
    animate(
      "path",
      {
        pathLength: pathProgress,
      },
      {
        duration: 0,
      }
    );
  }

  const isDragging = useRef(false);
  const hoverAnimationProgress = useRef(0);

  function handleMouseOver() {
    if (isDragging.current) return;
    if (hoverAnimationProgress.current > 0) earlyEnd.current = true;
    setIsHovering(true);

    const to = 1;
    const from = lerp(
      snapshot.current,
      scroll.get(),
      1 - hoverAnimationProgress.current
    );
    snapshot.current = from;

    let time = NaN;
    const speedMultiplier = 1 / (1 - hoverAnimationProgress.current + 0.0001);
    hoverAnimationProgress.current = 0;
    requestAnimationFrame(frame);

    function frame(newTime: number) {
      if (earlyEnd.current) {
        earlyEnd.current = false;
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
    if (isDragging.current) return;
    if (hoverAnimationProgress.current < 1) earlyEnd.current = true;

    const from = lerp(snapshot.current, 1, hoverAnimationProgress.current);
    snapshot.current = from;

    let time = NaN;
    const speedMultiplier = 1 / (hoverAnimationProgress.current + 0.0001);
    hoverAnimationProgress.current = 1;
    requestAnimationFrame(frame);

    function frame(newTime: number) {
      if (earlyEnd.current) {
        earlyEnd.current = false;
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
      <motion.button
        drag
        dragConstraints={{
          left: -(window.innerWidth * 0.9),
          top: -window.innerHeight * 0.4,
          bottom: 0,
          right: 0,
        }}
        dragElastic={{
          bottom: 0.3,
          right: 0.3,
          left: 0.3,
          top: 0.5,
        }}
        whileDrag={{
          scale: 1.2,
          transition: {
            bounce: 0,
          },
        }}
        dragSnapToOrigin
        onDragStart={() => {
          handleMouseOver();
          isDragging.current = true;
        }}
        onDragEnd={() => {
          isDragging.current = false;
          handleMouseOut();
        }}
        className="scroller"
        onClick={() =>
          !isDragging.current &&
          document.scrollingElement?.scrollTo({
            behavior: "smooth",
            top: 0,
          })
        }
        animate={{
          y: isScrollerVisible && isScrollerAvailable ? 0 : 75,
          opacity: isScrollerVisible && isScrollerAvailable ? 1 : 0,
        }}
        onPointerEnter={handleMouseOver}
        onPointerLeave={handleMouseOut}
      >
        <svg viewBox="0 0 24 24">
          <motion.path
            style={{
              stroke: "white",
              strokeWidth: 0.5,
              pathLength: isHovering ? undefined : scroll,
            }}
            d="M10.0512 15.75L9.51642 14.2768L9.18821 14.0137C8.15637 13.1865 7.5 11.9204 7.5 10.5C7.5 8.01472 9.51472 6 12 6C14.4853 6 16.5 8.01472 16.5 10.5C16.5 11.9204 15.8436 13.1865 14.8118 14.0137L14.4836 14.2768L13.9488 15.75H10.0512ZM9 17.25H15L15.75 15.184C17.1217 14.0844 18 12.3948 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 12.3948 6.87831 14.0844 8.25 15.184L9 17.25ZM14.25 19.5V18H9.75V19.5H14.25Z"
          />
        </svg>
      </motion.button>

      {createPortal(
        <motion.div className="scroller-discard-area">
          <Icon name="X" />
        </motion.div>,
        document.body
      )}
    </>
  );
}
