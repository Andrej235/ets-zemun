import { motion, useScroll, useTransform } from "motion/react";
import "./scroller.scss";

export default function Scroller() {
  const { scrollYProgress } = useScroll();
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["#fff0", "#fff0", "#ff0"]
  );

  return (
    <button
      className="scroller"
      onClick={() =>
        document.scrollingElement?.scrollTo({
          behavior: "smooth",
          top: 0,
        })
      }
    >
      <motion.svg viewBox="0 0 24 24">
        <motion.path
          style={{
            pathLength: scrollYProgress,
            stroke: "white",
            strokeWidth: 0.5,
            fill: backgroundColor,
          }}
          d="M10.0512 15.75L9.51642 14.2768L9.18821 14.0137C8.15637 13.1865 7.5 11.9204 7.5 10.5C7.5 8.01472 9.51472 6 12 6C14.4853 6 16.5 8.01472 16.5 10.5C16.5 11.9204 15.8436 13.1865 14.8118 14.0137L14.4836 14.2768L13.9488 15.75H10.0512ZM9 17.25H15L15.75 15.184C17.1217 14.0844 18 12.3948 18 10.5C18 7.18629 15.3137 4.5 12 4.5C8.68629 4.5 6 7.18629 6 10.5C6 12.3948 6.87831 14.0844 8.25 15.184L9 17.25ZM14.25 19.5V18H9.75V19.5H14.25Z"
        />
      </motion.svg>
    </button>
  );
}
