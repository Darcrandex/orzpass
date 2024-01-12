/**
 * @name PostAdd
 * @description
 * @author darcrand
 */

'use client'
import { postService } from '@/services/post'
import { Post } from '@/types/post'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function PostAdd() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<Post>({
    defaultValues: {
      title: '',
      remark: '',
    },
  })

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (values: any) => postService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      router.back()
    },
  })

  return (
    <>
      <h1>PostAdd</h1>

      <Controller
        control={control}
        name='title'
        render={({ field }) => <input type='text' className='border' {...field} />}
      />

      <Controller control={control} name='remark' render={({ field }) => <textarea {...field} className='border' />} />

      <button type='button' onClick={handleSubmit((values) => mutate(values))}>
        Submit
      </button>
    </>
  )
}
