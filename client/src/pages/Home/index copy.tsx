/**
 * @name Home
 * @description
 * @author darcrand
 */

import NavItem, { NavItemProps } from '@/components/NavItem'
import NavMenuItem from '@/components/NavMenuItem'
import { useUserState } from '@/stores/user'
import {
  GithubOutlined,
  LoadingOutlined,
  LogoutOutlined,
  MenuOutlined,
  MonitorOutlined,
  SmileOutlined,
  ToolOutlined,
} from '@ant-design/icons'
import { useIsFetching, useIsMutating, useQueryClient } from '@tanstack/react-query'
import { useToggle } from 'ahooks'
import { Avatar, Button, Drawer } from 'antd'
import clsx from 'clsx'
import { useCallback } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const navs: NavItemProps[] = [
  { to: '/note', title: 'Notes', icon: <MonitorOutlined /> },
  { to: '/mine', title: 'Mine', icon: <SmileOutlined /> },
  { to: '/tools', title: 'Tools', icon: <ToolOutlined /> },
  { to: '/about', title: 'About', icon: <GithubOutlined /> },
]

export default function Home() {
  const navigate = useNavigate()
  const { user, onSignOut } = useUserState()
  const client = useQueryClient()
  const isFetching = useIsFetching() > 0
  const isMutating = useIsMutating() > 0

  const out = useCallback(() => {
    onSignOut()
    client.invalidateQueries([])
  }, [client, onSignOut])

  const [showMenu, { toggle: toggleMenu }] = useToggle(false)

  return (
    <>
      <section className='flex h-screen flex-row max-sm:flex-col'>
        <aside className='flex flex-col w-40 bg-pink-500 select-none max-sm:hidden'>
          <h1
            className='flex items-center justify-center font-extrabold text-[300%] text-white cursor-pointer'
            style={{ fontFamily: 'Tangerine' }}
            onClick={() => navigate('/')}
          >
            <img src='/logo-white.png' alt='' className='w-8 mr-1' />
            <span>orzpass</span>
          </h1>

          {!!user && (
            <>
              <nav className='flex-1'>
                {navs.map((v) => (
                  <NavItem key={v.to} {...v} />
                ))}
              </nav>

              <div className='text-center text-white'>
                <Avatar size={60} src={user.avatarUrl} className='shadow-md outline outline-white'>
                  <span className='uppercase'>{user.username.slice(0, 1)}</span>
                </Avatar>
                <p className='mx-4 mt-2 truncate'>{user.username}</p>
              </div>
              <NavItem icon={<LogoutOutlined />} title='Sign Out' className='mb-6' onClick={out} />
            </>
          )}
        </aside>

        {/* 移动端 */}
        <header className='flex justify-between items-center px-4 bg-pink-500 sm:hidden'>
          <h1
            className='flex items-center justify-center font-extrabold text-[200%] text-white'
            style={{ fontFamily: 'Tangerine' }}
          >
            <img src='/logo-white.png' alt='' className='w-4 mr-1' />
            <span>orzpass</span>
          </h1>

          <Button type='text' icon={<MenuOutlined className='text-white' />} onClick={toggleMenu} />
        </header>

        {!!user && (
          <Drawer open={showMenu} destroyOnClose width={200} onClose={toggleMenu}>
            <div className='mb-6 text-center text-pink-500'>
              <Avatar size={60} src={user.avatarUrl} className='shadow-md outline outline-pink-500'>
                <span className='uppercase'>{user.username.slice(0, 1)}</span>
              </Avatar>
              <p className='mx-4 mt-2 truncate'>{user.username}</p>
            </div>

            <nav className='flex-1'>
              {navs.map((v) => (
                <NavMenuItem key={v.to} {...v} onClick={toggleMenu} />
              ))}
            </nav>

            <NavMenuItem icon={<LogoutOutlined />} title='Sign Out' className='mt-6' onClick={out} />
          </Drawer>
        )}

        <main className='relative flex-1 overflow-auto'>
          {!user ? (
            <section className='flex items-center justify-center space-x-4 h-1/2'>
              <Button type='primary' onClick={() => navigate('/sign/1')}>
                Sign In Now
              </Button>
              <Button type='primary' ghost onClick={() => navigate('/sign/2')}>
                Sign Up
              </Button>
            </section>
          ) : (
            <Outlet />
          )}

          <div
            className={clsx(
              'absolute z-10 top-0 right-0 left-0 bottom-0 text-center pt-40 transition-all bg-white/50',
              isFetching || isMutating ? 'opacity-100 visible' : 'invisible opacity-0'
            )}
          >
            <LoadingOutlined className='text-pink-500 text-4xl' />
          </div>
        </main>
      </section>
    </>
  )
}
