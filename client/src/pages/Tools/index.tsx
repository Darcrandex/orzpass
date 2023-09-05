/**
 * @name Tools
 * @description
 * @author darcrand
 */

import { Tabs } from 'antd'
import KeyGenerator from './KeyGenerator'
import PasswordGenerator from './PasswordGenerator'

export default function Tools() {
  return (
    <>
      <section className='m-4'>
        <Tabs
          items={[
            { key: '1', label: 'Key Generator', children: <KeyGenerator /> },
            { key: '2', label: 'Password Generator', children: <PasswordGenerator /> },
          ]}
        />
      </section>
    </>
  )
}
