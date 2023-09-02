'use server'

import { User } from '@/types/user'
import { cookies } from 'next/headers'
import { JWTdecode } from './jwt'

// 直接从 cookie 中获取保存的用户信息
export async function getUserFromCookies() {
  if (!process.env.NEXT_APP_AUTH_KEY) {
    throw new Error('auth key not found')
  }

  const token = cookies().get(process.env.NEXT_APP_AUTH_KEY)?.value

  if (!token) {
    throw new Error('invalid token')
  }

  const user = await JWTdecode<Pick<User, 'id' | 'code'>>(token)
  return user
}
