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
      <section className='sign-wrapper'>
        <main className='relative z-10 flex items-center justify-center mx-4 h-[75vh]'>
          <article className='w-96 p-8 bg-white/20 rounded-lg shadow backdrop-blur'>
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
          </article>
        </main>
      </section>
    </>
  )
}

function TabContentWrapper(props: PropsWithChildren) {
  return (
    <div>
      <article className='h-72'>{props.children}</article>

      <footer className='text-center'>
        <BackButton />
      </footer>
    </div>
  )
}
