import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import Students from "@/components/students/students";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import localeToLangCode from "@/lib/locale-to-lang-code";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Suspense } from "react";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  const t = await getTranslations({ locale, namespace: "metadata" });
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return {
    title: t("students.title"),
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

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = (await params).locale;
  const { response: exams } = await sendApiRequestSSR("/exams", {
    method: "get",
    parameters: {
      languageCode: localeToLangCode(locale),
    },
  });

  const { response: examTitle } = await sendApiRequestSSR("/captions/{id}", {
    method: "get",
    parameters: {
      id: 1,
      languageCode: localeToLangCode(locale),
    },
  });

  return (
    <Suspense>
      <Students exams={exams ?? []} examTitle={examTitle?.title ?? ""} />
    </Suspense>
  );
}
