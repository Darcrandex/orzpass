/**
 * @name PostAdd
 * @description
 * @author darcrand
 */

'use client'

import { addPost } from '@/actions/post'
import { useFormState } from 'react-dom'

export default function PostAdd() {
  const [state, formAction] = useFormState(addPost, { data: '', error: '' })

  return (
    <>
      <h1>PostAdd</h1>

      <form action={formAction}>
        <input type='text' name='title' placeholder='title' />
        <button type='submit'>submit</button>
      </form>
    </>
  )
}
