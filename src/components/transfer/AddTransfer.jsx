import React, { useContext, useState } from 'react'
import { AuthContext } from '../../hooks/AuthContext';
import api from '../../api/api';

const AddTransfer = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  const { authState } = useContext(AuthContext);
  const [resutlSearch, setResultSearch] = useState([])
  const [search, setSearch] = useState('')
  const [accessoryCode, setAccessoryCode] = useState('')
  const [accessoryName, setAccessoryName] = useState('')
  const [receiveQty, setReceiveQty] = useState(0)
  const [issueQty, setIssueQty] = useState(0)
  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post('/accessory/create_transfer', {
      accessoryCode: accessoryCode,
      accessoryName: accessoryName,
      receiveQty: receiveQty,
      issueQty: issueQty
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
      console.log("Helllo")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96">
        <h2 className=" font-semibold mb-4 text-blue-400 text-xl">Receive or Issue Transfer </h2>
        <div className='mb-4 '>
          <label className="block text-lg font-medium text-blue-400 mb-2" htmlFor="searchItem"> Search</label>
          <input type="text" id='searchItem'
            className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            value={search} onChange={(e) => handleSearch(e.target.value)} />
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
              {accessoryCode} {accessoryName}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 text-blue-400" htmlFor='receive'>Receive Qty</label>
            <input
              id='receive'
              type="number"
              min={0}
              defaultValue={0}
              onChange={e => setReceiveQty(e.target.value)}
              className="border border-gray-300 rounded-lg w-full p-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2 text-blue-400" htmlFor='issue'>Issue Qty</label>
            <input
              id='issue'
              type="number"
              min={0}
              defaultValue={0}
              onChange={e => setIssueQty(e.target.value)}
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

export default AddTransfer
