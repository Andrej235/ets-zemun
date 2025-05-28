"use client";

import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import Image from "next/image";
import { type PointerEvent, useState } from "react";
import Icon from "../icon/icon";

type AwardsCardProps = {
  award: Schema<"AwardResponseDto">;
};

export default function AwardsCard({ award }: AwardsCardProps) {
  const [expanded, setExpanded] = useState(false);

  const handleMouseMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse") return;

    const target = e.currentTarget;
    const { top, left } = target.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;

    target.style.setProperty("--mouse-x", `${x}px`);
    target.style.setProperty("--mouse-y", `${y}px`);
  };

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`award-card ${expanded ? "expanded" : ""}`}
      onPointerMove={handleMouseMove}
      onClick={toggleExpand}
    >
      <div className="award-card-inner">
        <div className="award-card-front">
          <div className="img">
            <Image
              src={award.image || "/placeholder.svg"}
              alt={award.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="award-badge">{award.dayOfAward}</div>
          </div>

          <div className="award-card-header">
            <p>{award.student}</p>
            <p>{award.dayOfAward}</p>
          </div>

          <div className="award-card-content">
            <h2 className="award-competition">{award.competition}</h2>
            <p className="award-title">{award.title}</p>

            {award.description && (
              <div className="award-description">
                <p>
                  {award.description.length > 150
                    ? `${award.description.substring(0, 150)}...`
                    : award.description}
                </p>
              </div>
            )}

            <div className="expand-prompt">
              <span>Click for details</span>
            </div>
          </div>
        </div>

        {expanded && (
          <div className="award-card-details">
            <div className="details-header">
              <h2>{award.title}</h2>
              <p className="details-competition">{award.competition}</p>
              <p className="details-date">{award.dayOfAward}</p>
            </div>

            <div className="details-content">
              <div className="details-section">
                <h3>Student</h3>
                <p>{award.student}</p>
              </div>

              {award.description && (
                <div className="details-section">
                  <h3>Description</h3>
                  <p>{award.description}</p>
                </div>
              )}

              {award.externalLink && (
                <div className="details-section">
                  <h3>Additional Information</h3>
                  <a
                    href={award.externalLink}
                    className="external-link"
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View more details <Icon name="external-link" />
                  </a>
                </div>
              )}
            </div>

            <button
              className="close-details"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
