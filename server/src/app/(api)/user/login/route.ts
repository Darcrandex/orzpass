import { Issue, issueToUser } from "@/types/user.model";
import { http } from "@/utils/http";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { omit } from "ramda";

export async function POST(request: NextRequest) {
  const { username = "", password = "" } = await request.json();

  const { data } = await http.get<Issue[]>("/issues");
  const users = data.map((issue) => issueToUser(issue));

  const user = users.find(
    (u) => u.username === username && bcrypt.compareSync(password, u.password)
  );

  if (!user) {
    return NextResponse.json({ msg: "invalid username or password" });
  }

  const token = jwt.sign(
    omit(["password"], user),
    process.env.NEXT_APP_JWT_SECRET || "",
    { expiresIn: "1h" }
  );

  return NextResponse.json(token);
}
