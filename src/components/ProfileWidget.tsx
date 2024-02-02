/**
 * @name ProfileWidget
 * @description
 * @author darcrand
 */

'use client'
import { User } from '@/types/user'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export type ProfileWidgetProps = { user?: Omit<User, 'password'> }

export default function ProfileWidget(props: ProfileWidgetProps) {
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    if (props.user?.avatarUrl) {
      const img = new Image()
      img.src = props.user?.avatarUrl
      img.onload = () => setLoaded(true)
    }
  }, [props.user?.avatarUrl])

  if (!props.user) return null

  return (
    <>
      <Link href='/home/profile' className='flex items-center mx-4 mt-auto mb-8 space-x-4'>
        <div
          className='flex items-center justify-center w-12 h-12 rounded-full bg-cover bg-center bg-gray-200 transition-all ring-2 ring-white shadow-xl'
          style={{ backgroundImage: `url(${props.user?.avatarUrl})` }}
        >
          {!loaded && <span>{props.user?.username?.slice(0, 2) || 'A'}</span>}
        </div>

        <div className='flex-1 text-white truncate'>
          <p className='text-lg font-bold truncate'>{props.user?.username || 'Nick Name'}</p>
          <p className='truncate'>{props.user?.email || 'Email'}</p>
        </div>
      </Link>
    </>
  )
}
