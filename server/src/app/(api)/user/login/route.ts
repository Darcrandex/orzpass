import { jwt } from '@/lib/auth'
import { Issue, issueToUser } from '@/types/user.model'
import { http } from '@/utils/http'
import * as bcrypt from 'bcrypt'
import { NextResponse, type NextRequest } from 'next/server'
import { pick } from 'ramda'

export async function POST(request: NextRequest) {
  const { username = '', password = '' } = await request.json()

  const { data } = await http.get<Issue[]>('/issues')
  const users = data.map((issue) => issueToUser(issue))

  const user = users.find((u) => u.username === username && bcrypt.compareSync(password, u.password))

  if (!user) {
    return NextResponse.json({ msg: 'invalid username or password' }, { status: 401 })
  }

  const token = jwt.sign(pick(['id', 'username'], user))
  return NextResponse.json({ data: token })
}
