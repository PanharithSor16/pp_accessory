import React, { useContext, useEffect, useState } from 'react';
import api from '../../api/api';
import { AuthContext } from '../../hooks/AuthContext';

const EditMaster = ({ isOpen, onClose, id }) => {
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
      await api.patch(`/accessory/update_accessory/${id}`, {
        accessoryCode,
        accessoryName
      }, {
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
        <h2 className="text-xl text-green-400 font-semibold mb-4">Update Accessory</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-green-400 font-medium mb-2" htmlFor='code'>Accessory Code</label>
            <input
              id='code'
              type="text"
              required
              autoComplete='off'
              onChange={e => setAccessoryCode(e.target.value)}
              value={accessoryCode}
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg text-green-400 font-medium mb-2" htmlFor='name'>Accessory Name</label>
            <input
              id='name'
              type="text"
              required
              autoComplete='off'
              onChange={e => setAccessoryName(e.target.value)}
              value={accessoryName}
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
  );
};

export default EditMaster;
