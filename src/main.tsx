//@text-transform-ignore
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.tsx";
import "./index.scss";
import "overlayscrollbars/overlayscrollbars.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProfilesPage from "./components/ProfilesPage/ProfilesPage.tsx";
import Students from "./components/Students/Students.tsx";
import News from "./components/News/News.tsx";
import Documents from "./components/Documents/Documents.tsx";
import About from "./components/About/About.tsx";
import SingleProfilePage from "./components/SingleProfilePage/SingleProfilePage.tsx";
import SingleProfilePageLoader from "./components/SingleProfilePage/SingleProfilePageLoader.ts";
import ClassPage from "./components/ClassPage/ClassPage.tsx";
import classPageLoader from "./components/ClassPage/ClassPageLoader.ts";

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
