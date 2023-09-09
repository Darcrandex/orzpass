/**
 * @name Note
 * @description 详情
 * @author darcrand
 */

import KeyModal from '@/common/KeyModal'
import BackButton from '@/components/BackButton'
import Logo from '@/components/Logo'
import { useCopy } from '@/hooks/useCopy'
import { apiNotes } from '@/services/note'
import { useGlobalKey } from '@/stores/key'
import { aes } from '@/utils/aes'
import { CopyOutlined, DeleteOutlined, EditOutlined, EyeInvisibleOutlined, EyeOutlined } from '@ant-design/icons'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useToggle } from 'ahooks'
import { App, Button, Form, Space, Typography } from 'antd'
import clsx from 'clsx'
import { PropsWithChildren, useCallback, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function Note() {
  const navigate = useNavigate()
  const { id } = useParams()
  const { key } = useGlobalKey()
  const client = useQueryClient()

  const { data, isFetching } = useQuery({
    queryKey: ['note', id],
    queryFn: () => apiNotes.getById(id || ''),
    enabled: Boolean(id),
  })

  const [showPassword, { toggle: toggleShow }] = useToggle(false)
  const decodedPassword = data?.password && key ? aes.decode(data?.password, key) : ''

  const isWrongKey = useMemo(() => {
    if (key && data?.password) {
      const text = aes.decode(data.password, key)
      return text.length === 0
    }

    return false
  }, [data?.password, key])

  const { modal } = App.useApp()
  const [copy] = useCopy()

  const websiteUrl = useMemo(() => {
    if (!data?.website) return
    return /^http(s*):\/\//gm.test(data.website) ? data.website : `http://${data.website}`
  }, [data?.website])

  const onRemove = useCallback(
    async (id: string) => {
      await apiNotes.remove(id)
      client.invalidateQueries(['notes'])
      navigate('/note', { replace: true })
    },
    [client, navigate]
  )

  const beforeRemove = useCallback(() => {
    if (id)
      modal.confirm({ title: 'Warning', content: 'Are you sure you want to delete it?', onOk: () => onRemove(id) })
  }, [id, modal, onRemove])
  return (
    <>
      <section className='flex flex-col h-full'>
        <header className='flex justify-between p-4'>
          <BackButton />

          <Space>
            <Button icon={<EditOutlined />} type='link' onClick={() => navigate(`/note/${id}/edit`)}>
              Edit
            </Button>
            <Button icon={<DeleteOutlined />} type='link' onClick={beforeRemove}>
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
                  {decodedPassword ? (
                    <div className='flex justify-between'>
                      <span>{showPassword ? decodedPassword : '******'}</span>
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
                          onClick={() => copy(decodedPassword)}
                        />
                      </Space>
                    </div>
                  ) : null}

                  <div className={clsx((!isWrongKey || isFetching) && 'hidden')}>
                    <p className='mb-2 text-red-400'>
                      Your data parsing failed, it seems that the KEY you configured is wrong.
                    </p>
                    <KeyModal />
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
    </>
  )
}

function ValueWrapper(props: PropsWithChildren) {
  return <div className='px-4 py-2 rounded-md border bg-gray-50/50 min-h-[3em]'>{props.children}</div>
}
