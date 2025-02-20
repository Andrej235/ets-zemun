import useLoader from "@/better-router/use-loader";
import fullNewsArticleLoader from "./full-news-article-loader";
import Async from "@/better-router/async";
import { useRef } from "react";
import useLazyLoad from "@/hooks/use-lazy-load";

export default function FullNewsArticle() {
  const loaderData = useLoader<typeof fullNewsArticleLoader>();
  const containerRef = useRef<HTMLDivElement>(null);

  useLazyLoad(
    loaderData.then((x) => (x.code === "OK" ? x.content.images : null)),
    (x) => {
      if (!containerRef.current) return;

      x.forEach((image) => {
        const imageRef = containerRef.current!.querySelector(
          `img#image-${image.id}`
        );

        imageRef?.setAttribute("src", image.image);
      });
    }
  );

  return (
    <Async await={loaderData}>
      {(news) => {
        if (news.code !== "OK") return null;

        return (
          <div
            ref={containerRef}
            dangerouslySetInnerHTML={{
              __html: news.content.markup,
            }}
          />
        );
      }}
    </Async>
  );
}

