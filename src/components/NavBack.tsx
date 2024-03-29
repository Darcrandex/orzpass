/**
 * @name NavBack
 * @description
 * @author darcrand
 */

import Button from '@/ui/Button'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next-nprogress-bar'

export default function NavBack() {
  const router = useRouter()
  return (
    <>
      <Button
        variant='link'
        onClick={() => {
          router.back()
          router.refresh()
        }}
      >
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className='ml-2'>Back</span>
      </Button>
    </>
  )
}
