/**
 * @name Button
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ButtonProps } from './types'

export default function Button(props: ButtonProps) {
  const variant = props.variant || 'default'

  return (
    <>
      <button
        type={props.type || 'button'}
        className={cls(
          'items-center justify-center px-2 py-1 rounded-md select-none transition-all',
          variant === 'default' && 'bg-white border hover:border-primary hover:text-primary',
          variant === 'primary' &&
            'bg-primary text-white border border-primary hover:bg-primary/85 hover:border-primary/85',
          variant === 'link' && 'bg-transparent text-primary hover:text-primary/85',

          props.loading && 'pointer-events-none opacity-50',
          props.block ? 'flex w-full' : 'inline-flex',
          props.className
        )}
        onClick={props.onClick}
      >
        {props.loading && <FontAwesomeIcon icon={faSpinner} className='animate-spin mr-2' />}
        <span>{props.children}</span>
      </button>
    </>
  )
}
