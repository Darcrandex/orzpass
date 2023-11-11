/**
 * @name SignIn
 * @description
 * @author darcrand
 */

'use client'

import { http } from '@/utils/http'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [form] = Form.useForm()
  const router = useRouter()

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: (values: any) => {
      return http.post<{ token: string }>('/api/user/login', values)
    },
    onSuccess: (res) => {
      console.log('res.data.token', res.data.token)

      window.localStorage.setItem('token', res.data.token)
      router.replace('/home')
    },
  })

  return (
    <>
      <h1>sign in</h1>

      <Form form={form} onFinish={onSubmit}>
        <Form.Item name='username'>
          <Input />
        </Form.Item>

        <Form.Item name='password'>
          <Input />
        </Form.Item>

        <Form.Item>
          <Button htmlType='submit'>ok</Button>
        </Form.Item>
      </Form>
    </>
  )
}
