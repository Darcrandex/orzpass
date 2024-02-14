/**
 * @name Tabs
 * @description
 * @author darcrand
 */

import { cls } from '@/utils/cls'
import { useControllableValue } from 'ahooks'
import { TabsContext, useTabs } from './context'
import { TabsListProps, TabsPanelProps, TabsProps, TabsTriggerProps } from './types'

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
        className={cls(
          'p-2 cursor-pointer border-b-2 select-none transition-all',
          value === props.value ? 'text-primary border-primary' : 'border-transparent hover:text-primary'
        )}
        onClick={() => onChange(props.value)}
      >
        {props.children}
      </label>
    </>
  )
}

function TabsPanel(props: TabsPanelProps) {
  const { value } = useTabs()

  if (value !== props.value) {
    return null
  }

  return <div className='p-4'>{props.children}</div>
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Panel = TabsPanel
