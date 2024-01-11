/**
 * @name GlobalError
 * @description
 * @author darcrand
 */

'use client'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError(props: GlobalErrorProps) {
  return (
    <>
      <h1>GlobalError</h1>
      <p>{props.error.message}</p>

      <button onClick={props.reset}>Reset</button>
    </>
  )
}
