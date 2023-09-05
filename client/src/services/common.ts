type IconRes = { domain: string; icons: { src: string; sizes?: string }[] }
import { http } from '@/utils/http'

export async function apiGetIcons(hostname: string) {
  const res = await http.get<IconRes>(`https://favicongrabber.com/api/grab/${hostname}`)
  return res.data
}
