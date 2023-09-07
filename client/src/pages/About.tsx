/**
 * @name About
 * @description
 * @author darcrand
 */

import { LinkOutlined, SmileOutlined } from '@ant-design/icons'
import { Button } from 'antd'

export default function About() {
  return (
    <>
      <p className='mt-10 text-center text-pink-500 text-3xl'>
        <SmileOutlined />
      </p>

      <p className='mt-2 text-center'>
        <Button
          size='large'
          type='link'
          icon={<LinkOutlined />}
          target='_blank'
          href='https://github.com/Darcrandex/orzpass'
        >
          Powered by @darcrand
        </Button>
      </p>
    </>
  )
}
