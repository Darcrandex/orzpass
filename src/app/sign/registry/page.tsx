/**
 * @name RegistryPage
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import { User } from '@/types/user'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function RegistryPage() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<User>({ defaultValues: { username: '', password: '', email: '' } })

  const { mutate } = useMutation({
    mutationFn: (values: any) => userService.registry(values),
    onSuccess: (res) => {
      router.replace('/sign/login')
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      console.log(error.response)
    },
  })

  return (
    <>
      <h1>Registry</h1>

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
          name='password'
          render={({ field }) => <input type='password' className='border' {...field} />}
        />

        <button type='button' onClick={handleSubmit((values) => mutate(values))}>
          registry
        </button>
      </div>

      <p>
        <Link href='/sign/login' replace>
          login now
        </Link>
      </p>
    </>
  )
}
