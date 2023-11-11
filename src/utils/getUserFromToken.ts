import { UserModel } from '@/db/models/user.model'
import jwt from 'jsonwebtoken'
import { type NextRequest } from 'next/server'

export function getUserFromToken(req: NextRequest) {
  const token = req.headers.get('Authorization') || ''
  const decode = jwt.decode(token) as Omit<UserModel, 'password'>
  return decode
}
