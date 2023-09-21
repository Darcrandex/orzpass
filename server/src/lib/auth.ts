/**
 * @description 自定义 jwt
 * @description jsonwebtoken 和 jose 在 nextjs 中都存在问题
 */

import CryptoJS from 'crypto-js'

const DEFAULT_EXP = 60 * 1000
const secret = process.env.NEXT_APP_JWT_SECRET || 'secret'

function sign(payload: any, exp = DEFAULT_EXP) {
  const content = JSON.stringify({
    payload,
    exp: Date.now() + Math.max(exp, 0),
  })

  return CryptoJS.AES.encrypt(content, secret).toString()
}

function verify(jwt: string) {
  try {
    const content = CryptoJS.AES.decrypt(jwt, secret).toString(CryptoJS.enc.Utf8)
    const { exp } = JSON.parse(content)
    return exp > Date.now()
  } catch (error) {
    console.error('jwt verify error', error)
    return false
  }
}

function decode<T = any>(jwt: string) {
  if (!verify(jwt)) {
    throw new Error('invalid token')
  }

  const content = CryptoJS.AES.decrypt(jwt, secret).toString(CryptoJS.enc.Utf8)
  const { payload } = JSON.parse(content)
  return payload as T
}

export const jwt = { sign, verify, decode }
