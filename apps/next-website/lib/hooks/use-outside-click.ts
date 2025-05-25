import { RefObject, useCallback, useEffect } from "react";

export default function useOutsideClick(
  ref: RefObject<HTMLElement | null>,
  callback: () => void,
  type: "left" | "all" = "all"
) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (document.body.classList.contains("ReactModal__Body--open")) return;
      if (type === "left" && event.button !== 0) return;

      if (!ref.current) return;

      const target = event.target as HTMLElement;
      if (target.classList.contains("drag-overlay")) return;

      if (target.classList.contains("ignore-use-outside-click")) return;

      if (!ref.current.contains(target as Node)) callback();
    },
    [ref, callback, type]
  );

  useEffect(() => {
    document.body.addEventListener("mousedown", handleClick);
    return () => document.body.removeEventListener("mousedown", handleClick);
  }, [ref, callback, handleClick]);
}
