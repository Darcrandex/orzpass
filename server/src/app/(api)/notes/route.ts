import { MAX_NOTE_COUNT, MAX_PAGE_SIZE, TOKEN_KEY } from '@/enums'
import { jwt } from '@/lib/auth'
import { Comment, Note, commentToNote } from '@/types/note.model'
import { User } from '@/types/user.model'
import { getIconFromUrl } from '@/utils/getIconFromUrl'
import { http } from '@/utils/http'
import { NextResponse, type NextRequest } from 'next/server'

// get notes list
export async function GET(request: NextRequest) {
  const token = request.headers.get(TOKEN_KEY) || ''

  // fucking middleware cache
  // 缓存一直无法清除
  // 业务上这个接口是最基本的功能
  // 因此只需要验证这个接口即可
  if (!token || !jwt.verify(token)) {
    return NextResponse.json({ msg: 'invalid token' }, { status: 401 })
  }

  const payload = jwt.decode<Pick<User, 'id'>>(token)

  // 由于目前不打算做分页查询
  // 直接拿所有的数据
  const maxPage = Math.ceil(MAX_NOTE_COUNT / MAX_PAGE_SIZE)
  const tasks = Array.from({ length: maxPage }).map((_, i) =>
    http.get<Comment[]>(`/issues/${payload.id}/comments?per_page=${MAX_PAGE_SIZE}&page=${i + 1}`)
  )
  const pagesRes = await Promise.all(tasks)
  const data = pagesRes.reduce<Note[]>((acc, cur) => acc.concat(cur.data.map(commentToNote)), [])

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
