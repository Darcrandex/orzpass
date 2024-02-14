/**
 * @name FormItem
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { FormItemProps } from './types'

export default function FormItem(props: FormItemProps) {
  return (
    <>
      <fieldset className={cls('mb-4', props.className)}>
        <label className='block mb-2 text-gray-400'>{props.label}</label>
        {props.children}
      </fieldset>
    </>
  )
}
