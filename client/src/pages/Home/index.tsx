/**
 * @name Home
 * @description
 * @author darcrand
 */

import { useUserState } from '@/stores/user'
import { Button, FloatButton } from 'antd'
import { Outlet, useNavigate } from 'react-router-dom'
import AsideMenus from './AsideMenus'
import TopHeader from './TopHeader'

export default function Home() {
  const { user } = useUserState()
  const navigate = useNavigate()

  return (
    <>
      <TopHeader />

      <AsideMenus />

      <main className='sm:ml-40'>
        {user ? (
          <Outlet />
        ) : (
          <section className='flex items-center justify-center space-x-4 mt-[20vh]'>
            <Button type='primary' onClick={() => navigate('/sign/1')}>
              Sign In Now
            </Button>

            <Button type='primary' ghost onClick={() => navigate('/sign/2')}>
              Sign Up
            </Button>
          </section>
        )}
      </main>

      <div data-name='safe-area' className='h-12'></div>

      <FloatButton.BackTop />
    </>
  )
}
