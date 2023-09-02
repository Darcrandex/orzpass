/**
 * @name Note
 * @description
 * @author darcrand
 */

import { apiGetNoteById } from '@/services/note'
import NoteDetail from '@/views/NoteDetail'

export default async function Note(props: { params: { id: string } }) {
  const data = await apiGetNoteById(props.params.id)

  return <NoteDetail data={data} />
}
