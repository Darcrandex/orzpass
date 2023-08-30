/**
 * @name AsideMenus
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function AsideMenus() {
  return (
    <>
      <aside className='w-80 border-r'>
        <nav className='flex flex-col space-y-4'>
          <Link href='/notes' replace>
            note list
          </Link>

          <Link href='/about' replace>
            about
          </Link>
        </nav>
      </aside>
    </>
  )
}
