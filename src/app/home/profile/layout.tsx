/**
 * @name ProfileLayout
 * @description
 * @author darcrand
 */

'use client'
import NavBack from '@/components/NavBack'
import Tabs from '@/ui/Tabs'

export default function ProfileLayout(props: { base: any; pwd: any }) {
  return (
    <>
      <header className='m-4'>
        <NavBack />
      </header>

      <Tabs defaultValue='user'>
        <Tabs.List className='mx-4'>
          <Tabs.Trigger value='user'>User</Tabs.Trigger>
          <Tabs.Trigger value='password'>Password</Tabs.Trigger>
        </Tabs.List>

        <Tabs.Panel value='user'>{props.base}</Tabs.Panel>
        <Tabs.Panel value='password'>{props.pwd}</Tabs.Panel>
      </Tabs>
    </>
  )
}
