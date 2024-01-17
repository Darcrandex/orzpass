/**
 * @name HomeLayout
 * @description
 * @author darcrand
 */

'use client'
import ProfileWidget from '@/components/ProfileWidget'
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
        <aside className='fixed top-0 left-0 bottom-0 w-64 border-r bg-green-300'>
          <h1>Menu</h1>

          <nav className='space-y-2 my-4'>
            <Link href='/home' className='block cursor-pointer hover:underline'>
              Home
            </Link>

            <Link href='/home/about' className='block cursor-pointer hover:underline'>
              About
            </Link>

            <hr className='my-4' />

            <ProfileWidget user={data?.data} />
          </nav>
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
