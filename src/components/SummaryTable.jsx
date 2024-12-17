import React, { useEffect, useState } from "react";
import api from "../api/api";

const SummaryTable = ({startDate, endDate, search, tableRef}) => {
  const column_summary = [
    "Code",
    "Name",
    "គម្រោងប្រើប្រាស់​ Accessory",
    "ReceiveQty",
    "IsssueQty",
    "Balance Search",
    "Total Balance",
  ];
  const [summary, setSummary] = useState([]);
  useEffect(() => {
          const response = async () => {
              const data = await api.get("balance/summary", {params: {search, startDate, endDate}})
              setSummary(data.data.data)
              
          }
          response();
      }, [ startDate, endDate, search])
  return (
    <div>
      <table className="w-full min-w-max table-auto text-left" ref={tableRef}>
        <thead>
          <tr>
            {column_summary.map((column) => (
              <th
                key={column}
                className=" sticky top-0 z-10 font-medium border-2 rounded-lg bg-blue-200 p-4 border-blue-300 "
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {summary.map(
            (
              {
                code,
                name,
                endBalance,
                planUseAccessory,
                totalBalance,
                receiveQty,
                issueQty,
              },
              index
            ) => {
              const isLast = index === summary.length;
              const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
              return (
                <tr key={index}>
                  <td className={classes}>{code}</td>
                  <td className={classes}>{name}</td>
                  <td className={classes}>{planUseAccessory}</td>
                  <td className={classes}>{receiveQty}</td>
                  <td className={classes}>{issueQty}</td>
                  <td className={classes}>{endBalance}</td>
                  <td className={classes}>{totalBalance}</td>
                </tr>
              );
            }
          )}
        </tbody>
      </table>
      
    </div>
  );
};

export default SummaryTable;
