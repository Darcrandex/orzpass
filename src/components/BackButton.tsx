/**
 * @name BackButton
 * @description 返回按钮
 * @author darcrand
 */

import { SwapLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useRouter } from 'next/navigation'

export type BackButtonProps = { to?: string; className?: string }

export default function BackButton(props: BackButtonProps) {
  const router = useRouter()
  return (
    <>
      <Button type='link' onClick={() => (props.to ? router.push(props.to) : router.back())}>
        <SwapLeftOutlined />
        <span className='ml-2'>Back</span>
      </Button>
    </>
  )
}
