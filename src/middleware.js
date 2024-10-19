import { NextResponse } from "next/server";
import removeTokens from "@/src/utils/Backend/cookieDelete";

export function middleware(request) {
  const accessToken = request.cookies.get("AvaSanatToken")?.value;

  if (!request.nextUrl.pathname.startsWith("/login") && !accessToken) {
    removeTokens("AvaSanatToken");
    return NextResponse.redirect(new URL("/login", request.url));
  } else if (
    request.nextUrl.pathname.startsWith("/login") &&
    accessToken
  ) {
    return NextResponse.redirect(new URL("/dashboard/category", request.url));
  }
}

export const config = {
  matcher: ["/((?!api|admin|_next/static|_next/image|.*\\.png$).*)"],
};
