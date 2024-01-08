/**
 * @name RegistryPage
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function RegistryPage() {
  return (
    <>
      <h1>Registry</h1>

      <p>
        <Link href='/sign/login' replace>
          login now
        </Link>
      </p>
    </>
  )
}
