/**
 * @name ProfileWidget
 * @description
 * @author darcrand
 */

import { userService } from '@/services/user'

export default async function ProfileWidget() {
  const res = await userService.profile()
  return (
    <>
      <div></div>
    </>
  )
}
