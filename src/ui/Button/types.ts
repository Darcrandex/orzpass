import { PropsWithChildren } from 'react'

export type ButtonProps = PropsWithChildren<{
  variant?: 'default' | 'primary' | 'secondary' | 'link'
  type?: 'button' | 'submit' | 'reset'

  className?: string
  onClick?: () => void

  // 是否独占一行
  block?: boolean
}>
