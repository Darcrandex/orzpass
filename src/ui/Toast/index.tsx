/**
 * @name Toast
 * @description
 * @author darcrand
 */

'use client'
import { BroadcastChannel } from 'broadcast-channel'
import { AnimatePresence, motion } from 'framer-motion'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import ToastItem from './ToastItem'
import { TOAST_EVENT } from './const'
import { ChannelPayload, ToastItemProps, ToastProps } from './types'

export default function Toast(props: ToastProps) {
  const [items, setItems] = useState<ToastItemProps[]>([])

  useEffect(() => {
    const innerChannel = new BroadcastChannel<ChannelPayload>(TOAST_EVENT)
    innerChannel.addEventListener('message', (e) => {
      if (e.type === 'show') {
        setItems((items) => [...items, { id: nanoid(), ...e.options }])
      } else if (e.type === 'close') {
        setItems((items) => items.filter((v) => v.id !== e.id))
      }
    })

    return () => {
      innerChannel.close()
    }
  }, [])

  const list = props.max ? items?.slice(0, Math.max(1, props.max)) : items

  return createPortal(
    <>
      <ul data-name='toast-wrapper' className='fixed top-0 left-0 right-0 z-10 space-y-2 pointer-events-none'>
        <AnimatePresence>
          {list.map((v) => (
            <motion.li
              key={v.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.25 }}
              layout
            >
              <ToastItem {...v} />
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </>,

    window.document.body
  )
}

export const toast = {
  show(options: Omit<ToastItemProps, 'id'>) {
    const channel = new BroadcastChannel<ChannelPayload>(TOAST_EVENT)
    console.log('channel show', channel)
    channel.postMessage({ type: 'show', options })
    channel.close()
  },

  close(id: string) {
    const channel = new BroadcastChannel(TOAST_EVENT)
    console.log('channel close', channel)
    channel.postMessage({ type: 'close', id })
    channel.close()
  },
}
