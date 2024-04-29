import { NEXT_MAX_USER_COUNT, OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { CreateUserDto, issueToUser } from '@/types/user'
import { hashSync } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

// 注册新用户
export async function POST(request: NextRequest) {
  const body: CreateUserDto = await request.json()

  const res = await db.rest.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
  })
  const users = res.data.map(issueToUser)
  const user = users.find((u) => u.username === body.username)

  if (user) {
    return NextResponse.json({ message: 'username already exists' }, { status: 400 })
  }

  if (users.length > NEXT_MAX_USER_COUNT) {
    return NextResponse.json({ message: 'Too many users' }, { status: 400 })
  }

  const created = await db.rest.issues.create({
    owner: OWNER,
    repo: REPO,
    title: body.username,
    body: JSON.stringify({
      ...body,
      password: hashSync(body.password),
    }),
  })

  return NextResponse.json({ id: String(created.data.number) })
}
