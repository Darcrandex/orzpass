import { useEffect, useState } from 'react'

/**
 * @description 当条件满足时，执行（仅一次）回调函数
 * @param callback - 回调函数
 * @param isReady - 判断条件
 */
export function useOnReady<T>(callback: T | Promise<T>, isReady: boolean | (() => boolean)) {
  const [done, set] = useState(false)

  useEffect(() => {
    if (done) return

    if ((typeof isReady === 'boolean' && isReady) || (typeof isReady === 'function' && isReady())) {
      if (typeof callback === 'function') {
        callback()
        set(true)
      }
    }
  }, [callback, isReady, done])
}
