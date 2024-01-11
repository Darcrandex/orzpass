export type ToastItemProps = { id: string; title: string; message?: string; duration?: number; onClose?: () => void }

export type ToastContextValue = {
  items: ToastItemProps[]
  setItems: React.Dispatch<React.SetStateAction<ToastItemProps[]>>
}
