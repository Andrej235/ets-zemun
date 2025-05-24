import ProfilesPage from "@/components/profiles-page/profiles-page";
import generateAlternateUrls from '@/lib/generate-alternate-urls';
import {Metadata} from 'next';
import {getTranslations} from 'next-intl/server';

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
      default: t("profiles.title"),
      template: t("titleTemplate"),
    },
    description: t("profiles.description"),
    openGraph: {
      title: t("profiles.title"),
      description: t("profiles.description"),
      url: `${baseUrl}/${locale}/profili`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("profiles.title"),
      description: t("profiles.description"),
    },
    alternates: generateAlternateUrls(locale, "profili"),
  };
}

export default ProfilesPage;
