import { NEXT_APP_JWT_SECRET, TOKEN_KEY } from '@/const/common'
import { User } from '@/types/user'
import { NextRequest } from 'next/server'
import { jwt } from './jwt'

export async function getUserFormToken(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const user = (await jwt.decode(token, NEXT_APP_JWT_SECRET)) as Omit<User, 'password'>
  return user
}
