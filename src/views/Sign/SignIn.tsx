/**
 * @name SignIn
 * @description
 * @author darcrand
 */

'use client'
import { apiUserlogin } from '@/services/user'
import { useUser } from '@/stores/use-user'
import { clientAES } from '@/utils/client-aes'
import { useMutation } from '@tanstack/react-query'
import { App as AntdApp, Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const { setUser } = useUser()
  const { message } = AntdApp.useApp()

  const router = useRouter()
  const [form] = Form.useForm()
  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiUserlogin({
        username: values.username,
        password: clientAES.encrypt(values.password),
      })

      return res.user
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
