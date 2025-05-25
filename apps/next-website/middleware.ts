import { NextRequest, NextResponse } from "next/server";
import createMiddlewareClient from "next-intl/middleware";
import { hasLocale } from "next-intl";
import { routing } from "./i18n/routing";

export async function middleware(request: NextRequest) {
  const segments = request.nextUrl.pathname.split("/");
  const locale = segments[1];
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

  return intlMiddleware(request);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\..+).*)"],
};
