import { jwt } from '@/lib/auth'
import { Issue, User, issueToUser } from '@/types/user.model'
import { http } from '@/utils/http'
import { NextResponse, type NextRequest } from 'next/server'
import { omit } from 'ramda'

export async function GET(request: NextRequest) {
  const token = request.headers.get('Authorization') || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)
  const res = await http.get<Issue>(`/issues/${payload.id}`)
  const user = issueToUser(res.data)

  return NextResponse.json(omit(['password'], user))
}
