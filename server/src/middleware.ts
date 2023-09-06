import jwt from "jsonwebtoken";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!user/login|user/registry|_next/static|_next/image|favicon.ico).*)",
  ],
};

export function middleware(request: NextRequest) {
  // token 验证
  const token = request.headers.get("Authorization");

  if (!token || jwt.verify(token, process.env.NEXT_APP_JWT_SECRET || "")) {
    return new NextResponse(undefined, {
      status: 401,
      statusText: "invalid token",
      headers: { "content-type": "application/json" },
    });
  }

  return NextResponse.next({
    // 跨域处理
    headers: {
      "Access-Control-Allow-Origin": "https://orzpass.netlify.app",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
