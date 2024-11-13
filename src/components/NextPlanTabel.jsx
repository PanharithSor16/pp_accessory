import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../hooks/AuthContext'
import api from '../api/api';
import EditNextPlan from './nextPlan/EditNextPlan';
import DeleteNextPlan from './nextPlan/DeleteNextPlan';

const NextPlanTabel = ({isAdd}) => {
    const { authState } = useContext(AuthContext);
    const [nexPlanList, setNextPlanList] = useState([])
    const [isEditNextPlan, setIsEditNextPlan] = useState(false)
    const [isDeleteNextPlan, setIsDeleteNextPlan] = useState(false)
    useEffect(() => {
        const fetchNextPlane = async () => {
            try {
                const response = await api.get(`/next_plan/get_plan`,
                    { headers: { Authorization: `Bearer ${authState.token}` } })
                setNextPlanList(response.data.data)
            } catch (error) {
                console.error("Failed to fetch NextPlan data:", error);
            }
        }
        fetchNextPlane()
    }, [isAdd, isEditNextPlan, isDeleteNextPlan]);

    // call edit form 
    const [id, setId] = useState()
    const OpenEditNextPlan = (id) => {
        setId(id)
        setIsEditNextPlan(true)
    }
    const CloseEditNextPlan = () => {
        setIsEditNextPlan(false)
    }
    // call delete Form
   
    const OpenDeleteNextPlan = (id) => {
        setId(id)
        setIsDeleteNextPlan(true)
    }
    const CloseDeleteNextPlan = () => {
        setIsDeleteNextPlan(false)
    }


    const column_nextPlan = ["Code",
        "Name", "Plan Date", "Qty", "RegBy", "RegDate", "UpdateBy", "UpdateDate", "Edit", "Delete"]
    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
                <thead>
                    <tr>
                        {column_nextPlan.map((column) => (
                            <th key={column}
                                className=" sticky top-0 z-10 font-medium border-2 rounded-lg bg-blue-200 p-4 border-blue-300 ">
                                {column}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {nexPlanList.map(
                        ({sysNo, accessoryCode, accessoryName, accessoryQty, planDate,
                            regDate, regBy, updateBy, updateDate
                        } , index) => {
                            const isLast = index === nexPlanList.length;
                            const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
                           return(
                            <tr key={index}>
                                <td className={classes} >{accessoryCode}</td>
                                <td className={classes} >{accessoryName}</td>
                                <td className={classes} >{accessoryQty}</td>
                                <td className={classes} >{planDate}</td>
                                <td className={classes} >{regBy}</td>
                                <td className={classes} >{regDate}</td>
                                <td className={classes} >{updateBy}</td>
                                <td className={classes} >{updateDate}</td>
                                <td className={` bg-green-300 font-semibold ${classes}`} onClick={(e) => OpenEditNextPlan(sysNo) }> Edit</td>
                                <td className={` bg-red-300 font-semibold ${classes}`} onClick={(e) => OpenDeleteNextPlan(sysNo)}> Delete</td>
                            </tr>
                           )
                        }
                    )}
                </tbody>
            </table>
            <EditNextPlan isOpen={isEditNextPlan} id={id} onClose={CloseEditNextPlan} />
            <DeleteNextPlan isOpen={isDeleteNextPlan} id={id} onClose={CloseDeleteNextPlan}/>

        </div>
    )
}

export default NextPlanTabel
