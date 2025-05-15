import { Outlet, ScrollRestoration } from "react-router";
import AppHeader from "@components/app-header/app-header";
import AppFooter from "@components/app-footer/app-footer";

export default function App() {
  return (
    <div className="bg-background min-h-screen">
      <AppHeader />
      <ScrollRestoration />

      <div id="page-content">
        <Outlet />
      </div>

      <AppFooter />
    </div>
  );
}
