/**
 * @name SignIn
 * @description
 * @author darcrand
 */

'use client'
import { apiUserlogin } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { App as AntdApp, Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const { message } = AntdApp.useApp()

  const router = useRouter()
  const [form] = Form.useForm()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: any) => {
      console.log('sign in', values)

      const res = await apiUserlogin(values)
      console.log('sign in success', res)
    },

    onSuccess() {
      router.replace('/notes')
    },
    onError(err) {
      if (err.message) {
        // message.error(err.message)
        console.error('ffff', err.message)
      }
    },
  })

  return (
    <>
      <Form form={form} autoComplete='off' layout='vertical' onFinish={mutateAsync}>
        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Username is required' }]}>
          <Input max={20} allowClear />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password max={20} allowClear />
        </Form.Item>

        <Button htmlType='submit' type='primary' loading={isPending}>
          OK
        </Button>
      </Form>
    </>
  )
}
