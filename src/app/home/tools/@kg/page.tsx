/**
 * @name KeyGenerate
 * @description master key generator
 * @author darcrand
 */

'use client'
import { NEXT_ENCODE_TIMES } from '@/const/common'
import { useCopy } from '@/hooks/useCopy'
import Button from '@/ui/Button'
import Textarea from '@/ui/Textarea'
import { useCallback, useState } from 'react'

export default function KeyGenerate() {
  const [source, setSource] = useState<string>()
  const [encoded, setEncode] = useState<string>()
  const [copy] = useCopy()

  const btoa = useCallback(() => {
    if (source) setEncode(fnEncode(source))
  }, [source])

  const atob = useCallback(() => {
    if (encoded) setSource(fnDecode(encoded))
  }, [encoded])

  return (
    <>
      <section className='space-y-4'>
        <Textarea rows={5} maxLength={200} placeholder='source' value={source} onChange={setSource} />

        <Button onClick={btoa}>encode</Button>

        <Textarea rows={5} placeholder='output' value={encoded} onChange={setEncode} />

        <Button disabled={!encoded} onClick={() => copy(encoded)}>
          copy encoded
        </Button>
      </section>
    </>
  )
}

function fnEncode(content: string) {
  let res = window.encodeURIComponent(content)
  for (let i = 0; i < NEXT_ENCODE_TIMES; i++) {
    res = window.btoa(res)
  }

  res = res.split('').reverse().join('').replace(/=/gm, '$')
  return res
}

function fnDecode(encoded: string) {
  let res = encoded.split('').reverse().join('').replace(/\$/g, '=')
  for (let i = 0; i < NEXT_ENCODE_TIMES; i++) {
    res = window.atob(res)
  }
  return window.decodeURIComponent(res)
}
