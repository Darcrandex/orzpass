/**
 * @name SignIn
 * @description 登录
 * @author darcrand
 */

import { apiGetUser } from '@/services/user'
import { useUserState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { App, Button, Form, Input } from 'antd'
import { whereEq } from 'ramda'
import { useNavigate } from 'react-router-dom'

export default function SignIn() {
  const { message } = App.useApp()
  const { onSignIn } = useUserState()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const { mutateAsync, isLoading } = useMutation(
    async (values: any) => {
      const res = await apiGetUser(values.code)
      if (whereEq(values, res)) {
        return res
      } else {
        throw new Error('incorrect name or code, try again')
      }
    },
    {
      onSuccess(data) {
        onSignIn(data)
        message.success('sign in success')
        navigate('/note')
      },
      onError(error: Error) {
        message.error(error?.message || 'sign in fail, try again')
      },
    }
  )

  return (
    <>
      <Form form={form} autoComplete='off' layout='vertical' onFinish={mutateAsync}>
        <Form.Item label='Name' name='name' rules={[{ required: true, message: 'Name is required' }]}>
          <Input max={20} allowClear />
        </Form.Item>
        <Form.Item label='Code' name='code' rules={[{ required: true, message: 'Code is required' }]}>
          <Input.Password max={20} allowClear />
        </Form.Item>

        <Button htmlType='submit' type='primary' loading={isLoading}>
          OK
        </Button>
      </Form>
    </>
  )
}
