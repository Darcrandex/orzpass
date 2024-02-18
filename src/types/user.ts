export type User = {
  id: string
  username: string
  password: string
  avatarUrl?: string
  email?: string
}

export type CreateUserDto = {
  username: string
  password: string
  email?: string
}

export type UpdateUserDto = {
  username?: string
  avatarUrl?: string
  email?: string
}

export type UpdatePasswordDto = {
  oldPassword: string
  newPassword: string
}

export function issueToUser(issue: any): User {
  return {
    // 目前 api 无法通过 issue id 来获取 issue
    id: issue.number.toString(),
    username: issue.title,
    ...JSON.parse(issue.body || '{}'),
  }
}
