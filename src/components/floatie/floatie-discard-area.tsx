import Icon from "@components/icon/icon";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "motion/react";
import { createPortal } from "react-dom";

type FloatieDiscardAreaProps = {
  id: string;
  isDragging: boolean;
  children: React.ReactNode;
};

export default function FloatieDiscardArea({
  id,
  isDragging,
  children,
}: FloatieDiscardAreaProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: `${id}-discard-area`,
  });

  return createPortal(
    <motion.div
      ref={setNodeRef}
      className={`${id}-discard-area`}
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
