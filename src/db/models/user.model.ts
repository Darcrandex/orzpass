import { DataModel } from '../idb-client'

export type UserModel = DataModel & {
  username: string
  password: string
  avatarUrl?: string
  email?: string
}
