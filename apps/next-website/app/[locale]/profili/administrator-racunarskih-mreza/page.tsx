import SingleProfileNetworkAdminPage from "@/components/single-profile-page/single-profile-administrator-page";
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
    title: t("admin.title"),
    description: t("admin.description"),
    openGraph: {
      title: t("admin.title"),
      description: t("admin.description"),
      url: `${baseUrl}/${locale}/administrator-racunarskih-mreza`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("admin.title"),
      description: t("admin.description"),
    },
    alternates: generateAlternateUrls(
      locale,
      "administrator-racunarskih-mreza"
    ),
  };
}

export default SingleProfileNetworkAdminPage;
