import CryptoJS from 'crypto-js'

// 合并 className，别名
export { twMerge as cls } from 'tailwind-merge'

export function sleep(ms?: number) {
  return new Promise((resolve) => setTimeout(resolve, ms || 500))
}

/**
 * @description 在数值前面补 0
 * @param num - 数值
 * @param len - 整数部分总共需要显示的位数
 */
export function zeroFill(num: number, len = 2) {
  const currLen = String(Math.floor(num)).length
  const zeros = Array(Math.max(len - currLen, 0))
    .fill('0')
    .join('')
  return zeros + num
}

export const aes = {
  encrypt(content: string, key: string) {
    return CryptoJS.AES.encrypt(content, key).toString()
  },

  decrypt(encrypted: string, key: string) {
    return CryptoJS.AES.decrypt(encrypted, key).toString(CryptoJS.enc.Utf8)
  },
}
