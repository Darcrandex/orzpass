/**
 * @name AsideMenus
 * @description pc端侧边栏
 * @author darcrand
 */

import NavItem from '@/components/NavItem'
import { navs } from '@/const/common'
import { useUserState } from '@/stores/user'
import { LogoutOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { Avatar } from 'antd'

export default function AsideMenus() {
  const { user, onSignOut } = useUserState()
  const queryClient = useQueryClient()
  const signOut = () => {
    onSignOut()
    onSignOut()
    queryClient.invalidateQueries([])
  }

  return (
    <>
      <aside className='fixed top-0 left-0 w-40 h-screen flex flex-col bg-pink-500 select-none max-sm:hidden'>
        <nav className='flex-1'>
          {navs.map((v) => (
            <NavItem key={v.to} {...v} />
          ))}
        </nav>

        <div className='mt-auto text-center text-white'>
          <Avatar size={60} src={user?.avatarUrl} className='shadow-md outline outline-white'>
            <span className='uppercase'>{user?.username.slice(0, 1)}</span>
          </Avatar>
          <p className='mx-4 mt-2 truncate'>{user?.username || 'not log in'}</p>
        </div>

        <NavItem icon={<LogoutOutlined />} title='Sign Out' className='mb-6' onClick={signOut} />
      </aside>
    </>
  )
}
