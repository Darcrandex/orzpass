import { User } from '@/types/user'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'

const userAtom = atomWithStorage<Omit<User, 'password'> | undefined>('user', undefined)

export function useUserState() {
  const [user, setUser] = useAtom(userAtom)

  const onSignIn = useCallback(
    (u: Omit<User, 'password'>) => {
      setUser(u)
    },
    [setUser]
  )

  const onSignOut = useCallback(() => {
    setUser(undefined)
  }, [setUser])

  return { user, onSignIn, onSignOut }
}
