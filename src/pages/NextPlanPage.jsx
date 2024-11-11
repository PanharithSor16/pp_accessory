import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import NextPlanTabel from '../components/NextPlanTabel'
import Navbar from '../components/Navbar'
import AddNextPlan from '../components/nextPlan/AddNextPlan'

const NextPlanPage = () => {
  const [isAddNext, setIsAddNext] = useState(false);
  const openAddNext = () => {
    setIsAddNext(true)
  }
  const closeAddNext = () => {
    setIsAddNext(false)
  }
  return (
    <div>
      <div className='m-3 flex place-content-between'>
        <Navbar />
        <button onClick={openAddNext} className=' bg-slate-300 px-2 rounded-md'>
          add
        </button>
      </div>
      <NextPlanTabel isAdd={isAddNext}/>
      <AddNextPlan isOpen={isAddNext} onClose={closeAddNext}
      />
    </div>
  )
}

export default NextPlanPage