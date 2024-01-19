import { OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { UpdatePasswordDto, issueToUser } from '@/types/user'
import { getUserFormToken } from '@/utils/getUserFromToken'
import { compareSync, hashSync } from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

// 更新用户密码
export async function PATCH(request: NextRequest) {
  const { id: userId } = await getUserFormToken(request)
  const body = (await request.json()) as UpdatePasswordDto

  const res = await db.rest.issues.get({
    owner: OWNER,
    repo: REPO,
    issue_number: Number.parseInt(userId),
  })

  const user = issueToUser(res.data)

  if (compareSync(body.oldPassword, user.password)) {
    return NextResponse.json({ message: 'Forbidden' }, { status: 403 })
  }

  const updated = await db.rest.issues.update({
    owner: OWNER,
    repo: REPO,
    issue_number: Number.parseInt(userId),
    body: JSON.stringify({ ...user, password: hashSync(body.newPassword) }),
  })

  return NextResponse.json({})
}
