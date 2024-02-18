/**
 * @name RegistryPage
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import { User } from '@/types/user'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { toast } from '@/ui/Toast'
import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'

export default function RegistryPage() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<User>({ defaultValues: { username: '', password: '', email: '' } })

  const { mutate, isPending } = useMutation({
    mutationFn: (values: any) => userService.registry(values),
    onSuccess: () => {
      router.replace('/sign/login')
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      if (error.response?.data.message) {
        toast.show({ type: 'error', message: error.response?.data.message })
      }
    },
  })

  return (
    <>
      <section className='space-y-4'>
        <h1 className='text-5xl text-center font-extrabold text-primary' style={{ fontFamily: 'Noto Sans' }}>
          rigistry
        </h1>

        <Controller
          control={control}
          name='username'
          render={({ field }) => <Input block placeholder='username' value={field.value} onChange={field.onChange} />}
        />

        <Controller
          control={control}
          name='password'
          render={({ field }) => (
            <Input type='password' placeholder='password' block value={field.value} onChange={field.onChange} />
          )}
        />

        <Controller
          control={control}
          name='email'
          render={({ field }) => <Input block placeholder='email' value={field.value} onChange={field.onChange} />}
        />

        <Button
          className='uppercase'
          variant='primary'
          block
          loading={isPending}
          onClick={handleSubmit((values) => mutate(values))}
        >
          registry
        </Button>

        <p className='text-center'>
          <span>Already have an account?</span>
          <Link href='/sign/login' replace>
            <Button variant='link'>login</Button>
          </Link>
        </p>
      </section>
    </>
  )
}
