import { db } from '@/db'
import * as bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { NextResponse, type NextRequest } from 'next/server'
import { pick } from 'ramda'

export async function POST(request: NextRequest) {
  const { username = '', password = '' } = await request.json()
  const users = await db.user.pages({ pageSize: 100 })

  const user = users.find((u) => u.username === username && bcrypt.compareSync(password, u.password))

  if (!user) {
    return NextResponse.json({ msg: 'invalid username or password' }, { status: 401 })
  }

  const token = jwt.sign(pick(['id', 'username'], user), process.env.NEXT_APP_JWT_SECRET || 'secret')

  return NextResponse.json({ token })
}
