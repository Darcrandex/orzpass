export type InputNumberProps = {
  value?: number
  onChange?: (value: number) => void
  defaultValue?: number
  placeholder?: string
  min?: number
  max?: number
  step?: number

  className?: string
  block?: boolean
}
