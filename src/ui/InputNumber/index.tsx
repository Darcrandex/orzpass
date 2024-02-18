/**
 * @name InputNumber
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { useMemo } from 'react'
import { InputNumberProps } from './types'

export default function InputNumber(props: InputNumberProps) {
  const viewValue = useMemo(() => {
    if (props.defaultValue) return props.defaultValue

    if (props.value) {
      const v = Number.parseFloat(props.value.toString())
      return Number.isNaN(v) ? 0 : v
    }

    return ''
  }, [props.defaultValue, props.value])

  return (
    <>
      <input
        type='number'
        className={cls(
          'border rounded px-2 py-1 outline-none focus:border-pink-500 transition-all',
          'placeholder:text-gray-300',
          props.className
        )}
        value={viewValue}
        onChange={(e) => props.onChange?.(Number.parseInt(e.target.value))}
        placeholder={props.placeholder}
        min={props.min}
        max={props.max}
        step={props.step}
        defaultValue={props.defaultValue}
      />
    </>
  )
}
