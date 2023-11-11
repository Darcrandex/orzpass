import AntdRegistry from '@/lib/AntdRegistry'
import QueryRegistry from '@/lib/QueryRegistry'
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'orzpass',
  description: 'a private password manager',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <QueryRegistry>
          <AntdRegistry>{children}</AntdRegistry>
        </QueryRegistry>
      </body>
    </html>
  )
}
