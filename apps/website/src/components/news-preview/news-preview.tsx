import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { PointerEvent } from "react";
import { Link } from "react-router";
import "./news-preview.scss";

type NewsPreviewProps = {
  readonly news: Schema<"NewsPreviewResponseDto">;
};

export default function NewsPreview({
  news: { id, date, title, description, previewImage: image },
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
      to={`/novosti/${id}`}
      className="news-article-preview"
      onPointerMove={handleMouseMove}
    >
      <div className="image-container">
        <img src={image} alt={title} />
      </div>
      <div className="info">
        <h1 className="title">{title}</h1>
        <br />
        <p className="description">{description}</p>
        <p className="date">{new Date(date).toLocaleDateString()}</p>
      </div>
    </Link>
  );
}
