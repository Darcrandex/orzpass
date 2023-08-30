// 本地使用的用户数据类型
export type User = {
  id: string
  username: string
  password: string
  code: string
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
  return {
    id: String(issue.id),
    username: issue.title,
    code: String(issue.number),
    ...JSON.parse(issue.body || '{}'),
  }
}
