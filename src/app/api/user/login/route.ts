import { NEXT_APP_JWT_SECRET, OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { issueToUser } from '@/types/user'
import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'
import { omit } from 'ramda'

export async function POST(request: NextRequest) {
  const body = await request.json()

  const res = await db.rest.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
  })

  const users = res.data.map(issueToUser)
  const user = users.find((u) => u.username === body.username && compareSync(body.password, u.password))

  if (!user) {
    return NextResponse.json({ message: '用户名或密码错误' }, { status: 401 })
  }

  const token = jwt.sign(omit(['password'], user), NEXT_APP_JWT_SECRET, {
    expiresIn: '7d',
  })

  return NextResponse.json(token)
}
