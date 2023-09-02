/**
 * @name NavMenuItem
 * @description 导航按钮
 * @author darcrand
 */

import { cls } from '@/utils/common'
import { usePathname, useRouter } from 'next/navigation'
import { startsWith } from 'ramda'
import { ReactNode, useCallback } from 'react'

export type NavMenuItemProps = {
  to?: string
  title?: string
  icon?: ReactNode
  className?: string
  onClick?: () => void
}
export default function NavMenuItem(props: NavMenuItemProps) {
  const router = useRouter()
  const pathname = usePathname()
  const isActive = props.to && startsWith(props.to, pathname)

  const onClick = useCallback(() => {
    props.onClick?.()
    if (props.to) router.push(props.to)
  }, [props, router])

  return (
    <>
      <label
        onClick={onClick}
        className={cls(
          'flex mb-6 last:mb-0 rounded-l-lg transition-all cursor-pointer text-lg',
          isActive ? 'text-pink-500' : 'text-gray-500',
          props.className
        )}
      >
        {props.icon}
        <span className='ml-2 w-20'>{props.title}</span>
      </label>
    </>
  )
}
