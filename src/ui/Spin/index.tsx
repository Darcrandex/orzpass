/**
 * @name Spin
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren } from 'react'

export type SpinProps = PropsWithChildren<{
  className?: string
  spinning?: boolean
}>

export default function Spin(props: SpinProps) {
  return (
    <>
      <section className={cls('min-w-[200px] relative')}>
        {props.children}

        <AnimatePresence>
          {props.spinning && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className='absolute top-0 right-0 bottom-0 left-0 bg-white/50'
            >
              <i className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                <FontAwesomeIcon icon={faSpinner} className='text-2xl animate-spin text-primary' />
              </i>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
