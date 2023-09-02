import { User } from '@/types/user'
import { atom, useAtom } from 'jotai'

const stateAtom = atom<User | undefined>(undefined)

export function useUser() {
  const [user, setUser] = useAtom(stateAtom)
  return { user, setUser }
}
