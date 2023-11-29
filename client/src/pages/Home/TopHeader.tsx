/**
 * @name TopHeader
 * @description 移动端顶部导航
 * @author darcrand
 */

import NavMenuItem from '@/components/NavMenuItem'
import { navs } from '@/const/common'
import { useHeaderSize } from '@/stores/header-size'
import { useUserState } from '@/stores/user'
import { LogoutOutlined, MenuOutlined } from '@ant-design/icons'
import { useQueryClient } from '@tanstack/react-query'
import { useSize, useToggle } from 'ahooks'
import { Avatar, Button, Drawer } from 'antd'
import { useEffect, useRef } from 'react'

export default function TopHeader() {
  const elRef = useRef<HTMLElement>(null)
  const size = useSize(elRef)
  const { setHeaderSize } = useHeaderSize()

  useEffect(() => {
    setHeaderSize({ height: size?.height })
  }, [setHeaderSize, size])

  const [showMenu, { toggle: toggleMenu }] = useToggle(false)
  const { user, onSignOut } = useUserState()
  const queryClient = useQueryClient()
  const signOut = () => {
    onSignOut()
    onSignOut()
    queryClient.invalidateQueries([])
  }

  return (
    <>
      <header
        ref={elRef}
        className='sm:hidden fixed top-0 left-0 right-0 flex items-center justify-between px-2 bg-pink-500'
      >
        <Button type='text' icon={<MenuOutlined className='text-white' />} onClick={toggleMenu} />

        <h1
          className='flex items-center justify-center font-extrabold text-[200%] text-white'
          style={{ fontFamily: 'Tangerine' }}
        >
          <img src='/logo-white.png' alt='' className='w-4 mr-1' />
          <span>orzpass</span>
        </h1>
      </header>

      <div style={{ height: size?.height || 0 }}></div>

      <Drawer
        placement='left'
        open={showMenu}
        destroyOnClose
        width={200}
        closable={false}
        onClose={toggleMenu}
        title={
          <div className='flex items-center text-center text-pink-500 space-x-2'>
            <Avatar size='small' src={user?.avatarUrl} className='shadow-md outline outline-pink-500'>
              <span className='uppercase'>{user?.username.slice(0, 1)}</span>
            </Avatar>
            <span className='truncate font-normal'>{user?.username || 'not log in'}</span>
          </div>
        }
      >
        <nav className='flex-1'>
          {navs.map((v) => (
            <NavMenuItem key={v.to} {...v} onClick={toggleMenu} />
          ))}
        </nav>

        <NavMenuItem icon={<LogoutOutlined />} title='Sign Out' className='mt-6' onClick={signOut} />
      </Drawer>
    </>
  )
}
