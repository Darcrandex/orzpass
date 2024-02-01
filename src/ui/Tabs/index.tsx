/**
 * @name Tabs
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { useControllableValue } from 'ahooks'
import { TabsContext, useTabs } from './context'
import { TabsListProps, TabsProps, TabsTriggerProps } from './types'

export default function Tabs(props: TabsProps) {
  const [value, onChange] = useControllableValue<string>(props)

  return <TabsContext.Provider value={{ value, onChange }}>{props.children}</TabsContext.Provider>
}

function TabsList(props: TabsListProps) {
  return <nav className={cls('flex space-x-4', props.className)}>{props.children}</nav>
}

function TabsTrigger(props: TabsTriggerProps) {
  const { value, onChange } = useTabs()

  return (
    <>
      <label
        className={cls('p-2 cursor-pointer select-none transition-all', value === props.value && 'text-pink-500')}
        onClick={() => onChange(props.value)}
      >
        {props.children}
      </label>
    </>
  )
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
