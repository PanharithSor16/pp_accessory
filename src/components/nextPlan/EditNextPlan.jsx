import React, { useContext, useEffect, useState } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../hooks/AuthContext';

const EditNextPlan = ({ isOpen, onClose, id }) => {
    const { authState } = useContext(AuthContext);
    const [accessoryCode, setAccessoryCode] = useState('');
    const [accessoryName, setAccessoryName] = useState('');
    const [accessoryQty, setAccessoryQty] = useState('')
    const [dateNextPlan, setDateNextPlan] = useState()
    useEffect(() => {
        const fetchAccessory = async () => {
            try {
                const response = await api.get(`/next_plan/get_plan/${id}`, {
                    headers: { Authorization: `Bearer ${authState.token}` }
                });
                setAccessoryCode(response.data.data.accessoryCode);
                setAccessoryName(response.data.data.accessoryName);
                setAccessoryQty(response.data.data.accessoryQty)
                setDateNextPlan(response.data.data.planDate)
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
            await api.patch(`/next_plan/update_next_plan/${id}`, {
                accessoryQty: accessoryQty
            }, {
                headers: { Authorization: `Bearer ${authState.token}` }
            });
            onClose();
        } catch (error) {
            console.error("Failed to update Next Plane data:", error);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4">Update Accessory</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4 text-center text-2xl">
                        <h2>{accessoryCode} , {accessoryName}</h2>
                    </div>
                    <div className="mb-4 ">
                        <label className="block text-sm font-medium mb-2" htmlFor='name'>Date Next Plan</label>
                        <input
                            id='name'
                            type="date"
                            disabled
                            autoComplete='off'
                            value={dateNextPlan}
                            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" htmlFor='qty'>Accessory Qty</label>
                        <input
                            id='qty'
                            type="number"
                            required
                            autoComplete='off'
                            onChange={e => setAccessoryQty(e.target.value)}
                            value={accessoryQty}
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
                            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditNextPlan;
