/**
 * @name PasswordEdit
 * @description 密码编辑器，集成了密钥设置
 * @author darcrand
 */

'use client'
import KeySetter from '@/components/KeySetter'
import { useCopy } from '@/hooks/useCopy'
import { useMasterKey } from '@/stores/master-key'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { aes } from '@/utils/aes'
import { randomStr } from '@/utils/randomStr'
import { useCallback, useMemo } from 'react'

export type PasswordEditProps = {
  value?: string
  onChange?: (value: string) => void
}

export default function PasswordEdit(props: PasswordEditProps) {
  const { key } = useMasterKey()

  // 加密秘钥是否有错误
  const isInvalidKey = useMemo(() => {
    if (key?.trim()) {
      if (props.value?.trim()) {
        return aes.decode(props.value, key).length === 0
      } else {
        return false
      }
    } else {
      return true
    }
  }, [key, props.value])

  const value = useMemo(() => {
    let res = ''
    try {
      if (key && props.value) {
        res = aes.decode(props.value, key)
      }
    } catch (error) {}
    return res
  }, [key, props.value])

  const onChange = useCallback(
    (value: string) => {
      if (key?.trim()) {
        props.onChange?.(aes.encode(value, key))
      }
    },
    [key, props]
  )

  const [copy] = useCopy()

  if (isInvalidKey)
    return (
      <>
        <p>
          Your master key is <b className='inline-block uppercase text-rose-500'>invalid</b>
          <KeySetter className='ml-2'>Set Master Key</KeySetter>
        </p>
      </>
    )

  return (
    <>
      <Input block value={value} onChange={onChange} />

      <p className='space-x-2'>
        <Button className='mt-2' onClick={() => onChange(randomStr({ length: 12 }))}>
          Generate Password
        </Button>

        <Button onClick={() => copy(value)}>Copy Password</Button>
      </p>
    </>
  )
}
