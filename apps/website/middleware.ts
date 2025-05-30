import { NextRequest, NextResponse } from "next/server";
import createMiddlewareClient from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/");
  const locale = segments[1];
  const pathname = "/" + segments.slice(2).join("/");
  const defaultLocale = routing.defaultLocale;
  const supportedLocales = routing.locales;

  if (!locale || !hasLocale(supportedLocales, locale))
    return NextResponse.redirect(
      new URL(`/${defaultLocale}/${segments.slice(2).join("/")}`, request.url)
    );

  const intlMiddleware = createMiddlewareClient({
    locales: supportedLocales,
    defaultLocale,
  });

  const response = intlMiddleware(request);
  const hreflangs = routing.locales.map((locale) => {
    const mappedLocale =
      locale === "srb"
        ? "sr-Cyrl"
        : locale === "lat"
          ? "sr-Latn"
          : locale === "eng"
            ? "en"
            : locale;

    return `<${process.env.NEXT_PUBLIC_WEBSITE_URL}/${locale}${pathname}>; rel="alternate"; hreflang="${mappedLocale}"`;
  });

  hreflangs.push(
    `<${process.env.NEXT_PUBLIC_WEBSITE_URL}/srb${pathname}>; rel="alternate"; hreflang="x-default"`
  );

  response.headers.set("Link", hreflangs.join(", "));
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..+).*)"],
};
