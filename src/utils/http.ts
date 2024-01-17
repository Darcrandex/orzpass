// 客户端使用的 axios 工具函数

import axios from 'axios'

export const http = axios.create({
  timeout: 10000,
})

http.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    config.baseURL = window.location.origin
  }

  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }

  return config
})
