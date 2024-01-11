/**
 * @name LoginPage
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import { User } from '@/types/user'
import { useToast } from '@/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const { showToast } = useToast()

  const { control, handleSubmit } = useForm<User>({ defaultValues: { username: '', password: '' } })

  const { mutate } = useMutation({
    mutationFn: (values: any) => userService.login(values),
    onSuccess: () => {
      router.replace('/home')
      router.refresh()
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      console.log(error.response)
      showToast({ title: '登录失败', message: error.response?.data?.message || '登录失败' })
    },
  })

  return (
    <>
      <Controller
        control={control}
        name='username'
        render={({ field }) => <input type='text' className='border' {...field} />}
      />

      <Controller
        control={control}
        name='password'
        render={({ field }) => <input type='password' className='border' {...field} />}
      />

      <button type='button' onClick={handleSubmit((values) => mutate(values))}>
        login now
      </button>

      <hr />

      <p>
        <Link href='/sign/registry' replace>
          registry now
        </Link>
      </p>
    </>
  )
}
