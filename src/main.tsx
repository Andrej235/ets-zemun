import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router";

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
        element: <div>Obrazovni profili</div>,
      },
      {
        path: "/ucenici",
        element: <div>Ucenici</div>,
      },
      {
        path: "/novosti",
        element: <div>Novosti</div>,
      },
      {
        path: "/dokumenta",
        element: <div>Dokumenta</div>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
