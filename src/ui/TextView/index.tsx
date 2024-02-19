/**
 * @name TextView
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { PropsWithChildren } from 'react'

export type TextViewProps = PropsWithChildren<{ className?: string; placeholder?: string }>

export default function TextView(props: TextViewProps) {
  return (
    <>
      <p className={cls('border rounded pl-2 py-1', props.className)}>
        {props.children || <span className='text-gray-300 select-none'>{props.placeholder || 'no content'}</span>}
      </p>
    </>
  )
}
