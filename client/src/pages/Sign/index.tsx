/**
 * @name Sign
 * @description
 * @author darcrand
 */

import BackButton from '@/components/BackButton'
import { Tabs } from 'antd'
import { PropsWithChildren } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './styles.less'

export default function Sign() {
  const navigate = useNavigate()
  const { key = '1' } = useParams()
  const setTabKey = (key: string) => {
    navigate(`/sign/${key}`, { replace: true })
  }

  return (
    <>
      <article className='fixed top-1/2 left-1/2 z-20 w-96 max-w-full p-4 -translate-x-1/2 -translate-y-1/2'>
        <div className='p-4 bg-white/20 rounded-lg shadow backdrop-blur -translate-y-8'>
          <Tabs
            activeKey={key}
            onChange={setTabKey}
            size='large'
            animated
            destroyInactiveTabPane
            items={[
              {
                key: '1',
                label: 'Sign In',
                children: (
                  <TabContentWrapper>
                    <SignIn />
                  </TabContentWrapper>
                ),
              },
              {
                key: '2',
                label: 'Sign Up',
                children: (
                  <TabContentWrapper>
                    <SignUp />
                  </TabContentWrapper>
                ),
              },
            ]}
          />
        </div>
      </article>

      <div className='circle-1'></div>
      <div className='circle-2'></div>
    </>
  )
}

function TabContentWrapper(props: PropsWithChildren) {
  return (
    <div>
      <article className='h-80'>{props.children}</article>

      <footer className='text-center'>
        <BackButton />
      </footer>
    </div>
  )
}
