/**
 * @name Input
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { InputProps } from './types'

export default function Input(props: InputProps) {
  return (
    <label className={cls('', props.block ? 'flex' : 'inline-flex', props.className)}>
      <input
        type={props.type}
        placeholder={props.placeholder}
        className={cls(
          'border rounded px-2 py-1 outline-none focus:border-pink-500 transition-all',
          'placeholder:text-gray-300',
          props.block && 'w-full'
        )}
        maxLength={props.maxLength || 100}
        defaultValue={props.defaultValue}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </label>
  )
}
