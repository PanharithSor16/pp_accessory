import React, { useState } from 'react'
import MasterTable from '../components/MasterTable'
import Navbar from '../components/Navbar'
import AddMaster from '../components/master/AddMaster';

const MasterPage = () => {
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
        <Navbar />
        <button onClick={openAddMaster} className=' bg-slate-300 px-2 rounded-md'>
          Add Master
        </button>
      </div>
      <MasterTable isAdd={isAddMaster}/>
      <AddMaster
        isOpen={isAddMaster}
        onClose={closeAddMaster}
      />
    </div>
  )
}

export default MasterPage
