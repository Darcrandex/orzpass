/**
 * @name ProfileLayout
 * @description
 * @author darcrand
 */

'use client'
import { Tabs, TabsList, TabsPanel, TabsTrigger } from '@/ui/Tabs'

export default function ProfileLayout(props: { base: any; pwd: any }) {
  return (
    <>
      <Tabs defaultValue='user'>
        <TabsList className='m-4'>
          <TabsTrigger value='user'>User</TabsTrigger>
          <TabsTrigger value='password'>Password</TabsTrigger>
        </TabsList>

        <TabsPanel value='user'>{props.base}</TabsPanel>
        <TabsPanel value='password'>{props.pwd}</TabsPanel>
      </Tabs>
    </>
  )
}
