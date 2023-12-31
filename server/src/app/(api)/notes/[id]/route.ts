import { Comment, Note, commentToNote } from '@/types/note.model'
import { getIconFromUrl } from '@/utils/getIconFromUrl'
import { http } from '@/utils/http'
import { NextRequest, NextResponse } from 'next/server'
import { omit } from 'ramda'

// get note by id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const res = await http.get<Comment>(`/issues/comments/${params.id}`)
  return NextResponse.json({ data: commentToNote(res.data) })
}

// update note
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const note = (await request.json()) as Note

  const websiteUrl = note.website
  const iconUrl = note.iconUrl || (await getIconFromUrl(websiteUrl))

  const res = await http.patch<Comment>(`/issues/comments/${params.id}`, { body: JSON.stringify(omit(['id'], { ...note, iconUrl })) })
  return NextResponse.json({ data: res.data.id })
}

// remote note by id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await http.delete(`/issues/comments/${params.id}`)
  return NextResponse.json({ msg: 'ok' })
}
