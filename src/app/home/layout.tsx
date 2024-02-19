/**
 * @name HomeLayout
 * @description
 * @author darcrand
 */

'use client'
import ProfileWidget from '@/components/ProfileWidget'
import SideMenus from '@/components/SideMenus'
import { userService } from '@/services/user'
import Button from '@/ui/Button'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next-nprogress-bar'
import { PropsWithChildren } from 'react'

export default function HomeLayout(props: PropsWithChildren) {
  const router = useRouter()

  const { data, isFetching, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
    throwOnError: false,
    retry: false,
  })

  return (
    <>
      <section>
        <aside className='fixed top-0 left-0 bottom-0 flex flex-col w-52 bg-primary'>
          <h1 className='text-3xl italic font-bold text-white text-center' style={{ fontFamily: 'Pacifico' }}>
            orzpass
          </h1>

          <SideMenus />
          <ProfileWidget user={data?.data} />
        </aside>

        <main className='ml-52'>
          {!!data ? (
            props.children
          ) : isFetching || isLoading ? (
            <p className='mt-[20vh] text-center text-gray-400'>Loading...</p>
          ) : (
            <div className='mt-[20vh] text-center'>
              <p>you need to login first</p>
              <p className='space-x-4 mt-4'>
                <Button variant='primary' onClick={() => router.push('/sign/login')}>
                  Login
                </Button>
              </p>
            </div>
          )}
        </main>
      </section>
    </>
  )
}
