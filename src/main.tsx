import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.scss";
import "overlayscrollbars/overlayscrollbars.css";
import { createBrowserRouter, RouterProvider } from "react-router";
import About from "./Components/About/About.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <About />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
