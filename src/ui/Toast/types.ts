import { ReactNode } from 'react'

export type ToastProps = {
  max?: number
}

export type ToastItemProps = {
  id: string
  title?: ReactNode
  message?: ReactNode
  duration?: number
  onClose?: () => void
}

export type ToastContextValue = {
  items: ToastItemProps[]
  setItems: React.Dispatch<React.SetStateAction<ToastItemProps[]>>
}

export type ChannelPayload =
  | {
      type: 'show'
      options: Omit<ToastItemProps, 'id'>
    }
  | {
      type: 'close'
      id: string
    }
