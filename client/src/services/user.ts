import { DataLabels } from '@/types/enum'
import { Issue, User, codeToNumber, issueToUser } from '@/types/user'
import { http } from '@/utils/http'

export const apiUser = {
  login() {
    return http.post('/login')
  },

  registry() {},

  update() {},

  updatePassword() {},
}

export async function apiGetUsers() {
  const res = await http.get<Issue[]>('/issues')
  return res.data.map(issueToUser)
}

export async function apiAddUser(user: Omit<User, 'code' | 'id'>) {
  const res = await http.post<Issue>('issues', {
    title: user.name,
    body: JSON.stringify(user),
    labels: [DataLabels.User],
  })
  return issueToUser(res.data)
}

export async function apiGetUser(code: string) {
  const res = await http.get(`/issues/${codeToNumber(code)}`)
  return issueToUser(res.data)
}

export async function apiUpdateUser(user: User) {
  const res = await http.patch(`/issues/${codeToNumber(user.code)}`, { title: user.name, body: JSON.stringify(user) })
  return issueToUser(res.data)
}
