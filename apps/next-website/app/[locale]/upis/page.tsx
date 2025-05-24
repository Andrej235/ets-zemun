import Enrollment from "@/components/enrollment/enrollment";
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
      default: t("enrollment.title"),
      template: t("titleTemplate"),
    },
    description: t("enrollment.description"),
    openGraph: {
      title: t("enrollment.title"),
      description: t("enrollment.description"),
      url: `${baseUrl}/${locale}/upis`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("enrollment.title"),
      description: t("enrollment.description"),
    },
    alternates: generateAlternateUrls(locale, "upis"),
  };
}

export default Enrollment;
