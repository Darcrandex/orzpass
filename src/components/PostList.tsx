/**
 * @name PostList
 * @description
 * @author darcrand
 */

'use client'
import { Post } from '@/types/post'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export type PostListProps = { data?: Post[] }

export default function PostList(props: PostListProps) {
  const router = useRouter()

  return (
    <>
      <header className='m-4 space-x-4'>
        <button type='button' onClick={() => router.refresh()}>
          refresh
        </button>

        <button type='button' onClick={() => router.push('/home/post/add')}>
          add
        </button>
      </header>

      <ul className='flex flex-wrap m-2'>
        {props.data?.map((post) => (
          <li key={post.id} className='sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <Link href={`/home/post/${post.id}`} className='block m-2 p-4 rounded-md bg-gray-50'>
              <div>{post.title}</div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
