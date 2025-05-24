import SingleProfileElectricalAutomaticsPage from "@/components/single-profile-page/single-profile-electrical-automatics-page";
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
    title: t("auto.title"),
    description: t("auto.description"),
    openGraph: {
      title: t("auto.title"),
      description: t("auto.description"),
      url: `${baseUrl}/${locale}/elektrotehnicar-automatike`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("auto.title"),
      description: t("auto.description"),
    },
    alternates: generateAlternateUrls(locale, "elektrotehnicar-automatike"),
  };
}

export default SingleProfileElectricalAutomaticsPage;
