/**
 * @name PostPage
 * @description
 * @author darcrand
 */

'use client'
import { postService } from '@/services/post'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'

export default function PostPage() {
  const id = useParams().id as string
  const { data } = useQuery({
    enabled: !!id,
    queryKey: ['post', id],
    queryFn: () => postService.one(id),
  })

  const router = useRouter()
  const queryClient = useQueryClient()
  const { mutate } = useMutation({
    mutationFn: () => postService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] })
      router.back()
    },
  })

  return (
    <>
      <h1>PostPage</h1>

      <p>{data?.data?.title}</p>

      <p>
        <Link href={`/home/post/${id}/edit`}>goto edit</Link>
      </p>

      <p>
        <button onClick={() => mutate()}>删除</button>
      </p>
    </>
  )
}
