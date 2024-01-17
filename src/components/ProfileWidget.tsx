/**
 * @name ProfileWidget
 * @description
 * @author darcrand
 */

'use client'
import { User } from '@/types/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export type ProfileWidgetProps = { user?: Omit<User, 'password'> }

export default function ProfileWidget(props: ProfileWidgetProps) {
  const router = useRouter()
  const onLogout = () => {
    localStorage.removeItem('token')
    router.push('/sign/login')
  }

  return (
    <>
      <div>{props.user?.username || 'Unknown'}</div>
      <div>{props.user ? <button onClick={onLogout}>Logout</button> : <Link href='/sign/login'>Login</Link>}</div>
    </>
  )
}
