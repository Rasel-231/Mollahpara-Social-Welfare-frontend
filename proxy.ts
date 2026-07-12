import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const token =
    request.cookies.get("accessToken")?.value ||
    request.cookies.get("token")?.value ||
    request.cookies.get("access-token")?.value;

  if (!token) {
    const loginUrl = new URL("/login", request.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export default proxy;

export const config = {
  matcher: ["/dashboard/:path*"],
};
