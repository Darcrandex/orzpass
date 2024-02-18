import { OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { UpdateUserDto, issueToUser } from '@/types/user'
import { getUserFormToken } from '@/utils/getUserFromToken'
import { NextRequest, NextResponse } from 'next/server'
import { omit } from 'ramda'

export async function GET(request: NextRequest) {
  const userFromToken = await getUserFormToken(request)

  const res = await db.rest.issues.get({
    owner: OWNER,
    repo: REPO,
    issue_number: Number.parseInt(userFromToken.id),
  })

  const user = issueToUser(res.data)
  return NextResponse.json(omit(['password'], user))
}

export async function PATCH(request: NextRequest) {
  const { id: userId } = await getUserFormToken(request)
  const body: UpdateUserDto = await request.json()

  const res = await db.rest.issues.listForRepo({
    owner: OWNER,
    repo: REPO,
  })

  const users = res.data.map(issueToUser)

  const res1 = await db.rest.issues.get({
    owner: OWNER,
    repo: REPO,
    issue_number: Number.parseInt(userId),
  })

  const user = issueToUser(res1.data)

  if (users.some((u) => u.username === body.username && u.id !== user.id)) {
    return NextResponse.json({ message: 'username already exists' }, { status: 400 })
  }

  const res2 = await db.rest.issues.update({
    owner: OWNER,
    repo: REPO,
    issue_number: Number.parseInt(userId),
    title: body.username || user.username,
    body: JSON.stringify({ ...user, ...body }),
  })

  const updated = issueToUser(res2.data)

  return NextResponse.json({ id: String(updated.id) })
}
