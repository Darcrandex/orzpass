/**
 * @name ToolsPage
 * @description
 * @author darcrand
 */

import { Tabs, TabsList, TabsPanel, TabsTrigger } from '@/ui/Tabs'

export default function ToolsPage(props: { kg: any; pg: any }) {
  return (
    <>
      <Tabs defaultValue='key'>
        <TabsList className='m-4'>
          <TabsTrigger value='key'>KeyGenerate</TabsTrigger>
          <TabsTrigger value='password'>PasswordGenerate</TabsTrigger>
        </TabsList>

        <TabsPanel value='key'>{props.kg}</TabsPanel>

        <TabsPanel value='password'>{props.pg}</TabsPanel>
      </Tabs>
    </>
  )
}
