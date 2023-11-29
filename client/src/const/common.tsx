import { NavItemProps } from '@/components/NavItem'
import { GithubOutlined, MonitorOutlined, SmileOutlined, ToolOutlined } from '@ant-design/icons'

export const navs: NavItemProps[] = [
  { to: '/note', title: 'Notes', icon: <MonitorOutlined /> },
  { to: '/mine', title: 'Mine', icon: <SmileOutlined /> },
  { to: '/tools', title: 'Tools', icon: <ToolOutlined /> },
  { to: '/about', title: 'About', icon: <GithubOutlined /> },
]
