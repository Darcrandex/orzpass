export function useCopy(options?: { onSuccess?: () => void; onError?: (err: Error) => void }) {
  const copy = (text?: string) => {
    if (!text) return

    if ('clipboard' in navigator) {
      navigator.clipboard.writeText(text).then(options?.onSuccess).catch(options?.onError)
    } else {
      options?.onError?.(new Error('useClipboard: navigator.clipboard is not supported'))
    }
  }

  return { copy }
}
