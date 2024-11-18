import React, { useState } from 'react'
import MasterTable from '../components/MasterTable'
import Navbar from '../components/Navbar'
import AddMaster from '../components/master/AddMaster';

const MasterPage = () => {
  const [search, setSearch] = useState('')
  const [isAddMaster, setIsAddMaster] = useState(false);
  const openAddMaster = () => {
    setIsAddMaster(true)
  }
  const closeAddMaster = () => {
    setIsAddMaster(false)
  }

  return (
    <div>
      <div className='m-3 flex place-content-between'>
        <div className='flex w-1/3 place-content-between items-center '>
          <Navbar />
          <div className='flex items-center w-4/5 text-xl' >
            <label htmlFor="search">Search</label>
            <input type="text" id='search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className='ml-2 border-2 border-blue-200 p-2 rounded-lg w-full hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300' />
          </div>
        </div>
        <button onClick={openAddMaster} className=' bg-blue-300 shadow-lg px-2 rounded-md'>
          Add Master
        </button>
      </div>
      <MasterTable isAdd={isAddMaster} search={search}/>
      <AddMaster
        isOpen={isAddMaster}
        onClose={closeAddMaster}
      />
    </div>
  )
}

export default MasterPage
