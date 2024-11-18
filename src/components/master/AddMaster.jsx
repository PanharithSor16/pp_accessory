import React, { useContext, useState } from 'react'
import api from '../../api/api';
import { AuthContext } from '../../hooks/AuthContext';

const AddMaster = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { authState } = useContext(AuthContext)
  const [ accessoryCode, setAccessoryCode ] = useState('');
  const [ accessoryName, setAccessoryName ] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(`accessory/create_accessory`, { accessoryCode: accessoryCode, accessoryName: accessoryName },
      { headers: { Authorization: `Bearer ${authState.token}` } })
    onClose()
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-xl text-blue-400 font-semibold mb-4">Add Accessory </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-lg text-blue-400 font-medium mb-2" htmlFor='code'>Accessary Code</label>
            <input
              id='code'
              type="text"
              required
              autoComplete='off'
              onChange={e => setAccessoryCode(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg text-blue-400 font-medium mb-2" htmlFor='name'>Accessay Name</label>
            <input
              id='name'
              type="text"
              required
              autoComplete='off'
              onChange={e => setAccessoryName(e.target.value)}
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
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddMaster
