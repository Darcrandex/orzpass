export const MAX_NOTE_COUNT = 1000
export const MAX_PAGE_SIZE = 100
export const TOKEN_KEY = 'Authorization'

export const NEXT_APP_JWT_SECRET = process.env.NEXT_APP_JWT_SECRET || 'secret'
export const NEXT_APP_BASE_API_URL = process.env.NEXT_APP_BASE_API_URL || ''
export const NEXT_APP_GITHUB_TOKEN = process.env.NEXT_APP_GITHUB_TOKEN || ''

export const OWNER = NEXT_APP_BASE_API_URL.match(/\/repos\/([^/]+)\/([^/]+)/)?.[1] || ''
export const REPO = NEXT_APP_BASE_API_URL.match(/\/repos\/([^/]+)\/([^/]+)/)?.[2] || ''
