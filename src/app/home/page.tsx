/**
 * @name HomeIndex
 * @description
 * @author darcrand
 */

import { redirect } from 'next/navigation'

export default function HomeIndex() {
  redirect('/home/note')
}
