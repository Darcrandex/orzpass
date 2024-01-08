export type IssueComment = {
  id: string
  updated_at: Date
  body?: string
}

export type Post = {
  id: string
  title: string
  username?: string
  password?: string
  website?: string
  iconUrl?: string
  remark?: string

  updated_at?: Date
}

export function commentToPost(comment: IssueComment): Post {
  return {
    ...JSON.parse(comment.body || '{}'),
    id: comment.id,
    updated_at: comment.updated_at,
  }
}
