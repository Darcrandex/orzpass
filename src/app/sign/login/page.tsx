/**
 * @name LoginPage
 * @description
 * @author darcrand
 */

'use client'
import { TOKEN_STORAGE_KEY } from '@/const/common'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import { User } from '@/types/user'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { toast } from '@/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<User>({ defaultValues: { username: '', password: '' } })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      const { username, password } = values

      if (!username || !password) {
        // 模拟请求错误
        return Promise.reject({
          response: { data: { message: 'username or password is empty' } },
        })
      }

      return userService.login(values)
    },
    onSuccess: (res) => {
      toast.show({ type: 'success', message: 'login success' })
      localStorage.setItem(TOKEN_STORAGE_KEY, res.data)
      router.replace('/home')
      router.refresh()
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      toast.show({ type: 'error', message: error.response?.data.message })
    },
  })

  return (
    <>
      <section className='space-y-4'>
        <h1 className='text-3xl text-center font-extrabold text-primary'>orz pass</h1>

        <Controller
          control={control}
          name='username'
          render={({ field }) => <Input block placeholder='username' value={field.value} onChange={field.onChange} />}
        />

        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <Input block placeholder='password' type='password' value={field.value} onChange={field.onChange} />
          )}
        />

        <Button
          variant='primary'
          className='uppercase'
          block
          loading={isPending}
          onClick={handleSubmit((values) => mutate(values))}
        >
          login now
        </Button>

        <p className='text-center'>
          <span>Don&apos;t have an account?</span>
          <Link href='/sign/registry' replace>
            <Button variant='link'>registry</Button>
          </Link>
        </p>
      </section>
    </>
  )
}
