/**
 * @name Textarea
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { TextareaProps } from './types'

export default function Textarea(props: TextareaProps) {
  return (
    <>
      <textarea
        className={cls(
          'block w-full border rounded px-2 py-1 outline-none focus:border-pink-500 placeholder:text-gray-300 resize-y',
          ' transition-colors',
          props.hideBorder && 'border-transparent',

          props.className
        )}
        rows={props.rows || 3}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        maxLength={props.maxLength}
        value={props.value}
        onChange={(e) => props.onChange?.(e.target.value)}
      />
    </>
  )
}
