import { animate, inView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import "./four-leaf-clover.scss";

export default function FourLeafClover() {
  return (
    <div className="four-leaf-clover">
      <FourLeafCloverLeaf count={100} title="Zaposlenih nastavnika" />
      <FourLeafCloverLeaf count={750} title="Upisanih ucenika" />
      <FourLeafCloverLeaf count={40} title="Opremljenih kabineta" />
      <FourLeafCloverLeaf count={15} title="Osvojenih nagrada" />
    </div>
  );
}

type LeafProps = {
  readonly count: number;
  readonly title: string;
};

function FourLeafCloverLeaf({ title, count }: LeafProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const countRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!countRef.current) return;

    const cleanup = inView(countRef.current, () => {
      animate(0, count, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCurrentCount(Math.floor(latest));
        },
      });

      return () => {
        setCurrentCount(0); //? Reset the count when the element is out of view, this ensures that the count will start from 0 when the element is in view again
      };
    });

    return cleanup;
  }, [countRef, count]);

  return (
    <div className="four-leaf-clover-leaf">
      <h1 className="count" ref={countRef}>
        {currentCount}+
      </h1>

      <h2 className="title">{title}</h2>
    </div>
  );
}

