import Icon from "@components/icon/icon";
import { useDroppable } from "@dnd-kit/core";
import { motion } from "motion/react";

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

  return (
    <motion.div
      ref={setNodeRef}
      className={"floatie-discard-area"}
      animate={{
        opacity: isDragging ? 1 : 0,
        y: isDragging ? 0 : 100,
        x: "-50%",
      }}
    >
      <motion.div
        className={"floatie-discard-area-icon"}
        animate={{
          scale: isOver ? 0.85 : 1,
        }}
      >
        <Icon name="x" />
      </motion.div>

      {children}
    </motion.div>
  );
}
