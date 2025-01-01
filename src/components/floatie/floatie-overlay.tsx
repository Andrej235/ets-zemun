import { DragOverlay } from "@dnd-kit/core";
import { animate, AnimatePresence, motion } from "motion/react";
import { useEffect, useRef } from "react";

export type FloatieOverlayProps = {
  children: React.ReactNode;
  isDragging: boolean;
  endDrag: () => void;
  isOverDiscard: boolean;
  className?: string;
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
  className,
}: FloatieOverlayProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    animate(containerRef.current, {
      scale: isOverDiscard ? 1 : 1.2,
    });
  }, [isOverDiscard]);

  const dropAnimationDuration = dropAnimation?.duration ?? 350;

  return (
    <DragOverlay
      dropAnimation={{
        duration: dropAnimationDuration,
        sideEffects: ({ active }) => {
          if (!containerRef.current) return;

          animate(
            containerRef.current,
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
            containerRef.current
          );

          active.node.classList.remove("dragging");
        },
      }}
    >
      <AnimatePresence>
        {isDragging && (
          <motion.div
            key={"drag-overlay"}
            className={"drag-overlay" + (className ? ` ${className}` : "")}
            ref={containerRef}
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
