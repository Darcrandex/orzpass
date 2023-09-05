import { zeroFill } from '@/utils'

// 本地用户
export type User = {
  id: string
  name: string
  code: string
  avatarUrl?: string
}

export type Issue = {
  id: number
  number: number
  title: string
  state: 'open' | 'close'
  body?: string
}

export function issueToUser(issue: Issue): User {
  return {
    ...JSON.parse(issue.body || '{}'),
    id: String(issue.id),
    name: issue.title,
    code: numberToCode(issue.number),
  }
}

// issue.number <=> user.code
// 随便定义了一个互转的方法
// issue.number 范围是 1~MAX_USER_COUNT
// 让 code 看起来好看一点
const OFFSET = 1024
const TIMES = 2
export function numberToCode(n: number): string {
  return zeroFill((n + OFFSET) * TIMES, 6)
}

export function codeToNumber(code: string): number {
  const n = Number.parseInt(code)
  return n * Math.pow(TIMES, -1) - OFFSET
}
