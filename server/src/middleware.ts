import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // token 验证
  // const token = request.cookies.get("token")?.value;

  // if (!token) {
  //   return new NextResponse(
  //     JSON.stringify({ success: false, message: "authentication failed" }),
  //     { status: 401, headers: { "content-type": "application/json" } }
  //   );
  // }

  return NextResponse.next({
    // 跨域处理
    headers: {
      "Access-Control-Allow-Origin": "https://orzpass.netlify.app",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
