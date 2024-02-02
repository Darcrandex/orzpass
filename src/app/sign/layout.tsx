/**
 * @name SignLayout
 * @description
 * @author darcrand
 */

'use client'
import { TOKEN_STORAGE_KEY } from '@/const/common'
import { useMasterKey } from '@/stores/master-key'
import { PropsWithChildren, useEffect } from 'react'
import './styles.css'

export default function SignLayout(props: PropsWithChildren) {
  const { setKey } = useMasterKey()
  useEffect(() => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    setKey(undefined)
  }, [setKey])

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
