//@ts-expect-error CSS
import "quill/dist/quill.snow.css";
import "./news.scss";
import NewNewsArticle from "./new-news-article";
import { useState } from "react";

export default function News() {
  const [isCreating, setIsCreating] = useState(false);

  if (isCreating) return <NewNewsArticle />;

  return (
    <div>
      <button onClick={() => setIsCreating(true)}>Napravi novi članak</button>
    </div>
  );
}

