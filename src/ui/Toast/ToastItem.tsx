/**
 * @name ToastItem
 * @description
 * @author darcrand
 */

'use client'
import { useEffect } from 'react'
import { DEFAULT_DURATION } from './const'
import { useToast } from './context'
import { ToastItemProps } from './types'

export default function ToastItem(props: ToastItemProps) {
  const { closeToast } = useToast()

  useEffect(() => {
    setTimeout(() => {
      closeToast(props.id)
    }, Math.max(0, props.duration || DEFAULT_DURATION))
  }, [closeToast, props.duration, props.id])

  return (
    <article className='w-48 p-4 rounded-md shadow-md bg-white'>
      <h4>{props.title}</h4>
      <p>{props.message}</p>
    </article>
  )
}
