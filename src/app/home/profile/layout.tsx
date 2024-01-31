/**
 * @name ProfileLayout
 * @description
 * @author darcrand
 */

'use client'

import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function ProfileLayout(props: PropsWithChildren) {
  return (
    <>
      <h1>ProfileLayout</h1>

      <nav className='m-4 space-x-4'>
        <Link href='/home/profile'>user profile</Link>
        <Link href='/home/profile/pwd'>update password</Link>
      </nav>

      {props.children}
    </>
  )
}
