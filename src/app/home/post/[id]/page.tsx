/**
 * @name PostPage
 * @description
 * @author darcrand
 */

import PostRemoveButton from '@/components/PostRemoveButton'
import { postService } from '@/services/post'
import Link from 'next/link'

type PostPageProps = { params: { id: string }; searchParams: Record<string, string> }

export default async function PostPage(props: PostPageProps) {
  const res = await postService.one(props.params.id)

  return (
    <>
      <h1>PostPage</h1>

      <p>post id is {props.params.id}</p>

      <p>{res.data?.title}</p>

      <p>
        <Link href={`/home/post/${props.params.id}/edit`}>goto edit</Link>
      </p>

      <p>
        <PostRemoveButton />
      </p>
    </>
  )
}
