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
import { useMutation, useQueryClient } from '@tanstack/react-query'
import type { AxiosError } from 'axios'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'

export default function LoginPage() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<User>({ defaultValues: { username: '', password: '' } })
  const queryClient = useQueryClient()

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
      queryClient.invalidateQueries({ queryKey: [] })
      router.replace('/home')
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      toast.show({ type: 'error', message: error.response?.data.message })
    },
  })

  const onSubmit = handleSubmit((values) => mutate(values))

  return (
    <>
      <section className='space-y-4'>
        <Controller
          control={control}
          name='username'
          render={({ field }) => (
            <Input
              block
              placeholder='username'
              value={field.value}
              onChange={field.onChange}
              onEnter={() => onSubmit()}
            />
          )}
        />

        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <Input
              block
              placeholder='password'
              type='password'
              value={field.value}
              onChange={field.onChange}
              onEnter={() => onSubmit()}
            />
          )}
        />

        <Button variant='primary' className='uppercase' block loading={isPending} onClick={onSubmit}>
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
