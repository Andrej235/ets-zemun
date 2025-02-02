import Floatie from "@components/floatie/floatie";
import { useMotionValueEvent, useScroll } from "motion/react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router";
import "./scroller.scss";

export default function Scroller() {
  const [isScrollerVisible, setIsScrollerVisible] = useState(false);
  const [isScrollerAvailable, setIsScrollerAvailable] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const scrollerIconPathRef = useRef<SVGPathElement>(null);
  const [scrollerIconPathLength, setScrollerIconPathLength] = useState(0);
  const [scrollerDashArray, setScrollerDashArray] =
    useState<`${number}px ${number}px`>("0px 0px");

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

  useMotionValueEvent(scrollY, "change", (currentY) => {
    if (!scrollerIconPathRef.current) return;

    let pathLength = scrollerIconPathLength;
    if (pathLength === 0) {
      pathLength = scrollerIconPathRef.current.getTotalLength();
      setScrollerIconPathLength(pathLength);
    }

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

    const pathOffset = pathLength * currentYProgress;
    setScrollerDashArray(
      `${isHovering ? pathLength : pathOffset}px ${pathLength}px`
    );
  });

  return (
    <>
      {isScrollerAvailable && (
        <Floatie
          id="scroller"
          className="scroller"
          isFloatieVisible={isScrollerVisible && isScrollerAvailable}
          onDiscardFloatie={() => setIsScrollerAvailable(false)}
          onMouseOver={() => setIsHovering(true)}
          onMouseOut={() => setIsHovering(false)}
          onClick={() =>
            document.scrollingElement?.scrollTo({
              behavior: "smooth",
              top: 0,
            })
          }
          overlay={{
            children: (
              <svg viewBox="0 0 540 540">
                <path
                  style={{
                    strokeDasharray: scrollerDashArray,
                  }}
                  d="M381.6 206.9c0 21.2-6.8 40.9-18.5 57.1-1 1.2-3.1 3.8-5.7 7.2-10.4 13.8-29.9 42.3-30 63.5v-.2c-1.2 13.5-11.9 24.2-25.4 25.3h3.8c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1 7.1 3.2 7.1 7.1-.8 3.7-2.1 5-3 2.1-5 2.1h-12.4c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1h-14.5c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1h-4.6c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3.1-2.1 5-2.1h-14.5c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3.1-2.1 5-2.1h-12.4c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1h3.8c-13.4-1.1-24.1-11.7-25.2-25.1 0-1 0-1.8-.1-2.8-1.6-20.4-19.1-46.4-29.2-59.8-3.9-5.2-6.7-8.5-7-8.9-11.3-16-17.8-35.4-17.8-56.2 0-55.6 46.9-100.7 104.8-100.7S381.5 151.4 381.5 207Z"
                />
              </svg>
            ),
            className: "scroller-drag-overlay",
          }}
        >
          <svg
            viewBox="0 0 540 540"
            aria-label="Ikonica sijalice koja prikazuje koliko stranice ste već pregledali"
          >
            <path
              ref={scrollerIconPathRef}
              style={{
                strokeDasharray: isHovering
                  ? `${scrollerIconPathLength}px ${scrollerIconPathLength}px`
                  : scrollerDashArray,
              }}
              d="M381.6 206.9c0 21.2-6.8 40.9-18.5 57.1-1 1.2-3.1 3.8-5.7 7.2-10.4 13.8-29.9 42.3-30 63.5v-.2c-1.2 13.5-11.9 24.2-25.4 25.3h3.8c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1 7.1 3.2 7.1 7.1-.8 3.7-2.1 5-3 2.1-5 2.1h-12.4c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1h-14.5c3.9 0 7.1 3.2 7.1 7.1s-.8 3.7-2.1 5-3 2.1-5 2.1h-4.6c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3.1-2.1 5-2.1h-14.5c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3.1-2.1 5-2.1h-12.4c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1c-3.9 0-7.1-3.2-7.1-7.1s.8-3.7 2.1-5 3-2.1 5-2.1h3.8c-13.4-1.1-24.1-11.7-25.2-25.1 0-1 0-1.8-.1-2.8-1.6-20.4-19.1-46.4-29.2-59.8-3.9-5.2-6.7-8.5-7-8.9-11.3-16-17.8-35.4-17.8-56.2 0-55.6 46.9-100.7 104.8-100.7S381.5 151.4 381.5 207Z"
            />
          </svg>
        </Floatie>
      )}
    </>
  );
}

