/**
 * @name PostForm
 * @description
 * @author darcrand
 */

'use client'
import { postService } from '@/services/post'
import { Post } from '@/types/post'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

type PostFormProps = { data?: Post }

export default function PostForm(props: PostFormProps) {
  const router = useRouter()
  const { control, handleSubmit } = useForm<Post>({ defaultValues: props.data })

  const { mutate } = useMutation({
    mutationFn: (values: any) => postService.update(values),
    onSuccess: () => {
      router.back()
      router.refresh()
    },
  })

  return (
    <>
      <h1>PostForm</h1>

      <Controller
        control={control}
        name='title'
        render={({ field }) => <input type='text' {...field} className='border' />}
      />

      <Controller control={control} name='remark' render={({ field }) => <textarea {...field} className='border' />} />

      <button type='button' onClick={handleSubmit((values) => mutate(values))}>
        Submit
      </button>
    </>
  )
}
