import React, { useState } from 'react'

import Navbar from '../components/Navbar'
import TransferTable from '../components/TransferTable'
import AddTransfer from '../components/transfer/AddTransfer';


const TransferPage = () => {
  const [isAddTransfer, setIsAddTransfer] = useState(false);
  const openAddTransfer = () => {
    setIsAddTransfer(true)
  }
  const closeAddTransfer= () => {
    setIsAddTransfer(false)
  }

  return (
    <div>
      <div className='m-3 flex place-content-between'>
        <div className='flex w-1/2 place-content-between items-center '>
          <Navbar />
          <div className='flex items-center w-2/3'>
            <label htmlFor="search">Search</label>
            <input type="text" id='search' className='ml-2 border-2 border-blue-200 hover:shadow-lg p-2 rounded-lg w-full'/>
          </div>
        </div>
        <button onClick={openAddTransfer} className='bg-blue-400 text-red-50 px-3 font-bold rounded-md shadow-lg'>
          Add
        </button>
      </div>
      <TransferTable isAdd={isAddTransfer}/>
      <AddTransfer isOpen={isAddTransfer} onClose={closeAddTransfer}/>
    </div>
  )
}

export default TransferPage
