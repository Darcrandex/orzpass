/**
 * @name NotFound
 * @description
 * @author darcrand
 */

import BackButton from '@/components/BackButton'

export default function NotFound() {
  return (
    <>
      <section className='flex flex-col justify-center h-[60vh] text-center'>
        <p className='text-[1000%] font-extrabold text-pink-100'>404</p>
        <h1 className='text-gray-700'>Page Not Found</h1>
        <BackButton to='/note' />
      </section>
    </>
  )
}
