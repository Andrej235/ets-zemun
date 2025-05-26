import Async from "@/better-router/async";
import useLoader from "@/better-router/use-loader";
import { useRef } from "react";
import fullNewsArticleLoader from "./full-news-article-loader";
import "./full-news-article.scss";

export default function FullNewsArticle() {
  const loaderData = useLoader<typeof fullNewsArticleLoader>();
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <Async await={loaderData}>
      {(data) => {
        if (data.code !== "200") return null;

        return (
          <div
            className="border-2 rounded-4xl p-8"
            ref={containerRef}
            dangerouslySetInnerHTML={{
              __html: data.content.markup,
            }}
          />
        );
      }}
    </Async>
  );
}
