/**
 * @name BasePage
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { AxiosErrorResponse } from '@/types/global'
import { User } from '@/types/user'
import Button from '@/ui/Button'
import FormItem from '@/ui/FormItem'
import Input from '@/ui/Input'
import Textarea from '@/ui/Textarea'
import { toast } from '@/ui/Toast'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function BasePage() {
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

  const { mutate: updateBaseInfo, isPending } = useMutation({
    mutationFn: (values: any) => userService.update(values),
    onSuccess: (res) => {
      if (res.data) {
        toast.show({ type: 'success', message: 'Profile updated' })
      }
      queryClient.invalidateQueries({ queryKey: ['profile'] })
    },
    onError(error: AxiosError<AxiosErrorResponse>) {
      console.log(error.response)
      if (error.response?.data?.message) {
        toast.show({ type: 'error', message: error.response?.data?.message })
      }
    },
  })

  return (
    <>
      <section className='w-[768px] max-w-full px-4 mx-auto'>
        <FormItem label='Username'>
          <Controller
            control={control}
            name='username'
            render={({ field }) => <Input block value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='Email'>
          <Controller
            control={control}
            name='email'
            render={({ field }) => <Input block value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='Avatar'>
          <Controller
            control={control}
            name='avatarUrl'
            render={({ field }) => <Textarea value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <footer className='mt-4 space-x-2'>
          <Button variant='primary' loading={isPending} onClick={handleSubmit((values) => updateBaseInfo(values))}>
            Update Base Info
          </Button>
        </footer>
      </section>
    </>
  )
}
