/**
 * @name Button
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { ButtonProps } from './types'

export default function Button(props: ButtonProps) {
  const variant = props.variant || 'default'

  return (
    <>
      <button
        type={props.type || 'button'}
        className={cls(
          'items-center justify-center px-2 py-1 rounded transition-all',
          variant === 'default' && 'bg-white border hover:border-primary hover:text-primary',
          variant === 'primary' && 'bg-primary text-white border border-primary hover:bg-primary/75',
          variant === 'link' && 'bg-transparent text-primary hover:text-primary/75',

          props.block ? 'flex w-full' : 'inline-flex',
          props.className
        )}
        onClick={props.onClick}
      >
        {props.children}
      </button>
    </>
  )
}
