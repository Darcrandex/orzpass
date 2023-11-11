/**
 * @name HomeIndex
 * @description
 * @author darcrand
 */

import { redirect } from 'next/navigation'

export default async function HomeIndex() {
  redirect('/home/note')
}
