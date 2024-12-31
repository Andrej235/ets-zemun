import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  MotionValue,
  AnimatePresence,
  animate,
} from "motion/react";
import "./scroller.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import { createPortal } from "react-dom";
import Icon from "@components/icon/icon";
import {
  DndContext,
  DragOverlay,
  pointerWithin,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
} from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";

export default function Scroller() {
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 50,
      tolerance: 15,
    },
  });

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

  const [isDragging, setIsDragging] = useState(false);
  const [isOverDiscard, setIsOverDiscard] = useState(false);

  return (
    <DndContext
      collisionDetection={pointerWithin}
      modifiers={[restrictToWindowEdges, snapCenterToCursor]}
      sensors={[touchSensor]}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={({ collisions }) => {
        if (!collisions || collisions.length === 0) return;

        setIsScrollerAvailable(false);
      }}
      onDragOver={({ over }) => setIsOverDiscard(over !== null)}
    >
      <InnerScroller
        isScrollerVisible={isScrollerVisible}
        isScrollerAvailable={isScrollerAvailable}
        scroll={scroll}
        isDragging={isDragging}
      />

      <DiscardArea isDragging={isDragging} />

      <ScrollerOverlay
        endDrag={() => setIsDragging(false)}
        isDragging={isDragging}
        pathLength={scroll}
        isOverDiscard={isOverDiscard}
      />
    </DndContext>
  );
}

function InnerScroller({
  isScrollerVisible,
  isScrollerAvailable,
  scroll,
  isDragging,
}: {
  isScrollerVisible: boolean;
  isScrollerAvailable: boolean;
  scroll: MotionValue<number>;
  isDragging: boolean;
}) {
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
      "path",
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

function ScrollerOverlay({
  isDragging,
  pathLength,
  endDrag,
  isOverDiscard,
}: {
  isDragging: boolean;
  pathLength: MotionValue<number>;
  endDrag: () => void;
  isOverDiscard: boolean;
}) {
  const scrollerContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerContainer.current) return;

    animate(scrollerContainer.current, {
      scale: isOverDiscard ? 1 : 1.2,
    });
  }, [isOverDiscard]);

  return (
    <DragOverlay
      dropAnimation={{
        duration: 350,
        sideEffects: ({ active }) => {
          if (!scrollerContainer.current) return;

          animate(
            scrollerContainer.current,
            {
              scale: 1,
            },
            {
              duration: 0.3,
              onComplete: endDrag,
            }
          );

          animate(
            scrollerContainer.current.children[0].children[0],
            {
              pathLength: pathLength.get(),
            },
            {
              duration: 0.3,
            }
          );

          active.node.classList.remove("dragging");
        },
      }}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            id="test"
            key={"scroller-drag-overlay"}
            className="scroller-drag-overlay"
            ref={scrollerContainer}
            initial={{
              scale: 1,
            }}
            animate={{
              scale: 1.2,
            }}
          >
            <svg viewBox="0 0 24 24">
              <motion.path
                initial={{ pathLength: pathLength.get() }}
                animate={{
                  pathLength: 1,
                }}
                exit={{
                  pathLength: pathLength.get(),
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
          </motion.div>
        )}
      </AnimatePresence>
    </DragOverlay>
  );
}

function DiscardArea({ isDragging }: { isDragging: boolean }) {
  const { setNodeRef, isOver } = useDroppable({
    id: "scroller-discard-area",
  });

  return createPortal(
    <motion.div
      ref={setNodeRef}
      className="scroller-discard-area"
      animate={{
        opacity: isDragging ? 1 : 0,
        y: isDragging ? 0 : 100,
        x: "-50%",
      }}
    >
      <motion.div
        animate={{
          scale: isOver ? 0.85 : 1,
        }}
      >
        <Icon name="x" />
      </motion.div>
    </motion.div>,
    document.body
  );
}
