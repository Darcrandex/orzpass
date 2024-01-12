/**
 * @name HomeLayout
 * @description
 * @author darcrand
 */

import ProfileWidget from '@/components/ProfileWidget'
import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function HomeLayout(props: PropsWithChildren) {
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

            <Link href='/sign/login' className='block cursor-pointer hover:underline'>
              Login
            </Link>

            <ProfileWidget />
          </nav>
        </aside>

        <main className='ml-64'>{props.children}</main>
      </section>
    </>
  )
}
