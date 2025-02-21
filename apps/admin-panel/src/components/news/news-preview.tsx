import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import { PointerEvent } from "react";
import { Link } from "react-router";
import "./news.scss";

type NewsPreviewProps = {
  readonly news: Schema<"NewsPreviewResponseDto">;
  readonly disabledLink?: boolean;
  readonly highlight?: boolean;
  readonly missingLanguage?: boolean;
};

export default function NewsPreview({
  news: { date, description, id, previewImage: image, title },
  disabledLink,
  highlight,
  missingLanguage,
}: NewsPreviewProps) {
  const handleMouseMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;

    const target = e.currentTarget as HTMLAnchorElement;
    const { top, left } = target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <Link
      to={disabledLink ? "#" : `${id}`}
      className={`news-article-preview ${
        highlight ? "border-2 border-accent-foreground" : ""
      }`}
      onPointerMove={handleMouseMove}
    >
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="info">
        <h1 className={"title" + (missingLanguage ? " text-red-500!" : "")}>
          {missingLanguage ? "Nije napravljen prevod" : title}
        </h1>
        <br />
        <p className="description">{description}</p>
        <p className="date">{date}</p>
      </div>
    </Link>
  );
}

