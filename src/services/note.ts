'use server'

import { Comment, commentToNote, Note } from '@/types/note'
import { clientAES } from '@/utils/client-aes'
import { aes } from '@/utils/common'
import { getUserFromCookies } from '@/utils/get-user-from-cookies'
import { http } from '@/utils/http'
import { omit } from 'ramda'
import { apiGetUser } from './user'

export async function apiGetNotes() {
  const user = await getUserFromCookies()
  const res = await http.get<Comment[]>(`/issues/${user?.code}/comments`)
  return res.map(commentToNote).map(omit(['password']))
}

export async function apiGetNoteById(id: Note['id']) {
  const user = await apiGetUser()
  const res = await http.get<Comment>(`/issues/comments/${id}`)
  const { password = '', ...rest } = commentToNote(res)
  return { ...rest, password: aes.decrypt(password, user.secret) }
}

export async function apiAddNote(note: Omit<Note, 'id'>) {
  const user = await apiGetUser()
  // 密码一定会有，因为通过一次加密
  const { password = '', ...rest } = note

  const originPassword = clientAES.decrypt<string>(password) || ''
  // 保存到服务端的加密的密码
  // 但是使用的是当前用户的秘钥
  const encryptedPassword = aes.encrypt(originPassword, user.secret)

  const res = await http.post<Comment>(`/issues/${user.code}/comments`, {
    body: JSON.stringify({ ...rest, password: encryptedPassword }),
  })
  return commentToNote(res)
}

export async function apiUpdateNote(note: Note) {
  const user = await apiGetUser()

  const { id, password = '', ...rest } = note
  const originPassword = clientAES.decrypt<string>(password) || ''
  const encryptedPassword = aes.encrypt(originPassword, user.secret)

  const res = await http.patch<Comment>(`/issues/comments/${note.id}`, {
    body: JSON.stringify({ ...rest, password: encryptedPassword }),
  })
  return commentToNote(res)
}

export async function apiRemoveNote(id: string) {
  return await http.delete(`/issues/comments/${id}`)
}
