/**
 * @name Checkbox
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { CheckboxProps } from './types'

export default function Checkbox(props: CheckboxProps) {
  return (
    <>
      <label className={cls('group/form-checkbox-label inline-flex items-center cursor-pointer', props.className)}>
        <input
          type='checkbox'
          className='form-checkbox rounded text-primary focus:ring-transparent border-primary'
          checked={props.checked}
          onChange={(e) => props.onChange?.(e.target.checked)}
        />
        <span className='ml-2 select-none group-hover/form-checkbox-label:opacity-75 transition-all'>
          {props.children}
        </span>
      </label>
    </>
  )
}
