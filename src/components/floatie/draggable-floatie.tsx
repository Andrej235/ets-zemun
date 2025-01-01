import { useDraggable } from "@dnd-kit/core";
import { motion } from "motion/react";

type DraggableFloatieProps = {
  id: string;
  className?: string;
  children: React.ReactNode;
  isFloatieVisible: boolean;
  isDragging: boolean;
  onMouseOver: () => void;
  onMouseOut: () => void;
};

export default function DraggableFloatie({
  id,
  className,
  children,
  isFloatieVisible,
  isDragging,
  onMouseOver: handleMouseOver,
  onMouseOut: handleMouseOut,
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
        onClick={() =>
          !isDragging &&
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
          opacity: !isDragging && isFloatieVisible ? 1 : 0,
        }}
      >
        {children}
      </motion.button>
    </motion.div>
  );
}
