export type TextareaProps = {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string

  className?: string
  placeholder?: string
  maxLength?: number
  rows?: number
}
