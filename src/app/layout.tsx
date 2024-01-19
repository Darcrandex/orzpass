import QueryProvider from '@/lib/QueryProvider'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'

export const metadata: Metadata = {
  title: 'orzpass',
  description: 'A simple password manager',
}

const ToastProvider = dynamic(() => import('@/ui/Toast/ToastProvider'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
