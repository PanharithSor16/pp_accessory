import React, { useRef, useState } from "react";

import Navbar from "../components/Navbar";
import TransferTable from "../components/TransferTable";
import AddTransfer from "../components/transfer/AddTransfer";
import { useDownloadExcel } from "react-export-table-to-excel";

const TransferPage = () => {
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "Transfer",
    sheet: "Transfer_byOwnUser",
  });

  const handleDownload = () => {
    if (tableRef.current) {
      onDownload();
    } else {
      console.warn("Table reference is not set.");
    }
  };
  const [isAddTransfer, setIsAddTransfer] = useState(false);
  const openAddTransfer = () => {
    setIsAddTransfer(true);
  };
  const closeAddTransfer = () => {
    setIsAddTransfer(false);
  };

  return (
    <div>
      <div className="m-3 flex place-content-between">
        <div className="flex w-2/3 place-content-between items-center ">
          <Navbar />
          <h2 className=" ml-2 font-bold font-serif text-xl text-center">Transfer</h2>
          <div className="flex items-center w-2/5">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="ml-2 border-2 border-blue-200 hover:shadow-lg p-2 rounded-lg w-full focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className=" flex items-center ml-2">
            <label htmlFor="startDate"> </label>
            <input
              className="ml-2 border-2 border-blue-200 p-2 rounded-lg w-full hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300"
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <label htmlFor="end" className=" ml-2">
              {" "}
              To{" "}
            </label>
            <input
              className="ml-2 border-2 border-blue-200 p-2 rounded-lg w-full hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300"
              type="date"
              id="end"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 "
            onClick={handleDownload}
          >
            Export
          </button>
          <button
            onClick={openAddTransfer}
            className="bg-blue-400 text-red-50 px-3 font-bold rounded-md shadow-lg"
          >
            Add
          </button>
        </div>
      </div>
      <TransferTable
        isAdd={isAddTransfer}
        search={search}
        tableRef={tableRef}
        startDate={startDate}
        endDate={endDate}
      />
      <AddTransfer isOpen={isAddTransfer} onClose={closeAddTransfer} />
    </div>
  );
};

export default TransferPage;
