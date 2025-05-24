import AppHeader from "@/components/app-header/app-header";
import ErrorComponent from "@/components/error-component/error-component";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, setRequestLocale } from "next-intl/server";
import Script from "next/script";

export default async function NotFound() {
  const locale = await getLocale();
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <body>
        <div id="root">
          <NextIntlClientProvider locale={locale} messages={messages}>
            <AppHeader />

            <ErrorComponent />
          </NextIntlClientProvider>

          <Script src="https://kit.fontawesome.com/053e158ed1.js"></Script>
        </div>
      </body>
    </html>
  );
}
