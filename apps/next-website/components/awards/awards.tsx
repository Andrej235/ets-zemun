"use client";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { PointerEvent } from "react";
import "./awards.scss";
import Image from "next/image";

type AwardsProps = {
  awards: Schema<"AwardResponseDto">[];
};

export default function Awards({ awards }: AwardsProps) {
  const t = useTranslations();

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
    <div className="awards-pages" data-search-key="takmicenja-i-nagrade">
      <h1>{t("awards.title")}</h1>
      <div className="awards-list">
        {awards.map((award) => (
          <Link
            className="award-card-link"
            href={award.externalLink ?? "/takmicenja"}
            key={award.id}
          >
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
          </Link>
        ))}
      </div>
    </div>
  );
}
