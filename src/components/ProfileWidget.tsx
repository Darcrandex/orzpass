/**
 * @name ProfileWidget
 * @description
 * @author darcrand
 */

'use client'
import { TOKEN_STORAGE_KEY } from '@/const/common'
import { User } from '@/types/user'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export type ProfileWidgetProps = { user?: Omit<User, 'password'> }

export default function ProfileWidget(props: ProfileWidgetProps) {
  const router = useRouter()
  const onLogout = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
    router.push('/sign/login')
  }

  if (!props.user) {
    return <Link href='/sign/login'>Login</Link>
  }

  return (
    <>
      <div>
        <Link href='/home/profile'>{props.user?.username}</Link>
      </div>

      <div>
        <button onClick={onLogout}>Logout</button>
      </div>
    </>
  )
}
