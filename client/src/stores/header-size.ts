import { useAtom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'

type SizeState = {
  height?: number
}

const sizeAtom = atomWithStorage<SizeState>('size', {})

export function useHeaderSize() {
  const [headerSize, setHeaderSize] = useAtom(sizeAtom)

  return { headerSize, setHeaderSize }
}
