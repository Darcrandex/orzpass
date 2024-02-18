/**
 * @name ToastItem
 * @description
 * @author darcrand
 */

'use client'
import { toast } from '@/ui/Toast'
import { faCheckCircle, faCircleExclamation, faCircleInfo } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { DEFAULT_DURATION } from './const'
import { ToastItemProps } from './types'

const iconMap = {
  success: <FontAwesomeIcon icon={faCheckCircle} className='text-emerald-400' />,
  error: <FontAwesomeIcon icon={faCircleExclamation} className='text-rose-500' />,
  info: <FontAwesomeIcon icon={faCircleInfo} className='text-sky-400' />,
}

export default function ToastItem(props: ToastItemProps) {
  useEffect(() => {
    const t = setTimeout(() => toast.close(props.id), Math.max(0, props.duration || DEFAULT_DURATION))
    return () => clearTimeout(t)
  }, [props.duration, props.id])

  return (
    <article className='inline-flex items-center w-auto min-w-10 p-2 space-x-2 rounded-md shadow-md bg-white'>
      {props.showIcon !== false && iconMap[props.type || 'info']}

      <p className='text-sm'>{props.message}</p>
    </article>
  )
}
