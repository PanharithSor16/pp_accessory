import React, { useContext, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext'
import api from '../api/api';

const CreateUser = () => {
    const { authState } = useContext(AuthContext);
    const [userId, setUserId] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [userRole, setUserRole] = useState('user')
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            await api.post(`auth/create_user`, {
                userId: userId,
                username: username,
                password: password,
                role: userRole
            },
                { headers: { Authorization: `Bearer ${authState.token}` } })
            setUserId('')
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className=' flex place-content-center text-xl'>
            <div className=' md:w-1/3'>
                <form onSubmit={handleSubmit} className=' bg-white text-gray-600 p-4 shadow-lg shadow-indigo-500/40' >
                
                    <div className='mb-4 flex place-content-between items-center'>
                        <label htmlFor="userId"> UserId  :</label>
                        < input className='p-2 border-2 border-black ml-2 rounded-lg w-3/5'
                            autoComplete='off'
                            type="text" id='userId' value={userId} required onChange={(e) => setUserId(e.target.value)} />
                    </div>

                    <div className='mb-4 flex place-content-between items-center'>
                        <label htmlFor="username">Username : </label>
                        < input className='p-2 border-2 border-black md:ml-2 rounded-lg w-3/5'
                            autoComplete='off'
                            type="text" id='username' value={username} required onChange={(e) => setUsername(e.target.value)} />
                    </div>

                    <div className='mb-4 flex place-content-between items-center'>
                        <label htmlFor="password">Password :</label>
                        < input className='p-2 border-2 border-black ml-2 rounded-lg w-3/5'
                            autoComplete='off'
                            type="text" id='password' value={password} required onChange={(e) => setPassword(e.target.value)} />
                    </div>

                    <div className=' flex place-content-center'>
                        <button className='p-3 text-white bg-purple-400 rounded-lg font-semibold' type='submit'>
                            submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateUser
