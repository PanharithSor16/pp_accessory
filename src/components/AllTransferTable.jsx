import React, { useContext, useEffect, useState } from 'react';
import api from '../api/api';
import { AuthContext } from '../hooks/AuthContext';
import {receive_time} from './nav'
const AllTransferTable = ({ search, tableRef }) => {
    const columns = ["Code", "Name", "TransferDate", "receiveQty", "issueQty", "transferBy"];
    const [transferList, setTransferList] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { authState } = useContext(AuthContext);

    useEffect(() => {
        const fetchTransferData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get("accessory/get_transfer", {
                    params: { search },
                    headers: { Authorization: `Bearer ${authState.token}` },
                });
                setTransferList(response.data.data);
            } catch (err) {
                setError("Failed to fetch data. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchTransferData();
    }, [search, authState.token]);

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
                            { accessoryCode, accessoryName, accessoryTransferDate, receiveQty, issueQty, transferBy },
                            index
                        ) => {
                            const isLast = index === transferList.length + 1;
                            const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
                            return (
                                <tr key={index}>
                                    <td className={classes}>{accessoryCode}</td>
                                    <td className={classes}>{accessoryName}</td>
                                    <td className={classes}>{receive_time(accessoryTransferDate)}</td>
                                    <td className={classes}>{receiveQty}</td>
                                    <td className={classes}>{issueQty}</td>
                                    <td className={classes}>{transferBy}</td>
                                </tr>
                            );
                        }
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AllTransferTable;
