import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import api from '../api/api';

const TransferTable = (isAdd) => {
    const column_transfer = [
        "Code",
        "Name",
        "Transfer Date",
        "ReceiveQty",
        "IsssueQty",
        "TransferBy",
        "Edit",
        "Delete"
    ];
    const [trasferList, setTransferList] = useState([]);
    const { authState } = useContext(AuthContext);
    useEffect(() => {
        const response = async () => {
            const data = await api.get("accessory/get_transfer_user", { headers: { Authorization: `Bearer ${authState.token}` } })
            setTransferList(data.data.data)
        }
        response();
    }, [isAdd])
    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {column_transfer.map((column) => (
                            <th key={column}
                                className=" sticky top-0 z-10 font-medium border-2 rounded-lg bg-blue-200 p-4 border-blue-300 ">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                        {trasferList.map(
                            ({id, accessoryCode, accessoryName, accessoryTransferDate,receiveQty, issueQty, transferBy }, index) => {
                                const isLast = index === trasferList.length;
                                const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
                                return (
                                    <tr key={index}>
                                        <td className={classes} >{accessoryCode}</td>
                                        <td className={classes} >{accessoryName}</td>
                                        <td className={classes} >{accessoryTransferDate}</td>
                                        <td className={classes} >{receiveQty}</td>
                                        <td className={classes} >{issueQty}</td>
                                        <td className={classes} >{transferBy}</td>
                                        <td className={classes} >Edit</td>
                                        <td className={classes} >Delete</td>
                                    </tr>
                                )
                            }
                            )}
                    </tbody>
            </table>

        </div>
    )
}

export default TransferTable
