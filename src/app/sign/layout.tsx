/**
 * @name SignLayout
 * @description
 * @author darcrand
 */

import { PropsWithChildren } from 'react'

export default function SignLayout(props: PropsWithChildren) {
  return (
    <>
      <h1>SignLayout</h1>

      <div>{props.children}</div>
    </>
  )
}
