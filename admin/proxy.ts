import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const loggedOutOnly =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/confirm-email" ||
    request.nextUrl.pathname === "/reset-password";

  try {
    const { isOk: isLoggedIn } = await sendApiRequestSSR("/users/perms-only", {
      method: "get",
    });

    if (loggedOutOnly) {
      if (isLoggedIn) return NextResponse.redirect(new URL("/", request.url));
      else return NextResponse.next();
    }

    if (isLoggedIn) return NextResponse.next();
    else return NextResponse.redirect(new URL("/login", request.url));
  } catch (error) {
    console.error("Error verifying token:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: [
    /*
      Match all paths except:
      - static files (/_next, /static, /favicon.ico, /robots.txt, /images, etc.)
    */
    "/((?!_next/|static/|favicon.ico|robots.txt|images/).*)",
  ],
};
