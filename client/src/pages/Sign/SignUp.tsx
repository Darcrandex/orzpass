/**
 * @name SignUp
 * @description 注册
 * @author darcrand
 */

import { apiUser } from '@/services/user'
import { useMutation } from '@tanstack/react-query'
import { App, Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function SignUp() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { message } = App.useApp()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: apiUser.registry,
    onSuccess() {
      message.success('register success')
      navigate('/sign/1', { replace: true })
    },
  })

  return (
    <>
      <Form form={form} autoComplete='off' layout='vertical' onFinish={mutateAsync}>
        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Username is required' }]}>
          <Input maxLength={20} allowClear />
        </Form.Item>

        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password maxLength={20} allowClear />
        </Form.Item>

        <Form.Item name='email' label='Email' rules={[{ type: 'email' }]}>
          <Input maxLength={30} allowClear />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            OK
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
