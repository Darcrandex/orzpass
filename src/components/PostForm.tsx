/**
 * @name PostForm
 * @description
 * @author darcrand
 */

'use client'
import { updatePost } from '@/actions/post'
import { Post } from '@/types/post'
import { useFormState } from 'react-dom'

type PostFormProps = { data?: Post }

export default function PostForm(props: PostFormProps) {
  const [state, formAction] = useFormState(updatePost, { data: '', error: '' })

  return (
    <>
      <h1>PostForm</h1>
      <form action={formAction}>
        <input type='hidden' name='id' defaultValue={props.data?.id} placeholder='id' />
        <input type='text' className='border' placeholder='title' name='title' defaultValue={props.data?.title} />
        <textarea className='border' placeholder='content' name='remark' defaultValue={props.data?.remark} />

        <button type='submit'>Submit</button>
      </form>
    </>
  )
}
