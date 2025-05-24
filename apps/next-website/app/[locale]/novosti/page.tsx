import News from "@/components/news/news";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";

export const revalidate = 10800; // 3 hours

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return {
    title: t("news.title"),
    description: t("news.description"),
    openGraph: {
      title: t("news.title"),
      description: t("news.description"),
      url: `${baseUrl}/${locale}/novosti`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("news.title"),
      description: t("news.description"),
    },
    alternates: generateAlternateUrls(locale, "novosti"),
  };
}

export default News;
