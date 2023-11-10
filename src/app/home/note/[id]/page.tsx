/**
 * @name Note
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export default function Note() {
  return (
    <>
      <h1>Note</h1>

      <button>
        <Link href='/home/note/1/edit'>Edit</Link>
      </button>
    </>
  )
}
