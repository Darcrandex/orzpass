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
import { isEmpty, isNil, isNotNil } from 'ramda'
import { useCallback, useMemo } from 'react'

export type PasswordEditProps = {
  value?: string
  onChange?: (value: string) => void
}

export default function PasswordEdit(props: PasswordEditProps) {
  const { key } = useMasterKey()

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
      if (isNotNil(key)) {
        props.onChange?.(aes.encode(value, key))
      }
    },
    [key, props]
  )

  const [copy] = useCopy()

  // 加密秘钥是否有错误
  const isInvalidKey = useMemo(() => {
    let res = false
    if (isNil(key)) return true

    const isNotEmptyValue = !isEmpty(value)
    const isNotEmptyEncoded = isNotNil(props.value)
    const butDecodedFail = Boolean(props.value && aes.decode(props.value, key).length === 0)

    if (isNotEmptyValue && isNotEmptyEncoded && butDecodedFail) return true
    return res
  }, [key, value, props.value])

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
          generate password
        </Button>

        <Button onClick={() => copy(value)}>copy password</Button>
      </p>
    </>
  )
}
