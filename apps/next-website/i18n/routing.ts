import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["sr", "srl", "en"],
  defaultLocale: "sr",
  localeDetection: false,
  localePrefix: "always",
});
