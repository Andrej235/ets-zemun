import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const isAdminPath = !["/confirm-email", "/forbidden"].some((x) =>
    pathname.startsWith(x),
  );

  console.log("middleware", pathname, isAdminPath);

  if (isAdminPath) {
    try {
      const response = await sendApiRequestSSR("/users/admin-only", {
        method: "get",
      });

      if (response.isOk) return NextResponse.next();
      else return NextResponse.redirect(new URL("/forbidden", request.url));
    } catch (error) {
      console.error("Error verifying token:", error);
      return NextResponse.redirect(new URL("/forbidden", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
      Match all paths except:
      - /login
      - static files (/_next, /static, /favicon.ico, /robots.txt, /images, etc.)
    */
    "/((?!login|forbidden|_next/|static/|favicon.ico|robots.txt|images/).*)",
  ],
};
