import { IDBClient } from './idb-client'
import { NoteModel } from './models/note.model'
import { UserModel } from './models/user.model'

const idb = new IDBClient({
  owner: process.env.NEXT_APP_GITHUB_OWNER || '',
  repo: process.env.NEXT_APP_GITHUB_REPO || '',
  auth: process.env.NEXT_APP_GITHUB_AUTH || '',
})

export const db = {
  user: idb.createService<UserModel>('user'),
  note: idb.createService<NoteModel>('note'),
}
