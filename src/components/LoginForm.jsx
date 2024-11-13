import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onLogin }) => {
  const { login } = useContext(AuthContext)
  const { authState } = useContext(AuthContext)
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
    e.preventDefault();
    const islogin = await login(username, password)
    if (islogin) {
      navigate('/')
    }
  }
  useEffect(() => {
    if (authState.isAuthentication) {
      navigate('/')
    }
  })
  return (
    <div className='sm:w-[70%] bg-white shadow-lg'>
      <form className=' grid  place-content-center mt-8 text-2xl space-y-4 mb-4' action="" onSubmit={handleLogin}>
        <div className=' grid place-content-center mt-2'>
          <label className='p-2 text-blue-500' htmlFor="username">Username</label>
          <input className='p-2 border-2 border-black rounded-md' autoComplete='current-username'
            type="text" id='username' placeholder='username' value={username} onChange={e => setUsername(e.target.value)} />
        </div>
        <div className='grid place-content-center mt-2'>
          <label className='p-2 text-blue-500' htmlFor="password">Password</label>
          <input className='p-2 border-2 border-black rounded-md' autoComplete='current-password'
            type="password" id='password' placeholder='password' value={password} onChange={e => setPassword(e.target.value)} />
        </div>
        <div className=' flex place-content-around mb-4'>
          <button className='mt-2 bg-blue-500 p-3 rounded-md font-semibold text-white shadow-lg' type="submit" >Login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm
