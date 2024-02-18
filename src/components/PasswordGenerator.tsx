/**
 * @name PasswordGenerator
 * @description
 * @author darcrand
 */

import Button from '@/ui/Button'
import { PropsWithChildren } from 'react'

export type PasswordGeneratorProps = PropsWithChildren<{ onClick?: (password: string) => void }>

export default function PasswordGenerator(props: PasswordGeneratorProps) {
  return (
    <>
      <Button className='mt-2'>Generate Password</Button>
    </>
  )
}
