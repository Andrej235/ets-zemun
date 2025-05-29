"use client";

import type { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import { useTranslations } from "next-intl";
import AwardsCard from "./awards-card";
import "./awards.scss";
import { useState, useMemo } from "react";
import { AnimatePresence } from "motion/react";

type AwardsProps = {
  awards: Schema<"AwardResponseDto">[];
};

export default function Awards({ awards }: AwardsProps) {
  const t = useTranslations("awards");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredAwards = useMemo(
    () =>
      awards.filter((award) => {
        if (!searchTerm) return true;
        const term = searchTerm.toLowerCase();
        return (
          award.title.toLowerCase().includes(term) ||
          award.student?.toLowerCase().includes(term) ||
          award.description?.toLowerCase().includes(term) ||
          award.competition?.toLowerCase().includes(term)
        );
      }),
    [awards, searchTerm]
  );

  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <div className="awards-pages" data-search-key="takmicenja-i-nagrade">
      <h1>{t("title")}</h1>

      <div className="awards-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => {
              setExpanded(null);
              setSearchTerm(e.target.value);
            }}
            className="search-input"
          />
        </div>

        <div className="results-counter">
          <p>
            {t("results", {
              filtered: filteredAwards.length,
              total: awards.length,
            })}
          </p>
        </div>
      </div>

      <div className="awards-list">
        <AnimatePresence mode="popLayout">
          {filteredAwards.length > 0 ? (
            filteredAwards.map((award) => (
              <AwardsCard
                key={award.id}
                award={award}
                expanded={expanded === award.id}
                onExpand={() =>
                  setExpanded((expanded) =>
                    expanded === award.id ? null : award.id
                  )
                }
              />
            ))
          ) : (
            <div className="no-results">
              <p>{t("noResults")}</p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
