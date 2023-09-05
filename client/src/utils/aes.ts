import CryptoJS from 'crypto-js'

export const aes = {
  encode(data: string, key: string) {
    return CryptoJS.AES.encrypt(data, key).toString()
  },

  decode(data: string, key: string) {
    const bytes = CryptoJS.AES.decrypt(data, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  },
}
