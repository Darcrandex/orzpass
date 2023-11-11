import { db } from '@/db'
import { UserModel } from '@/db/models/user.model'
import { getUserFromToken } from '@/utils/getUserFromToken'
import { NextResponse, type NextRequest } from 'next/server'
import { omit } from 'ramda'

// user info
export async function GET(request: NextRequest) {
  const u = getUserFromToken(request)
  const user = await db.user.getById(u.id)
  return NextResponse.json({ data: omit(['password'], user) })
}

// update user info
export async function PATCH(request: NextRequest) {
  const u = getUserFromToken(request)
  const updated = (await request.json()) as UserModel
  await db.user.update(u.id, updated)
  const userInfo = await db.user.getById(u.id)

  return NextResponse.json({ data: userInfo })
}
