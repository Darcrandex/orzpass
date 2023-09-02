/**
 * @name MainLayout
 * @description
 * @author darcrand
 */

import AsideMenus from '@/components/AsideMenus'
import MainHeader from '@/components/MainHeader'
import { apiGetUser } from '@/services/user'

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const user = await apiGetUser()

  return (
    <>
      <section className='flex flex-col h-screen'>
        <MainHeader />

        <section className='flex-1 flex'>
          <AsideMenus user={user} />

          {children}
        </section>
      </section>
    </>
  )
}
