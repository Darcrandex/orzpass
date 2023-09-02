import CryptoJS from 'crypto-js'

function encrypt<T = any>(data: T) {
  if (!process.env.NEXT_APP_CLIENT_SECRET) {
    throw new Error('client secret not found')
  }

  const content = JSON.stringify({ data })
  return CryptoJS.AES.encrypt(content, process.env.NEXT_APP_CLIENT_SECRET).toString()
}

function decrypt<T>(encrypted: string) {
  if (!process.env.NEXT_APP_CLIENT_SECRET) {
    throw new Error('client secret not found')
  }

  try {
    const decrypted = CryptoJS.AES.decrypt(encrypted, process.env.NEXT_APP_CLIENT_SECRET).toString(CryptoJS.enc.Utf8)
    const content = JSON.parse(decrypted)
    return content.data as T
  } catch (error) {
    console.error(error)
    return undefined
  }
}

export const clientAES = { encrypt, decrypt }
