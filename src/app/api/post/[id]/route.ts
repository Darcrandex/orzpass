import { OWNER, REPO } from '@/const/common'
import { db } from '@/lib/db'
import { commentToPost } from '@/types/post'
import { NextRequest, NextResponse } from 'next/server'
import { omit } from 'ramda'

// 单个帖子的详情
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const res = await db.rest.issues.getComment({
    owner: OWNER,
    repo: REPO,
    comment_id: Number.parseInt(params.id),
  })

  return NextResponse.json(commentToPost(res.data))
}

// 更新帖子
export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const body = await request.json()

  const response = await db.rest.issues.updateComment({
    owner: OWNER,
    repo: REPO,
    comment_id: Number.parseInt(params.id),
    body: JSON.stringify(omit(['id'], body)),
  })

  const updatedComment = response.data

  return NextResponse.json({ id: updatedComment.id })
}

// 删除帖子
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await db.rest.issues.deleteComment({
    owner: OWNER,
    repo: REPO,
    comment_id: Number.parseInt(params.id),
  })

  return NextResponse.json({ id: params.id })
}
