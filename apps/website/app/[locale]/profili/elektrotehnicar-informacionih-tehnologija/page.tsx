import SingleProfileITPage from "@/components/single-profile-page/single-profile-it-page";
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
    title: t("it.title"),
    description: t("it.description"),
    openGraph: {
      title: t("it.title"),
      description: t("it.description"),
      url: `${baseUrl}/${locale}/elektrotehnicar-informacionih-tehnologija`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("it.title"),
      description: t("it.description"),
    },
    alternates: generateAlternateUrls(
      locale,
      "elektrotehnicar-informacionih-tehnologija",
    ),
  };
}

export default SingleProfileITPage;
