/**
 * @name Button
 * @description
 * @author darcrand
 */

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
        className={cls(
          'items-center justify-center px-2 py-1 rounded-md select-none transition-all',
          variant === 'default' && 'bg-white border hover:border-primary hover:text-primary',
          variant === 'primary' &&
            'bg-primary text-white border border-primary hover:bg-primary/75 hover:border-primary/75',
          variant === 'link' && 'bg-transparent text-primary hover:text-primary/75',

          props.loading && 'pointer-events-none opacity-50',
          props.block ? 'flex w-full' : 'inline-flex',
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
