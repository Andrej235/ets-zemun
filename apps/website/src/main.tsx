import aboutPageNewsLoader from "@components/about/about-page-news-loader.ts";
import awardsLoader from "@components/awards/awards-loader.ts";
import Enrollment from "@components/enrollment/enrollment.tsx";
import ErrorComponent from "@components/error-component/error-component.tsx";
import fullNewsArticleLoader from "@components/full-news-article/full-news-article-loader.ts";
import FullNewsArticle from "@components/full-news-article/full-news-article.tsx";
import HistoryPage from "@components/history/history-page.tsx";
import newsPageLoader from "@components/news/news-page-loader.ts";
import teacherLoader from "@components/teachers/teachers-loader.ts";
import Teachers from "@components/teachers/teachers.tsx";
import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./components/about/about.tsx";
import App from "./components/app/app.tsx";
import Awards from "./components/awards/awards.tsx";
import Documents from "./components/documents/documents.tsx";
import News from "./components/news/news.tsx";
import ProfilesPage from "./components/profiles-page/profiles-page.tsx";
import SingleProfilePageITLoader from "./components/single-profile-page/single-profile-it-page-loader.ts";
import SingleProfileITPage from "./components/single-profile-page/single-profile-it-page.tsx";
import SingleProfileAdministratorPage from "./components/single-profile-page/single-profile-administrator-page.tsx";
import SingleProfileElectricalEngineerPage from "./components/single-profile-page/single-profile-electrical-engineer-page.tsx";
import SingleProfileElectricalAutomaticsPage from "./components/single-profile-page/single-profile-electrical-automatics-page.tsx";
import Students from "./components/students/students.tsx";
import "./i18n.ts";
import "./index.scss";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [
      {
        path: "/",
        element: <About />,
        loader: aboutPageNewsLoader,
      },
      {
        path: "/profili",
        element: <ProfilesPage />,
      },
      {
        path: "profili/elektrotehnicar-informacionih-tehnologija",
        element: <SingleProfileITPage />,
        loader: SingleProfilePageITLoader,
      },
      {
        path: "profili/administrator-racunarskih-mreza",
        element: <SingleProfileAdministratorPage />,
        loader: SingleProfilePageITLoader,
      },
      {
        path: "profili/elektrotehnicar-racunara",
        element: <SingleProfileElectricalEngineerPage />,
        loader: SingleProfilePageITLoader,
      },
      {
        path: "profili/elektrotehnicar-automatike",
        element: <SingleProfileElectricalAutomaticsPage />,
        loader: SingleProfilePageITLoader,
      },
      {
        path: "/ucenici",
        element: <Students />,
      },
      {
        path: "/novosti",
        element: <News />,
        loader: newsPageLoader,
      },
      {
        path: "/novosti/:newsId",
        element: <FullNewsArticle />,
        loader: fullNewsArticleLoader,
      },
      {
        path: "/dokumenta",
        element: <Documents />,
      },
      {
        path: "/istorija",
        element: <HistoryPage />,
      },
      {
        path: "/takmicenja",
        element: <Awards />,
        loader: awardsLoader,
      },
      {
        path: "nastavnici",
        element: <Teachers />,
        loader: teacherLoader,
      },
      {
        path: "upis",
        element: <Enrollment />,
      },
    ],
    hydrateFallbackElement: <>Hydrate fallback</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

