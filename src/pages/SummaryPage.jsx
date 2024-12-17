import React, { useRef, useState } from "react";
import SummaryTable from "../components/SummaryTable";
import { useDownloadExcel } from "react-export-table-to-excel";
import Navbar from "../components/Navbar";

const SummaryPage = () => {
  const [search, setSearch] = useState("");
  const tableRef = useRef(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: "SummaryTable",
    sheet: "Summary",
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
      <div className="m-3 flex place-content-between">
        <div className="flex w-2/3 place-content-between items-center">
          <Navbar />
          <h2 className=" font-bold text-xl text-center">
           Summary 
          </h2>
          <div className="flex items-center w-2/5 text-xl">
            <label htmlFor="search">Search</label>
            <input
              type="text"
              id="search"
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              className="ml-2 border-2 border-blue-200 p-2 rounded-lg w-full hover:shadow-lg focus:outline-none focus:ring focus:ring-green-300"
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
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          onClick={handleDownload}
        >
          Export
        </button>
      </div>
      <SummaryTable
        search={search}
        startDate={startDate}
        endDate={endDate}
        tableRef={tableRef}
      />
    </div>
  );
};

export default SummaryPage;
