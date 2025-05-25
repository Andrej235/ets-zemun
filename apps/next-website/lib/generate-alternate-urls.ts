import { Metadata } from "next";

export default function generateAlternateUrls(
  locale: string,
  extension: string,
): Metadata["alternates"] {
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;
  const otherLanguages: Record<string, string> = {
    sr: `${baseUrl}/sr/${extension}`,
    "sr-Latn": `${baseUrl}/srl/${extension}`,
    en: `${baseUrl}/en/${extension}`,
  };
  delete otherLanguages[locale === "srl" ? "sr-Latn" : locale];

  return {
    canonical: `${baseUrl}/${locale}/${extension}`,
    languages: otherLanguages,
  };
}
