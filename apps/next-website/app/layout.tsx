import AppFooter from "@/components/app-footer/app-footer";
import AppHeader from "@/components/app-header/app-header";
import Scroller from "@/components/scroller/scroller";
import generateAlternateUrls from "@/lib/generate-alternate-urls";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import Script from "next/script";
import "./index.scss";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();

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

export async function generateStaticParams() {
  return [
    {
      locale: "sr",
    },
    {
      locale: "srl",
    },
    {
      locale: "en",
    },
  ];
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div id="root">
            <AppHeader />

            <div id="page-content">{children} </div>

            <Scroller />

            <AppFooter />
          </div>
        </NextIntlClientProvider>

        <Script src="https://kit.fontawesome.com/053e158ed1.js"></Script>
      </body>
    </html>
  );
}
