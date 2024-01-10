// 客户端使用的 axios 工具函数

import axios from 'axios'

export const http = axios.create({
  timeout: 10000,
  baseURL: 'http://localhost:3000',
})

http.interceptors.request.use((config) => {
  return config
})
