import axios from 'axios'
import qs from 'qs'

export const http = axios.create({
  timeout: 10000,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'brackets' }),
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = token
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

http.interceptors.response.use((response) => {
  return response
})
