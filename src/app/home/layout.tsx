/**
 * @name HomeLayout
 * @description
 * @author darcrand
 */

'use client'
import ProfileWidget from '@/components/ProfileWidget'
import SideMenus from '@/components/SideMenus'
import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function HomeLayout(props: PropsWithChildren) {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
    throwOnError: false,
    retry: false,
  })

  return (
    <>
      <section>
        <aside className='fixed top-0 left-0 bottom-0 flex flex-col w-52 bg-primary'>
          <h1 className='text-5xl font-bold text-white text-center' style={{ fontFamily: 'Noto Sans' }}>
            orzpass
          </h1>

          <SideMenus />
          <ProfileWidget user={data?.data} />
        </aside>

        <main className='ml-64'>
          {!!data ? (
            props.children
          ) : (
            <div className='mt-[20vh] text-center'>
              <p>you need to login first</p>
              <p>
                <Link href='/sign/login'>Login</Link>
              </p>
            </div>
          )}
        </main>
      </section>
    </>
  )
}
