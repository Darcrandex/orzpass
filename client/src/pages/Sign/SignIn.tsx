/**
 * @name SignIn
 * @description 登录
 * @author darcrand
 */

import { apiUser } from '@/services/user'
import { useUserState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const { onSignIn } = useUserState()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: async (values: any) => {
      const res = await apiUser.login(values)
      localStorage.setItem('token', res)
      const user = await apiUser.getInfo()
      onSignIn(user)
      navigate('/')
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

        <Button htmlType='submit' type='primary' loading={isLoading}>
          OK
        </Button>
      </Form>
    </>
  )
}
