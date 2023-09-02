// 随机字符串

export type RandomStringOptions = {
  length?: number
  includeNumber?: boolean // 包含数字
  includeLower?: boolean // 包含小写字母
  includeUpper?: boolean // 包含大写字母
  includeSymbol?: boolean // 包含符号
  noSimilar?: boolean // 去重相似以混淆的字符，1iIl0oO
  startWithLetter?: boolean // 以字母开头
  noDuplicate?: boolean // 字符不重复
  noSequential?: boolean // 字符不连续 123 abc
}

export function randomString({
  length = 8,
  includeNumber = true,
  includeLower = true,
  includeUpper = true,
  includeSymbol = true,
  noSimilar = false,
  startWithLetter = false,
  noDuplicate = false,
  noSequential = false,
}: RandomStringOptions = {}) {
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
  if (noSimilar) charset = charset.replace(/[1iIlL0oO]/g, '')

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
