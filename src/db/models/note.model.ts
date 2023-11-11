import { DataModel } from '../idb-client'

export type NoteModel = DataModel & {
  title: string
  username?: string
  password?: string
  website?: string
  iconUrl?: string
  remark?: string
}
