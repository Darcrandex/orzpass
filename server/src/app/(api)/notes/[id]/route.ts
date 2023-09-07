import { Comment, Note, commentToNote } from '@/types/note.model'
import { http } from '@/utils/http'
import { NextRequest, NextResponse } from 'next/server'
import { omit } from 'ramda'

// get note by id
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const res = await http.get<Comment>(`/issues/comments/${params.id}`)
  return NextResponse.json(commentToNote(res.data))
}

// update note
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const note = (await request.json()) as Note
  const res = await http.patch<Comment>(`/issues/comments/${params.id}`, { body: JSON.stringify(omit(['id'], note)) })
  return NextResponse.json(res.data.id)
}

// remote note by id
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await http.delete(`/issues/comments/${params.id}`)
  return NextResponse.json(null, { status: 204 })
}
