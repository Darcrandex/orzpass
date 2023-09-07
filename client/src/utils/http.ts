import axios from 'axios'

export const http = axios.create({
  baseURL: '/api',
})

http.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token')

  return config
})

http.interceptors.response.use((res) => {
  return res.data.data
})
