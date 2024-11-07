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
        <div className='flex w-1/3 place-content-between items-center '>
          <Navbar />
          <div className='flex items-center'>
            <label htmlFor="">search</label>
            <input type="text" className='ml-2 border-2 border-red-200 p-2 rounded-lg w-full'/>
          </div>
        </div>
        <button onClick={openAddTransfer} className=' bg-slate-300 px-2 rounded-md'>
          add
        </button>
      </div>
      <TransferTable isAdd={isAddTransfer}/>
      <AddTransfer isOpen={isAddTransfer} onClose={closeAddTransfer}/>
    </div>
  )
}

export default TransferPage
