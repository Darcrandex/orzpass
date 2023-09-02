'use client'
import { User } from '@/types/user'
import { LogoutOutlined } from '@ant-design/icons'
import { Avatar } from 'antd'
import { deleteCookie } from 'cookies-next'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import NavItem from './NavItem'

export default function AsideMenus({ user }: { user?: User }) {
  const router = useRouter()

  const onSignOut = () => {
    deleteCookie(process.env.NEXT_APP_AUTH_KEY || '')
    router.replace('/sign')
  }

  return (
    <>
      <aside className='w-80 border-r'>
        <nav className='flex flex-col space-y-4'>
          <Link href='/notes' replace>
            note list
          </Link>

          <Link href='/about' replace>
            about
          </Link>
        </nav>

        {user ? (
          <>
            <span className='text-center text-white'>
              <Avatar size={60} src={user?.avatarUrl} className='shadow-md outline outline-white'>
                <span className='uppercase'>{user?.username.slice(0, 1)}</span>
              </Avatar>
              <p className='mx-4 mt-2 truncate'>{user?.username}</p>
            </span>

            <NavItem icon={<LogoutOutlined />} title='Sign Out' className='mb-6' onClick={onSignOut} />
          </>
        ) : null}
      </aside>
    </>
  )
}
