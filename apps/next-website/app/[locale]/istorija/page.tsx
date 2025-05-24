import HistoryPage from "@/components/history/history-page";
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
    title: t("history.title"),
    description: t("history.description"),
    openGraph: {
      title: t("history.title"),
      description: t("history.description"),
      url: `${baseUrl}/${locale}/istorija`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("history.title"),
      description: t("history.description"),
    },
    alternates: generateAlternateUrls(locale, "istorija"),
  };
}

export default HistoryPage;
