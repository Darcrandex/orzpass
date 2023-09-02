/**
 * @name NoteEdit
 * @description
 * @author darcrand
 */

import { apiGetNoteById } from '@/services/note'
import NoteEdit from '@/views/NoteEdit'

export default async function NoteEditPage(props: { params: { id: string } }) {
  const data = await apiGetNoteById(props.params.id)

  return <NoteEdit data={data} />
}
