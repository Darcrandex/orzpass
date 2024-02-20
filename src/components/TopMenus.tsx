/**
 * @name TopMenus
 * @description
 * @author darcrand
 */

'use client'
import Drawer from '@/ui/Drawer'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useSize } from 'ahooks'
import { usePathname } from 'next/navigation'
import { PropsWithChildren, useEffect, useRef, useState } from 'react'

export default function TopMenus(props: PropsWithChildren) {
  const elRef = useRef<HTMLElement>(null)
  const size = useSize(elRef)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  return (
    <>
      <header
        ref={elRef}
        className='fixed top-0 left-0 right-0 z-10 flex items-center justify-between px-4 py-2 bg-primary shadow sm:hidden'
      >
        <span className='w-1/4' onClick={() => setOpen(true)}>
          <FontAwesomeIcon icon={faBars} className='text-white text-bace' />
        </span>

        <h1 className='italic font-bold text-white text-center' style={{ fontFamily: 'Pacifico' }}>
          orzpass
        </h1>

        <span className='w-1/4'></span>
      </header>

      <div style={{ height: size?.height }}></div>

      <Drawer open={open} header={null} bodyClassName='bg-primary w-48' onClose={() => setOpen(false)}>
        <section className='flex flex-col h-screen'>{props.children}</section>
      </Drawer>
    </>
  )
}
