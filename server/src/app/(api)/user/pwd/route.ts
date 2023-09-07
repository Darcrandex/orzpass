import { TOKEN_KEY } from '@/enums'
import { jwt } from '@/lib/auth'
import { Issue, User, issueToUser } from '@/types/user.model'
import { http } from '@/utils/http'
import * as bcrypt from 'bcrypt'
import { NextResponse, type NextRequest } from 'next/server'

// update user password only
export async function PATCH(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)

  const { oldPassword, password } = await request.json()

  // origin user info with password
  const issueRes = await http.get<Issue>(`/issues/${payload.id}`)
  const originUser = issueToUser(issueRes.data)

  if (!bcrypt.compareSync(oldPassword, originUser.password) || !password) {
    return NextResponse.json(null, { status: 400, statusText: 'invalid password' })
  }

  await http.patch<Issue>(`/issues/${payload.id}`, {
    body: JSON.stringify({ ...originUser, password: bcrypt.hashSync(password, 10) }),
  })
  return NextResponse.json(null)
}
