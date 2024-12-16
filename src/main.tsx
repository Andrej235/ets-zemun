import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.scss";
import "overlayscrollbars/overlayscrollbars.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import ProfilesPage from "./Components/ProfilesPage/ProfilesPage.tsx";
import Students from "./Components/Students/Students.tsx";
import News from "./Components/News/News.tsx";
import Documents from "./Components/Documents/Documents.tsx";
import About from "./Components/About/About.tsx";
import SingleProfilePage from "./Components/SingleProfilePage/SingleProfilePage.tsx";
import SingleProfilePageLoader from "./Components/SingleProfilePage/SingleProfilePageLoader.ts";
import ClassPage from "./Components/ClassPage/ClassPage.tsx";
import classPageLoader from "./Components/ClassPage/ClassPageLoader.ts";

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
  </React.StrictMode>
);
