import { NEXT_APP_JWT_SECRET, OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { issueToUser } from '@/types/user'
import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { omit } from 'ramda'

export async function POST(request: Request) {
  const body = await request.json()

  const res = await db.rest.issues.list({
    owner: OWNER,
    repo: REPO,
  })

  const users = res.data.map(issueToUser)
  const user = users.find((u) => u.username === body.username && compareSync(body.password, u.password))

  // issue数据获取有点问题
  console.log('login ', { res })

  if (!user) {
    return NextResponse.json({ message: '用户名或密码错误' }, { status: 401 })
  }

  cookies().set(
    'token',
    jwt.sign(omit(['password'], user), NEXT_APP_JWT_SECRET, {
      expiresIn: '7d',
    })
  )

  return NextResponse.json({ message: 'ok' })
}
