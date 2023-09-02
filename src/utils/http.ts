import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.NEXT_APP_GITHUB_USERNAME}/${process.env.NEXT_APP_REPOSITORY_NAME}`,
  timeout: 10000,
  headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${process.env.NEXT_APP_GITHUB_TOKEN}` },
})

axiosInstance.interceptors.request.use((config) => {
  if (config.method?.toUpperCase() === 'GET') {
    config.params = { ...config.params, t: Date.now() }
  }

  return config
})

axiosInstance.interceptors.response.use((res) => {
  return res.data
})

export const http = {
  get<R>(url: string, params?: any): Promise<R> {
    return axiosInstance.get(url, { params })
  },

  post<R>(url: string, data?: any): Promise<R> {
    return axiosInstance.post(url, data)
  },

  patch<R>(url: string, data?: any): Promise<R> {
    return axiosInstance.patch(url, data)
  },

  put<R>(url: string, data?: any): Promise<R> {
    return axiosInstance.put(url, data)
  },

  delete<R>(url: string): Promise<R> {
    return axiosInstance.delete(url)
  },
}
