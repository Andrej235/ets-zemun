import PreviewCard, {
  PreviewCardLayout,
} from "@/components/preview-card/preview-card";
import "./school-preview-card.scss";
import { useEffect, useRef, useState } from "react";
import { animate } from "motion";
import { inView } from "motion/react";

type SchoolPreviewCardProps = {
  readonly layout: PreviewCardLayout;
  readonly image: string;
  readonly description: string;
  readonly title: string;
  readonly count?: number;
};

export default function SchoolPreviewCard({
  count,
  description,
  image,
  layout,
  title,
}: SchoolPreviewCardProps) {
  const [currentCount, setCurrentCount] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    if (count === undefined) return;

    const cleanup = inView(containerRef.current, () => {
      animate(0, count, {
        duration: 1.5,
        ease: "easeOut",
        onUpdate: (latest) => {
          setCurrentCount(Math.floor(latest));
        },
      });
    });

    return cleanup;
  }, [containerRef, count]);

  return (
    <PreviewCard imagePath={image} layout={layout} imageAlt={title}>
      <div className={"school-preview-card " + layout} ref={containerRef}>
        <h1 className="title">
          <span>{count !== undefined && currentCount + "+"}</span> {" " + title}
        </h1>

        <p
          className="description"
          dangerouslySetInnerHTML={{
            __html: description.replace(/<br\s*\/?>/g, "<br />"),
          }}
        ></p>
      </div>
    </PreviewCard>
  );
}

