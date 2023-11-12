import { MAX_NOTE_COUNT, TOKEN_KEY } from '@/enums'
import { checkAuth, jwt } from '@/lib/auth'
import { Comment, Note, commentToNote } from '@/types/note.model'
import { User } from '@/types/user.model'
import { getIconFromUrl } from '@/utils/getIconFromUrl'
import { http } from '@/utils/http'
import { NextResponse, type NextRequest } from 'next/server'

// get notes list
export async function GET(request: NextRequest) {
  checkAuth()
  const token = request.headers.get(TOKEN_KEY) || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)
  const res = await http.get<Comment[]>(`/issues/${payload.id}/comments`)
  const data = res.data.map(commentToNote)

  return NextResponse.json({ data })
}

// add new note
export async function POST(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''
  const payload = jwt.decode<Pick<User, 'id'>>(token)

  const commentsRes = await http.get<Comment[]>(`/issues/${payload.id}/comments`)
  if (commentsRes.data.length > MAX_NOTE_COUNT) {
    return NextResponse.json({ msg: 'Too many notes' }, { status: 400 })
  }

  const note = (await request.json()) as Note
  const websiteUrl = note.website
  const iconUrl = note.iconUrl || (await getIconFromUrl(websiteUrl))

  const commentRes = await http.post<Comment>(`/issues/${payload.id}/comments`, {
    body: JSON.stringify({ ...note, iconUrl }),
  })

  return NextResponse.json({ data: commentRes.data.id })
}
