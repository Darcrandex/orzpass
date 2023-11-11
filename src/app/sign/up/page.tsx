/**
 * @name SignUp
 * @description
 * @author darcrand
 */

'use client'
import { http } from '@/utils/http'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useRouter } from 'next/navigation'

export default function SignUp() {
  const [form] = Form.useForm()
  const router = useRouter()

  const { mutateAsync: onSubmit } = useMutation({
    mutationFn: (values: any) => {
      return http.post('/api/user/registry', values)
    },
    onSuccess: () => {
      router.replace('/sign/in')
    },
  })

  return (
    <>
      <h1>SignUp</h1>

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
