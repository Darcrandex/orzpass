/**
 * @name GlobalError
 * @description
 * @author darcrand
 */

'use client'
import Button from '@/ui/Button'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError(props: GlobalErrorProps) {
  return (
    <>
      <section className='text-center'>
        <h1>GlobalError</h1>
        <p>
          <span>{props.error.message}</span>
          <Button onClick={props.reset}>Reset</Button>
        </p>
      </section>
    </>
  )
}
