/**
 * @name PasswordGeneratorPopover
 * @description
 * @author darcrand
 */

import { randomString, RandomStringOptions } from '@/utils/random-string'
import { Button, Checkbox, InputNumber, Popover, Space } from 'antd'
import { useState } from 'react'

export type PasswordGeneratorPopoverProps = { onGenerate?: (pwd: string) => void }

export default function PasswordGeneratorPopover(props: PasswordGeneratorPopoverProps) {
  const [options, setOptions] = useState<RandomStringOptions>({
    length: 8,
    includeNumber: true,
    includeLower: true,
    includeUpper: true,
    includeSymbol: true,
    noSimilar: false,
    startWithLetter: false,
    noDuplicate: false,
    noSequential: false,
  })

  const onGenerate = () => {
    const pwd = randomString(options)
    props.onGenerate?.(pwd)
  }

  return (
    <>
      <Popover
        placement='rightTop'
        content={
          <>
            <Space direction='vertical'>
              <InputNumber
                placeholder='password length'
                min={2}
                max={20}
                value={options.length}
                onChange={(v) => setOptions({ ...options, length: v || 4 })}
              />

              <Checkbox
                checked={options.includeNumber}
                onChange={(e) => setOptions({ ...options, includeNumber: e.target.checked })}
              >
                Numbers
              </Checkbox>

              <Checkbox
                checked={options.includeLower}
                onChange={(e) => setOptions({ ...options, includeLower: e.target.checked })}
              >
                Lowercase
              </Checkbox>

              <Checkbox
                checked={options.includeUpper}
                onChange={(e) => setOptions({ ...options, includeUpper: e.target.checked })}
              >
                Uppercase
              </Checkbox>

              <Checkbox
                checked={options.includeSymbol}
                onChange={(e) => setOptions({ ...options, includeSymbol: e.target.checked })}
              >
                Symbols
              </Checkbox>
            </Space>
          </>
        }
      >
        <Button onClick={onGenerate}>Generate</Button>
      </Popover>
    </>
  )
}
