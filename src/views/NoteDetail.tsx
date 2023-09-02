/**
 * @name NoteDetail
 * @description
 * @author darcrand
 */

'use client'
import BackButton from '@/components/BackButton'
import Logo from '@/components/Logo'
import { useCopy } from '@/hooks/useCopy'
import { apiRemoveNote } from '@/services/note'
import { Note } from '@/types/note'
import { CopyOutlined, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useMutation } from '@tanstack/react-query'
import { useToggle } from 'ahooks'
import { Button, Form, Modal, Space, Typography } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { PropsWithChildren, useMemo } from 'react'

export default function NoteDetail({ data }: { data: Note }) {
  const [showPassword, { toggle: toggleShow }] = useToggle(false)

  const websiteUrl = useMemo(() => {
    if (!data?.website) return
    return /^http(s*):\/\//gm.test(data.website) ? data.website : `http://${data.website}`
  }, [data?.website])

  const { copy } = useCopy({
    onSuccess() {
      console.log('success')
    },
  })

  const router = useRouter()
  const [open, { toggle }] = useToggle()
  const { mutateAsync: onRemove } = useMutation({
    mutationFn: () => apiRemoveNote(data.id),
    onSuccess() {
      router.replace('/notes')
      router.refresh()
    },
  })

  return (
    <>
      <section className='flex flex-col h-full'>
        <header className='flex justify-between p-4'>
          <BackButton />

          <Space>
            <Button icon={<EditOutlined />} type='link'>
              <Link href={`/notes/${data.id}/edit`}>Edit</Link>
            </Button>
            <Button icon={<DeleteOutlined />} type='link' onClick={toggle}>
              Delete
            </Button>
          </Space>
        </header>

        <section>
          <div className='flex flex-col items-center justify-center mb-6'>
            <Logo title={data?.title || 'a'} iconUrl={data?.iconUrl} size='large' />
            <h2 className='text-lg mt-4 text-gray-700 font-extrabold'>{data?.title || 'Title'}</h2>
          </div>

          <div className='mx-4'>
            <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
              <Form.Item label='Username'>
                <ValueWrapper>
                  <div className='flex justify-between'>
                    <span>{data?.username}</span>
                    {Boolean(data?.username) && (
                      <Button
                        type='text'
                        className='ml-4'
                        icon={<CopyOutlined className='text-gray-500' />}
                        onClick={() => copy(data?.username)}
                      />
                    )}
                  </div>
                </ValueWrapper>
              </Form.Item>

              <Form.Item label='Password'>
                <ValueWrapper>
                  <div className='flex justify-between'>
                    <span>{showPassword ? data.password : '******'}</span>
                    <Space>
                      <Button
                        type='text'
                        icon={
                          showPassword ? (
                            <EyeOutlined className='text-gray-500' />
                          ) : (
                            <EyeInvisibleOutlined className='text-gray-500' />
                          )
                        }
                        onClick={toggleShow}
                      />

                      <Button
                        type='text'
                        icon={<CopyOutlined className='text-gray-500' />}
                        onClick={() => copy(data.password)}
                      />
                    </Space>
                  </div>
                </ValueWrapper>
              </Form.Item>

              <Form.Item label='Website'>
                <ValueWrapper>
                  <Typography.Link href={websiteUrl} target='_blank'>
                    {data?.website}
                  </Typography.Link>
                </ValueWrapper>
              </Form.Item>

              <Form.Item label='Remark'>
                <ValueWrapper>
                  {data?.remark?.split('\n').map((str, i) => (
                    <p key={`${str}_${i}`}>{str}</p>
                  ))}
                </ValueWrapper>
              </Form.Item>
            </Form>
          </div>
        </section>
      </section>

      <Modal title='Remove' onOk={() => onRemove()} open={open} onCancel={toggle}>
        <p>Are you sure you want to delete it?</p>
      </Modal>
    </>
  )
}

function ValueWrapper(props: PropsWithChildren) {
  return <div className='px-4 py-2 rounded-md border bg-gray-50/50 min-h-[3em]'>{props.children}</div>
}
