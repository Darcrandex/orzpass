import { TResponse } from '@/types/global'
import { IssueComment, Post, commentToPost } from '@/types/post'
import { http } from '@/utils/http'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export const postService = {
  all: async (): Promise<TResponse<Post[]>> => {
    console.log('get all posts')

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
}
