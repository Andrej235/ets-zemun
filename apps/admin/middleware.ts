import sendApiRequestSSR from "@/api-dsl/send-api-request-ssr";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const response = await sendApiRequestSSR("/users/perms-only", {
      method: "get",
    });

    if (response.isOk) return NextResponse.next();
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
      - /login
      - /forbidden
      - /confirm-email
      - static files (/_next, /static, /favicon.ico, /robots.txt, /images, etc.)
    */
    "/((?!login|confirm-email|_next/|static/|favicon.ico|robots.txt|images/).*)",
  ],
};
