import React from 'react'
import AllTransferTable from '../components/AllTransferTable'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const AllTransferPage = () => {
  return (
    <div>
      <div className='m-3 flex place-content-between'>
        <div className='flex w-1/3 place-content-between items-center '>
          <Navbar />
          <div className='flex items-center'>
            <label htmlFor="">search</label>
            <input type="text" className='ml-2 border-2 border-red-200 p-2 rounded-lg w-full'/>
          </div>
        </div>
        <button>
          add
        </button>
      </div>
      <AllTransferTable />


    </div>
  )
}

export default AllTransferPage
