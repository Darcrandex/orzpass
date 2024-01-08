'use server'

import { TResponse } from '@/types/global'
import { Issue, issueToUser } from '@/types/user'
import { http } from '@/utils/http'
import { compareSync } from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { omit } from 'ramda'

export async function userLogin(prevState: any, formData: FormData): Promise<TResponse<string>> {
  const username = formData.get('username')
  const password = formData.get('password')

  const { data } = await http.get<Issue[]>('/issues')
  const users = data.map((issue) => issueToUser(issue))
  const user = users.find(
    (u) => u.username === username && typeof password === 'string' && compareSync(password, u.password)
  )

  if (user) {
    const token = jwt.sign(omit(['password'], user), process.env.NEXT_APP_JWT_SECRET || 'secret', { expiresIn: '1d' })
    cookies().set('token', token)
    redirect('/')
  }

  return { data: '', error: 'username or password is invalid' }
}
