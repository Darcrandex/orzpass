/**
 * @name SideMenus
 * @description
 * @author darcrand
 */

'use client'

import { cls } from '@/utils/cls'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faArrowRightFromBracket, faFaceSmileWink, faPaperclip } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const menus = [
  { href: '/home', title: 'Home', icon: <FontAwesomeIcon icon={faPaperclip} /> },
  { href: '/home/about', title: 'About', icon: <FontAwesomeIcon icon={faGithub} /> },
  { href: '/home/profile', title: 'Profile', icon: <FontAwesomeIcon icon={faFaceSmileWink} /> },
  { href: '/sign/login', title: 'Out', icon: <FontAwesomeIcon icon={faArrowRightFromBracket} /> },
]

export default function SideMenus() {
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  return (
    <>
      <nav className='space-y-4 my-4'>
        {menus.map((menu) => (
          <Link
            key={menu.href}
            href={menu.href}
            className={cls(
              'flex items-center space-x-2 cursor-pointer transition-all rounded-md px-4 py-2 mx-4 text-white',
              isActive(menu.href) ? 'bg-white/30' : 'hover:bg-white/10'
            )}
          >
            <i className='text-base'>{menu.icon}</i>
            <span>{menu.title}</span>
          </Link>
        ))}
      </nav>
    </>
  )
}
