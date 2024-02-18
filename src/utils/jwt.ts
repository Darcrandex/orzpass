import { SignJWT, jwtVerify } from 'jose'
import { omit } from 'ramda'

export const jwt = {
  /**
   * @param {any} payload - 需要签名的数据
   * @param {string} secret - 签名的秘钥
   * @param {Object} [options] - 配置项
   * @param {string|number} [options.expiresIn] - 过期时间；如果是数字，则单位为秒
   * @return {Promise<string>} - 签名
   */
  async sign(payload: any, secret: string, options?: { expiresIn?: string }): Promise<string> {
    const iat = Math.floor(Date.now() / 1000)

    return new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setExpirationTime(options?.expiresIn ?? '1h')
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(secret))
  },

  async verify(token: string, secret: string) {
    try {
      const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))
      return Boolean(payload)
    } catch (error) {
      return false
    }
  },

  async decode<T = any>(token: string, secret: string) {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret))

    return omit(['iat', 'exp', 'nbf'], payload) as T
  },
}
