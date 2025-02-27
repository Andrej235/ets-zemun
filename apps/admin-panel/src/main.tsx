import About from "@components/about/about";
import ErrorComponent from "@components/error-component/error-component";
import News from "@components/news/news";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import App from "./components/app/app";
import languageLoader from "./components/languages/language-loader";
import Languages from "./components/languages/languages";
import AllNews from "./components/news/all-news";
import createTranslationNewsArticleLoader from "./components/news/create-news-translation-loader";
import EditNewsArticle from "./components/news/edit-news-article";
import editNewsArticleLoader from "./components/news/edit-news-article-loader";
import FullNewsArticle from "./components/news/full-news-article";
import fullNewsArticleLoader from "./components/news/full-news-article-loader";
import NewNewsArticle from "./components/news/new-news-article";
import newsLoader from "./components/news/news-loader";
import FullSubject from "./components/subjects/full-subject";
import fullSubjectLoader from "./components/subjects/full-subject-loader";
import Subjects from "./components/subjects/subjects";
import subjectsLoader from "./components/subjects/subjects-loader";
import Users from "./components/users/users";
import userLoader from "./components/users/users-loader";
import "./i18n";
import "./index.scss";
import Teachers from "./components/teachers/teachers";
import teachersLoader from "./components/teachers/teachers-loader";
import fullTeacherLoader from "./components/teachers/full-teacher-loader";
import FullTeacher from "./components/teachers/full-teacher";
import { Awards } from "./components/awards/awards";
import awardsLoader from "./components/awards/awards-loader";
import FullAward from "./components/awards/full-award";
import fullAwardLoader from "./components/awards/full-award-loader";

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
        path: "/predmeti",
        element: <Subjects />,
        loader: subjectsLoader,
      },
      {
        path: "/predmeti/:id",
        element: <FullSubject />,
        loader: fullSubjectLoader,
      },
      {
        path: "/jezici",
        element: <Languages />,
        loader: languageLoader,
      },
      {
        path: "/nastavnici",
        element: <Teachers />,
        loader: teachersLoader,
      },
      {
        path: "/nastavnici/:id",
        element: <FullTeacher />,
        loader: fullTeacherLoader,
      },
      {
        path: "/korisnici",
        element: <Users />,
        loader: userLoader,
      },
      {
        path: "/nagrade",
        element: <Awards />,
        loader: awardsLoader,
      },
      {
        path: "/nagrade/:id",
        element: <FullAward />,
        loader: fullAwardLoader,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

