import SingleProfileElectricalDevicesPage from "@/components/single-profile-page/single-profile-electrical-devices-page";
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
    title: t("ac.title"),
    description: t("ac.description"),
    openGraph: {
      title: t("ac.title"),
      description: t("ac.description"),
      url: `${baseUrl}/${locale}/elektromehanicar-za-rashladne-i-termicke-uredjaje`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("ac.title"),
      description: t("ac.description"),
    },
    alternates: generateAlternateUrls(
      locale,
      "elektromehanicar-za-rashladne-i-termicke-uredjaje",
    ),
  };
}

export default SingleProfileElectricalDevicesPage;
