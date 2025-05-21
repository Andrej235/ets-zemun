import "./floatie.scss";
import FloatieDiscardArea from "@/components/floatie/floatie-discard-area";
import {
  DndContext,
  pointerWithin,
  TouchSensor,
  useSensor,
} from "@dnd-kit/core";
import { restrictToWindowEdges, snapCenterToCursor } from "@dnd-kit/modifiers";
import { useState } from "react";
import DraggableFloatie from "./draggable-floatie";
import FloatieOverlay, { FloatieOverlayProps } from "./floatie-overlay";

type FloatieProps = {
  readonly id: string;
  readonly children: React.ReactNode;
  readonly isFloatieVisible: boolean;
  readonly overlay: {
    readonly children: FloatieOverlayProps["children"];
    readonly dropAnimation?: FloatieOverlayProps["dropAnimation"];
    readonly className?: FloatieOverlayProps["className"];
  };
  readonly className?: string;
  readonly onDiscardFloatie: () => void;
  readonly onMouseOver?: () => void;
  readonly onMouseOut?: () => void;
  readonly onClick?: () => void;
};

export default function Floatie({
  id,
  children,
  className,
  isFloatieVisible,
  onDiscardFloatie,
  onMouseOver: handleMouseOver,
  onMouseOut: handleMouseOut,
  onClick: handleClick,
  overlay,
}: FloatieProps) {
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 75,
      tolerance: 20,
    },
  });

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

        onDiscardFloatie?.();
      }}
      onDragOver={({ over }) => {
        if (over) {
          navigator.vibrate?.(20);
          setIsOverDiscard(true);
        } else {
          setIsOverDiscard(false);
        }
      }}
    >
      {!isOverDiscard && (
        <DraggableFloatie
          key={id}
          id={id}
          className={className}
          isDragging={isDragging}
          isFloatieVisible={isFloatieVisible}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={handleClick}
        >
          {children}
        </DraggableFloatie>
      )}

      <FloatieDiscardArea isDragging={isDragging} id={id}>
        {isOverDiscard && (
          <DraggableFloatie
            key={id}
            id={id}
            className={className}
            isDragging={isDragging}
            isFloatieVisible={isFloatieVisible}
          >
            {children}
          </DraggableFloatie>
        )}
      </FloatieDiscardArea>

      <FloatieOverlay
        isDragging={isDragging}
        isOverDiscard={isOverDiscard}
        endDrag={() => setIsDragging(false)}
        {...overlay}
      />
    </DndContext>
  );
}

