export type Note = {
  id: string
  title: string
  username?: string
  password?: string
  website?: string
  iconUrl?: string

  remark?: string
  updated_at?: Date
}

export type Comment = {
  id: string
  updated_at: Date
  body?: string
}

export function commentToNote(comment: Comment): Note {
  return {
    ...JSON.parse(comment.body || '{}'),
    id: comment.id,
    updated_at: comment.updated_at,
  }
}
