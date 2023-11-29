/**
 * @description 自定义 jwt
 * @description jsonwebtoken 和 jose 在 nextjs 中都存在问题
 */

import { TOKEN_KEY } from '@/enums'
import Crypto from 'crypto-js'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

const DEFAULT_EXP = 60 * 60 * 1000
const secret = process.env.NEXT_APP_JWT_SECRET || 'secret'

function sign(payload: any, exp = DEFAULT_EXP) {
  const content = JSON.stringify({
    payload,
    exp: Date.now() + Math.max(exp, 0),
  })

  return Crypto.AES.encrypt(content, secret).toString()
}

function verify(jwt: string) {
  try {
    const content = Crypto.AES.decrypt(jwt, secret).toString(Crypto.enc.Utf8)
    const { exp } = JSON.parse(content)
    return exp > Date.now()
  } catch (error) {
    console.error('jwt verify error', error)
    return false
  }
}

function decode<T = any>(jwt: string) {
  const content = Crypto.AES.decrypt(jwt, secret).toString(Crypto.enc.Utf8)
  const { payload } = JSON.parse(content)
  return payload as T
}

export const jwt = { sign, verify, decode }

export function checkAuth() {
  const token = headers().get(TOKEN_KEY) || ''

  if (!token || !jwt.verify(token)) {
    return NextResponse.json({ msg: 'invalid token' }, { status: 401 })
  }
}
