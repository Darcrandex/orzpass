'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: process.env.NODE_ENV !== 'development' } },
})

export default function QueryRegistry({ children }: { children: React.ReactNode }) {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}
