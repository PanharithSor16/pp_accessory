import React, { useRef, useState } from 'react';
import AllTransferTable from '../components/AllTransferTable';
import Navbar from '../components/Navbar';
import { useDownloadExcel } from 'react-export-table-to-excel';

const AllTransferPage = () => {
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'AllTransferTable',
    sheet: 'Transfer',
  });

  const handleDownload = () => {
    if (tableRef.current) {
      onDownload();
    } else {
      console.warn("Table reference is not set.");
    }
  };

  return (
    <div>
      <div className='m-3 flex place-content-between'>
        <div className='flex w-1/3 place-content-between items-center'>
          <Navbar />
          <div className='flex items-center w-4/5 text-xl'>
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className='ml-2 border-2 border-blue-200 p-2 rounded-lg w-full hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300'
            />
          </div>
        </div>
        <button
          className='bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300'
          onClick={handleDownload}
        >
          Export
        </button>
      </div>
      <AllTransferTable search={search} tableRef={tableRef} />
    </div>
  );
};

export default AllTransferPage;
