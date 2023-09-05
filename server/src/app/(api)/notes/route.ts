import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.cookies.get("token");

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  const data = [{ id, title: "note aa" }];

  return new NextResponse(JSON.stringify(data));
}
