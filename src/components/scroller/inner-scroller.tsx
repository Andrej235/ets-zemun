import { useDraggable } from "@dnd-kit/core";
import { animate, motion, MotionValue } from "motion/react";
import { useRef, useState } from "react";

type InnerScrollerProps = {
  isScrollerVisible: boolean;
  isScrollerAvailable: boolean;
  scroll: MotionValue<number>;
  isDragging: boolean;
};

export default function InnerScroller({
  isScrollerVisible,
  isScrollerAvailable,
  scroll,
  isDragging,
}: InnerScrollerProps) {
  const { listeners, attributes, setNodeRef } = useDraggable({
    id: "scroller",
  });

  const [isHovering, setIsHovering] = useState(false);

  function lerp(from: number, to: number, factor: number): number {
    return from + (to - from) * factor;
  }

  const earlyEnd = useRef(false);
  const snapshot = useRef(0);

  function setLength(pathProgress: number) {
    animate(
      pathRef.current!,
      {
        pathLength: pathProgress,
      },
      {
        duration: 0,
      }
    );
  }

  const isDraggingRef = useRef(false);
  const hoverAnimationProgress = useRef(0);
  const pathRef = useRef<SVGPathElement>(null);

  function handleMouseOver() {
    if (isDraggingRef.current) return;
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
    if (isDraggingRef.current) return;
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
    <motion.div
      className="scroller"
      animate={{
        y: isScrollerVisible && isScrollerAvailable ? 0 : 75,
      }}
      style={{
        y: isScrollerVisible && isScrollerAvailable ? 0 : 75,
        opacity: isDragging ? 0 : 1,
      }}
    >
      <motion.button
        onClick={() =>
          !isDraggingRef.current &&
          document.scrollingElement?.scrollTo({
            behavior: "smooth",
            top: 0,
          })
        }
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        animate={{
          opacity:
            !isDragging && isScrollerVisible && isScrollerAvailable ? 1 : 0,
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
      </motion.button>
    </motion.div>
  );
}
