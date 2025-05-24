import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Teachers from "@/components/teachers/teachers";
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
      default: t("teachers.title"),
      template: t("titleTemplate"),
    },
    description: t("teachers.description"),
    openGraph: {
      title: t("teachers.title"),
      description: t("teachers.description"),
      url: `${baseUrl}/${locale}/nastavnici`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("teachers.title"),
      description: t("teachers.description"),
    },
    alternates: generateAlternateUrls(locale, "nastavnici"),
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;

  const { isOk, response } = await sendApiRequestSSR("/teachers", {
    method: "get",
    parameters: {
      languageCode: locale === "srl" ? "sr_lt" : locale,
      limit: -1,
    },
  });

  if (!isOk) throw new Error("Failed to fetch teachers");

  return <Teachers teachers={response!.items} />;
}
