"use client";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { forwardRef, PointerEvent } from "react";
import "./news-preview.scss";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import { motion } from "motion/react";

type NewsPreviewProps = {
  readonly news: Schema<"NewsPreviewResponseDto">;
};

const NewsPreview = forwardRef<HTMLDivElement, NewsPreviewProps>(
  (
    {
      news: { id, date, title, description, previewImage: image },
    }: NewsPreviewProps,
    ref
  ) => {
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
      <motion.div
        ref={ref}
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className="news-article-preview-container"
      >
        <Link
          href={`/novosti/${id}`}
          className="news-article-preview"
          onPointerMove={handleMouseMove}
        >
          <div className="image-container">
            <Image src={image} alt={title} fill />
          </div>
          <div className="info">
            <h1 className="title">{title}</h1>
            <br />
            <p className="description">{description}</p>
            <p className="date">{new Date(date).toLocaleDateString("uk")}</p>
          </div>
        </Link>
      </motion.div>
    );
  }
);

NewsPreview.displayName = "NewsPreview";
export default NewsPreview;
