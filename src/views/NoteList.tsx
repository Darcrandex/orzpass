/**
 * @name NoteList
 * @description
 * @author darcrand
 */

import { Button } from 'antd'
import Link from 'next/link'

export default function NoteList() {
  return (
    <>
      <section className='flex-1'>
        <h1>Notes</h1>

        <p>
          <Button type='primary'>
            <Link href={'/notes/add'}>create a new one</Link>
          </Button>
        </p>

        <hr className='my-4 border-t' />

        <ul>
          <li>
            <Link href={'/notes/1'}>note 1</Link>
          </li>
        </ul>
      </section>
    </>
  )
}
