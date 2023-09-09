/**
 * @name KeyModal
 * @description
 * @author darcrand
 */

import { useGlobalKey } from '@/stores/key'
import { SettingOutlined } from '@ant-design/icons'
import { useToggle } from 'ahooks'
import { Button, Form, Input, Modal, Space } from 'antd'
import { ReactNode, useEffect } from 'react'

export type KeyModalProps = { renderTrigger?: (onOpen: () => void) => ReactNode }

export default function KeyModal(props: KeyModalProps) {
  const [open, { toggle }] = useToggle(false)

  return (
    <>
      {typeof props.renderTrigger === 'function' ? (
        props.renderTrigger(toggle)
      ) : (
        <Button type='primary' icon={<SettingOutlined />} onClick={toggle}>
          Set Key
        </Button>
      )}

      <Modal title='Set Key' onCancel={toggle} destroyOnClose open={open} footer={false}>
        <FormContent onClose={toggle} />
      </Modal>
    </>
  )
}

function FormContent(props: { onClose?: () => void }) {
  const { key, setKey } = useGlobalKey()
  const [form] = Form.useForm()
  useEffect(() => {
    if (key && form) {
      form.setFieldsValue({ key })
    }
  }, [form, key])

  const onFinish = (values: any) => {
    if (typeof values.key === 'string' && values.key.trim()) {
      setKey(values.key)
      props.onClose?.()
    }
  }

  return (
    <>
      <Form form={form} autoComplete='off' layout='vertical' onFinish={onFinish}>
        <Form.Item
          label='Key'
          name='key'
          extra='The KEY is used to encrypt and decrypt your data. And it WILL NOT be saved to the database, you need to save it yourself.'
          rules={[{ required: true, message: 'Key is required' }]}
        >
          <Input.TextArea maxLength={1000} placeholder='input your key' rows={5} allowClear />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button onClick={props.onClose}>Cancel</Button>
            <Button type='primary' htmlType='submit'>
              Update
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}
