import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Awards from "@/components/awards/awards";
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
    title: t("awards.title"),
    description: t("awards.description"),
    openGraph: {
      title: t("awards.title"),
      description: t("awards.description"),
      url: `${baseUrl}/${locale}/takmicenja`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("awards.title"),
      description: t("awards.description"),
    },
    alternates: generateAlternateUrls(locale, "takmicenja"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  const { isOk, response } = await sendApiRequestSSR("/awards", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
      limit: -1,
    },
  });

  if (!isOk) throw new Error("Failed to fetch awards");

  return <Awards awards={response!.items} />;
}
