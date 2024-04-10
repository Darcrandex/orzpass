/**
 * @name SideMenus
 * @description
 * @author darcrand
 */

'use client'

import { cls } from '@/utils/cls'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import {
  faArrowRightFromBracket,
  faFaceSmileWink,
  faLink,
  faPaperclip,
  faTools,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useMemo } from 'react'

export const menus = [
  { href: '/home', title: 'Home', icon: <FontAwesomeIcon icon={faPaperclip} /> },
  { href: '/home/tools', title: 'Tools', icon: <FontAwesomeIcon icon={faTools} /> },
  { href: '/home/about', title: 'About', icon: <FontAwesomeIcon icon={faGithub} /> },
  { href: '/home/profile', title: 'Profile', icon: <FontAwesomeIcon icon={faFaceSmileWink} /> },
  { href: '/sign/login', title: 'Logout', icon: <FontAwesomeIcon icon={faArrowRightFromBracket} /> },
]

export default function SideMenus() {
  const pathname = usePathname()
  const isActive = (href: string) => {
    if (pathname.includes('post')) {
      return href === '/home'
    }

    return pathname === href
  }

  // 多个云平台的链接切换
  const platformLink = useMemo(() => {
    const cloudPlatforms = ['netlify', 'vercel']
    const currIndex = cloudPlatforms.findIndex((platform) => window.location.hostname.includes(platform))
    if (currIndex !== -1) {
      const targetPlatform = cloudPlatforms[(currIndex + 1) % cloudPlatforms.length]
      const targetUrl = window.origin.replace(cloudPlatforms[currIndex], targetPlatform)
      return { href: targetUrl, title: `to ${targetPlatform}` }
    }
    return null
  }, [])

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

        {platformLink ? (
          <Link
            href={platformLink.href}
            target='_blank'
            className='flex items-center space-x-2 cursor-pointer transition-all rounded-md px-4 py-2 mx-4 text-white hover:bg-white/10'
          >
            <i className='text-base'>
              <FontAwesomeIcon icon={faLink} />
            </i>
            <span>{platformLink.title}</span>
          </Link>
        ) : null}
      </nav>
    </>
  )
}
