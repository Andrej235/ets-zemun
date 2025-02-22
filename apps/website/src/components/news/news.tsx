import NewsPreview from "@components/news-preview/news-preview";
import "./news.scss";
import useLoader from "@better-router/use-loader";
import newsPageLoader from "./news-page-loader";
import LazyAwaitedList from "@components/lazy-loaded-list/lazy-awaited-list";

export default function News() {
  const loaderData = useLoader<typeof newsPageLoader>();

  return (
    <div className="news-page-container">
      <div className="articles-container">
        <LazyAwaitedList data={loaderData} success="OK">
          {(data) => <NewsPreview key={data.id} news={data} />}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

