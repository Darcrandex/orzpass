import { MAX_PAGE_SIZE, OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { Post, commentToPost } from '@/types/post'
import { getUserFormToken } from '@/utils/getUserFromToken'
import { NextResponse, type NextRequest } from 'next/server'

// 帖子列表
export async function GET(request: NextRequest) {
  const { id: userId } = await getUserFormToken(request)

  const response: any = await db.graphql(
    `
      query($owner: String!, $repo: String!, $issueNumber: Int!) {
        repository(owner: $owner, name: $repo) {
          issue(number: $issueNumber) {
            comments {
              totalCount
            }
          }
        }
      }
    `,
    {
      owner: OWNER,
      repo: REPO,
      issueNumber: Number.parseInt(userId),
    }
  )

  const totalCount = response?.repository?.issue?.comments?.totalCount || 0

  // 由于目前不打算做分页查询
  // 直接拿所有的数据
  const maxPage = Math.ceil(totalCount / MAX_PAGE_SIZE)

  const tasks = Array.from({ length: maxPage }).map((_, i) =>
    db.rest.issues.listComments({
      owner: OWNER,
      repo: REPO,
      issue_number: Number.parseInt(userId),
      per_page: MAX_PAGE_SIZE,
      page: i + 1,
    })
  )
  const pagesRes = await Promise.all(tasks)
  const data = pagesRes.reduce<Post[]>((acc, cur) => acc.concat(cur.data.map(commentToPost)), [])

  return NextResponse.json(data)
}

// 创建帖子
export async function POST(request: NextRequest) {
  const { id: userId } = await getUserFormToken(request)
  const body = await request.json()

  const response = await db.rest.issues.createComment({
    owner: OWNER,
    repo: REPO,
    issue_number: Number.parseInt(userId),
    body: JSON.stringify({ ...body, userId }),
  })

  return NextResponse.json({ id: response.data.id })
}
