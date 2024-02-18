import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

const keyAtom = atomWithStorage<string | undefined>('orzpass-master-key', undefined)

export function useMasterKey() {
  const [key, setKey] = useAtom(keyAtom)
  return { key, setKey }
}
