import { createContext, useContext } from 'react'
import { TabsContextValue } from './types'

export const TabsContext = createContext<TabsContextValue>({
  value: '',
  onChange: () => {},
})

export function useTabs() {
  return useContext(TabsContext)
}
