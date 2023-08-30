'use server'

import { sleep } from '@/utils/common'

export async function createNote(params: { title: string }) {
  console.log('server form', params)

  await sleep(2000)
  return { msg: 'ok' }
}
