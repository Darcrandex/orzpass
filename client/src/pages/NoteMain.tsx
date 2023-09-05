/**
 * @name NoteMain
 * @description 根级路由
 * @author darcrand
 */

import KeyModal from '@/common/KeyModal'
import { useGlobalKey } from '@/stores/key'
import { Outlet } from 'react-router-dom'

export default function NoteMain() {
  const { key } = useGlobalKey()

  return !key ? (
    <section className='flex items-center justify-center space-x-4 h-1/2'>
      <p className='text-lg text-gray-700'>Set Your Key First</p>
      <KeyModal />
    </section>
  ) : (
    <>
      <Outlet />
    </>
  )
}
