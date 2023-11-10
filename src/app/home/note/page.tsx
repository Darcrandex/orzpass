/**
 * @name Notes
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function Notes() {
  return (
    <>
      <h1>Notes</h1>

      <ul className='m-6'>
        <li>
          <Link href='/home/note/1'>Note 1</Link>
        </li>
      </ul>
    </>
  )
}
