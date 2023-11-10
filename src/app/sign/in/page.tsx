/**
 * @name SignIn
 * @description
 * @author darcrand
 */

'use client'

import { useState } from 'react'

export default function SignIn() {
  const [token, setToken] = useState('')
  const onClick = () => {
    fetch('/api/user/login', { method: 'POST' })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
        setToken(data.token)
      })
  }

  const getInfo = () => {
    fetch('/api/user/info', { method: 'GET', headers: { Authorization: token } })
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data)
      })
  }

  return (
    <>
      <button className='bg-blue-500 text-white m-4' onClick={onClick}>
        SignIn
      </button>

      <button className='bg-blue-500 text-white m-4' onClick={getInfo}>
        getInfo
      </button>
    </>
  )
}
