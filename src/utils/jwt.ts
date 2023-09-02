'use server'

import CryptoJS from 'crypto-js'

type Content = {
  data: any
  expires: number
}

export async function JWTsign(data: any, options?: { expiresIn?: number }) {
  if (!process.env.NEXT_APP_JWT_SECRET) {
    throw new Error('jwt secret not found')
  }

  const content = JSON.stringify({ data, expires: Date.now() + (options?.expiresIn || 60 * 60 * 1000) })
  return CryptoJS.AES.encrypt(content, process.env.NEXT_APP_JWT_SECRET).toString()
}

export async function JWTverify(encrypted: string) {
  if (!process.env.NEXT_APP_JWT_SECRET) {
    throw new Error('jwt secret not found')
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, process.env.NEXT_APP_JWT_SECRET).toString(CryptoJS.enc.Utf8)
    const content: Content = JSON.parse(decrypted)
    return content.expires > Date.now()
  } catch (error) {
    console.error('verifyToken failed', error)
    return false
  }
}

export async function JWTdecode<T = any>(token: string) {
  if (!process.env.NEXT_APP_JWT_SECRET) {
    throw new Error('jwt secret not found')
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(token, process.env.NEXT_APP_JWT_SECRET).toString(CryptoJS.enc.Utf8)
    const content: Content = JSON.parse(decrypted)
    return content.data as T
  } catch (error) {
    console.error('decode token failed', error)
    throw new Error('decode token failed')
  }
}
