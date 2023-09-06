import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const token = request.headers.get("Authorization") || "";
  const decoded = jwt.decode(token);

  return new NextResponse(JSON.stringify(decoded));
}
