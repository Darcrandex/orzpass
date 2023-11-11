/**
 * @description 自定义 jwt
 * @description jsonwebtoken 和 jose 在 nextjs 中都存在问题
 */

import jsonwebtoken from 'jsonwebtoken'

const DEFAULT_EXP = 60 * 60 * 1000
const secret = process.env.NEXT_APP_JWT_SECRET || 'secret'

function sign(payload: any, exp = DEFAULT_EXP) {
  // const content = JSON.stringify({
  //   payload,
  //   exp: Date.now() + Math.max(exp, 0),
  // })

  // return CryptoJS.AES.encrypt(content, secret).toString()
  return jsonwebtoken.sign(payload, secret)
}

function verify(jwt: string) {
  try {
    // const content = CryptoJS.AES.decrypt(jwt, secret).toString(CryptoJS.enc.Utf8)
    // const { exp } = JSON.parse(content)
    // return exp > Date.now()
    jsonwebtoken.verify(jwt, secret)
    return true
  } catch (error) {
    console.error('jwt verify error', error)
    return false
  }
}

function decode<T = any>(jwt: string) {
  // const content = CryptoJS.AES.decrypt(jwt, secret).toString(CryptoJS.enc.Utf8)
  // const { payload } = JSON.parse(content)
  // return payload as T

  const content = jsonwebtoken.decode(jwt)

  return content as T
}

export const jwt = { sign, verify, decode }
