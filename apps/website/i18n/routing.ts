import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["srb", "lat", "eng"],
  defaultLocale: "srb",
  localeDetection: false,
  localePrefix: "always",
});
