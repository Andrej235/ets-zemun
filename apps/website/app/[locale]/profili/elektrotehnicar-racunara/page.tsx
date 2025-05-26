import SingleProfileElectricalEngineerPage from "@/components/single-profile-page/single-profile-electrical-engineer-page";
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
    title: t("pc.title"),
    description: t("pc.description"),
    openGraph: {
      title: t("pc.title"),
      description: t("pc.description"),
      url: `${baseUrl}/${locale}/elektrotehnicar-racunara`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("pc.title"),
      description: t("pc.description"),
    },
    alternates: generateAlternateUrls(locale, "elektrotehnicar-racunara"),
  };
}

export default SingleProfileElectricalEngineerPage;
