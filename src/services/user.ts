import { CreateUserDto, UpdatePasswordDto, UpdateUserDto, User } from '@/types/user'
import { http } from '@/utils/http'

export const userService = {
  login: (data: Pick<User, 'username' | 'password'>) => http.post<string>('/api/user/login', data),

  profile: () => http.get<Omit<User, 'password'>>('/api/user/profile'),

  registry: (data: CreateUserDto) => http.post<string>('/api/user/registry', data),

  update: (data: UpdateUserDto) => http.patch<User>('/api/user/profile', data),

  pwd: (data: UpdatePasswordDto) => http.patch<string>('/api/user/pwd', data),
}
