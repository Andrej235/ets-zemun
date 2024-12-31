import Icon from "@components/icon/icon";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

export default function DiscardArea({
  isDragging,
  children,
}: {
  isDragging: boolean;
  children: React.ReactNode;
}) {
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
        className="scroller-discard-area-icon"
        animate={{
          scale: isOver ? 0.85 : 1,
        }}
      >
        <Icon name="x" />
      </motion.div>

      {children}
    </motion.div>,
    document.body
  );
}
