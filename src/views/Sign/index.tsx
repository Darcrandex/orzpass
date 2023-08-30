/**
 * @name Sign
 * @description
 * @author darcrand
 */

'use client'
import BackButton from '@/components/BackButton'
import { Tabs } from 'antd'
import { useRouter, useSearchParams } from 'next/navigation'
import { PropsWithChildren } from 'react'
import SignIn from './SignIn'
import SignUp from './SignUp'
import './styles.css'

export default function Sign() {
  const router = useRouter()
  const params = useSearchParams()
  const tabKey = params.get('tab') || 'in'
  const setTabKey = (key: string) => {
    router.replace(`/sign?tab=${key}`)
  }

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
                  key: 'in',
                  label: 'Sign In',
                  children: (
                    <TabContentWrapper>
                      <SignIn />
                    </TabContentWrapper>
                  ),
                },
                {
                  key: 'up',
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
