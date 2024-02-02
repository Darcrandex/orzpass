/**
 * @name PostList
 * @description
 * @author darcrand
 */

'use client'
import KeySetter from '@/components/KeySetter'
import { postService } from '@/services/post'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'ahooks'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function PostList() {
  const router = useRouter()
  const { data, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.all(),
  })

  const [keyword, setKeyword] = useState('')
  const value = useDebounce(keyword, { wait: 500 })
  const filtered =
    data?.data?.filter((post) => !value || post.title.includes(value) || post.website?.includes(value)) || []

  return (
    <>
      <header className='m-4 space-x-4'>
        <Input className='w-48' placeholder='search' maxLength={20} value={keyword} onChange={setKeyword} />
        <Button onClick={() => refetch()}>refresh</Button>
        <Button onClick={() => router.push('/home/post/add')}>add</Button>

        <KeySetter />
      </header>

      <ul className='flex flex-wrap m-2'>
        {filtered.map((post) => (
          <li key={post.id} className='sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <Link href={`/home/post/${post.id}`} className='block m-2 p-4 rounded-md bg-gray-50'>
              <div>{post.title}</div>
            </Link>
          </li>
        ))}
      </ul>

      {!filtered.length && <p className='text-gray-500 text-center mt-10'>No data</p>}
    </>
  )
}
