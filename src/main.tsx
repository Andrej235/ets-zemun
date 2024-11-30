import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Components/App/App.tsx";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import Home from "./Components/Home/Home.tsx";
import Info from "./Components/Info/Info.tsx";
import News from "./Components/News/News.tsx";
import Profiles from "./Components/Profiles/Profiles.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/info",
        element: <Info />,
      },
      {
        path: "/news",
        element: <News />,
      },
      {
        path: "/profiles",
        element: <Profiles />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
