/**
 * @name SignLayout
 * @description
 * @author darcrand
 */

'use client'
import Tabs from '@/ui/Tabs'
import { usePathname, useRouter } from 'next/navigation'
import { last, split } from 'ramda'
import { PropsWithChildren } from 'react'
import './styles.css'

export default function SignLayout(props: PropsWithChildren) {
  const router = useRouter()
  const pathname = usePathname()
  const currTab = last(split('/', pathname))

  return (
    <>
      <article className='fixed top-1/2 left-1/2 z-20 w-96 max-w-full p-4 -translate-x-1/2 -translate-y-1/2'>
        <div className='p-4 bg-white/20 rounded-lg shadow backdrop-blur -translate-y-8'>
          <Tabs value={currTab} onChange={(val) => router.replace(`/sign/${val}`)}>
            <Tabs.List className='justify-center'>
              <Tabs.Trigger value='login'>Login</Tabs.Trigger>
              <Tabs.Trigger value='registry'>Registry</Tabs.Trigger>
            </Tabs.List>
          </Tabs>

          <div className='min-h-[300px] mt-4'>{props.children}</div>
        </div>
      </article>

      <div className='circle-1'></div>
      <div className='circle-2'></div>
    </>
  )
}
