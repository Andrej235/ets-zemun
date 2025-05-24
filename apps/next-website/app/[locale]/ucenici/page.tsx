import Students from "@/components/students/students";
import { Suspense } from "react";
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
      default: t("students.title"),
      template: t("titleTemplate"),
    },
    description: t("students.description"),
    openGraph: {
      title: t("students.title"),
      description: t("students.description"),
      url: `${baseUrl}/${locale}/ucenici`,
      siteName: t("siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("students.title"),
      description: t("students.description"),
    },
    alternates: generateAlternateUrls(locale, "ucenici"),
  };
}

export default function Page() {
  return (
    <Suspense>
      <Students />
    </Suspense>
  );
}
