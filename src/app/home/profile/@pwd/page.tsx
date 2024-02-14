/**
 * @name PasswordPage
 * @description
 * @author darcrand
 */

'use client'
import { TOKEN_STORAGE_KEY } from '@/const/common'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import Button from '@/ui/Button'
import FormItem from '@/ui/FormItem'
import Input from '@/ui/Input'
import { toast } from '@/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { Controller, useForm } from 'react-hook-form'

export default function PasswordPage() {
  const { control, handleSubmit } = useForm({
    defaultValues: { oldPassword: '', newPassword: '', confirmPassword: '' },
  })

  const router = useRouter()
  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => {
      const { oldPassword, newPassword, confirmPassword } = values

      if (!oldPassword || !newPassword || !confirmPassword) {
        return Promise.reject({
          response: { data: { message: 'old password or new password is empty' } },
        })
      }

      if (newPassword !== confirmPassword) {
        return Promise.reject({
          response: { data: { message: 'the two passwords do not match' } },
        })
      }

      return userService.pwd({ oldPassword, newPassword })
    },
    onSuccess: (res) => {
      toast.show({ type: 'success', message: 'Password updated, please login' })
      localStorage.removeItem(TOKEN_STORAGE_KEY)
      router.push('/sign/login')
    },

    onError(error: AxiosError<AxiosErrorResponse>) {
      console.log(error.message)
      if (error.response?.data?.message) {
        toast.show({ type: 'error', message: error.response?.data?.message })
      }
    },
  })

  return (
    <>
      <section className='w-[768px] max-w-full px-4 mx-auto'>
        <FormItem label='OldPassword'>
          <Controller
            control={control}
            name='oldPassword'
            render={({ field }) => <Input block value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='NewPassword'>
          <Controller
            control={control}
            name='newPassword'
            render={({ field }) => <Input block value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='ConfirmPassword'>
          <Controller
            control={control}
            name='confirmPassword'
            render={({ field }) => <Input block value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <footer className='mt-4 space-x-2'>
          <Button variant='primary' loading={isPending} onClick={handleSubmit((values) => mutate(values))}>
            Update Password
          </Button>
        </footer>
      </section>
    </>
  )
}
