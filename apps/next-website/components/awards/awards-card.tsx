"use client";

import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import Image from "next/image";
import { PointerEvent } from "react";

type AwardsCardProps = {
  award: Schema<"AwardResponseDto">;
};

export default function AwardsCard({ award }: AwardsCardProps) {
  const handleMouseMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;

    const target = e.currentTarget;
    const { top, left } = target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  return (
    <div className="award-card" onPointerMove={handleMouseMove}>
      <div className="img">
        <Image src={award.image} alt={award.title} fill />
      </div>
      <div className="award-card-header">
        <h2>{award.title}</h2>
        <div className="award-card-header-line">
          <p>{award.competition}</p>
          <p>&nbsp;-&nbsp;</p>
          <p>{award.dayOfAward}</p>
        </div>
      </div>

      <div className="content">
        <h3>Ucenik: {" " + award.student}</h3>
        {award.description && <p>{award.description}</p>}
      </div>
    </div>
  );
}
