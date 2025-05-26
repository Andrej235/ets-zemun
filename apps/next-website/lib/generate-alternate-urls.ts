import { Metadata } from "next";

export default function generateAlternateUrls(
  locale: string,
  extension: string
): Metadata["alternates"] {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const otherLanguages: Record<string, string> = {
    sr: `${baseUrl}/srb/${extension}`,
    "sr-Latn": `${baseUrl}/lat/${extension}`,
    en: `${baseUrl}/eng/${extension}`,
  };
  delete otherLanguages[locale === "lat" ? "sr-Latn" : locale];

  return {
    canonical: `${baseUrl}/${locale}/${extension}`,
    languages: otherLanguages,
  };
}
