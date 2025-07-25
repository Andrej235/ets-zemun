import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import News from "@/components/news/news";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import localeToLangCode from "@/lib/locale-to-lang-code";

export const revalidate = 172800; // 48 hours

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

export default async function NewsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const { isOk, response } = await sendApiRequestSSR("/news", {
    method: "get",
    parameters: {
      languageCode: localeToLangCode(locale),
      limit: -1,
    },
  });

  if (!isOk) throw new Error("Failed to fetch news");

  return <News news={response?.items ?? []} />;
}
