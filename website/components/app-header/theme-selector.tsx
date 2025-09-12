"use client";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import Icon from "../icon/icon";

export default function ThemeSelector() {
  const t = useTranslations("header");
  const { setTheme, theme } = useTheme();

  return (
    <button
      className="theme-button"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <Icon name={theme === "light" ? "lightbulb" : "moon"} />
      <p className="sr-only">{theme + " " + t("theme")}</p>
    </button>
  );
}
