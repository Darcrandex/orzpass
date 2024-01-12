import { TOKEN_KEY } from '@/const/common'
import { User } from '@/types/user'
import jwt from 'jsonwebtoken'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const user = jwt.decode(token) as Omit<User, 'password'>

  if (!user?.id) {
    return NextResponse.json({ error: '请先登录' }, { status: 401 })
  }

  return NextResponse.json(user)
}
