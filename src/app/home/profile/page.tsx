/**
 * @name ProfilePage
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import { User } from '@/types/user'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
  })

  const { control, reset, handleSubmit } = useForm<User>({
    defaultValues: { username: '', email: '', avatarUrl: '' },
  })

  useEffect(() => {
    if (data?.data) {
      reset(data?.data)
    }
  }, [data, reset])

  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: (values: any) => userService.update(values),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      console.log(error.response)
    },
  })

  return (
    <>
      <h1>ProfilePage</h1>
      <p>{JSON.stringify(data?.data, null, 2)}</p>

      <div>
        <Controller
          control={control}
          name='username'
          render={({ field }) => <input type='text' className='border' {...field} />}
        />

        <Controller
          control={control}
          name='email'
          render={({ field }) => <input type='text' className='border' {...field} />}
        />

        <Controller
          control={control}
          name='avatarUrl'
          render={({ field }) => <textarea rows={5} className='border' {...field} />}
        />

        <button type='button' onClick={handleSubmit((values) => mutate(values))}>
          update
        </button>
      </div>
    </>
  )
}
