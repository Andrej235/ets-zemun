import { DragOverlay } from "@dnd-kit/core";
import { animate, AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

export type FloatieOverlayProps = {
  children: React.ReactNode;
  isDragging: boolean;
  endDrag: () => void;
  isOverDiscard: boolean;
  dropAnimation?: {
    duration?: number;
    additionalDropAnimations?: (
      animate: typeof import("motion/react").animate,
      container: HTMLDivElement
    ) => void;
  };
};

export default function FloatieOverlay({
  children,
  endDrag,
  isDragging,
  isOverDiscard,
  dropAnimation,
}: FloatieOverlayProps) {
  const scrollerContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollerContainer.current) return;

    animate(scrollerContainer.current, {
      scale: isOverDiscard ? 1 : 1.2,
    });
  }, [isOverDiscard]);

  const dropAnimationDuration = dropAnimation?.duration ?? 350;

  return (
    <DragOverlay
      dropAnimation={{
        duration: dropAnimationDuration,
        sideEffects: ({ active }) => {
          if (!scrollerContainer.current) return;

          animate(
            scrollerContainer.current,
            {
              scale: 1,
            },
            {
              duration: (dropAnimationDuration - 50) / 1000,
              onComplete: endDrag,
            }
          );

          dropAnimation?.additionalDropAnimations?.(
            animate,
            scrollerContainer.current
          );

          active.node.classList.remove("dragging");
        },
      }}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
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
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </DragOverlay>
  );
}
