import { PropsWithChildren } from 'react'

export type TabsContextValue = {
  value: string
  onChange: React.Dispatch<React.SetStateAction<string>>
}

export type TabsProps = PropsWithChildren<{
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
}>

export type TabsListProps = PropsWithChildren<{
  className?: string
}>

export type TabsTriggerProps = PropsWithChildren<{ value: string }>

export type TabsPanelProps = PropsWithChildren<{
  value: string
  className?: string
}>
