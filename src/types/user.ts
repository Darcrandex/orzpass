export type Issue = {
  id: number
  number: number
  title: string
  body: string
}

export type User = {
  id: string
  username: string
  password: string
  avatarUrl?: string
  email?: string
}

export function issueToUser(issue: any): User {
  return {
    // 目前 api 无法通过 issue id 来获取 issue
    id: issue.number.toString(),
    username: issue.title,
    ...JSON.parse(issue.body || '{}'),
  }
}
