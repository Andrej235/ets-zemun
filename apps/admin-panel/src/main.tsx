import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "../../shared-frontend/index.scss";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

