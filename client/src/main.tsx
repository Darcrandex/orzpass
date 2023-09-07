import { StyleProvider, legacyLogicalPropertiesTransformer } from '@ant-design/cssinjs'
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { App as AntdApp, ConfigProvider, message } from 'antd'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import './index.css'

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError(error) {
      console.error('query error', error)
    },
  }),

  mutationCache: new MutationCache({
    onError(error: any) {
      message.error(error?.response?.data.msg || error?.response?.statusText || 'request error')
    },
  }),

  defaultOptions: { queries: { refetchOnWindowFocus: false, cacheTime: 2 * 60 * 1000, staleTime: 60 * 1000 } },
})

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <>
    <QueryClientProvider client={queryClient}>
      <StyleProvider hashPriority='high' transformers={[legacyLogicalPropertiesTransformer]}>
        {/* pink-500 */}
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
          <AntdApp>
            <App />
          </AntdApp>
        </ConfigProvider>
      </StyleProvider>
    </QueryClientProvider>
  </>
)
