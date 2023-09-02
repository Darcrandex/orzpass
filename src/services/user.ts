'use server'

import { DataLabels } from '@/types/enums'
import { Issue, issueToUser } from '@/types/user'
import { clientAES } from '@/utils/client-aes'
import { getUserFromCookies } from '@/utils/get-user-from-cookies'
import { http } from '@/utils/http'
import { JWTsign } from '@/utils/jwt'
import { serverAES } from '@/utils/server-aes'
import { nanoid } from 'nanoid'
import { cookies } from 'next/headers'
import { pick } from 'ramda'

export async function apiUserList() {
  const res = await http.get<Issue[]>('/issues')
  return res.map(issueToUser)
}

export async function apiUserlogin(data: { username: string; password: string }) {
  if (!process.env.NEXT_APP_AUTH_KEY) {
    throw new Error('auth key not found')
  }

  const users = await apiUserList()
  const user = users.find((v) => {
    // 前端后端的密码都会加密
    // 需要解密后比较
    return v.username === data.username && clientAES.decrypt(data.password) === serverAES.decrypt(v.password)
  })

  if (user) {
    const token = await JWTsign(pick(['id', 'code'], user))
    cookies().set(process.env.NEXT_APP_AUTH_KEY, token)
    return { msg: 'ok', user }
  } else {
    throw new Error('invalid username or password')
  }
}

export async function apiUserSignUp(data: { username: string; password: string }) {
  const users = await apiUserList()
  const isExist = users.some((v) => v.username === data.username)

  if (isExist) {
    throw new Error('username already exist')
  } else {
    // 密码明文
    const originPassword = clientAES.decrypt<string>(data.password)
    if (originPassword) {
      // 保存到数据前,对密码进行加密
      const encryptedPassword = serverAES.encrypt(originPassword)
      const user = {
        username: data.username,
        password: encryptedPassword,
        secret: nanoid(),
      }

      await http.post<Issue>('/issues', {
        title: user.username,
        body: JSON.stringify(user),
        labels: [DataLabels.User],
      })

      return { msg: 'ok' }
    } else {
      throw new Error('invalid password')
    }
  }
}

export async function apiGetUser() {
  const user = await getUserFromCookies()
  const res = await http.get<Issue>(`/issues/${user?.code}`)
  return issueToUser(res)
}
