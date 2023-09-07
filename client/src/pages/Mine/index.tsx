/**
 * @name Mine
 * @description
 * @author darcrand
 */

import { Tabs } from 'antd'
import Password from './Password'
import UserInfo from './UserInfo'

export default function Mine() {
  return (
    <>
      <section className='m-4'>
        <Tabs
          items={[
            { key: '1', label: 'UserInfo', children: <UserInfo /> },
            { key: '2', label: 'Password', children: <Password /> },
          ]}
        />
      </section>
    </>
  )
}
