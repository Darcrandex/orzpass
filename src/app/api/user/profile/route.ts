import { OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { issueToUser } from '@/types/user'
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
