import { PointerEvent, useEffect, useRef } from "react";
import { Link } from "react-router";
import "./news-preview.scss";

type NewsPreviewProps = {
  readonly date: Date;
  readonly title: string;
  readonly description: string;
  readonly image: string;
};

export default function NewsPreview({
  date,
  title,
  description,
  image,
}: NewsPreviewProps) {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const containerPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    containerPosition.current = {
      x: rect.left,
      y: rect.top,
    };
  }, [containerRef]);

  const handleMouseMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;

    const target = e.currentTarget as HTMLAnchorElement;
    const x = e.clientX - containerPosition.current.x;
    const y = e.clientY - containerPosition.current.y;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link
      to="/news/1"
      className="news-article-preview"
      onPointerMove={handleMouseMove}
      ref={containerRef}
    >
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="info">
        <h1 className="title">{title}</h1>
        <br />
        <p className="description">{description}</p>
        <p className="date">{date.toLocaleDateString()}</p>
      </div>
    </Link>
  );
}

