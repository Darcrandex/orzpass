/**
 * @name NavItem
 * @description 导航按钮
 * @author darcrand
 */

'use client'
import { cls } from '@/utils/common'
import { usePathname, useRouter } from 'next/navigation'
import { startsWith } from 'ramda'
import { ReactNode, useCallback } from 'react'

export type NavItemProps = { to?: string; title?: string; icon?: ReactNode; className?: string; onClick?: () => void }
export default function NavItem(props: NavItemProps) {
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
          'flex justify-center ml-2 mt-4 p-2 rounded-l-lg transition-all cursor-pointer',
          isActive ? 'text-pink-500 !bg-white' : 'text-gray-100 hover:bg-white/25',
          props.className
        )}
      >
        {props.icon}
        <span className='ml-2 w-20'>{props.title}</span>
      </label>
    </>
  )
}
