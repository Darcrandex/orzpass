import { TOKEN_KEY } from '@/enums'
import { jwt } from '@/lib/auth'
import { Issue, User, issueToUser } from '@/types/user.model'
import { http } from '@/utils/http'
import { NextResponse, type NextRequest } from 'next/server'
import { omit } from 'ramda'

// user info
export async function GET(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)
  const res = await http.get<Issue>(`/issues/${payload.id}`)
  const user = issueToUser(res.data)

  return NextResponse.json({ data: omit(['password'], user) })
}

// update user info
export async function PATCH(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)
  const userInfo = omit(['password'], await request.json()) as Omit<User, 'password'>

  // origin user info with password
  const issueRes = await http.get<Issue>(`/issues/${payload.id}`)
  const originUser = issueToUser(issueRes.data)

  await http.patch<Issue>(`/issues/${payload.id}`, {
    title: userInfo.username,
    body: JSON.stringify({ ...originUser, ...userInfo }),
  })
  return NextResponse.json({ data: userInfo })
}
