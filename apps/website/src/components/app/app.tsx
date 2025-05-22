import AppFooter from "@/components/app-footer/app-footer";
import AppHeader from "@/components/app-header/app-header";
import Scroller from "@/components/scroller/scroller";
import { Analytics } from "@vercel/analytics/react";
import { useEffect, useRef } from "react";
import { Outlet, ScrollRestoration, useSearchParams } from "react-router";
import "./app.scss";

function App() {
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const searchKey = searchParams.get("searchKey");
    if (!searchKey) return;

    const element = document.querySelector(
      `[data-search-key="${searchKey}"]`,
    ) as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerRef.current!.clientHeight;

    window.scrollTo({ top: offset, behavior: "smooth" });
  }, [searchParams]);

  const headerRef = useRef<HTMLDivElement>(null);

  return (
    <div id="app">
      <ScrollRestoration />

      <AppHeader ref={headerRef} />

      <div id="page-content">
        <Outlet />
      </div>

      <Scroller />

      <AppFooter />

      <Analytics />
    </div>
  );
}

export default App;
