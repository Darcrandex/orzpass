import StyledComponentsRegistry from '@/lib/AntdRegistry'
import QueryRegistry from '@/lib/QueryRegistry'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'orzpass',
  description: 'A password manager by Nextjs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <QueryRegistry>
          <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        </QueryRegistry>
      </body>
    </html>
  )
}
