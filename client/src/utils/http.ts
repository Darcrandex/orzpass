import axios from 'axios'

export const http = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : '/api',
})

http.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})

http.interceptors.response.use((res) => {
  return res.data
})
