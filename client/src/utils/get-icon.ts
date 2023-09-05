import { apiGetIcons } from '@/services/common'
import { last } from 'ramda'

export async function getIconFromUrl(url?: string) {
  if (!url) return

  try {
    const u = new URL('/', `http://${url}`)
    const hostname = u.hostname
    const res = await apiGetIcons(hostname)
    const icons = res.icons
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
