import { Schema } from "@shared/api-dsl/types/endpoints/schema-parser";
import "./awards-card.scss";
import { PointerEvent } from "react";
import { Link } from "react-router";

export default function AwardsCard({
  award,
}: {
  readonly award: Schema<"AwardResponseDto">;
}) {
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
    <Link to={`/nagrade/${award.id}`} key={award.id}>
      <div
        key={award.id}
        className="award-card"
        onPointerMove={handleMouseMove}
      >
        <img src={award.image} alt={award.title} />
        <div className="award-card-header">
          <h2>{award.title}</h2>
          <p>
            {award.competition} - {award.dayOfAward}
          </p>
        </div>
        <div className="content">
          {award.description && <p>{award.description}</p>}
        </div>
      </div>
    </Link>
  );
}

