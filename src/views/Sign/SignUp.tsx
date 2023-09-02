/**
 * @name SignUp
 * @description
 * @author darcrand
 */

'use client'
import { apiUserSignUp } from '@/services/user'
import { clientAES } from '@/utils/client-aes'
import { Button, Form, Input } from 'antd'

export default function SignUp() {
  const [form] = Form.useForm()
  const onSubmit = async (values: any) => {
    const res = await apiUserSignUp({
      username: values.username,
      password: clientAES.encrypt(values.password),
    })
  }

  return (
    <>
      <Form form={form} autoComplete='off' layout='vertical' onFinish={onSubmit}>
        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Username is required' }]}>
          <Input max={20} allowClear />
        </Form.Item>
        <Form.Item label='Password' name='password' rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password max={20} allowClear />
        </Form.Item>

        <Button htmlType='submit' type='primary'>
          OK
        </Button>
      </Form>
    </>
  )
}
