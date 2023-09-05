import { User } from '@/types/user'
import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { useCallback } from 'react'

const userAtom = atomWithStorage<User | undefined>('user', undefined)

export function useUserState() {
  const [user, setUser] = useAtom(userAtom)

  const onSignIn = useCallback(
    (u: User) => {
      setUser(u)
    },
    [setUser]
  )

  const onSignOut = useCallback(() => {
    setUser(undefined)
  }, [setUser])

  return { user, onSignIn, onSignOut }
}
