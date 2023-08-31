'use server'

import { Issue, issueToUser } from '@/types/user'
import { http } from '@/utils/http'
import { signToken } from '@/utils/jwt'
import { cookies } from 'next/headers'
import { omit, pick } from 'ramda'

export async function apiUserList() {
  const res = await http.get<Issue[]>('/issues')
  return res.map(issueToUser)
}

export async function apiUserlogin(data: { username: string; password: string }) {
  if (!process.env.NEXT_APP_AUTH_KEY) {
    throw new Error('auth key not found')
  }

  const users = await apiUserList()
  const user = users.find((v) => v.username === data.username && v.code === data.password)

  if (user) {
    const token = signToken(pick(['id', 'username'], user))
    cookies().set(process.env.NEXT_APP_AUTH_KEY, token)
    return { msg: 'ok', data: omit(['password'], user) }
  } else {
    throw new Error('invalid username or password')
  }
}
