/**
 * @name PostEdit
 * @description
 * @author darcrand
 */

import Link from 'next/link'

export type PostEditProps = { params: { id: string } }

export default function PostEdit(props: PostEditProps) {
  return (
    <>
      <Link href={`/home/post/${props.params.id}`}>back</Link>

      <h1>PostEdit</h1>

      <p>post id is {props.params.id}</p>
    </>
  )
}
