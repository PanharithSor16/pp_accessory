import React, { useContext, useEffect, useState } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../hooks/AuthContext';

const DeleteMaster = ({ isOpen, onClose, id }) => {
    const { authState } = useContext(AuthContext);
    const [accessoryCode, setAccessoryCode] = useState('');
    const [accessoryName, setAccessoryName] = useState('');

    useEffect(() => {
        const fetchAccessory = async () => {
            try {
                const response = await api.get(`/accessory/get_accessory_by/${id}`, {
                    headers: { Authorization: `Bearer ${authState.token}` }
                });
                setAccessoryCode(response.data.data.accessoryCode);
                setAccessoryName(response.data.data.accessoryName);
            } catch (error) {
                console.error("Failed to fetch accessory data:", error);
            }
        };

        if (id && authState.token) {
            fetchAccessory();
        }
    }, [id, authState.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.patch(`/accessory/delete_accessory/${id}`, null,
                {
                    headers: { Authorization: `Bearer ${authState.token}` }
                });
            onClose();
        } catch (error) {
            console.error("Failed to update accessory data:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-xl text-red-400 font-semibold mb-4">Update Accessory</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-lg text-red-400 font-medium mb-2" htmlFor='code'>Accessory Code</label>
                        <input
                            id='code'
                            type="text"
                            disabled
                            autoComplete='off'
                            value={accessoryCode}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-lg text-red-400 font-medium mb-2" htmlFor='name'>Accessory Name</label>
                        <input
                            id='name'
                            type="text"
                            autoComplete='off'
                            disabled
                            value={accessoryName}
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
    );
};

export default DeleteMaster;
