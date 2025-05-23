import useLoader from "@/better-router/use-loader";
import LazyAwaitedList from "@/components/lazy-loaded-list/lazy-awaited-list";
import NewsPreview from "@/components/news-preview/news-preview";
import newsPageLoader from "./news-page-loader";
import "./news.scss";
import "../news-preview/news-preview.scss";

export default function News() {
  const loaderData = useLoader<typeof newsPageLoader>();

  return (
    <div
      className="news-page-container"
      data-search-key="novosti"
    >
      <div className="articles-container">
        <LazyAwaitedList
          data={loaderData}
          success="200"
          skeleton={Array.from({ length: 9 }).map((_, i) => (
            <div
              className="news-article-preview skeleton"
              key={"skeleton_" + i}
            ></div>
          ))}
        >
          {(data) => <NewsPreview key={data.id} news={data} />}
        </LazyAwaitedList>
      </div>
    </div>
  );
}
