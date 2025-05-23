import "@/app/index.scss";
import AppHeader from "@/components/app-header/app-header";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import Script from "next/script";
import ErrorComponentContent from "./error-component-content";
import "./error-component.scss";

export default async function ErrorComponent() {
  const locale = await getLocale();
  const messages = await getMessages({ locale });

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <AppHeader />

      <div className="error-component-container">
        <ErrorComponentContent />

        <Script src="https://kit.fontawesome.com/053e158ed1.js"></Script>
      </div>
    </NextIntlClientProvider>
  );
}
