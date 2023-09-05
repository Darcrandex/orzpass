/**
 * @name KeyGenerator
 * @description key 生成器
 * @author darcrand
 */

import { ArrowDownOutlined, ArrowUpOutlined } from '@ant-design/icons'
import { App, Button, Input, Space } from 'antd'
import { useCallback, useState } from 'react'
import { useCopyToClipboard } from 'react-use'

export default function KeyGenerator() {
  const [source, setSource] = useState<string>()
  const [encoded, setEncode] = useState<string>()

  const btoa = useCallback(() => {
    if (source) setEncode(fnEncode(source))
  }, [source])

  const atob = useCallback(() => {
    if (encoded) setSource(fnDecode(encoded))
  }, [encoded])

  const { message } = App.useApp()
  const [, copy] = useCopyToClipboard()
  const onCopy = useCallback(
    (str?: string) => {
      if (str?.trim()) {
        copy(str)
        message.success('copy success')
      }
    },
    [copy, message]
  )

  return (
    <>
      <Input.TextArea
        placeholder='source content'
        allowClear
        rows={5}
        maxLength={200}
        showCount
        value={source}
        onChange={(e) => setSource(e.target.value)}
      />

      <div className='my-4 max-sm:my-8'>
        <Space wrap>
          <Button icon={<ArrowDownOutlined />} onClick={btoa}>
            Encode
          </Button>
          <Button icon={<ArrowUpOutlined />} onClick={atob}>
            Decode
          </Button>

          <Button onClick={() => onCopy(source)}>copy source</Button>
          <Button onClick={() => onCopy(encoded)}>copy encoded</Button>
        </Space>
      </div>

      <Input.TextArea
        placeholder='encoded'
        allowClear
        rows={5}
        showCount
        maxLength={1000}
        value={encoded}
        onChange={(e) => setEncode(e.target.value)}
      />
    </>
  )
}

const ENCODE_TIMES = Math.min(10, Math.max(1, Number.parseInt(import.meta.env.VITE_APP_ENCODE_TIMES || '1')))

function fnEncode(content: string) {
  let res = window.encodeURIComponent(content)
  for (let i = 0; i < ENCODE_TIMES; i++) {
    res = window.btoa(res)
  }

  res = res.split('').reverse().join('').replace(/=/gm, '$')
  return res
}

function fnDecode(encoded: string) {
  let res = encoded.split('').reverse().join('').replace(/\$/g, '=')
  for (let i = 0; i < ENCODE_TIMES; i++) {
    res = window.atob(res)
  }
  return window.decodeURIComponent(res)
}
