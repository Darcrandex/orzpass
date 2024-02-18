import { CreatePostDto, Post } from '@/types/post'
import { http } from '@/utils/http'

export const postService = {
  all: () => http.get<Post[]>('/api/post'),

  create: async (data: CreatePostDto) => http.post<Pick<Post, 'id'>>('/api/post', data),

  one: (id: string) => http.get<Post>(`/api/post/${id}`),

  update: (data: Post) => http.patch<Pick<Post, 'id'>>(`/api/post/${data.id}`, data),

  remove: (id: string) => http.delete(`/api/post/${id}`),
}
