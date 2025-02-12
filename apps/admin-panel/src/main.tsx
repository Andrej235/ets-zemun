import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./app/app";
import "../../shared-frontend/index.scss";
import { createBrowserRouter, RouterProvider } from "react-router";
import ErrorComponent from "@components/error-component/error-component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorComponent />,
    children: [],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);

