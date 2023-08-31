'use server'

import { Issue, issueToUser } from '@/types/user'
import { sleep } from '@/utils/common'
import { http } from '@/utils/http'
import { cookies } from 'next/headers'

export async function apiUserList() {
  const res = await http.get<Issue[]>('/issues')
  return res.map(issueToUser)
}

export async function apiUserlogin(data: { username: string; password: string }) {
  if (!process.env.NEXT_APP_AUTH_KEY) {
    throw new Error('auth key not found')
  }

  await sleep(2000)

  const users = await apiUserList()
  const user = users.find((v) => v.username === data.username && v.code === data.password)

  if (user) {
    cookies().set(process.env.NEXT_APP_AUTH_KEY, user.id)
    return { msg: 'ok', data: user }
  } else {
    throw new Error('invalid username or password')
  }
}
