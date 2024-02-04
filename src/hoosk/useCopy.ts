import { toast } from '@/ui/Toast'

export function useCopy() {
  const copy = (text?: string) => {
    if (!text?.trim()) return

    if ('clipboard' in navigator) {
      navigator.clipboard
        .writeText(text)
        .then(() => toast.show({ type: 'success', message: 'copy success' }))
        .catch(() => toast.show({ type: 'error', message: 'copy failed' }))
    } else {
      toast.show({ type: 'error', message: 'your browser does not support clipboard api' })
    }
  }

  return [copy]
}
