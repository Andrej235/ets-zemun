import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./components/app/app";
import "./index.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorComponent from "@components/error-component/error-component";
import About from "@components/about/about";
import News from "@components/news/news";

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
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

