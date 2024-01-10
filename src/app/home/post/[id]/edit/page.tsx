/**
 * @name PostEdit
 * @description
 * @author darcrand
 */

import PostUpdateForm from '@/components/PostUpdateForm'
import { postService } from '@/services/post'
import Link from 'next/link'

export type PostEditProps = { params: { id: string } }

export default async function PostEdit(props: PostEditProps) {
  const res = await postService.one(props.params.id)

  return (
    <>
      <Link href={`/home/post/${props.params.id}`}>back</Link>

      <h1>PostEdit</h1>

      <p>post id is {props.params.id}</p>

      {!!res.data && <PostUpdateForm data={res.data} />}
    </>
  )
}
