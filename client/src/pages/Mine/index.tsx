/**
 * @name Mine
 * @description
 * @author darcrand
 */

import BackButton from '@/components/BackButton'
import { apiUser } from '@/services/user'
import { useUserState } from '@/stores/user'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input, Space } from 'antd'
import { mergeLeft } from 'ramda'
import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useWindowSize } from 'react-use'

export default function Mine() {
  const navigate = useNavigate()
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

  const { width } = useWindowSize()

  return (
    <>
      <section className='flex flex-col h-full'>
        <header className='p-4'>
          <BackButton />
        </header>

        <section className='flex-1 overflow-x-hidden overflow-y-auto'>
          <div className='mx-4'>
            <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 12 }} onFinish={onFinish}>
              <Form.Item label='Username' name='username' rules={[{ required: true, message: 'Username is required' }]}>
                <Input maxLength={20} allowClear />
              </Form.Item>

              <Form.Item name='email' label='Email' rules={[{ type: 'email' }]}>
                <Input maxLength={30} allowClear />
              </Form.Item>

              <Form.Item label='Avatar' name='avatarUrl' rules={[{ validator: avatarValidator }]}>
                <Input.TextArea allowClear placeholder='input a online image url' />
              </Form.Item>

              <Form.Item wrapperCol={{ offset: width >= 640 ? 6 : 0 }}>
                <Space>
                  <Button onClick={() => navigate(-1)}>Cancel</Button>
                  <Button type='primary' htmlType='submit'>
                    Update
                  </Button>
                </Space>
              </Form.Item>
            </Form>
          </div>
        </section>
      </section>
    </>
  )
}
