/**
 * @name HomePage
 * @description 首页（同时也是文章列表页面）
 * @author darcrand
 */

import PostList from '@/components/PostList'
import { postService } from '@/services/post'

export default async function HomePage() {
  const res = await postService.all()

  return (
    <>
      <PostList data={res.data} />
    </>
  )
}
