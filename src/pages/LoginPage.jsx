import React from 'react'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <>
    <div className='flex place-content-center text-3xl mb-4 text-blue-500'>
      <h1 className=' font-bold'>Login</h1>
    </div>
      <div className=' flex  place-content-center '>
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
