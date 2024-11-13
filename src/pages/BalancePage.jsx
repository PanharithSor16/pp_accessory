import React from 'react'
import Navbar from '../components/Navbar'
import BalanceTable from '../components/BalanceTable'

const BalancePage = () => {
  return (
    <div>
      <div className='m-3 flex place-content-between'>
        <div>
          <Navbar />
        </div>
        <div className='p-5'></div>
      </div>
      <BalanceTable />
    </div>
  )
}

export default BalancePage
