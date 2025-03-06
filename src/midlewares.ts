import { NextRequest, NextResponse } from "next/server";

export const config = {
  matcher: "/((?!_next|favicon.ico|public|.*\\..*).*)",
};

const publicPages = ["/", "/home", "/login"];

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (publicPages.includes(pathname)) {
    return NextResponse.next();
  }

  const session = req.cookies.get("session");
  if (!session) {

    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}
