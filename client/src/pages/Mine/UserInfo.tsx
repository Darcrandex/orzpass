/**
 * @name UserInfo
 * @description 基本信息
 * @author darcrand
 */

import { apiUser } from '@/services/user'
import { useUserState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { useSize } from 'ahooks'
import { Button, Form, Input, Space } from 'antd'
import { mergeLeft } from 'ramda'
import { useCallback, useEffect } from 'react'

export default function UserInfo() {
  const { user, onSignIn } = useUserState()
  const [form] = Form.useForm()
  useEffect(() => {
    if (form && user) {
      form.setFieldsValue(user)
    }
  }, [form, user])

  const avatarValidator = async (rule: any, value: string) => {
    if (!value || value.length === 0) {
      return
    } else {
      if (/\s/g.test(value)) {
        return Promise.reject('the url path cannot contain any whitespace')
      } else {
        return
      }
    }
  }

  const { mutateAsync } = useMutation({
    mutationFn: apiUser.updateInfo,
    onSuccess(data) {
      onSignIn(data)
    },
  })

  const onFinish = useCallback(
    (values: any) => {
      if (user) mutateAsync(mergeLeft(values, user))
    },
    [mutateAsync, user]
  )

  const { width = 1920 } = useSize(document.querySelector('body')) || {}

  return (
    <>
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish}>
        <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Username is required' }]}>
          <Input maxLength={20} allowClear disabled />
        </Form.Item>

        <Form.Item name='email' label='Email' rules={[{ type: 'email' }]}>
          <Input maxLength={30} allowClear />
        </Form.Item>

        <Form.Item label='Avatar' name='avatarUrl' rules={[{ validator: avatarValidator }]}>
          <Input.TextArea allowClear placeholder='input a online image url' />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: width >= 640 ? 6 : 0 }}>
          <Space>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
