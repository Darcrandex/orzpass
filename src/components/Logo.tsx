/**
 * @name Logo
 * @description 每个网站的 logo
 * @author darcrand
 */

import { Note } from '@/types/note'
import { cls } from '@/utils/common'
import Color from 'color'
import { useEffect, useMemo, useState } from 'react'

export type LogoProps = Pick<Note, 'title' | 'iconUrl'> & { size?: 'normal' | 'large' | 'small'; className?: string }

export default function Logo(props: LogoProps) {
  const [loadedIcon, setIconUrl] = useState<string>()
  useEffect(() => {
    if (props.iconUrl) {
      const img = new Image()
      img.src = props.iconUrl
      img.onload = () => {
        setIconUrl(props.iconUrl)
      }
      return () => {
        img.remove()
      }
    }
  }, [props.iconUrl])

  const bgColor = useMemo(() => {
    const h = props.title.split('').reduce((prev, curr) => prev + curr.charCodeAt(0), 0)
    return Color.hsl(h, 85, 65)
  }, [props.title])

  return (
    <>
      <span
        className={cls(
          'flex items-center justify-center rounded-lg text-lg text-white uppercase bg-contain bg-no-repeat',
          props.size === 'large' ? 'w-16 h-16' : props.size === 'small' ? 'w-10 h-10' : 'w-12 h-12',
          props.className
        )}
        style={{
          backgroundColor: loadedIcon ? undefined : bgColor.hex(),
          backgroundImage: loadedIcon ? `url("${loadedIcon}")` : undefined,
        }}
      >
        {!loadedIcon && props.title.slice(0, 1)}
      </span>
    </>
  )
}
