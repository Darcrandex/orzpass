/**
 * @name NoteList
 * @description
 * @author darcrand
 */

'use client'
import { Note } from '@/types/note'
import { Button } from 'antd'
import Link from 'next/link'

export default function NoteList(props: { list?: Note[] }) {
  return (
    <>
      <section className='flex-1'>
        <h1>Notes</h1>

        <p>
          <Button type='primary'>
            <Link href='/notes/add'>create a new one</Link>
          </Button>
        </p>

        <hr className='my-4 border-t' />

        <ul>
          {props.list?.map((v) => (
            <li key={v.id}>
              <Link href={`/notes/${v.id}`}>{v.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
