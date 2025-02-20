import useLoader from "@/better-router/use-loader";
import newsLoader from "./news-loader";
import LazyAwaitedList from "../lazy-loaded-list/lazy-awaited-list";
import NewsPreview from "./news-preview";

export default function AllNews() {
  const loaderData = useLoader<typeof newsLoader>();

  return (
    <div className="max-w-full h-max overflow-auto flex justify-center">
      <div className="w-max h-max p-10 grid grid-cols-3 gap-8 overflow-auto">
        <LazyAwaitedList data={loaderData} success="OK">
          {(news) => <NewsPreview key={news.id} news={news} />}
        </LazyAwaitedList>
      </div>
    </div>
  );
}

