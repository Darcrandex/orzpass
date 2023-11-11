'use client'

import type Entity from '@ant-design/cssinjs/es/Cache'
import { createCache, extractStyle, StyleProvider } from '@ant-design/cssinjs/lib'
import type { ThemeConfig } from 'antd'
import { ConfigProvider } from 'antd'
import { useServerInsertedHTML } from 'next/navigation'
import React from 'react'

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorPrimary: '#52c41a',
  },
}

const AntdRegistry = ({ children }: React.PropsWithChildren) => {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  useServerInsertedHTML(() => <style id='antd' dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />)

  return (
    <StyleProvider cache={cache} hashPriority='high'>
      <ConfigProvider theme={theme}>{children}</ConfigProvider>
    </StyleProvider>
  )
}

export default AntdRegistry
