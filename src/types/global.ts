export type TResponse<T = any> = {
  data: T
  msg?: string
  error?: string
}
