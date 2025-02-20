import { Outlet, ScrollRestoration } from "react-router";
import "./app.scss";
import "./app.css";
import AppHeader from "@components/app-header/app-header";
import AppFooter from "@components/app-footer/app-footer";

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

