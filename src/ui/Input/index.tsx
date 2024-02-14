/**
 * @name Input
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useState } from 'react'
import { InputProps } from './types'

export default function Input(props: InputProps) {
  const [currType, setCurrType] = useState(props.type || 'text')
  const [eyeOpen, setEyeOpen] = useState(false)
  const onToggleEye = () => {
    const nextValue = !eyeOpen
    setEyeOpen(nextValue)
    setCurrType(nextValue ? 'text' : 'password')
  }

  return (
    <label className={cls('relative', props.block ? 'flex' : 'inline-flex', props.className)}>
      <input
        type={currType}
        placeholder={props.placeholder}
        className={cls(
          'border rounded pl-2 py-1 outline-none focus:border-pink-500 transition-all',
          'placeholder:text-gray-300',
          props.hideBorder && 'border-transparent',
          props.type === 'password' ? 'pr-10' : 'pr-2',
          props.block && 'w-full'
        )}
        maxLength={props.maxLength || 100}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            props.onEnter?.()
          }
        }}
      />

      {props.type === 'password' && (
        <i className='absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer px-1' onClick={onToggleEye}>
          <FontAwesomeIcon
            className='text-gray-300 text-sm hover:text-gray-500 transition-all'
            icon={eyeOpen ? faEye : faEyeSlash}
          />
        </i>
      )}
    </label>
  )
}
