"use client";
import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import Image from "next/image";
import { useState } from "react";
import Icon from "../icon/icon";
import { useTranslations } from "next-intl";

type AwardsCardProps = {
  award: Schema<"AwardResponseDto">;
};

export default function AwardsCard({ award }: AwardsCardProps) {
  const t = useTranslations("awards");
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div
      className={`award-card ${expanded ? "expanded" : ""}`}
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
              <span>{t("expandPrompt")}</span>
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
                <h3>{t("student")}</h3>
                <p>{award.student}</p>
              </div>

              {award.description && (
                <div className="details-section">
                  <h3>{t("description")}</h3>
                  <p>{award.description}</p>
                </div>
              )}

              {award.externalLink && (
                <div className="details-section">
                  <h3>{t("externalLink")}</h3>
                  <a
                    href={award.externalLink}
                    className="external-link"
                    onClick={(e) => e.stopPropagation()}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("viewMore")} <Icon name="external-link" />
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
              {t("close")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
