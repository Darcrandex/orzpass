// 本地使用的用户数据类型
export type User = {
  id: string
  username: string
  password: string
  code: string

  // 用户用来加密的秘钥
  secret: string
  avatarUrl?: string
}

// 真正存储的数据
export type Issue = {
  id: number
  number: number
  title: string
  body?: string
}

export function issueToUser(issue: Issue): User {
  const user: User = {
    id: String(issue.id),
    code: String(issue.number),
    ...JSON.parse(issue.body || '{}'),
  }

  return user
}
