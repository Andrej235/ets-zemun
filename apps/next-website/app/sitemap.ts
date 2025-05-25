import { routing } from "@/i18n/routing";
import type { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const staticRoutes = [
    "/",
    "/dokumenta",
    "/istorija",
    "/nastavnici",
    "/novosti",
    "/profili",
    "/profili/administrator-racunarskih-mreza",
    "/profili/elektromehanicar-za-rashladne-i-termicke-uredjaje",
    "/profili/elektrotehnicar-automatike",
    "/profili/elektrotehnicar-informacionih-tehnologija",
    "/profili/elektrotehnicar-racunara",
    "/takmicenja",
    "/ucenici",
    "/upis",
  ];

  const allRoutes: MetadataRoute.Sitemap = staticRoutes.map((route) => {
    const defaultPath = `${baseUrl}/${routing.defaultLocale}${
      route === "/" ? "" : route
    }`;

    const otherLanguages: Record<string, string> = {
      "sr-Latn": `${baseUrl}/srl${route}`,
      en: `${baseUrl}/en${route}`,
    };

    return {
      url: defaultPath,
      changeFrequency: "weekly",
      alternates: {
        languages: otherLanguages,
      },
    } satisfies MetadataRoute.Sitemap[number];
  });

  return allRoutes;
}
