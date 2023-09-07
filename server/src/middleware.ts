import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { TOKEN_KEY } from './enums'
import { jwt } from './lib/auth'

export const config = {
  matcher: ['/((?!user/login|user/registry|_next/static|_next/image|favicon.ico).*)'],
}

export async function middleware(request: NextRequest) {
  // token 验证
  const token = request.headers.get(TOKEN_KEY)
  if (!token || !jwt.verify(token)) {
    return new NextResponse(undefined, {
      status: 401,
      statusText: 'invalid token',
    })
  }

  return NextResponse.next({
    // 跨域处理
    headers: {
      'Access-Control-Allow-Origin': process.env.NODE_ENV === 'production' ? process.env.NEXT_APP_CLIENT_ORIGIN || '*' : '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS, PATCH',
      'Access-Control-Allow-Headers': `Content-Type, ${TOKEN_KEY}`,
    },
  })
}
