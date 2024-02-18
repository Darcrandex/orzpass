/**
 * @name CardItem
 * @description
 * @author darcrand
 */

import { Post } from '@/types/post'
import Color from 'color'
import Link from 'next/link'
import { useMemo } from 'react'

export type CardItemProps = { data: Post }

export default function CardItem(props: CardItemProps) {
  const { data } = props

  const bgColor = useMemo(() => {
    const h = data.title.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0)
    return Color.hsl(h, 85, 65).hex()
  }, [data.title])

  return (
    <>
      <Link
        href={`/home/post/${data.id}`}
        className='flex items-center m-2 p-2 rounded-md bg-gray-50 hover:shadow-lg transition-all'
      >
        <i
          className='shrink-0 p-4 text-center text-2xl uppercase font-extrabold text-white rounded-md'
          style={{ backgroundColor: bgColor, width: '3em' }}
        >
          {data.title.slice(0, 1)}
        </i>

        <article className='flex-1 p-4 truncate'>
          <p className='truncate'>{data.title || 'Title'}</p>
          <p className='text-gray-500 text-sm truncate'>{data.username || 'Username'}</p>
        </article>
      </Link>
    </>
  )
}
