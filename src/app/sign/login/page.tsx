/**
 * @name LoginPage
 * @description
 * @author darcrand
 */

'use client'
import { userLogin } from '@/actions/user'
import Link from 'next/link'
import { useFormState } from 'react-dom'

export default function LoginPage() {
  const [state, formAction] = useFormState(userLogin, { data: '', error: '' })

  return (
    <>
      <h1>LoginPage</h1>

      <form action={formAction}>
        <input type='text' className='border' placeholder='username' name='username' />
        <input type='password' className='border' placeholder='password' name='password' />
        <button type='submit'>Login</button>

        {state.error && <p>{state.error}</p>}
      </form>

      <hr />

      <p>
        <Link href='/sign/registry' replace>
          registry now
        </Link>
      </p>
    </>
  )
}
