import { Comment, commentToNote, Note } from '@/types/note'
import { codeToNumber, User } from '@/types/user'
import { http } from '@/utils/http'

export async function apiGetNotes(code: User['code']) {
  const res = await http.get<Comment[]>(`/issues/${codeToNumber(code)}/comments`)
  return res.data.map(commentToNote)
}

export async function apiGetNoteById(id: Note['id']) {
  const res = await http.get<Comment>(`/issues/comments/${id}`)
  return commentToNote(res.data)
}

export async function apiAddNote(code: User['code'], note: Omit<Note, 'id'>) {
  const res = await http.post<Comment>(`/issues/${codeToNumber(code)}/comments`, { body: JSON.stringify(note) })
  return commentToNote(res.data)
}

export async function apiUpdateNote(id: string, note: any) {
  const res = await http.patch<Comment>(`/issues/comments/${id}`, { body: JSON.stringify(note) })
  return commentToNote(res.data)
}

export async function apiRemoveNote(id: string) {
  return await http.delete(`/issues/comments/${id}`)
}
