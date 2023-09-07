import axios from 'axios'
import { last } from 'ramda'

type IconRes = { domain: string; icons: { src: string; sizes?: string }[] }

export async function getIconFromUrl(url?: string) {
  if (!url) return

  try {
    const u = new URL('/', `http://${url}`)
    const hostname = u.hostname
    const res = await axios.get<IconRes>(`https://www.google.com/s2/favicons?domain=${hostname}`)

    const icons = res.data.icons
      .map((v) => {
        const size = Number.parseFloat(v.sizes || '')
        return { size: Number.isNaN(size) ? 1 : size, src: v.src }
      })
      // 按大小排序
      .sort((a, b) => a.size - b.size)

    // 取最大的那个
    const src = last(icons)?.src
    return src
  } catch (error) {
    console.error('get icon fail', error)
    return
  }
}
