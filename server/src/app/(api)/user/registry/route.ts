import { DataLabels, MAX_USER_COUNT } from '@/enums'
import { Issue, issueToUser } from '@/types/user.model'
import { http } from '@/utils/http'
import * as bcrypt from 'bcrypt'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { username, password } = await req.json()
  const { data } = await http.get<Issue[]>('/issues')
  const users = data.map((issue) => issueToUser(issue))

  if (users.length > MAX_USER_COUNT) {
    return NextResponse.json({ msg: 'Too many users' }, { status: 400 })
  }

  const isExists = users.some((user) => user.username === username)
  if (isExists) {
    return NextResponse.json({ msg: `"${username}" Already exists` }, { status: 400 })
  }

  await http.post('/issues', {
    title: username,
    body: JSON.stringify({ username, password: bcrypt.hashSync(password, 10) }),
    labels: [DataLabels.User],
  })

  return NextResponse.json({ msg: 'ok' })
}
