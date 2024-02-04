export type InputProps = {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string

  type?: 'text' | 'password'
  block?: boolean
  className?: string
  placeholder?: string
  maxLength?: number

  onEnter?: () => void

  hideBorder?: boolean
}
