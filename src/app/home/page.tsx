/**
 * @name PostList
 * @description
 * @author darcrand
 */

'use client'
import CardItem from '@/components/CardItem'
import KeySetter from '@/components/KeySetter'
import { postService } from '@/services/post'
import Button from '@/ui/Button'
import Input from '@/ui/Input'
import { useQuery } from '@tanstack/react-query'
import { useDebounce } from 'ahooks'
import { useRouter } from 'next-nprogress-bar'
import { useState } from 'react'

export default function PostList() {
  const router = useRouter()
  const { data, refetch, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: () => postService.all(),
  })

  const [keyword, setKeyword] = useState('')
  const value = useDebounce(keyword, { wait: 500 })
  const filtered =
    data?.data?.filter((post) => !value || post.title.includes(value) || post.website?.includes(value)) || []

  return (
    <>
      <header className='my-4 space-x-4 space-y-4'>
        <Input className='w-48 ml-4' placeholder='search' maxLength={20} value={keyword} onChange={setKeyword} />
        <Button loading={isFetching} onClick={() => refetch()}>
          refresh
        </Button>
        <Button onClick={() => router.push('/home/post/add')}>add</Button>

        <KeySetter />
      </header>

      <ul className='flex flex-wrap m-2'>
        {filtered.map((post) => (
          <li key={post.id} className='w-full sm:w-full md:w-1/2 lg:w-1/3 xl:w-1/4'>
            <CardItem data={post} />
          </li>
        ))}
      </ul>

      {!filtered.length && <p className='text-gray-500 text-center mt-10'>No data</p>}
    </>
  )
}
