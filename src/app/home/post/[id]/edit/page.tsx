/**
 * @name PostEditPage
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
import Modal from '@/ui/Modal'
import Spin from '@/ui/Spin'
import Textarea from '@/ui/Textarea'
import { toast } from '@/ui/Toast'
import { getDomain } from '@/utils/getDomain'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import { useParams } from 'next/navigation'
import { isNotNil } from 'ramda'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PostEditPage() {
  const id = useParams().id as string
  const { data, isPending } = useQuery({
    enabled: !!id,
    queryKey: ['post', id],
    queryFn: () => postService.one(id),
  })

  const router = useRouter()
  const queryClient = useQueryClient()

  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false)

  const { mutate: removePost, isPending: isRemoving } = useMutation({
    mutationFn: () => postService.remove(id),
    onSuccess() {
      toast.show({ type: 'success', message: 'Post removed' })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      router.back()
    },
  })

  const { mutate: updatePost, isPending: isUpdating } = useMutation({
    mutationFn: (values: any) => postService.update({ ...values, website: getDomain(values.website) }),
    onSuccess() {
      toast.show({ type: 'success', message: 'Post updated' })
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      queryClient.invalidateQueries({ queryKey: ['post', id] })
      router.back()
    },
  })

  const { control, reset, handleSubmit } = useForm<Post>()

  useEffect(() => {
    isNotNil(data?.data) && reset(data?.data)
  }, [data, reset])

  return (
    <>
      <header className='m-4'>
        <NavBack />
      </header>

      <Spin spinning={isPending}>
        <section className='w-md max-w-full px-4 mx-auto'>
          <FormItem label='Title'>
            <Controller
              control={control}
              name='title'
              render={({ field }) => (
                <Input block maxLength={100} value={field.value || ''} onChange={field.onChange} />
              )}
            />
          </FormItem>

          <FormItem label='Username'>
            <Controller
              control={control}
              name='username'
              render={({ field }) => (
                <Input block maxLength={100} value={field.value || ''} onChange={field.onChange} />
              )}
            />
          </FormItem>

          <FormItem label='Password'>
            <Controller
              control={control}
              name='password'
              render={({ field }) => <PasswordEdit value={field.value || ''} onChange={field.onChange} />}
            />
          </FormItem>

          <FormItem label='Website'>
            <Controller
              control={control}
              name='website'
              render={({ field }) => (
                <Input block maxLength={100} value={field.value || ''} onChange={field.onChange} />
              )}
            />
          </FormItem>

          <FormItem label='Remark'>
            <Controller
              control={control}
              name='remark'
              render={({ field }) => (
                <Textarea maxLength={500} rows={5} value={field.value || ''} onChange={field.onChange} />
              )}
            />
          </FormItem>

          <footer className='mt-4 space-x-2'>
            <Button variant='primary' loading={isUpdating} onClick={handleSubmit((values) => updatePost(values))}>
              update
            </Button>
            <Button loading={isRemoving} onClick={() => reset(data?.data)}>
              reset
            </Button>
            <Button onClick={() => setShowRemoveConfirm(true)}>remove</Button>
          </footer>
        </section>
      </Spin>

      <Modal
        title='Remove'
        open={showRemoveConfirm}
        bodyClassName='w-96'
        onClose={() => setShowRemoveConfirm(false)}
        footer={
          <Button
            variant='primary'
            onClick={() => {
              setShowRemoveConfirm(false)
              removePost()
            }}
          >
            Confirm
          </Button>
        }
      >
        <p>Are you sure to remove this note?</p>
      </Modal>
    </>
  )
}
