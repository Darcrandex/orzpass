type RandomStrOptions = {
  length?: number
  includeNumber?: boolean
  includeLower?: boolean
  includeUpper?: boolean
  includeSymbol?: boolean
  noSimilar?: boolean
  startWithLetter?: boolean
  noDuplicate?: boolean
  noSequential?: boolean
}

/**
 * @description 生成随机字符串
 * @param {RandomStrOptions} [options]
 * @returns {string}
 */
export function randomStr({
  length = 8,
  includeNumber = true, // 包含数字
  includeLower = true, // 包含小写字母
  includeUpper = true, // 包含大写字母
  includeSymbol = false, // 包含符号
  noSimilar = false, // 去除相似容易混淆的字符，1iIl0oO
  startWithLetter = false, // 必须以字母开头
  noDuplicate = false, // 字符不重复
  noSequential = false, // 字符不连续 123 abc
}: RandomStrOptions = {}): string {
  const len = Math.min(50, Math.max(0, length))
  const n = '0123456789'
  const low = 'abcdefghijklmnopqrstuvwxyz'
  const up = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const sym = '~!@#$%^&*()_+{}:"<>?`-=[];\',./\\|'

  let charset = ''
  if (includeNumber) charset += n
  if (includeLower) charset += low
  if (includeUpper) charset += up
  if (includeSymbol) charset += sym
  if (noSimilar) charset = charset.replace(/[1iIl0oO]/g, '')

  if (noDuplicate && charset.length < len) {
    throw new Error('No enough character sets selected.')
  }

  let res = ''

  while (res.length < len) {
    const idx = Math.floor((10000 * Math.random()) % charset.length)
    const char = charset[idx]

    if (startWithLetter && res.length === 0 && !/^[a-zA-Z]/.test(char)) continue
    if (noDuplicate && res.includes(char)) continue
    if (noSequential) {
      const last = res.charCodeAt(res.length - 1)
      const next = char.charCodeAt(0)
      if (/^[a-zA-Z0-9]/.test(char) && next - last === 1) continue
    }

    res += char
  }

  return res
}
