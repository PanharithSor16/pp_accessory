import React, { useContext, useEffect, useState } from 'react'
import api from '../api/api';
import { AuthContext } from '../hooks/AuthContext';
import EditMaster from './master/EditMaster';
import DeleteMaster from './master/DeleteMaster';

const MasterTable = () => {
    const [isEditMaster, setIsEditMaster] = useState(false)
    const [isDeleteMaster, setIsDeleteMaster] = useState(false)
    const [masterList, setMasterList] = useState([]);
    const { authState } = useContext(AuthContext);
    useEffect(() => {
        const fetchMaster = async () => {
            try {
                const response = await api.get('/accessory/get_accessory', { headers: { Authorization: `Bearer ${authState.token}` } })
                setMasterList(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchMaster()
    }, [isEditMaster, isDeleteMaster]);
    // call edit  form
    const [id, setId] = useState()
    const OpenEditMaster = (id) => {
        setIsEditMaster(true)
        setId(id)

    }
    const CloseEditMaster =  () => {
        setIsEditMaster(false)
    }
    // call delete form
    const OpenDeteleMaster = (id) => {
        setId(id)
        setIsDeleteMaster(true)
    }
    const CloseDeleteMaster = () => {
        setIsDeleteMaster(false)
    }
    const column_master = [
        "Code",
        "Name",
        "Edit",
        "Delete",
    ];
    return (
        <div>
            <table className="w-full min-w-max table-auto text-left">
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
                    {masterList.map(
                        ({ sysNo, accessoryCode, accessoryName }, index) => {
                            const isLast = index === masterList.length;
                            const classes = isLast ? "p-4" : "p-4 border-2 border-blue-200";
                            return (
                                <tr key={index}>
                                    <td className={classes} >{accessoryCode}</td>
                                    <td className={classes} >{accessoryName}</td>
                                    <td className={classes} onClick={(e) => OpenEditMaster(sysNo)} >Edit</td>
                                    <td className={classes} onClick={(e) => OpenDeteleMaster(sysNo)} >Delete</td>
                                </tr>
                            )
                        }
                    )}
                </tbody>
            </table>
            <EditMaster isOpen={isEditMaster} onClose={CloseEditMaster} id={id} />
            <DeleteMaster isOpen={isDeleteMaster} onClose={CloseDeleteMaster} id={id}/>
        </div>
    )
}

export default MasterTable
