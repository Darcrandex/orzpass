import CryptoJS from 'crypto-js'

type Content = {
  data: any
  expires: number
}

export function signToken(data: any, options?: { expiresIn?: number }) {
  if (!process.env.NEXT_APP_JWT_SECRET) {
    throw new Error('jwt secret not found')
  }

  const content = JSON.stringify({ data, expires: Date.now() + (options?.expiresIn || 60 * 60 * 1000) })
  return CryptoJS.AES.encrypt(content, process.env.NEXT_APP_JWT_SECRET).toString()
}

export function verifyToken(encrypted: string) {
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
