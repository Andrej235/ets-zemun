import {
  animate,
  animateMini,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import "./scroller.scss";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

export default function Scroller() {
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isHoveringDebounce, setIsHoveringDebounce] = useState(false);

  const { scrollY, scrollYProgress } = useScroll();

  const ref = useRef<SVGPathElement>(null);

  useMotionValueEvent(scrollY, "change", (x) => {
    const threashold = document.scrollingElement!.clientHeight * 0.7;

    if (x > threashold) setIsScrollerVisible(true);
    else if (x < threashold - 150) setIsScrollerVisible(false);
  });

  const [scroll, setScroll] = useState(0);
  useMotionValueEvent(scrollYProgress, "change", setScroll);

  //Only needed to retrigger the useEffect which decides whether to show the scroller
  const location = useLocation();
  useEffect(() => {
    const scrollScaleFactor =
      document.scrollingElement!.scrollHeight /
      document.scrollingElement!.clientHeight;

    const showScroller = scrollScaleFactor > 2;
    setIsScrollerAvailable(showScroller);
  }, [location]);

  return (
    <motion.button
      className="scroller"
      onClick={() =>
        document.scrollingElement?.scrollTo({
          behavior: "smooth",
          top: 0,
        })
      }
      animate={{
        y: isScrollerVisible && isScrollerAvailable ? 0 : 75,
        opacity: isScrollerVisible && isScrollerAvailable ? 1 : 0,
      }}
      onPointerEnter={() => setIsHovering(true)}
      onPointerLeave={() => {
        setIsHoveringDebounce(true);
        setIsHovering(false);

        setTimeout(() => {
          setIsHoveringDebounce(false);
        }, 500);
      }}
    >
      <svg viewBox="0 0 24 24">
        <motion.path
          ref={ref}
          style={{
            stroke: "white",
            strokeWidth: 0.5,
          }}
          animate={{
            pathLength: isHovering ? 1 : scroll,
            transition: {
              duration: isHovering ? 0.5 : 0, //Emulate transition while debounce is true, user lerp or smth idk
            },
          }}
          d="M10.0512 15.75L9.51642 14.2768L9.18821 14.0137C8.15637 13.1865 7.5 11.9204 7.5 10.5C7.5 8.01472 9.51472 6 12 6C14.4853 6 16.5 8.01472 16.5 10.5C16.5 11.9204 15.8436 13.1865 14.8118 14.0137L14.4836 14.2768L13.9488 15.75H10.0512ZM9 17.25H15L15.75 15.184C17.1217 14.0844 18 12.3948 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 12.3948 6.87831 14.0844 8.25 15.184L9 17.25ZM14.25 19.5V18H9.75V19.5H14.25Z"
        />
      </svg>
    </motion.button>
  );
}
