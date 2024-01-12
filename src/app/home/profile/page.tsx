/**
 * @name ProfilePage
 * @description
 * @author darcrand
 */

'use client'
import { userService } from '@/services/user'
import { useQuery } from '@tanstack/react-query'

export default function ProfilePage() {
  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: () => userService.profile(),
  })

  return (
    <>
      <h1>ProfilePage</h1>
      <p>{JSON.stringify(data, null, 2)}</p>
    </>
  )
}
