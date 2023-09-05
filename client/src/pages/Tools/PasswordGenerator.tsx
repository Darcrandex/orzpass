/**
 * @name PasswordGenerator
 * @description 密码生成器
 * @author darcrand
 */

import { RandomStringOptions, randomString } from '@/utils/random-string'
import { App, Button, Checkbox, Col, Form, InputNumber, Row, Space } from 'antd'
import { useCallback, useState } from 'react'
import { useCopyToClipboard } from 'react-use'

const initialValues = {
  length: 8,
  includeNumber: true,
  includeLower: true,
  includeUpper: true,
  includeSymbol: true,
  noSimilar: false,
  startWithLetter: false,
  noDuplicate: false,
  noSequential: false,
}

export default function PasswordGenerator() {
  const [pwd, setPwd] = useState<string>()
  const [form] = Form.useForm()
  const onFinish = (values: RandomStringOptions) => {
    setPwd(randomString(values))
  }

  const { message } = App.useApp()
  const [, onCopy] = useCopyToClipboard()
  const copy = useCallback(
    (str?: string) => {
      if (str) {
        onCopy(str)
        message.success('copy success')
      }
    },
    [message, onCopy]
  )

  return (
    <>
      <section className='mx-4'>
        <Form form={form} onFinish={onFinish} initialValues={initialValues} layout='vertical'>
          <Row>
            <Col xs={24} sm={12}>
              <Form.Item label='Length' name='length'>
                <InputNumber min={1} max={32} style={{ width: 220 }} />
              </Form.Item>

              <Form.Item label='Include Numbers' name='includeNumber' valuePropName='checked'>
                <Checkbox>e.g. 123456</Checkbox>
              </Form.Item>

              <Form.Item label='Include Lowercase' name='includeLower' valuePropName='checked'>
                <Checkbox>e.g. abcdefgh</Checkbox>
              </Form.Item>

              <Form.Item label='Include Uppercase' name='includeUpper' valuePropName='checked'>
                <Checkbox>e.g. ABCDEFGH</Checkbox>
              </Form.Item>

              <Form.Item label='Include Symbols' name='includeSymbol' valuePropName='checked'>
                <Checkbox>e.g. !";#$%&'()*</Checkbox>
              </Form.Item>
            </Col>

            <Col xs={24} sm={12}>
              <Form.Item label='Begin With A Letter' name='startWithLetter' valuePropName='checked'>
                <Checkbox>don't begin with a number or symbol</Checkbox>
              </Form.Item>

              <Form.Item label='No Similar' name='noSimilar' valuePropName='checked'>
                <Checkbox>don't use characters like i, l, 1, L, o, 0, O, etc.</Checkbox>
              </Form.Item>

              <Form.Item label='No Duplicate' name='noDuplicate' valuePropName='checked'>
                <Checkbox>don't use the same character more than once</Checkbox>
              </Form.Item>

              <Form.Item label='No Sequential' name='noSequential' valuePropName='checked'>
                <Checkbox>don't use sequential characters, e.g. abc, 789</Checkbox>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button htmlType='submit' type='primary'>
                generate
              </Button>

              <Button disabled={!pwd} onClick={() => copy(pwd)}>
                Copy
              </Button>
            </Space>
          </Form.Item>

          <Form.Item label='New Password'>
            <p className='p-4 border rounded-md'>
              {pwd || <span className='text-gray-400'>generate a password first</span>}
            </p>
          </Form.Item>
        </Form>
      </section>
    </>
  )
}
