import QueryProvider from '@/lib/QueryProvider'
import { ToastProvider } from '@/ui/Toast'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'orzpass',
  description: 'A simple password manager',
}

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
