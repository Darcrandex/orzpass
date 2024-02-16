/**
 * @name PasswordGenerate
 * @description 密码生成器
 * @author darcrand
 */

'use client'
import { useCopy } from '@/hooks/useCopy'
import Button from '@/ui/Button'
import Checkbox from '@/ui/Checkbox'
import InputNumber from '@/ui/InputNumber'
import Textarea from '@/ui/Textarea'
import { randomStr } from '@/utils/randomStr'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

export default function PasswordGenerate() {
  const [pwd, setPwd] = useState<string>()
  const { control, handleSubmit } = useForm({
    defaultValues: {
      length: 8,
      includeNumber: true,
      includeLower: true,
      includeUpper: true,
      includeSymbol: true,
      noSimilar: false,
      startWithLetter: false,
      noDuplicate: false,
      noSequential: false,
    },
  })

  const onSubmit = handleSubmit((data) => {
    setPwd(randomStr(data))
  })

  const [copy] = useCopy()

  return (
    <>
      <section className='space-x-2 space-y-2'>
        <Controller
          control={control}
          name='length'
          render={({ field }) => (
            <InputNumber
              min={1}
              max={50}
              placeholder='password length'
              className='w-48'
              value={field.value}
              onChange={field.onChange}
            />
          )}
        />

        <Controller
          control={control}
          name='includeNumber'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              include number
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='includeLower'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              include lower
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='includeUpper'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              include upper
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='includeSymbol'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              include symbol
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='noSimilar'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              no similar
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='startWithLetter'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              start with letter
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='noDuplicate'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              no duplicate
            </Checkbox>
          )}
        />

        <Controller
          control={control}
          name='noSequential'
          render={({ field }) => (
            <Checkbox checked={field.value} onChange={field.onChange}>
              no sequential
            </Checkbox>
          )}
        />
      </section>

      <Textarea rows={5} placeholder='output' className='my-4' value={pwd} onChange={setPwd} />

      <footer className='space-x-2'>
        <Button onClick={onSubmit}>generate</Button>
        <Button onClick={() => copy(pwd)}>copy</Button>
      </footer>
    </>
  )
}
