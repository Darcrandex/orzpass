/**
 * @name InputPassword
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { InputPasswordProps } from './types'

export default function InputPassword(props: InputPasswordProps) {
  const [currType, setCurrType] = useState<'text' | 'password'>('text')
  const [eyeOpen, setEyeOpen] = useState(false)
  const onToggleEye = () => {
    const nextValue = !eyeOpen
    setEyeOpen(nextValue)
    setCurrType(nextValue ? 'text' : 'password')
  }

  return (
    <>
      <label className={cls('relative inline-flex', props.className)}>
        <input
          type={currType}
          placeholder={props.placeholder}
          maxLength={props.maxLength || 100}
          defaultValue={props.defaultValue}
          className={cls(
            'border rounded pl-2 pr-10 py-1 outline-none focus:border-pink-500 transition-all',
            'placeholder:text-gray-300'
          )}
          value={props.value}
          onChange={(e) => props.onChange?.(e.target.value)}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              props.onEnter?.()
            }
          }}
        />

        <i className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer px-1' onClick={onToggleEye}>
          <FontAwesomeIcon
            className='text-gray-300 text-sm hover:text-gray-500 transition-all'
            icon={eyeOpen ? faEye : faEyeSlash}
          />
        </i>
      </label>
    </>
  )
}
