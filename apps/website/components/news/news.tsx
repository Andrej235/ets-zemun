"use client";
import { Schema } from "@/api-dsl/types/endpoints/schema-parser";
import NewsPreview from "@/components/news-preview/news-preview";
import { useTranslations } from "next-intl";
import "../news-preview/news-preview.scss";
import "./news.scss";
import { useState } from "react";

type NewsProps = {
  news: Schema<"NewsPreviewResponseDto">[];
};

export default function News({ news }: NewsProps) {
  const t = useTranslations("news");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredNews = news.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm) ||
      news.description.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="news-page-container" data-search-key="novosti">
      <div className="header">
        <h1>{t("title")}</h1>
        <p>{t("description")}</p>
      </div>

      <div className="news-filters">
        <div className="search-container">
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="results-counter">
          <p>
            {t("results", {
              filtered: filteredNews.length,
              total: news.length,
            })}
          </p>
        </div>
      </div>

      <div className="articles-container">
        {filteredNews.map((data) => (
          <NewsPreview key={data.id} news={data} />
        ))}
      </div>
    </div>
  );
}
