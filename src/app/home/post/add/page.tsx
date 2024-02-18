/**
 * @name PostAdd
 * @description
 * @author darcrand
 */

'use client'
import NavBack from '@/components/NavBack'
import PasswordEdit from '@/components/PasswordEdit'
import { postService } from '@/services/post'
import { Post } from '@/types/post'
import Button from '@/ui/Button'
import FormItem from '@/ui/FormItem'
import Input from '@/ui/Input'
import Textarea from '@/ui/Textarea'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import { Controller, useForm } from 'react-hook-form'

export default function PostAdd() {
  const router = useRouter()
  const { control, handleSubmit } = useForm<Post>({
    defaultValues: {
      title: '',
      username: '',
      password: '',
      website: '',
      remark: '',
    },
  })

  const queryClient = useQueryClient()
  const { mutate: createPost, isPending } = useMutation({
    mutationFn: (values: any) => postService.create(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      router.back()
    },
  })

  return (
    <>
      <header className='m-4'>
        <NavBack />
      </header>

      <section className='w-md max-w-full px-4 mx-auto'>
        <FormItem label='Title'>
          <Controller
            control={control}
            name='title'
            render={({ field }) => <Input block maxLength={20} value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='Username'>
          <Controller
            control={control}
            name='username'
            render={({ field }) => <Input block maxLength={50} value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='Password'>
          <Controller
            control={control}
            name='password'
            render={({ field }) => <PasswordEdit value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='Website'>
          <Controller
            control={control}
            name='website'
            render={({ field }) => <Input block maxLength={20} value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <FormItem label='Remark'>
          <Controller
            control={control}
            name='remark'
            render={({ field }) => <Textarea maxLength={500} rows={5} value={field.value} onChange={field.onChange} />}
          />
        </FormItem>

        <footer className='mt-4 space-x-2'>
          <Button loading={isPending} onClick={handleSubmit((values) => createPost(values))}>
            create
          </Button>
        </footer>
      </section>
    </>
  )
}
