import React, { act, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../hooks/AuthContext'
import api from '../../api/api';

const EditTransfer = ({ isOpen, onClose, id }) => {
    const { authState } = useContext(AuthContext);
    const [editForm, setEditForm] = useState({
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
                );
                setEditForm(response.data.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (id && authState.token) {
            fetchTransfer()
        }
    }, [id, authState.token])
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/accessory/update_transfer/${id}`, {
                issueQty: editForm.issueQty,
                receiveQty: editForm.receiveQty
            }, { headers: { Authorization: `Bearer ${authState.token}` } })
            onClose()
        } catch (error) {
            console.error("Failed to update transfer data:", error);
        }
    }
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl text-green-400 font-semibold mb-4">Update Accessory</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-green-400" htmlFor='code'>Accessory Code</label>
                        <input
                            id='code'
                            type="text"
                            disabled
                            autoComplete='off'
                            value={editForm.accessoryCode}
                            className="border border-gray-300 rounded-lg w-full p-2 "
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-green-400" htmlFor='name'>Accessory Name</label>
                        <input
                            id='name'
                            type="text"
                            disabled
                            autoComplete='off'
                            value={editForm.accessoryName}
                            className="border border-gray-300 rounded-lg w-full p-2 "
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-green-400" htmlFor='receive'> Receive Qty</label>
                        <input
                            id='receive'
                            type="number"
                            autoComplete='off'
                            onChange={(e) => setEditForm((prevData) => ({ ...prevData, receiveQty: e.target.value }))}
                            value={editForm.receiveQty}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-green-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg font-medium mb-2 text-green-400" htmlFor='issue'> issue Qty</label>
                        <input
                            id='issue'
                            type="number"
                            autoComplete='off'
                            onChange={(e) => setEditForm((prevData) => ({ ...prevData, issueQty: e.target.value }))}
                            value={editForm.issueQty}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-green-300"
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
                            className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditTransfer
