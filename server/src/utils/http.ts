import axios from 'axios'

export const http = axios.create({
  baseURL: process.env.NEXT_APP_BASE_API_URL,
  timeout: 10000,
  headers: {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${process.env.NEXT_APP_GITHUB_TOKEN}`,
  },
})
