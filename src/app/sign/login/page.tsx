/**
 * @name LoginPage
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function LoginPage() {
  return (
    <>
      <h1>LoginPage</h1>

      <input type='text' className='border' placeholder='username' />

      <hr />

      <p>
        <Link href='/sign/registry' replace>
          registry now
        </Link>
      </p>
    </>
  )
}
