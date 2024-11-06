import React from 'react'
import TransferTable from '../components/TransferTable'
import Navbar from '../components/Navbar'
import { Link } from 'react-router-dom'

const TransferPage = () => {
  return (
    <div>
      <div className=' flex ml-3 mt-3 place-content-start'>
        <Navbar />
        <div>
          <label htmlFor="">search</label>
          <input type="text" />
        </div>

      </div>
      <TransferTable />


    </div>
  )
}

export default TransferPage
