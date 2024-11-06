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
      <div>
        master
        <Navbar />
        <button onClick={openAddMaster}>
          Add Master
        </button>
      </div>
      <MasterTable />
      <AddMaster
        isOpen={isAddMaster}
        onClose={closeAddMaster}
      />
    </div>
  )
}

export default MasterPage
