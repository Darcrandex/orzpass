import { useEffect, useRef } from 'react'
import Scrollbar from 'smooth-scrollbar'

export function useScrollBar() {
  const elRef = useRef<HTMLElement>(null)
  const scrollRef = useRef<Scrollbar | null>(null)
  useEffect(() => {
    if (elRef.current && !scrollRef.current) {
      scrollRef.current = Scrollbar.init(elRef.current, { alwaysShowTracks: false })
    }

    return () => {
      scrollRef.current?.destroy()
    }
  }, [])

  return { elRef, scrollRef }
}
