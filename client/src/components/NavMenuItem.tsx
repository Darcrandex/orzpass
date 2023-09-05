/**
 * @name NavMenuItem
 * @description 导航按钮
 * @author darcrand
 */

import clsx from 'clsx'
import { startsWith } from 'ramda'
import { ReactNode, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type NavMenuItemProps = {
  to?: string
  title?: string
  icon?: ReactNode
  className?: string
  onClick?: () => void
}
export default function NavMenuItem(props: NavMenuItemProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const isActive = props.to && startsWith(props.to, location.pathname)

  const onClick = useCallback(() => {
    props.onClick?.()
    if (props.to) navigate(props.to)
  }, [navigate, props])

  return (
    <>
      <label
        onClick={onClick}
        className={clsx(
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
