'use server'

import { postService } from '@/services/post'
import { Post, UpdatePostDto } from '@/types/post'
import { fomatForm } from '@/utils/fomatForm'
import { redirect } from 'next/navigation'

export async function addPost(state: any, formData: FormData) {
  try {
    const allValues = Object.fromEntries(formData) as unknown as Omit<Post, 'id'>
    const res = await postService.create(allValues)
    redirect('/home/post/' + res.data)
  } catch (error) {
    return { data: '', error: typeof error === 'string' ? error : 'unknown error' }
  }
}

export async function updatePost(state: any, formData: FormData) {
  try {
    const allValues = fomatForm<UpdatePostDto>(formData)
    const res = await postService.update(allValues)
    console.log('updatePost 更新成功', res)

    redirect('/')
  } catch (error) {
    console.log('updatePost 更新失败', error)

    return { data: '', error: typeof error === 'string' ? error : 'unknown error' }
  }
}
