export type InputPasswordProps = {
  value?: string
  onChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  maxLength?: number

  className?: string
  onEnter?: () => void
}
