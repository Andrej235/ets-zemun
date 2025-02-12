import { Outlet, ScrollRestoration } from "react-router";
import AppFooter from "../../../website/src/components/app-footer/app-footer";
import "./app.scss";
import AppHeader from "@components/app-header/app-header";

export default function App() {
  return (
    <div id="app">
      <AppHeader />
      <ScrollRestoration />

      <div id="page-content">
        <Outlet />
      </div>

      <AppFooter />
    </div>
  );
}

