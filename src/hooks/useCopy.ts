'use client'
import { toast } from '@/ui/Toast'
import copyAPI from 'copy-to-clipboard'
import { useState } from 'react'

export function useCopy(): [(text?: string) => void, { value?: string; success: boolean }] {
  const [value, setValue] = useState<string>()
  const [success, setSuccess] = useState(false)

  const copyToClipboard = (text?: string) => {
    if (!text?.trim()) return

    const result = copyAPI(text)
    setSuccess(result)

    if (result) {
      setValue(text)
      toast.show({ type: 'success', message: 'copy success' })
    } else {
      toast.show({ type: 'error', message: 'copy failed' })
    }
  }

  return [copyToClipboard, { value, success }]
}
