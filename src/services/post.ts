import { TResponse } from '@/types/global'
import { IssueComment, Post, UpdatePostDto, commentToPost } from '@/types/post'
import { http } from '@/utils/http'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { omit } from 'ramda'

export const postService = {
  all: async (): Promise<TResponse<Post[]>> => {
    const token = cookies().get('token')?.value
    if (!token || !jwt.verify(token, process.env.NEXT_APP_JWT_SECRET || 'secret')) {
      return { data: [], error: 'invalid token' }
    }

    const payload = jwt.decode(token) as { id: string }
    const maxPage = 10
    const tasks = Array.from({ length: maxPage }).map((_, i) =>
      http.get<IssueComment[]>(`/issues/${payload.id}/comments?per_page=${100}&page=${i + 1}`)
    )
    const pagesRes = await Promise.all(tasks)
    const data = pagesRes.reduce<Post[]>((acc, cur) => acc.concat(cur.data.map(commentToPost)), [])
    return { data }
  },

  create: async (data: Omit<Post, 'id' | 'updated_at'>): Promise<TResponse<string | null>> => {
    const token = cookies().get('token')?.value
    if (!token || !jwt.verify(token, process.env.NEXT_APP_JWT_SECRET || 'secret')) {
      return { data: null, error: 'invalid token' }
    }

    const payload = jwt.decode(token) as { id: string }
    const res = await http.post<IssueComment>(`/issues/${payload.id}/comments`, {
      body: JSON.stringify(data),
    })

    return { data: commentToPost(res.data).id }
  },

  byId: async (id: string): Promise<TResponse<Post | null>> => {
    const token = cookies().get('token')?.value
    if (!token || !jwt.verify(token, process.env.NEXT_APP_JWT_SECRET || 'secret')) {
      return { data: null, error: 'invalid token' }
    }

    const payload = jwt.decode(token) as { id: string }
    const { data } = await http.get<IssueComment>(`/issues/comments/${id}`)
    return { data: commentToPost(data) }
  },

  update: async (data: UpdatePostDto): Promise<TResponse<string>> => {
    console.log('update post ===>', data)

    const res = await http.patch<IssueComment>(`/issues/comments/${data.id}`, {
      body: JSON.stringify(omit(['id'], data)),
    })

    return { data: res.data.id }
  },

  remove: async (id: string): Promise<TResponse<void>> => {
    await http.delete<IssueComment>(`/issues/comments/${id}`)
    return { data: undefined }
  },
}
