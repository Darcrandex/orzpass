import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { apiUserList } from './services/user'

export async function middleware(request: NextRequest) {
  // auth check
  if (!process.env.NEXT_APP_AUTH_KEY) {
    throw new Error('auth key not found')
  }

  const allUsers = await apiUserList()
  const authorization = request.cookies.get(process.env.NEXT_APP_AUTH_KEY)?.value
  const isValidUser = allUsers.some((user) => user.id === authorization)
  const response = NextResponse.next()

  if (isValidUser) {
    return response
  } else {
    return NextResponse.redirect(new URL('/sign', request.url))
  }
}

// 哪些路由会被进入校验中间件
export const config = {
  matcher: ['/notes/:path*'],
}
