/**
 * @name HomeLayout
 * @description
 * @author darcrand
 */

import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function HomeLayout(props: PropsWithChildren) {
  return (
    <>
      <section className='flex h-screen'>
        <aside className='w-80 shrink-0'>
          <ul>
            <li className='my-4'>
              <Link href='/home'>Home</Link>
            </li>
            <li>
              <a href='/home/about'>About</a>
            </li>
          </ul>
        </aside>

        <main className='flex-1'>{props.children}</main>
      </section>
    </>
  )
}
