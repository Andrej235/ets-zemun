import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import Profiles from "./Components/Profiles/Profiles.tsx";
import Students from "./Components/Students/Students.tsx";
import News from "./Components/News/News.tsx";
import Documents from "./Components/Documents/Documents.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <div>O nama</div>,
      },
      {
        path: "/profili",
        element: <Profiles />,
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
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
