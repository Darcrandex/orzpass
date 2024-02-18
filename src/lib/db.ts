import { NEXT_APP_GITHUB_TOKEN } from '@/const/common'
import { Octokit } from 'octokit'

export const db = new Octokit({
  auth: NEXT_APP_GITHUB_TOKEN,

  // 在 nextjs 项目中
  // 数据库不需要缓存，否则容易导致数据查询错误
  request: {
    fetch: (input: any, init: any) => fetch(input, { ...init, cache: 'no-store' }),
  },
})
