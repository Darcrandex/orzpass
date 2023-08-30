/**
 * @name MainLayout
 * @description
 * @author darcrand
 */

import AsideMenus from '@/components/AsideMenus'
import MainHeader from '@/components/MainHeader'

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <section className='flex flex-col h-screen'>
        <MainHeader />

        <section className='flex-1 flex'>
          <AsideMenus />

          {children}
        </section>
      </section>
    </>
  )
}
