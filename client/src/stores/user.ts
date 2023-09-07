import { User } from '@/types/user'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

const userAtom = atomWithStorage<Omit<User, 'password'> | undefined>('user', undefined)

export function useUserState() {
  const navigate = useNavigate()
  const [user, setUser] = useAtom(userAtom)

  const onSignIn = useCallback(
    (u: Omit<User, 'password'>) => {
      setUser(u)
    },
    [setUser]
  )

  const onSignOut = useCallback(() => {
    setUser(undefined)
    localStorage.clear()
    navigate('/sign/1')
  }, [navigate, setUser])

  return { user, onSignIn, onSignOut }
}
