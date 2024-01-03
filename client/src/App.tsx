/**
 * @name App
 * @description
 * @author darcrand
 */

import { Spin } from 'antd'
import { Suspense, lazy } from 'react'
import { Navigate, RouterProvider, createHashRouter } from 'react-router-dom'

import Home from './pages/Home'
import NoteMain from './pages/NoteMain'

/**
 * @description 每个路由组件自己处理懒加载
 * @param Component 通过 React.lazy 函数获得的懒加载组件
 */
function withSuspense(Component: React.LazyExoticComponent<React.FunctionComponent>) {
  const LazyComponent = () => (
    <Suspense
      fallback={
        <Spin spinning className='w-full'>
          <div className='h-96'></div>
        </Spin>
      }
    >
      <Component />
    </Suspense>
  )

  return LazyComponent
}

const Notes = withSuspense(lazy(() => import('@/pages/Notes')))
const Note = withSuspense(lazy(() => import('@/pages/Note')))
const NoteEdit = withSuspense(lazy(() => import('@/pages/NoteEdit')))
const Mine = withSuspense(lazy(() => import('@/pages/Mine')))
const Tools = withSuspense(lazy(() => import('@/pages/Tools')))
const About = withSuspense(lazy(() => import('@/pages/About')))
const Sign = withSuspense(lazy(() => import('@/pages/Sign')))
const NotFound = withSuspense(lazy(() => import('@/pages/404')))

const router = createHashRouter([
  {
    path: '/',
    element: <Home />,
    children: [
      { index: true, element: <Navigate to='note' /> },
      {
        path: 'note',
        element: <NoteMain />,
        children: [
          { index: true, element: <Notes /> },
          { path: ':id', element: <Note /> },
          { path: 'new', element: <NoteEdit /> },
          { path: ':id/edit', element: <NoteEdit /> },
        ],
      },
      { path: 'mine', element: <Mine /> },
      { path: 'tools', element: <Tools /> },
      { path: 'about', element: <About /> },
    ],
  },
  { path: '/sign/:key', element: <Sign /> },
  { path: '*', element: <NotFound /> },
])

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}
