import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse, type NextRequest } from "next/server";
import { omit } from "ramda";

const users = [
  {
    id: "abc",
    username: "admin",
    password: bcrypt.hashSync("123456", 10),
  },
];

export async function POST(request: NextRequest) {
  const { username = "", password = "" } = await request.json();

  const user = users.find(
    (u) => u.username === username && bcrypt.compareSync(password, u.password)
  );

  if (!user) {
    return NextResponse.json({ msg: "invalid username or password" });
  }

  const token = jwt.sign(omit(["password"], user), "secret", {
    expiresIn: "1h",
  });

  return NextResponse.json({ msg: "ok" }).headers.set("token", token);
}
