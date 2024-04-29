/**
 * @name PasswordView
 * @description
 * @author darcrand
 */

'use client'
import KeySetter from '@/components/KeySetter'
import { useCopy } from '@/hooks/useCopy'
import { useMasterKey } from '@/stores/master-key'
import Button from '@/ui/Button'
import TextView from '@/ui/TextView'
import { aes } from '@/utils/aes'
import { faCopy, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty, isNil, isNotNil } from 'ramda'
import { useMemo, useState } from 'react'

export type PasswordViewProps = { value?: string }

export default function PasswordView(props: PasswordViewProps) {
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

  const [copy] = useCopy()

  const [show, setShow] = useState(false)

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
      <div className='flex items-center space-x-2'>
        <TextView className='flex-1'>{show ? value : '********'}</TextView>

        <Button onClick={() => setShow(!show)}>
          <span className='w-[1em]'>
            <FontAwesomeIcon className='text-sm' icon={show ? faEye : faEyeSlash} />
          </span>
        </Button>

        <Button onClick={() => copy(value)}>
          <span className='w-[1em]'>
            <FontAwesomeIcon className='text-sm' icon={faCopy} />
          </span>
        </Button>
      </div>
    </>
  )
}
