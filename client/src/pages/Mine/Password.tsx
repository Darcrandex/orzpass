/**
 * @name Password
 * @description 密码修改
 * @author darcrand
 */

import { apiUser } from '@/services/user'
import { useUserState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { useSize } from 'ahooks'
import { Button, Form, Input, Space } from 'antd'

export default function Password() {
  const { onSignOut } = useUserState()
  const { width = 1920 } = useSize(document.querySelector('body')) || {}
  const [form] = Form.useForm()

  const { mutateAsync, isLoading } = useMutation({
    mutationFn: apiUser.updatePassword,
    onSuccess: onSignOut,
  })

  const onFinish = async (values: any) => {
    await mutateAsync(values)
  }

  return (
    <>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish}>
        <Form.Item
          name='oldPassword'
          label='Old Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password maxLength={20} allowClear />
        </Form.Item>

        <Form.Item
          name='password'
          label='New Password'
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name='confirm'
          label='Confirm Password'
          dependencies={['password']}
          rules={[
            {
              required: true,
              message: 'Please confirm your password!',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('The new password that you entered do not match!'))
              },
            }),
          ]}
        >
          <Input.Password maxLength={20} allowClear />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: width >= 640 ? 6 : 0 }}>
          <Space>
            <Button type='primary' htmlType='submit' loading={isLoading}>
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
