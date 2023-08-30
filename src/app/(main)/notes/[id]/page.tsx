/**
 * @name Note
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function Note() {
  return (
    <>
      <section className='flex-1'>
        <h1>Note detail</h1>

        <p>
          <Link href='/notes/1/edit'>go to edit</Link>
        </p>
      </section>
    </>
  )
}
