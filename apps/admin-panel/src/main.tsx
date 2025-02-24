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
import createTranslationNewsArticleLoader from "./components/news/create-news-translation-loader";
import Languages from "./components/languages/languages";
import languageLoader from "./components/languages/language-loader";
import Users from "./components/users/users";
import userLoader from "./components/users/users-loader";

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
          {
            path: ":id/napravi-prevod",
            element: <EditNewsArticle createTranslation />,
            loader: createTranslationNewsArticleLoader,
          },
        ],
      },
      {
        path: "/jezici",
        element: <Languages />,
        loader: languageLoader,
      },
      {
        path: "/korisnici",
        element: <Users />,
        loader: userLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

