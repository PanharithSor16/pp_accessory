import React from 'react'
import LoginForm from '../components/LoginForm'

const LoginPage = () => {
  return (
    <>
    <div className='flex place-content-center text-2xl'>
      <h1>Login</h1>
    </div>
      <div className=' flex  place-content-center '>
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
