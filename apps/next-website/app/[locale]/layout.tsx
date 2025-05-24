import AppFooter from "@/components/app-footer/app-footer";
import AppHeader from "@/components/app-header/app-header";
import Scroller from "@/components/scroller/scroller";
import { routing } from "@/i18n/routing";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  setRequestLocale,
} from "next-intl/server";
import Script from "next/script";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const locale = (await params).locale;

  const t = await getTranslations({ locale });
  const baseUrl = process.env.NEXT_PUBLIC_WEBSITE_URL;

  return {
    title: {
      default: t("metadata.root.title"),
      template: t("metadata.titleTemplate"),
    },
    description: t("metadata.root.description"),
    openGraph: {
      title: t("metadata.root.title"),
      description: t("metadata.root.description"),
      url: `${baseUrl}/${locale}`,
      siteName: t("metadata.siteName"),
      locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("metadata.root.title"),
      description: t("metadata.root.description"),
    },
    alternates: generateAlternateUrls(locale, ""),
  };
}

export const dynamic = "force-static";
export const revalidate = 86400; // 24 hours
export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const locale = (await params).locale;
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppHeader />

            <div id="page-content">{children} </div>

            <Scroller />

            <AppFooter />
          </NextIntlClientProvider>
        </div>

        <Script src="https://kit.fontawesome.com/053e158ed1.js"></Script>
      </body>
    </html>
  );
}
