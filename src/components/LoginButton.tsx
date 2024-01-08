/**
 * @name LoginButton
 * @description
 * @author darcrand
 */

'use client'
import { useFormStatus } from 'react-dom'

export default function LoginButton() {
  const { pending } = useFormStatus()
  return (
    <>
      <button type='submit' aria-disabled={pending}>
        Login
      </button>
    </>
  )
}
