/**
 * @name ProfileWidget
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export default function ProfileWidget() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
  })

  return (
    <>
      <div>{data?.data?.username}</div>
    </>
  )
}
