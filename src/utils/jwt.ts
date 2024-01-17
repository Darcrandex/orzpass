import { SignJWT, jwtVerify } from 'jose'
import { omit } from 'ramda'

export const jwt = {
  /**
   * @param {any} payload - The payload to be signed.
   * @param {string} secret - The secret key used for signing.
   * @param {Object} [options] - Optional parameters for signing.
   * @param {string} [options.expiresIn] - The expiration time of the token. eg: '1h'
   * @return {Promise<string>} - The signed JWT.
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
