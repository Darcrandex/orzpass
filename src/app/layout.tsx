import QueryProvider from '@/lib/QueryProvider'
import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import './globals.css'

export const metadata: Metadata = {
  title: 'orzpass',
  description: 'A simple password manager',
}

const Toast = dynamic(() => import('@/ui/Toast'), { ssr: false })
const NextProgressBar = dynamic(() => import('@/lib/NextProgressBar'), { ssr: false })

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <NextProgressBar />
        <QueryProvider>{children}</QueryProvider>
        <Toast />
      </body>
    </html>
  )
}
