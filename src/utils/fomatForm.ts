export function fomatForm<T extends Record<string, any>>(formData: FormData) {
  const obj = Object.fromEntries(formData) as unknown as T

  Object.keys(obj).forEach((key) => {
    if (key.startsWith('$')) {
      delete obj[key]
    }
  })

  return obj
}
