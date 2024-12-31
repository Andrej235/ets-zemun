import { useMotionValueEvent, useTransform, useScroll } from "motion/react";
import "./scroller.scss";
import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import {
  DndContext,
  pointerWithin,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import InnerScroller from "./inner-scroller";
import ScrollerOverlay from "./scroller-overlay";
import DiscardArea from "./discard-area";

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

  if (!isScrollerAvailable) return <></>;

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
      onDragOver={({ over }) => {
        if (over) {
          navigator.vibrate?.(20);
          setIsOverDiscard(true);
        } else {
          setIsOverDiscard(false);
        }
      }}
      onDragMove={({}) => {}}
    >
      {!isOverDiscard && (
        <InnerScroller
          key={"scroller"}
          isScrollerVisible={isScrollerVisible}
          isScrollerAvailable={isScrollerAvailable}
          scroll={scroll}
          isDragging={isDragging}
        />
      )}

      <DiscardArea isDragging={isDragging}>
        {isOverDiscard && (
          <InnerScroller
            key={"scroller"}
            isScrollerVisible={isScrollerVisible}
            isScrollerAvailable={isScrollerAvailable}
            scroll={scroll}
            isDragging={isDragging}
          />
        )}
      </DiscardArea>

      <ScrollerOverlay
        endDrag={() => setIsDragging(false)}
        isDragging={isDragging}
        pathLength={scroll}
        isOverDiscard={isOverDiscard}
      />
    </DndContext>
  );
}
