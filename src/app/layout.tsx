import StyledComponentsRegistry from '@/lib/AntdRegistry'
import QueryRegistry from '@/lib/QueryRegistry'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { cookies } from 'next/headers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'orzpass',
  description: 'A password manager by Nextjs',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const auth = cookies().get('authorization')?.value

  console.log('auth', auth)

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
