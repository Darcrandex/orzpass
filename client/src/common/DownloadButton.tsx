/**
 * @name DownloadButton
 * @description
 * @author darcrand
 */

import { useGlobalKey } from '@/stores/key'
import { Note } from '@/types/note'
import { aes } from '@/utils/aes'
import { DownloadOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { saveAs } from 'file-saver'
import { useCallback, useMemo } from 'react'

export type DownloadButtonProps = { list?: Note[] }

export default function DownloadButton(props: DownloadButtonProps) {
  const { key } = useGlobalKey()
  const disabled = !key || !props.list || props.list.length === 0

  const data = useMemo(() => {
    if (disabled) return []
    return props.list?.map((v) => {
      const password = v.password && key ? aes.decode(v.password, key) : ''
      return { title: v.title, username: v.username, password, website: v.website, remark: v.remark }
    })
  }, [disabled, key, props.list])

  const onDownload = useCallback(() => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json;charset=utf-8' })
    saveAs(blob, 'output.json')
  }, [data])

  return (
    <>
      <Button type='primary' disabled={disabled} icon={<DownloadOutlined />} onClick={onDownload}>
        Download
      </Button>
    </>
  )
}
