//@text-transform-ignore
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
import ClassPage from "./components/class-page/class-page.tsx";
import classPageLoader from "./components/class-page/class-page-loader.ts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <About />,
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
        path: "/predmeti/:className",
        element: <ClassPage />,
        loader: classPageLoader,
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
    ],
    hydrateFallbackElement: <>Hydrate fallback</>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
