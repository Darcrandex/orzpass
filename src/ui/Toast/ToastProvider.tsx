/**
 * @name ToastProvider
 * @description
 * @author darcrand
 */

'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren, useState } from 'react'
import { createPortal } from 'react-dom'
import ToastItem from './ToastItem'
import { ToastContext } from './context'
import { ToastItemProps } from './types'

export default function ToastProvider(props: PropsWithChildren) {
  const [items, setItems] = useState<ToastItemProps[]>([])

  if (typeof window === 'undefined') return null

  return (
    <ToastContext.Provider value={{ items, setItems }}>
      {props.children}

      {createPortal(
        <ul className='fixed bottom-0 right-0 z-10 space-y-2'>
          <AnimatePresence>
            {items.map((v) => (
              <motion.li
                key={v.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.25 }}
              >
                <ToastItem {...v} />
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>,
        window.document.body
      )}
    </ToastContext.Provider>
  )
}
