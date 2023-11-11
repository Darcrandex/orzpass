/**
 * @name HomeLayout
 * @description
 * @author darcrand
 */

'use client'
import { UserModel } from '@/db/models/user.model'
import { http } from '@/utils/http'
import { useQuery } from '@tanstack/react-query'
import { Button } from 'antd'
import Link from 'next/link'
import { isNotNil } from 'ramda'
import { PropsWithChildren } from 'react'

export default function HomeLayout(props: PropsWithChildren) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['user'],
    queryFn: () => {
      return http.get<UserModel>('/api/user/info')
    },
  })

  return (
    <>
      <section className='flex h-screen'>
        <aside className='w-80 shrink-0'>
          <ul>
            <li className='my-4'>
              <Link href='/home'>Home</Link>
            </li>
            <li>
              <a href='/home/about'>About</a>
            </li>
          </ul>
        </aside>

        <main className='flex-1'>
          {isNotNil(data?.data) && props.children}

          {isLoading && <p>Loading...</p>}

          {isError && (
            <p>
              <Button href='/sign/in'>SignIn</Button>
              <Button href='/sign/up'>SignUp Now</Button>
            </p>
          )}
        </main>
      </section>
    </>
  )
}
