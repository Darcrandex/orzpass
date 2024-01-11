import { User } from '@/types/user'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function GET() {
  const token = cookies().get('token')?.value || ''
  const user = jwt.decode(token) as Omit<User, 'password'>

  if (!user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 })
  }

  return NextResponse.json(user)
}
