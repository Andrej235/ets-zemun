import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/app/app.tsx";
import "./index.scss";
import "overlayscrollbars/overlayscrollbars.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProfilesPage from "./components/profiles-page/profiles-page.tsx";
import Students from "./components/students/students.tsx";
import News from "./components/news/news.tsx";
import Documents from "./components/documents/documents.tsx";
import About from "./components/about/about.tsx";
import SingleProfilePage from "./components/single-profile-page/single-profile-page.tsx";
import SingleProfilePageLoader from "./components/single-profile-page/single-profile-page-loader.ts";
import HistoryPage from "@components/history/history-page.tsx";
import ErrorComponent from "@components/error-component/error-component.tsx";
import Awards from "./components/awards/awards.tsx";
import Teachers from "@components/teachers/teachers.tsx";
import Enrollment from "@components/enrollment/enrollment.tsx";
import AdminLogin from "@components/admin-login/admin-login.tsx";
import "./i18n.ts";
import teacherLoader from "@components/teachers/teachers-loader.ts";
import awardsLoader from "@components/awards/awards-loader.ts";

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
        path: "admin-login",
        element: <AdminLogin />,
      },
      {
        path: "/profili",
        element: <ProfilesPage />,
      },
      {
        path: "profili/:profileName",
        element: <SingleProfilePage />,
        loader: SingleProfilePageLoader,
      },
      {
        path: "/ucenici",
        element: <Students />,
      },
      {
        path: "/novosti",
        element: <News />,
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

