import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { NEXT_APP_JWT_SECRET, TOKEN_KEY } from './const/common'
import { jwt } from './utils/jwt'

export async function middleware(request: NextRequest) {
  // 校验 token
  if (/^\/api(?!\/user\/(login|registry))/.test(request.nextUrl.pathname)) {
    const token = request.headers.get(TOKEN_KEY) || ''
    const isValid = await jwt.verify(token, NEXT_APP_JWT_SECRET)
    if (!isValid) {
      return NextResponse.json({ message: 'unauthorized' }, { status: 401 })
    }
  }

  return NextResponse.next()
}
