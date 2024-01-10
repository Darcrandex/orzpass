/**
 * @name PostRemoveButton
 * @description
 * @author darcrand
 */

'use client'

import { postService } from '@/services/post'
import { useMutation } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'

export type PostRemoveButtonProps = { k?: unknown }

export default function PostRemoveButton(props: PostRemoveButtonProps) {
  const postId = useParams().id as string
  const router = useRouter()

  const { mutate } = useMutation({
    mutationFn: () => postService.remove(postId),
    onSuccess: () => {
      router.back()
      router.refresh()
    },
  })

  return (
    <>
      <button onClick={() => mutate()}>删除</button>
    </>
  )
}
