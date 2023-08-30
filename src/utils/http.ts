import qs from 'qs'

const baseURL = `https://api.github.com/repos/${process.env.NEXT_APP_GITHUB_USERNAME}/${process.env.NEXT_APP_REPOSITORY_NAME}`

async function request<R = any>(
  url: string,
  options?: { method?: 'GET' | 'POST' | 'PATCH' | 'PUT'; params?: Record<string, any>; data?: Record<string, any> }
) {
  const query = qs.stringify(options?.params)

  const res = await fetch(`${baseURL}${url}${query ? `?${query}` : ''}`, {
    method: options?.method || 'GET',
    body: options?.data ? JSON.stringify(options.data) : undefined,
    headers: { Accept: 'application/vnd.github+json', Authorization: `Bearer ${process.env.NEXT_APP_GITHUB_TOKEN}` },
  })

  if (res.ok) {
    return res.json() as Promise<R>
  } else {
    throw new Error(res.statusText)
  }
}

export const http = {
  async get<R = any>(url: string, params?: Record<string, any>) {
    return request<R>(url, { params, method: 'GET' })
  },
}
