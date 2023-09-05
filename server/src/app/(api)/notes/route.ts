import { NextResponse } from "next/server";

export async function GET() {
  const data = [{ id: "aa", title: "note aa" }];

  return NextResponse.json({ data });
}
