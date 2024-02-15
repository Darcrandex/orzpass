/**
 * @name Button
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { ButtonProps } from './types'

export default function Button(props: ButtonProps) {
  const variant = props.variant || 'default'

  return (
    <>
      <button
        type={props.type || 'button'}
        disabled={props.disabled}
        className={cls(
          'items-center justify-center px-2 py-1 rounded-md select-none transition-all',
          variant === 'default' && 'bg-white border hover:border-primary hover:text-primary',
          variant === 'primary' &&
            'bg-primary text-white border border-primary hover:bg-primary/75 hover:border-primary/75',
          variant === 'link' && 'bg-transparent text-primary hover:text-primary/75',

          props.loading && 'pointer-events-none opacity-50',
          props.block ? 'flex w-full' : 'inline-flex',

          props.disabled && 'cursor-not-allowed',
          props.disabled &&
            (variant === 'link'
              ? 'text-gray-200 hover:text-gray-300'
              : variant === 'primary'
              ? 'bg-gray-200 border-gray-200 text-gray-500 hover:text-gray-500 hover:border-gray-200 hover:bg-gray-200'
              : 'bg-gray-200 border-gray-200 hover:text-gray-300 hover:border-gray-300'),
          props.className
        )}
        onClick={props.onClick}
      >
        <AnimatePresence>
          {props.loading && (
            <motion.i
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: '1.5em' }}
              exit={{ opacity: 0, width: 0 }}
              transition={{ duration: 0.25 }}
            >
              <FontAwesomeIcon icon={faSpinner} className='text-base animate-spin' />
            </motion.i>
          )}
        </AnimatePresence>

        {props.children}
      </button>
    </>
  )
}
