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
  const { password, newPassword } = await request.json()

  // origin user info with password
  const issueRes = await http.get<Issue>(`/issues/${payload.id}`)
  const originUser = issueToUser(issueRes.data)

  if (!bcrypt.compareSync(password, originUser.password)) {
    return NextResponse.json(undefined, { status: 400, statusText: 'invalid password' })
  }

  originUser.password = bcrypt.hashSync(newPassword, 10)

  await http.patch<Issue>(`/issues/${payload.id}`, {
    body: JSON.stringify(originUser),
  })
  return NextResponse.json(undefined)
}
