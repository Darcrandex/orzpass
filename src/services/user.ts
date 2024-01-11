import { User } from '@/types/user'
import { http } from '@/utils/http'

export const userService = {
  login: (data: Pick<User, 'username' | 'password'>) => http.post<void>('/api/user/login', data),

  profile: () => http.get<Omit<User, 'password'>>('/api/user/profile'),
}
