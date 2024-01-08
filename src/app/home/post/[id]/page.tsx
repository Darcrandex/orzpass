/**
 * @name PostPage
 * @description
 * @author darcrand
 */

import Link from 'next/link'

type PostPageProps = { params: { id: string }; searchParams: Record<string, string> }

export default function PostPage(props: PostPageProps) {
  console.log(props)

  return (
    <>
      <h1>PostPage</h1>

      <p>post id is {props.params.id}</p>

      <p>
        <Link href={`/home/post/${props.params.id}/edit`}>goto edit</Link>
      </p>
    </>
  )
}
