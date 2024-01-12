/**
 * @name PostEdit
 * @description
 * @author darcrand
 */

'use client'
import { postService } from '@/services/post'
import { Post } from '@/types/post'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import { isNotNil } from 'ramda'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PostEdit() {
  const id = useParams().id as string
  const queryClient = useQueryClient()
  const router = useRouter()
  const { control, handleSubmit, reset } = useForm<Post>({
    defaultValues: {
      title: '',
      remark: '',
    },
  })

  const { data } = useQuery({
    enabled: !!id,
    queryKey: ['post', id],
    queryFn: () => postService.one(id),
  })

  useEffect(() => {
    isNotNil(data?.data) && reset(data?.data)
  }, [data, reset])

  const { mutate } = useMutation({
    mutationFn: (values: any) => postService.update(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      router.back()
    },
  })

  return (
    <>
      <Link href={`/home/post/${id}`}>back</Link>

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
