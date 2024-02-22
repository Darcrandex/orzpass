export type Post = {
  userId: string
  id: string
  title: string
  username?: string
  password?: string
  website?: string
  iconUrl?: string
  remark?: string

  updated_at?: string
}

export type CreatePostDto = Omit<Post, 'id' | 'updated_at'>

export type UpdatePostDto = Omit<Post, 'updated_at'>

export function commentToPost(comment: any): Post {
  return {
    ...JSON.parse(comment.body || '{}'),
    id: comment.id,
    updated_at: comment.updated_at,
  }
}
