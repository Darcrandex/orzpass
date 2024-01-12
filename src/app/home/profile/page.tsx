/**
 * @name ProfilePage
 * @description
 * @author darcrand
 */

import { cookies } from 'next/headers'

export default async function ProfilePage() {
  const token = cookies().getAll()
  fetch('http://localhost:3000/api/user/profile')

  return (
    <>
      <h1>ProfilePage</h1>
      <p>{JSON.stringify(token, null, 2)}</p>
    </>
  )
}
