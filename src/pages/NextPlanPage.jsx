import React, { useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import NextPlanTabel from '../components/NextPlanTabel'
import Navbar from '../components/Navbar'
import AddNextPlan from '../components/nextPlan/AddNextPlan'
import { useDownloadExcel } from 'react-export-table-to-excel'

const NextPlanPage = () => {
  const [search, setSearch] = useState('')
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Next Plan',
    sheet: 'Next_Plan',
    
  });

  const handleDownload = () => {
    if (tableRef.current) {
      onDownload();
    } else {
      console.warn("Table reference is not set.");
    }
  };
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
        <div className='flex w-1/2 place-content-between items-center '>
          <Navbar />
          <h2 className=" ml-2 font-bold text-2xl text-center">Next Plan</h2>
          <div className='flex items-center w-2/3 text-xl' >
            <label htmlFor="search">Search</label>
            <input type="text" id='search'
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className='ml-2 border-2 border-blue-200 p-2 rounded-lg w-full hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300' />
          </div>
        </div>
        <div className='flex space-x-2'>
          <button
            className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600'
            onClick={handleDownload}
          >
            Export
          </button>
          <button onClick={openAddNext} className='text-white bg-blue-400 hover:bg-blue-500 px-3 rounded-md shadow-lg font-semibold'>
            Add
          </button>
        </div>
      </div>
      <NextPlanTabel isAdd={isAddNext} search={search} tableRef={tableRef} />
      <AddNextPlan isOpen={isAddNext} onClose={closeAddNext}
      />
    </div>
  )
}

export default NextPlanPage
