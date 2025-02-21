import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorComponent from "@components/error-component/error-component";
import About from "@components/about/about";
import News from "@components/news/news";
import NewNewsArticle from "./components/news/new-news-article";
import AllNews from "./components/news/all-news";
import newsLoader from "./components/news/news-loader";
import FullNewsArticle from "./components/news/full-news-article";
import fullNewsArticleLoader from "./components/news/full-news-article-loader";
import editNewsArticleLoader from "./components/news/edit-news-article-loader";
import EditNewsArticle from "./components/news/edit-news-article";
import "./i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <About />,
      },
      {
        path: "/vesti",
        element: <News />,
        children: [
          {
            path: "",
            element: <AllNews />,
            loader: newsLoader,
          },
          {
            path: "napravi",
            element: <NewNewsArticle />,
          },
          {
            path: ":id",
            element: <FullNewsArticle />,
            loader: fullNewsArticleLoader,
          },
          {
            path: ":id/promeni",
            element: <EditNewsArticle />,
            loader: editNewsArticleLoader,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

