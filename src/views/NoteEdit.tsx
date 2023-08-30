/**
 * @name NoteEdit
 * @description
 * @author darcrand
 */

'use client'
import { createNote } from '@/actions/note'
import { useMutation } from '@tanstack/react-query'
import { Button, Form, Input } from 'antd'
import { useState } from 'react'

export default function NoteEdit() {
  const [form] = Form.useForm()
  const [msg, setMsg] = useState('')

  const { mutateAsync, isPending } = useMutation({ mutationFn: createNote })

  const onFinish = async (values: any) => {
    const res = await mutateAsync({ title: values.title })
    setMsg(res.msg)
  }

  return (
    <>
      <section>
        <h1>NoteEdit</h1>

        <Form autoComplete='off' form={form} onFinish={onFinish}>
          <Form.Item label='Title' name='title'>
            <Input maxLength={20} placeholder='title' />
          </Form.Item>

          <Form.Item>
            <Button type='primary' htmlType='submit' loading={isPending}>
              ok
            </Button>
          </Form.Item>
        </Form>

        <p>msg: {msg}</p>
      </section>
    </>
  )
}
