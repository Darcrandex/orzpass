'use server'
import { verifyToken } from '@/utils/jwt'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // auth check
  if (!process.env.NEXT_APP_AUTH_KEY) {
    throw new Error('auth key not found')
  }

  const response = NextResponse.next()
  const token = request.cookies.get(process.env.NEXT_APP_AUTH_KEY)?.value || ''

  if (verifyToken(token)) {
    return response
  } else {
    return NextResponse.redirect(new URL('/sign', request.url))
  }
}

// 哪些路由会被进入校验中间件
export const config = {
  matcher: ['/notes/:path*'],
}
