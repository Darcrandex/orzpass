import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const keyAtom = atomWithStorage<string | undefined>('key', undefined)

export function useGlobalKey() {
  const [key, setKey] = useAtom(keyAtom)

  return { key, setKey }
}
