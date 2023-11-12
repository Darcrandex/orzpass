import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
// import { TOKEN_KEY } from './enums'
// import { jwt } from './lib/auth'

export const config = {
  matcher: ['/((?!user/login|user/registry|_next/static|_next/image|favicon.ico).*)'],
}

export async function middleware(request: NextRequest) {
  // token 验证
  // const token = request.headers.get(TOKEN_KEY)
  // if (!token || !jwt.verify(token)) {
  //   return NextResponse.json({ msg: 'invalid token' }, { status: 401 })
  // }

  return NextResponse.next()
}
