import { clamp } from 'ramda'

export const MAX_NOTE_COUNT = 1000
export const MAX_PAGE_SIZE = 100
export const TOKEN_KEY = 'Authorization'
export const TOKEN_STORAGE_KEY = 'orz-pwd-token'

// 注意
// env 中的变量默认情况下无法在客户端环境获取
export const NEXT_APP_JWT_SECRET = process.env.NEXT_APP_JWT_SECRET || 'secret'
export const NEXT_APP_BASE_API_URL = process.env.NEXT_APP_BASE_API_URL || ''
export const NEXT_APP_GITHUB_TOKEN = process.env.NEXT_APP_GITHUB_TOKEN || ''
export const NEXT_ENCODE_TIMES = clamp(Number.parseInt(process.env.NEXT_ENCODE_TIMES || '3'), 1, 10)
export const NEXT_MAX_USER_COUNT = clamp(Number.parseInt(process.env.NEXT_MAX_USER_COUNT || '10'), 1, 10)

export const OWNER = NEXT_APP_BASE_API_URL.match(/\/repos\/([^/]+)\/([^/]+)/)?.[1] || ''
export const REPO = NEXT_APP_BASE_API_URL.match(/\/repos\/([^/]+)\/([^/]+)/)?.[2] || ''
