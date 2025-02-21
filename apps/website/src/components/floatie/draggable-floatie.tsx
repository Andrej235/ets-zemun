import { useDraggable } from "@dnd-kit/core";
import { motion } from "motion/react";

type DraggableFloatieProps = {
  readonly id: string;
  readonly className?: string;
  readonly children: React.ReactNode;
  readonly isFloatieVisible: boolean;
  readonly isDragging: boolean;
  readonly onMouseOver?: () => void;
  readonly onMouseOut?: () => void;
  readonly onClick?: () => void;
};

export default function DraggableFloatie({
  id,
  className,
  children,
  isFloatieVisible,
  isDragging,
  onMouseOver: handleMouseOver,
  onMouseOut: handleMouseOut,
  onClick: handleClick,
}: DraggableFloatieProps) {
  const { listeners, attributes, setNodeRef } = useDraggable({
    id,
  });

  return (
    <motion.div
      className={"draggable-floatie" + className ? ` ${className}` : ""}
      animate={{
        y: isFloatieVisible ? 0 : 75,
      }}
      style={{
        opacity: isDragging ? 0 : 1,
      }}
    >
      <motion.button
        onClick={handleClick}
        onPointerOver={(e) => e.pointerType === "mouse" && handleMouseOver?.()}
        onPointerLeave={(e) => e.pointerType === "mouse" && handleMouseOut?.()}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        animate={{
          opacity: !isDragging && isFloatieVisible ? 1 : 0,
        }}
        className={"draggable-floatie"}
        tabIndex={isFloatieVisible ? undefined : -1}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}
