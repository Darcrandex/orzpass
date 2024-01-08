/**
 * @name HomePage
 * @description 首页（同时也是文章列表页面）
 * @author darcrand
 */

import Link from 'next/link'

export default function HomePage() {
  const posts = [{ id: '1', title: 'aaa' }]

  return (
    <>
      <h1>HomePage</h1>

      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <Link href={`/home/post/${post.id}`}>{post.title}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}
