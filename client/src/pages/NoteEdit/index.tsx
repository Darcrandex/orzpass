/**
 * @name NoteEdit
 * @description 编辑模式
 * @author darcrand
 */

import KeyModal from '@/common/KeyModal'
import BackButton from '@/components/BackButton'
import PasswordGeneratorPopover from '@/components/PasswordGeneratorPopover'
import { apiNotes } from '@/services/note'
import { useGlobalKey } from '@/stores/key'
import { Note } from '@/types/note'
import { aes } from '@/utils/aes'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSize } from 'ahooks'
import { Button, Form, Input, Space, Spin } from 'antd'
import { useEffect, useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function NoteEdit() {
  const navigate = useNavigate()
  const client = useQueryClient()
  const { id } = useParams()
  const { key } = useGlobalKey()
  const [form] = Form.useForm()

  const { data, isFetching } = useQuery({
    queryKey: ['note', id],
    queryFn: () => apiNotes.getById(id || ''),
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
    if (form && data && key) {
      form.setFieldsValue({ ...data, password: data.password ? aes.decode(data.password, key) : '' })
    }
  }, [data, form, key])

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
      if (!key) return

      try {
        const data = {
          ...values,
          // 自动去掉协议
          website: values.website ? String(values.website).replace(/http(s?):\/\//g, '') : undefined,
          password: values.password?.trim() ? aes.encode(values.password || '', key) : undefined,
        }

        id ? await apiNotes.update(data as Note) : await apiNotes.add(data as Omit<Note, 'id'>)
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

  const { width = 1920 } = useSize(document.querySelector('body')) || {}

  // password generator
  const onGenerate = (pwd: string) => {
    if (!key) return
    form.setFieldsValue({ password: pwd })
  }

  return (
    <>
      <header className='p-4'>
        <BackButton />
      </header>

      <Spin className='mx-4' spinning={isFetching}>
        <Form form={form} onFinish={mutateAsync} autoComplete='off' labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
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

          <Form.Item wrapperCol={{ offset: width >= 640 ? 6 : 0 }}>
            <PasswordGeneratorPopover onGenerate={onGenerate} />
          </Form.Item>

          <Form.Item label='Website' name='website' rules={[{ validator: websiteValidator }]}>
            <Input maxLength={50} allowClear placeholder='e.g., www.google.com' />
          </Form.Item>

          <Form.Item label='Remark' name='remark'>
            <Input.TextArea maxLength={100} showCount allowClear />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: width >= 640 ? 6 : 0 }}>
            <Space>
              <Button onClick={() => navigate(-1)}>Cancel</Button>
              <Button htmlType='submit' type='primary' loading={isLoading}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Spin>
    </>
  )
}
