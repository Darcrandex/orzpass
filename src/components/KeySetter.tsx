/**
 * @name KeySetter
 * @description 用来配置当前用户的密钥
 * @description 秘钥是用户自行保管的，后台不会存储
 * @author darcrand
 */

import { useMasterKey } from '@/stores/master-key'
import Button from '@/ui/Button'
import Modal from '@/ui/Modal'
import Textarea from '@/ui/Textarea'
import { useEffect, useState } from 'react'

export default function KeySetter() {
  const [open, setOpen] = useState(false)
  const { key, setKey } = useMasterKey()
  const [value, onChange] = useState('')

  useEffect(() => {
    if (open) {
      onChange(key || '')
    }
  }, [key, open])

  return (
    <>
      <Button onClick={() => setOpen(true)}>key</Button>

      <Modal
        title='Master Key'
        bodyClassName='w-[520px] max-w-full'
        footer={
          <Button
            variant='primary'
            onClick={() => {
              setOpen(false)
              setKey(value)
            }}
          >
            Confirm
          </Button>
        }
        open={open}
        onClose={() => setOpen(false)}
      >
        <section className='min-h-28 space-y-2'>
          <p className='text-sm text-gray-500 my-2'>
            The master key is used to decrypt your password and must be kept by the user
          </p>
          <Textarea placeholder='input your master key' value={value} onChange={onChange} />
        </section>
      </Modal>
    </>
  )
}
