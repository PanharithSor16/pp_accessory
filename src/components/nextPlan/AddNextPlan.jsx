import React, { useContext, useState } from 'react'
import { AuthContext } from '../../hooks/AuthContext';
import api from '../../api/api';

const AddNextPlan = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { authState } = useContext(AuthContext);
  const [resutlSearch, setResultSearch] = useState([])
  const [search, setSearch] = useState('')
  const [accessoryCode, setAccessoryCode] = useState('')
  const [accessoryName, setAccessoryName] = useState('')
  const [planDate, setPlanDate] = useState()
  const [accessoryQty, setAccessoryQty] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/next_plan/create_next_plan', {
      accessoryCode: accessoryCode,
      accessoryName: accessoryName,
      planDate: planDate,
      accessoryQty: accessoryQty
    }, { headers: { Authorization: `Bearer ${authState.token}` } })
    onClose()
  }
  const handleSearch = async (value) => {
    setSearch(value)
    if (value) {
      try {
        const response = await api.get("/accessory/get_accessory_search", {
          params: { search: search },
          headers: { Authorization: `Bearer ${authState.token}` }
        })
        setResultSearch(response.data.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  const handleClickSearchResult = async (id) => {
    try {
      const response = await api.get(`/accessory/get_accessory_by/${id}`, {
        headers: { Authorization: `Bearer ${authState.token}` }
      });
      setAccessoryCode(response.data.data.accessoryCode)
      setAccessoryName(response.data.data.accessoryName)
      setResultSearch([])
      setSearch('')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className="text-lg font-semibold mb-4"> Next Plan </h2>
        <div className='mb-4'>
          <label className="block text-sm font-medium mb-2" htmlFor="search"> Search</label>
          <input type="text" id='search' className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300" value={search} onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <div className=" absolute bg-blue-400 my-2 rounded-lg shadow-lg text-xl">
          {resutlSearch.map((item) => (
            <div key={item.sysNo}>
              <button
                onClick={() => handleClickSearchResult(item.sysNo)}
                className="px-3 my-2 hover:text-indigo-600 hover:font-bold w-auto text-left"
              >
                {item.accessoryCode}, {item.accessoryName}
              </button>
            </div>
          ))}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 flex place-content-center text-2xl">
            <div>
              {accessoryCode}, {accessoryName}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor='next'>Next Plan Date</label>
            <input
              id='next'
              type="date"
              defaultValue={Date.now}
              onChange={e => setPlanDate(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2" htmlFor='qty'>Qty</label>
            <input
              id='qty'
              type="number"
              defaultValue={0}
              onChange={e => setAccessoryQty(e.target.value)}
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
  )
}

export default AddNextPlan
