import { User } from '@/types/user'
import { http } from '@/utils/http'

export const apiUser = {
  login(data: { username: string; password: string }): Promise<string> {
    return http.post('/user/login', data)
  },

  registry(data: { username: string; password: string }) {
    return http.post('user/registry', data)
  },

  getInfo(): Promise<Omit<User, 'password'>> {
    return http.get('/user/info')
  },

  updateInfo(data: Omit<User, 'password'>): Promise<Omit<User, 'password'>> {
    return http.patch('/user/info', data)
  },

  updatePassword(data: { password: string; oldPassword: string }) {
    return http.patch('/user/pwd', data)
  },
}
