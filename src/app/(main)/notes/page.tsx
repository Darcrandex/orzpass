/**
 * @name Notes
 * @description
 * @author darcrand
 */

import { apiGetNotes } from '@/services/note'
import NoteList from '@/views/NoteList'

export default async function Notes() {
  const data = await apiGetNotes()
  return <NoteList list={data} />
}
