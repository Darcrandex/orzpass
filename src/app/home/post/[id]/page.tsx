/**
 * @name PostPage
 * @description
 * @author darcrand
 */

'use client'
import NavBack from '@/components/NavBack'
import PasswordView from '@/components/PasswordView'
import { useCopy } from '@/hooks/useCopy'
import { postService } from '@/services/post'
import { Post } from '@/types/post'
import Button from '@/ui/Button'
import FormItem from '@/ui/FormItem'
import Modal from '@/ui/Modal'
import Spin from '@/ui/Spin'
import TextView from '@/ui/TextView'
import { toast } from '@/ui/Toast'
import { faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { isNotNil } from 'ramda'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PostPage() {
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

  const { control, reset } = useForm<Post>()

  useEffect(() => {
    isNotNil(data?.data) && reset(data?.data)
  }, [data, reset])

  const [copy] = useCopy()

  return (
    <>
      <header className='m-4'>
        <NavBack />
      </header>

      <Spin spinning={isPending}>
        <section className='w-md max-w-full px-4 mx-auto'>
          <FormItem label='Title'>
            <Controller control={control} name='title' render={({ field }) => <TextView>{field.value}</TextView>} />
          </FormItem>

          <FormItem label='Username'>
            <Controller
              control={control}
              name='username'
              render={({ field }) => (
                <div className='flex space-x-2'>
                  <TextView className='flex-1'>{field.value}</TextView>
                  <Button onClick={() => copy(field.value)}>
                    <span className='w-[1em]'>
                      <FontAwesomeIcon className='text-sm' icon={faCopy} />
                    </span>
                  </Button>
                </div>
              )}
            />
          </FormItem>

          <FormItem label='Password'>
            <Controller
              control={control}
              name='password'
              render={({ field }) => <PasswordView value={field.value} />}
            />
          </FormItem>

          <FormItem label='Website'>
            <Controller
              control={control}
              name='website'
              render={({ field }) => (
                <TextView>
                  {field.value ? (
                    <Link href={`http://${field.value}`} target='_blank' className='underline text-primary'>
                      {field.value}
                    </Link>
                  ) : null}
                </TextView>
              )}
            />
          </FormItem>

          <FormItem label='Remark'>
            <Controller
              control={control}
              name='remark'
              render={({ field }) => <TextView className='min-h-24'>{field.value}</TextView>}
            />
          </FormItem>

          <footer className='mt-4 space-x-2'>
            <Button onClick={() => router.push(`/home/post/${id}/edit`)}>edit</Button>
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
