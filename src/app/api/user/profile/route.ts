import { SESSION_KEY } from '@/const/common'
import { User } from '@/types/user'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  // token 无法获取
  console.log('ccc', cookies().getAll())

  const token = cookies().get(SESSION_KEY)?.value || ''
  const user = jwt.decode(token) as Omit<User, 'password'>

  if (!user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 })
  }

  return NextResponse.json(user)
}
