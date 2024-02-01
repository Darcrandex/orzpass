/**
 * @name SignLayout
 * @description
 * @author darcrand
 */

'use client'
import { PropsWithChildren } from 'react'
import './styles.css'

export default function SignLayout(props: PropsWithChildren) {
  return (
    <>
      <article className='fixed top-1/2 left-1/2 z-20 w-96 max-w-full p-4 -translate-x-1/2 -translate-y-1/2'>
        <div className='p-4 bg-white/20 rounded-lg shadow backdrop-blur -translate-y-8'>
          <div className='min-h-[300px]'>{props.children}</div>
        </div>
      </article>

      <div className='circle-1'></div>
      <div className='circle-2'></div>
    </>
  )
}
