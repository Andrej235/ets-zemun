"use client";
import dynamic from "next/dynamic";

const ThemeSelector = dynamic(() => import("./theme-selector"), { ssr: false });
export default ThemeSelector;
