import { Outlet, ScrollRestoration } from "react-router";
import AppHeader from "@components/app-header/app-header";
import AppFooter from "@components/app-footer/app-footer";
import { Toaster } from "../ui/sonner";

export default function App() {
  return (
    <div className="bg-background min-h-screen">
      <AppHeader />
      <ScrollRestoration />

      <div id="page-content min-h-screen">
        <Outlet />
      </div>

      <AppFooter />

      <Toaster richColors />
    </div>
  );
}
