import useLoader from "@/better-router/use-loader";
import newsLoader from "./news-loader";
import LazyAwaitedList from "../lazy-loaded-list/lazy-awaited-list";
import NewsPreview from "./news-preview";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

export default function AllNews() {
  const loaderData = useLoader<typeof newsLoader>();
  const { i18n } = useTranslation();

  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  useEffect(() => {
    const drafts = localStorage.getItem(`editor-previews-${i18n.language}`);
    if (!drafts) return;

    setHighlightedIds(Object.keys(JSON.parse(drafts)).map(Number));
  }, [i18n.language]);

  return (
    <div className="max-w-full h-max overflow-auto flex justify-center">
      <div className="w-max h-max p-10 grid grid-cols-3 gap-8 overflow-auto">
        <LazyAwaitedList data={loaderData} success="OK">
          {(news) => (
            <NewsPreview
              key={news.id}
              news={news}
              highlight={highlightedIds.includes(news.id)}
              missingLanguage={news.title === ""}
            />
          )}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

