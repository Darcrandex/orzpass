/**
 * @name Avatar
 * @description
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/cls'
import { AvatarProps } from './types'

export default function Avatar(props: AvatarProps) {
  return (
    <>
      <div
        className={cls(
          'flex items-center justify-center w-10 h-10 rounded-full bg-cover bg-center bg-gray-400 transition-all'
        )}
        style={{ backgroundImage: `url(${props.image})` }}
      >
        <span>{props.name || 'A'}</span>
      </div>
    </>
  )
}
