/**
 * @name SignUp
 * @description 注册
 * @author darcrand
 */

import { apiAddUser, apiGetUsers } from '@/services/user'
import { MAX_USER_COUNT } from '@/types/enum'
import { User } from '@/types/user'
import { useMutation } from '@tanstack/react-query'
import { App, Button, Form, Input } from 'antd'
import { useCallback, useState } from 'react'
import { useCopyToClipboard } from 'react-use'

export default function SignUp() {
  const { message } = App.useApp()
  const [userInfo, setUser] = useState<User | undefined>()
  const [form] = Form.useForm()

  const { mutateAsync, isLoading } = useMutation(
    async (values: any) => {
      const { username: name } = values || {}
      const all = await apiGetUsers()
      if (all.some((v) => v.name === name)) {
        throw new Error('the user name already exists')
      } else if (all.length >= MAX_USER_COUNT) {
        throw new Error('the maximum number of users has been reached')
      }

      return apiAddUser({ name })
    },
    {
      onSuccess(data) {
        setUser(data)
      },
      onError(error: Error) {
        message.error(error.message || 'sign up fail')
      },
    }
  )

  const [, copy] = useCopyToClipboard()
  const onCopy = useCallback(() => {
    if (userInfo?.code) {
      copy(userInfo.code)
      message.success('copy success')
    }
  }, [copy, message, userInfo?.code])

  return (
    <>
      <Form form={form} autoComplete='off' layout='vertical' onFinish={mutateAsync}>
        <Form.Item label='Name' name='username' rules={[{ required: true, message: 'Name is required' }]}>
          <Input maxLength={20} allowClear />
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit' loading={isLoading}>
            OK
          </Button>
        </Form.Item>
      </Form>

      {Boolean(userInfo?.code) && (
        <>
          <p className='mb-2 text-gray-700'>
            Registration is successful, the SIGN IN CODE can NOT be modified, you must save it. Click to copy the code.
          </p>
          <Button block type='primary' size='large' onClick={onCopy}>
            <span className='tracking-widest'>{userInfo?.code}</span>
          </Button>
        </>
      )}
    </>
  )
}
