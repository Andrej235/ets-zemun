import useLoader from "@/better-router/use-loader";
import newsLoader from "./news-loader";
import LazyAwaitedList from "../lazy-loaded-list/lazy-awaited-list";
import NewsPreview from "./news-preview";
import { useEffect, useState } from "react";

export default function AllNews() {
  const loaderData = useLoader<typeof newsLoader>();

  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  useEffect(() => {
    const drafts = localStorage.getItem("editor-previews");
    if (!drafts) return;

    setHighlightedIds(Object.keys(JSON.parse(drafts)).map(Number));
  }, []);

  return (
    <div className="max-w-full h-max overflow-auto flex justify-center">
      <div className="w-max h-max p-10 grid grid-cols-3 gap-8 overflow-auto">
        <LazyAwaitedList data={loaderData} success="OK">
          {(news) => (
            <NewsPreview
              key={news.id}
              news={news}
              highlight={highlightedIds.includes(news.id)}
            />
          )}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

