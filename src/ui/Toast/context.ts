'use client'
import { createContext, useCallback, useContext } from 'react'
import { ToastContextValue, ToastItemProps } from './types'

export const ToastContext = createContext<ToastContextValue>({
  items: [],
  setItems: () => {},
})

export function useToast() {
  const { items, setItems } = useContext(ToastContext)

  const showToast = useCallback(
    (options: Omit<ToastItemProps, 'id'>) => {
      const id = Math.random().toString(36).slice(2)
      setItems((prev) => prev.concat({ ...options, id }))
    },
    [setItems]
  )

  const closeToast = useCallback(
    (id: string) => {
      setItems((prev) => prev.filter((v) => v.id !== id))
    },
    [setItems]
  )

  const clearToast = useCallback(() => {
    setItems([])
  }, [setItems])

  return { items, showToast, closeToast, clearToast }
}
