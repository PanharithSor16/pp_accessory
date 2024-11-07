import { useState } from 'react'
import { AuthProvider } from './hooks/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './hooks/PrivateRoute'
import AllTransferPage from './pages/AllTransferPage'
import BalancePage from './pages/BalancePage'
import UserPage from './pages/UserPage'
import MasterPage from './pages/MasterPage'
import TransferPage from './pages/TransferPage'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<AllTransferPage />} />
              <Route path='/transfer' element={<TransferPage/>}/>
              <Route path='/balance' element={<BalancePage />} />
              <Route path='/user' element={<UserPage />} />
              <Route path='/master' element={<MasterPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
