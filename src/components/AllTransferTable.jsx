import React, { useContext, useEffect, useState } from "react";
import api from "../api/api";
import { AuthContext } from "../hooks/AuthContext";
import { receive_time } from "./nav";
const AllTransferTable = ({ startDate, endDate, search, tableRef }) => {
  const columns = [
    "Code",
    "Name",
    "OrderDate",
    "ReceiveQty",
    "IssueQty",
    "TransferBy",
    "ថ្ងៃបញ្ចូលទិន្ន័យ",
  ];
  const [transferList, setTransferList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { authState } = useContext(AuthContext);
  const [totalReceive, setTotalReceive] = useState(0);
  const [totalIssue, setTotalIssue] = useState(0);
  useEffect(() => {
    const fetchTransferData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("accessory/get_transfer", {
          params: { search, startDate, endDate },
          headers: { Authorization: `Bearer ${authState.token}` },
        });
        setTransferList(response.data.data);
        let sumReceive = 0;
        let sumIssue = 0;
        for (let index = 0; index < response.data.data.length; index++) {
          sumReceive += response.data.data[index].receiveQty;
          sumIssue += response.data.data[index].issueQty;
        }
        setTotalReceive(sumReceive);
        setTotalIssue(sumIssue);
      } catch (err) {
        setError("Failed to fetch data. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransferData();
  }, [search, startDate, endDate, authState.token]);
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <table className="w-full min-w-max table-auto text-left" ref={tableRef}>
        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column}
                className="sticky top-0 z-10 font-medium border-2 rounded-lg bg-blue-200 p-4 border-blue-300"
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transferList.map(
            (
              {
                sysNo,
                accessoryCode,
                accessoryName,
                accessoryTransferDate,
                orderDate,
                receiveQty,
                issueQty,
                transferBy,
              },
              index
            ) => {
              const isLast = index === transferList.length + 1;
              const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";

              return (
                <tr key={sysNo} id={index}>
                  <td className={classes}>{accessoryCode}</td>
                  <td className={classes}>{accessoryName}</td>
                  <td className={classes}>{orderDate}</td>
                  <td className={classes}>{receiveQty}</td>
                  <td className={classes}>{issueQty}</td>
                  <td className={classes}>{transferBy}</td>
                  <td className={classes}>
                    {receive_time(accessoryTransferDate)}
                  </td>
                </tr>
              );
            }
          )}
          <tr key={totalReceive} className="text-xl font-semibold">
            <td></td>
            <td></td>
            <td></td>
            <td className="p-4 border-2 border-blue-200">{totalReceive}</td>
            <td className="p-4 border-2 border-blue-200">{totalIssue}</td>
            <td className="p-4 border-2 border-blue-200">
              {totalReceive - totalIssue}
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AllTransferTable;
