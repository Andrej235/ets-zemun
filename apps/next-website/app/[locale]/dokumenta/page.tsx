import Documents from "@/components/documents/documents";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return {
    title: {
      default: t("documents.title"),
      template: t("titleTemplate"),
    },
    description: t("documents.description"),
    openGraph: {
      title: t("documents.title"),
      description: t("documents.description"),
      url: `${baseUrl}/${locale}/dokumenta`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("documents.title"),
      description: t("documents.description"),
    },
    alternates: generateAlternateUrls(locale, "dokumenta"),
  };
}

export default Documents;
