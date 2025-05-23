import useLoader from "@/better-router/use-loader";
import fullNewsArticleLoader from "./full-news-article-loader";
import "./full-news-article.scss";
import Async from "@/better-router/async";
import { useRef } from "react";
import useLazyLoad from "@/hooks/use-lazy-load";

export default function FullNewsArticle() {
  const loaderData = useLoader<typeof fullNewsArticleLoader>();
  const containerRef = useRef<HTMLDivElement>(null);

  useLazyLoad(
    loaderData.then((x) => (x.code === "200" ? x.content.images : null)),
    (x) => {
      if (!containerRef.current) return;

      x.forEach((image) => {
        const imageRef = containerRef.current!.querySelector(
          `img#image-${image.id}`,
        );

        imageRef?.setAttribute("src", image.image);
      });
    },
  );

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
