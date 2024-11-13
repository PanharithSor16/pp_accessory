import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../hooks/AuthContext'
import api from '../../api/api'

const DeleteTransfer = ({isOpen, onClose, id}) => {
    const { authState } = useContext(AuthContext)
    const [formDelete, setFormDelete] = useState({
        accessoryCode: "",
        accessoryName: "",
        receiveQty: 0,
        issueQty: 0
    })
    useEffect(() => {
        const fetchTransfer = async () => {
            try {
                const response = await api.get(`/accessory/get_transfer/${id}`,
                    { headers: { Authorization: `Bearer ${authState.token}` } }
                )
                setFormDelete(response.data.data)
            } catch (error) {
                console.error("Failed to fetch Transfer data:", error);
            }
        }
        if (id && authState.token) {
            fetchTransfer()
        }
    }, [id, authState.token])
    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            await api.patch(`/accessory/delete_transfer/${id}`, null,
                {headers: {Authorization: `Bearer ${authState.token}`}}
            )
            onClose()
        } catch (error) {
            console.error("Failed to update Transfer data:", error);
        }
    }
    if (!isOpen) {
       return null 
    }
    const handleClose = () => {
        onClose()
    }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl font-semibold mb-4 text-red-400">Update Accessory</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-red-400" htmlFor='code'>Accessory Code</label>
                        <input
                            id='code'
                            type="text"
                            disabled
                            autoComplete='off'
                            value={formDelete.accessoryCode}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-red-400" htmlFor='name'>Accessory Name</label>
                        <input
                            id='name'
                            type="text"
                            autoComplete='off'
                            disabled
                            value={formDelete.accessoryName}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-red-400" htmlFor='receive'> Receive Qty</label>
                        <input
                            id='receive'
                            type="number"
                            autoComplete='off'
                            disabled
                            value={formDelete.receiveQty}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-red-400" htmlFor='issue'>Issue Qty</label>
                        <input
                            id='issue'
                            type="number"
                            autoComplete='off'
                            disabled
                            value={formDelete.issueQty}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-300 text-gray-700 rounded-md px-4 py-2 mr-2 hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-500 text-white rounded-md px-4 py-2 hover:bg-red-600"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default DeleteTransfer
