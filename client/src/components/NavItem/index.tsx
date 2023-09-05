/**
 * @name NavItem
 * @description 导航按钮
 * @author darcrand
 */

import clsx from 'clsx'
import { startsWith } from 'ramda'
import { ReactNode, useCallback } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export type NavItemProps = { to?: string; title?: string; icon?: ReactNode; className?: string; onClick?: () => void }
export default function NavItem(props: NavItemProps) {
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
