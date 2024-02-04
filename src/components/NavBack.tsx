/**
 * @name NavBack
 * @description
 * @author darcrand
 */

import Button from '@/ui/Button'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useRouter } from 'next/navigation'

export default function NavBack() {
  const router = useRouter()
  return (
    <>
      <Button variant='link' onClick={() => router.back()}>
        <FontAwesomeIcon icon={faArrowLeft} />
        <span className='ml-2'>Back</span>
      </Button>
    </>
  )
}
