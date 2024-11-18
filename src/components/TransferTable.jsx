import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import api from '../api/api';
import EditTransfer from './transfer/EditTransfer';
import DeleteTransfer from './transfer/DeleteTransfer';
import {receive_time} from './nav'

const TransferTable = ({isAdd, search, tableRef}) => {
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
    // call edit form transfer
    const [isEditTransfer, setIsEditTransfer] = useState(false)
    const [id ,setId] = useState()
    const OpenEditTransfer = (id) => {
        setIsEditTransfer(true)
        setId(id)
    }
    const CloseEditTransfer = () => {
        setIsEditTransfer(false)
    }
    // call delete form Transfer
    const [isDeleteTransfer, setIsDeleteTransfer] = useState(false);
    const OpenDeleteTransfer = (id) => {
        setIsDeleteTransfer(true)
        setId(id)
    } 
    const CloseDeleteTransfer = ()=> {
        setIsDeleteTransfer(false)
    }
    const [trasferList, setTransferList] = useState([]);
    const { authState } = useContext(AuthContext);
    useEffect(() => {
        const response = async () => {
            const data = await api.get("accessory/get_transfer_user", { params: {search: search} ,  headers: { Authorization: `Bearer ${authState.token}` }})
            setTransferList(data.data.data)
        }
        response();
    }, [isAdd, isEditTransfer, isDeleteTransfer, search])
    return (
        <div>
            <table className="w-full min-w-max table-auto text-left" ref={tableRef}>
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
                            ({sysNo, accessoryCode, accessoryName, accessoryTransferDate,receiveQty, issueQty, transferBy }, index) => {
                                const isLast = index === trasferList.length;
                                const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
                                return (
                                    <tr key={index}>
                                        <td className={classes} >{accessoryCode}</td>
                                        <td className={classes} >{accessoryName}</td>
                                        <td className={classes} >{receive_time(accessoryTransferDate)}</td>
                                        <td className={classes} >{receiveQty}</td>
                                        <td className={classes} >{issueQty}</td>
                                        <td className={classes} >{transferBy}</td>
                                        <td className={`bg-green-300 font-semibold ${classes}`}
                                         onClick={(e) => OpenEditTransfer(sysNo)}>Edit</td>
                                        <td className={`bg-red-300 font-semibold ${classes}`}
                                         onClick={(e) => OpenDeleteTransfer(sysNo)}>Delete</td>
                                    </tr>
                                )}
                            )
                        }
                    </tbody>
            </table>
            <EditTransfer isOpen={isEditTransfer} onClose={CloseEditTransfer} id={id} />
            <DeleteTransfer isOpen={isDeleteTransfer}  onClose={CloseDeleteTransfer} id={id} />
        </div>
    )
}

export default TransferTable
