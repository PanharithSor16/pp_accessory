import React from 'react'
import CreateUser from '../components/CreateUser'
import Navbar from '../components/Navbar'

const UserPage = () => {
  return (
    <div>
      <div className='m-3 items-center'>
        <div className=' flex place-content-between'>
          <Navbar />
          <div className='p-5'>
          </div>
        </div>
        <div className='text-2xl font-medium mb-4 flex place-content-center  p-2'>
          <h1 className=' text-purple-500'>Create User</h1>
        </div>
      </div>
      <CreateUser />
    </div>
  )
}

export default UserPage
