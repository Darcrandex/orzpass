import { ReactNode } from 'react'

export type DrawerProps = {
  open?: boolean
  onClose?: () => void
  title?: string

  children?: ReactNode
  className?: string
  bodyClassName?: string

  header?: ReactNode
}
