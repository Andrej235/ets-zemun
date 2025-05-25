"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToSearchEntry() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const headerRef = document.getElementById("app-header") as HTMLDivElement;
    if (!headerRef) return;

    const searchKey = searchParams.get("searchKey");
    if (!searchKey) return;

    const element = document.querySelector(
      `[data-search-key="${searchKey}"]`
    ) as HTMLElement;
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const offset = rect.top + window.scrollY - headerRef.clientHeight;

    window.scrollTo({ top: offset, behavior: "smooth" });
  }, [searchParams]);

  return <></>;
}
