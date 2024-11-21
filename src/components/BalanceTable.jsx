import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext';
import api from '../api/api';

const BalanceTable = ({ search, tableRef }) => {
    const [balanceList, setBalanceList] = useState([]);
    const { authState } = useContext(AuthContext)

    useEffect(() => {
        const fetchBalance = async () => {
            const response = await api.get('balance/get_balance',
                { params: { search: search }, headers: { Authorization: `Bearer ${authState.token}` } })
            setBalanceList(response.data.data)
        }
        fetchBalance()
    }, [search])
    const column_master = [
        "Code",
        "Name",
        "Balance",
        "Next Use",
        "Lack/over of Accessory",
        "Next order",
        "Remian"
    ];
    return (
        <div>
            <table className="w-full min-w-max table-auto text-left" ref={tableRef}>
                <thead>
                    <tr>
                        {column_master.map((column) => (
                            <th key={column}
                                className=" sticky top-0 z-10 font-medium border-2 rounded-lg bg-blue-200 p-4 border-blue-300 ">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {balanceList.map(
                        ({ accessoryCode, accessoryName, receiveQty, issueQty, totalAccessoryQty,
                            nextMonthTotalAccessoryQty, nextMonthReceiveQty, nextMonthIssueQty
                        }, index) => {
                            const isLast = index === balanceList.length;
                            const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
                            return (
                                <tr key={index}>
                                    <td className={classes} >{accessoryCode}</td>
                                    <td className={classes} >{accessoryName}</td>
                                    <td className={classes} >{receiveQty - issueQty - nextMonthReceiveQty + nextMonthIssueQty - totalAccessoryQty + nextMonthTotalAccessoryQty}</td>
                                    <td className={classes} >{nextMonthTotalAccessoryQty}</td>
                                    <td className={classes} >{receiveQty - issueQty - totalAccessoryQty + nextMonthIssueQty - nextMonthReceiveQty } </td>
                                    <td className={classes} >{nextMonthReceiveQty - nextMonthIssueQty}</td>
                                    <td className={classes} >{receiveQty - issueQty - totalAccessoryQty }</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default BalanceTable
