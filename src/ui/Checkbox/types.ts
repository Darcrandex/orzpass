import { ReactNode } from 'react'

export type CheckboxProps = {
  checked?: boolean
  onChange?: (checked: boolean) => void

  children?: ReactNode
  className?: string
}
