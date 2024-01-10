import { NEXT_APP_BASE_API_URL, NEXT_APP_GITHUB_TOKEN } from '@/const/common'
import axios from 'axios'

// 服务端使用的 axios 工具函数,主要是设置 GitHub 请求头
export const serverFetch = axios.create({
  baseURL: NEXT_APP_BASE_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${NEXT_APP_GITHUB_TOKEN}`,
  },
})
