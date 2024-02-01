export type InputProps = {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string

  type?: 'text' | 'number' | 'password'
  block?: boolean
  className?: string
  placeholder?: string
  maxLength?: number
}
