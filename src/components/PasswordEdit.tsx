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
  maxLength?: number
}

export default function PasswordEdit(props: PasswordEditProps) {
  const { key } = useMasterKey()

  // 加密秘钥是否有错误
  const isInvalidKey = useMemo(() => {
    // 没有 key，直接错误
    if (!key || key?.trim().length === 0) return true

    // 值为空，则表示没有加密过，是没有错误的
    if (typeof props.value === 'undefined') return false

    try {
      // 尝试解密，如果解密成功，则表示没有错误
      aes.decode(props.value, key)
      return false
    } catch (error) {
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
      <Input block value={value} maxLength={props.maxLength} onChange={onChange} />

      <p className='space-x-2'>
        <Button className='mt-2' onClick={() => onChange(randomStr({ length: 12 }))}>
          generate password
        </Button>

        <Button onClick={() => copy(value)}>copy password</Button>
      </p>
    </>
  )
}
