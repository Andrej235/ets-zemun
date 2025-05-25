"use client";
import Icon from "@/components/icon/icon";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import "./scroller.scss";

export default function Scroller() {
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);

  useEffect(() => {
    const scrollScaleFactor =
      typeof document === "undefined"
        ? 0
        : document.scrollingElement!.scrollHeight /
          document.scrollingElement!.clientHeight;

    const showScroller = scrollScaleFactor > 2;
    setIsScrollerAvailable(showScroller);
  }, []);

  const enterTopThreashold = useMemo(
    () =>
      typeof document === "undefined"
        ? 0
        : document.scrollingElement!.clientHeight * 0.7,
    [],
  );

  const exitTopThreashold = useMemo(
    () =>
      typeof document === "undefined"
        ? 0
        : document.scrollingElement!.clientHeight * 0.6,
    [],
  );

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (currentY) => {
    if (typeof document === "undefined") return;

    let currentYProgress = 0;
    const topOffset = enterTopThreashold + 100;
    const bottomOffset = document.scrollingElement!.scrollHeight * 0.07;

    if (currentY > topOffset) {
      currentYProgress =
        (currentY - topOffset) /
        (document.scrollingElement!.scrollHeight -
          document.scrollingElement!.clientHeight -
          topOffset -
          bottomOffset);
    }

    return currentYProgress;
  });

  useMotionValueEvent(scrollY, "change", (currentY) => {
    let currentYProgress = 0;
    const topOffset = enterTopThreashold + 100;
    const bottomOffset = document.scrollingElement!.scrollHeight * 0.07;

    if (currentY > topOffset) {
      currentYProgress =
        (currentY - topOffset) /
        (document.scrollingElement!.scrollHeight -
          document.scrollingElement!.clientHeight -
          topOffset -
          bottomOffset);
    }

    if (currentYProgress >= 1.05) {
      setIsScrollerVisible(false);
    } else if (currentY > enterTopThreashold) {
      setIsScrollerVisible(true);
    } else if (currentY < exitTopThreashold) {
      setIsScrollerVisible(false);
    }
  });

  if (!isScrollerAvailable) return null;

  return (
    <motion.div
      id="scroller"
      className="scroller"
      animate={{
        y: isScrollerVisible && isScrollerAvailable ? 0 : 75,
      }}
    >
      <motion.button
        onClick={() =>
          document.scrollingElement?.scrollTo({
            behavior: "smooth",
            top: 0,
          })
        }
        animate={{
          opacity: isScrollerVisible && isScrollerAvailable ? 1 : 0,
        }}
        className="draggable-floatie"
        tabIndex={isScrollerVisible && isScrollerAvailable ? undefined : -1}
      >
        <div className="scroller-inner-container">
          <Icon name="caret-up" className="scroller-icon" />

          <svg viewBox="0 0 100 100">
            <motion.circle
              style={{ pathLength: scrollYProgress }}
              cx="50%"
              cy="50%"
              r="50%"
            />
          </svg>
        </div>
      </motion.button>
    </motion.div>
  );
}
