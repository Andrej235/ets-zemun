import React, { useState } from "react";
import "./news-preview.scss";

type NewsPreviewProps = {
  date: Date;
  title: string;
  description: string;
  image: string;
};

export default function NewsPreview({
  date,
  title,
  description,
  image,
}: NewsPreviewProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const { left, top } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    setMousePosition({ x, y });
  };

  return (
    <div
      className="news-article-preview"
      onMouseMove={handleMouseMove}
      style={{
        "--mouse-x": `${mousePosition.x}px`,
        "--mouse-y": `${mousePosition.y}px`,
      } as React.CSSProperties}
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
    </div>
  );
}
