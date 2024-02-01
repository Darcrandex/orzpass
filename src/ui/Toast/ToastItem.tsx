/**
 * @name ToastItem
 * @description
 * @author darcrand
 */

'use client'
import { toast } from '@/ui/Toast'
import { useEffect } from 'react'
import { DEFAULT_DURATION } from './const'
import { ToastItemProps } from './types'

export default function ToastItem(props: ToastItemProps) {
  useEffect(() => {
    const t = setTimeout(() => toast.close(props.id), Math.max(0, props.duration || DEFAULT_DURATION))
    return () => clearTimeout(t)
  }, [props.duration, props.id])

  return (
    <article className='w-48 p-4 rounded-md shadow-md bg-white'>
      <h4>{props.title}</h4>
      <p>{props.message}</p>
    </article>
  )
}
