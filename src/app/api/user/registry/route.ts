import { db } from '@/db'
import * as bcrypt from 'bcrypt'
import { NextResponse, type NextRequest } from 'next/server'

export async function POST(req: NextRequest) {
  const { username = '', password = '' } = await req.json()
  const users = await db.user.pages({ pageSize: 100 })

  if (users.length > 100) {
    return NextResponse.json({ msg: 'Too many users' }, { status: 400 })
  }

  const isExists = users.some((user) => user.username === username)
  if (isExists) {
    return NextResponse.json({ msg: `"${username}" Already exists` }, { status: 400 })
  }

  await db.user.create({ username, password: bcrypt.hashSync(password, 10) })

  return NextResponse.json({ msg: 'ok' })
}
