import { Note } from '@/types/note'
import { http } from '@/utils/http'

export const apiNotes = {
  list(): Promise<Note[]> {
    return http.get('/notes')
  },

  add(data: Omit<Note, 'id'>) {
    return http.post('/notes', data)
  },

  getById(id: string): Promise<Note> {
    return http.get(`/notes/${id}`)
  },

  update(data: Note) {
    return http.patch(`/notes/${data.id}`, data)
  },

  remove(id: string) {
    return http.delete(`/notes/${id}`)
  },
}
