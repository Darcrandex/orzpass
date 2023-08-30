'use client'

import { StyleProvider, createCache, extractStyle } from '@ant-design/cssinjs'
import type Entity from '@ant-design/cssinjs/es/Cache'
import { ConfigProvider } from 'antd'
import { useServerInsertedHTML } from 'next/navigation'
import React from 'react'

const StyledComponentsRegistry = ({ children }: { children: React.ReactNode }) => {
  const cache = React.useMemo<Entity>(() => createCache(), [])
  useServerInsertedHTML(() => <style id='antd' dangerouslySetInnerHTML={{ __html: extractStyle(cache, true) }} />)

  return (
    <StyleProvider cache={cache} hashPriority='high'>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#ec4899',
            colorLink: '#ec4899',
            colorLinkHover: '#f472b6',
            colorLinkActive: '#db2777',
          },
        }}
      >
        {children}
      </ConfigProvider>
    </StyleProvider>
  )
}

export default StyledComponentsRegistry
