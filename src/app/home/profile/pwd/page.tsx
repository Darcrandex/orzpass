/**
 * @name PasswordPage
 * @description
 * @author darcrand
 */

'use client'
import { TOKEN_STORAGE_KEY } from '@/const/common'
import { userService } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function PasswordPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  })

  const router = useRouter()
  const { mutate } = useMutation({
    mutationFn: (values: any) => {
      const { oldPassword, newPassword, confirmPassword } = values
      if (newPassword !== confirmPassword) {
        throw new Error('两次密码不一致')
      }

      return userService.pwd({ oldPassword, newPassword })
    },
    onSuccess: (res) => {
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      router.push('/sign/login')
    },

    onError(error, variables, context) {
      console.log(error.message)
    },
  })

  return (
    <>
      <h1>PasswordPage</h1>

      <Controller
        control={control}
        name='oldPassword'
        render={({ field }) => <input type='password' className='border' {...field} />}
      />

      <Controller
        control={control}
        name='newPassword'
        render={({ field }) => <input type='password' className='border' {...field} />}
      />

      <Controller
        control={control}
        name='confirmPassword'
        render={({ field }) => <input type='password' className='border' {...field} />}
      />

      <button type='button' onClick={handleSubmit((values) => mutate(values))}>
        update
      </button>
    </>
  )
}
