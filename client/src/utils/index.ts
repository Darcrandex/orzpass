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
