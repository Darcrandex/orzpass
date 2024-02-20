/**
 * @name Drawer
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { DrawerProps } from './types'

export default function Drawer(props: DrawerProps) {
  useEffect(() => {
    document.body.style.overflow = props.open ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [props.open])

  if (typeof window === 'undefined') return null

  return createPortal(
    <>
      <AnimatePresence>
        {props.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed z-20 top-0 right-0 bottom-0 left-0 bg-black/25 pointer-events-auto'
            onClick={props.onClose}
          ></motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {props.open && (
          <motion.section
            initial={{ translateX: '-100%', opacity: 0 }}
            animate={{ translateX: 0, opacity: 1 }}
            exit={{ translateX: '-100%', opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className={cls('fixed z-20 top-0 left-0 bottom-0 w-80 bg-white pointer-events-auto', props.bodyClassName)}
          >
            {typeof props.header !== 'undefined' ? (
              props.header
            ) : (
              <header className='flex items-center justify-between font-bold'>
                <span>{props.title}</span>

                <i
                  className='flex items-center justify-center cursor-pointer p-1 hover:text-gray-500 transition-all'
                  onClick={props.onClose}
                >
                  <FontAwesomeIcon icon={faXmark} className='text-base' />
                </i>
              </header>
            )}

            <main>{props.open && props.children}</main>
          </motion.section>
        )}
      </AnimatePresence>
    </>,

    window.document.body
  )
}
