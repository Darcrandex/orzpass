import axios from 'axios'

export const http = axios.create({
  baseURL: `https://api.github.com/repos/${import.meta.env.VITE_APP_GITHUB_USERNAME}/${
    import.meta.env.VITE_APP_REPOSITORY_NAME
  }`,
  timeout: 10000,
  headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_TOKEN}` },
})

http.interceptors.request.use((config) => {
  if (config.method?.toUpperCase() === 'GET') {
    config.params = { ...config.params, t: Date.now() }
  }

  return config
})
