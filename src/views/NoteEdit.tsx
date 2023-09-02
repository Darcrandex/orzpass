/**
 * @name NoteEdit
 * @description
 * @author darcrand
 */

'use client'
import PasswordGeneratorPopover from '@/components/PasswordGeneratorPopover'
import { useOnReady } from '@/hooks/useOnReady'
import { apiAddNote, apiUpdateNote } from '@/services/note'
import { Note } from '@/types/note'
import { clientAES } from '@/utils/client-aes'
import { useMutation } from '@tanstack/react-query'
import { useSize } from 'ahooks'
import { Button, Form, Input, Space } from 'antd'
import { useRouter } from 'next/navigation'
import { isNotNil } from 'ramda'

export default function NoteEdit(props: { data?: Note }) {
  const router = useRouter()
  const [form] = Form.useForm()

  useOnReady(() => {
    form.setFieldsValue(props.data)
  }, isNotNil(props.data))

  const { mutateAsync, isPending } = useMutation({
    mutationFn: (data: Note) => {
      return data.id ? apiUpdateNote(data) : apiAddNote(data)
    },
  })

  const size = useSize(() => window.document.documentElement)
  const width = size?.width || 1920

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

  const onGenerate = (pwd: string) => {
    form.setFieldsValue({ password: pwd })
  }

  const onFinish = async (values: any) => {
    const password = clientAES.encrypt(values.password)
    await mutateAsync({ ...values, password })
    router.replace('/notes')
    router.refresh()
  }

  return (
    <>
      <section>
        <h1>NoteEdit</h1>

        <Form form={form} onFinish={onFinish} autoComplete='off' labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
          <Form.Item name='id' hidden>
            <Input maxLength={20} />
          </Form.Item>

          <Form.Item label='Title' name='title' rules={[{ required: true, message: 'Title is required' }]}>
            <Input maxLength={20} allowClear />
          </Form.Item>

          <Form.Item label='Username' name='username'>
            <Input maxLength={20} allowClear />
          </Form.Item>

          <Form.Item label='Password' name='password'>
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
              <Button>Cancel</Button>
              <Button htmlType='submit' type='primary' loading={isPending}>
                Submit
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </section>
    </>
  )
}
