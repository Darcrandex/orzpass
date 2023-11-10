/**
 * @name LoginLayout
 * @description
 * @author darcrand
 */

import Link from 'next/link'
import { PropsWithChildren } from 'react'

export default function LoginLayout(props: PropsWithChildren) {
  return (
    <>
      <h1>LoginLayout</h1>
      <p className='flex space-x-4'>
        <Link href='/sign/in'>Login</Link>
        <Link href='/sign/up'>Signup</Link>
      </p>

      {props.children}
    </>
  )
}
