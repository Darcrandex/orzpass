/**
 * @name NoteEdit
 * @description 编辑模式
 * @author darcrand
 */

import KeyModal from '@/common/KeyModal'
import BackButton from '@/components/BackButton'
import PasswordGeneratorPopover from '@/components/PasswordGeneratorPopover'
import { apiAddNote, apiGetNoteById, apiUpdateNote } from '@/services/note'
import { useGlobalKey } from '@/stores/key'
import { useUserState } from '@/stores/user'
import { aes } from '@/utils/aes'
import { getIconFromUrl } from '@/utils/get-icon'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { Button, Form, Input, Space } from 'antd'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useWindowSize } from 'react-use'

export default function NoteEdit() {
  const navigate = useNavigate()
  const client = useQueryClient()
  const { id } = useParams()
  const { user } = useUserState()
  const { key } = useGlobalKey()
  const [form] = Form.useForm()

  const { data } = useQuery({
    queryKey: ['note', id],
    queryFn: () => apiGetNoteById(id || ''),
    enabled: Boolean(id),
  })

  const isWrongKey = useMemo(() => {
    if (key && data?.password) {
      const d = aes.decode(data.password, key)
      return d.length === 0
    }

    return false
  }, [data?.password, key])

  useEffect(() => {
    if (form && data && user?.code && key) {
      form.setFieldsValue({ ...data, password: data.password ? aes.decode(data.password, key) : '' })
    }
  }, [data, form, key, user?.code])

  const websiteValidator = async (rule: any, value: string) => {
    if (!value || value.trim().length === 0) {
      return
    }

    const host = value?.replace(/http(s?):\/\//g, '')

    if (/^[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+$/.test(host)) {
      return
    } else {
      return Promise.reject('Invalid website URL')
    }
  }

  const { mutateAsync, isLoading } = useMutation(
    async (values: any) => {
      if (!user?.code || !key) return

      try {
        const iconUrl = await getIconFromUrl(values.website)
        const data = {
          ...values,
          iconUrl,
          password: values.password?.trim() ? aes.encode(values.password || '', key) : undefined,
        }

        id ? await apiUpdateNote(id, data) : await apiAddNote(user?.code, data)
      } catch (error) {
        console.error(error)
      }
    },
    {
      onSuccess() {
        client.invalidateQueries(['notes'])
        client.invalidateQueries(['note', id])
        navigate(-1)
      },
    }
  )

  const { width } = useWindowSize()

  // password generator
  const onGenerate = (pwd: string) => {
    if (!user?.code || !key) return
    form.setFieldsValue({ password: pwd })
  }

  return (
    <>
      <section className='flex flex-col h-full'>
        <header className='p-4'>
          <BackButton />
        </header>

        <section className='flex-1 mx-4 overflow-x-hidden overflow-y-auto'>
          <Form form={form} onFinish={mutateAsync} autoComplete='off' labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
            <Form.Item name='id' hidden>
              <Input maxLength={20} />
            </Form.Item>

            <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Title is required' }]}>
              <Input maxLength={20} allowClear />
            </Form.Item>

            <Form.Item label='Username' name='username'>
              <Input maxLength={20} allowClear />
            </Form.Item>

            <Form.Item
              label='Password'
              name='password'
              extra={
                isWrongKey && (
                  <>
                    <p className='mb-2 text-red-400'>
                      Your data parsing failed, it seems that the KEY you configured is wrong.
                    </p>
                    <KeyModal />
                  </>
                )
              }
            >
              <Input.Password maxLength={20} allowClear className='flex-1' />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: width >= 640 ? 4 : 0 }}>
              <PasswordGeneratorPopover onGenerate={onGenerate} />
            </Form.Item>

            <Form.Item label='Website' name='website' rules={[{ validator: websiteValidator }]}>
              <Input maxLength={50} allowClear placeholder='e.g., www.google.com' />
            </Form.Item>

            <Form.Item label='Remark' name='remark'>
              <Input.TextArea maxLength={100} showCount allowClear />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: width >= 640 ? 4 : 0 }}>
              <Space>
                <Button onClick={() => navigate(-1)}>Cancel</Button>
                <Button htmlType='submit' type='primary' loading={isLoading}>
                  Submit
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </section>
      </section>
    </>
  )
}
