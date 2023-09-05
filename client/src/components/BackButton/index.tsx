/**
 * @name BackButton
 * @description 返回按钮
 * @author darcrand
 */

import { SwapLeftOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export type BackButtonProps = { to?: string; className?: string }

export default function BackButton(props: BackButtonProps) {
  const navigate = useNavigate()
  return (
    <>
      <Button type='link' onClick={() => (props.to ? navigate(props.to) : navigate(-1))}>
        <SwapLeftOutlined />
        <span className='ml-2'>Back</span>
      </Button>
    </>
  )
}
