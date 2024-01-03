import { TOKEN_KEY } from '@/enums'
import { jwt } from '@/lib/auth'
import { Issue, User, issueToUser } from '@/types/user.model'
import { http } from '@/utils/http'
import { compareSync, hashSync } from 'bcryptjs'
import { NextResponse, type NextRequest } from 'next/server'

// update user password only
export async function PATCH(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)

  const { oldPassword, password } = await request.json()

  // origin user info with password
  const issueRes = await http.get<Issue>(`/issues/${payload.id}`)
  const originUser = issueToUser(issueRes.data)

  if (!compareSync(oldPassword, originUser.password) || !password) {
    return NextResponse.json({ msg: 'invalid password' }, { status: 400 })
  }

  await http.patch<Issue>(`/issues/${payload.id}`, {
    body: JSON.stringify({ ...originUser, password: hashSync(password, 10) }),
  })
  return NextResponse.json({ msg: 'ok' })
}
