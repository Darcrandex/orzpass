/**
 * @name Sign
 * @description
 * @author darcrand
 */

import BackButton from '@/components/BackButton'
import { Tabs } from 'antd'
import { PropsWithChildren, useState } from 'react'
import { useParams } from 'react-router-dom'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './styles.less'

export default function Sign() {
  const { key } = useParams()
  const [tabKey, setTabKey] = useState(key || '1')

  return (
    <>
      <section className='sign-wrapper'>
        <main className='relative z-10 flex items-center justify-center mx-4 h-[75vh]'>
          <article className='w-96 p-8 bg-white/20 rounded-lg shadow backdrop-blur'>
            <Tabs
              activeKey={tabKey}
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
