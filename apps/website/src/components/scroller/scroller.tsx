import Floatie from "@components/floatie/floatie";
import Icon from "@components/icon/icon";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import "./scroller.scss";

export default function Scroller() {
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);

  const location = useLocation(); //? Only needed to retrigger the useEffect which decides whether to show the scroller upon entering a new page

  useEffect(() => {
    const scrollScaleFactor =
      document.scrollingElement!.scrollHeight /
      document.scrollingElement!.clientHeight;

    const showScroller = scrollScaleFactor > 2;
    setIsScrollerAvailable(showScroller);
  }, [location]);

  const enterTopThreashold = useMemo(
    () => document.scrollingElement!.clientHeight * 0.7,
    []
  );

  const exitTopThreashold = useMemo(
    () => document.scrollingElement!.clientHeight * 0.6,
    []
  );

  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (currentY) => {
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

  return (
    <>
      {isScrollerAvailable && (
        <Floatie
          id="scroller"
          className="scroller"
          isFloatieVisible={isScrollerVisible && isScrollerAvailable}
          onDiscardFloatie={() => setIsScrollerAvailable(false)}
          onClick={() =>
            document.scrollingElement?.scrollTo({
              behavior: "smooth",
              top: 0,
            })
          }
          overlay={{
            children: <Icon name="caret-up" className="scroller-icon" />,
            className: "scroller-drag-overlay",
          }}
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
        </Floatie>
      )}
    </>
  );
}

