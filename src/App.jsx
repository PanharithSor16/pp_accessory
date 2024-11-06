import { useState } from 'react'
import { AuthProvider } from './hooks/AuthContext'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './hooks/PrivateRoute'
import TransferPage from './pages/TransferPage'
import BalancePage from './pages/BalancePage'
import UserPage from './pages/UserPage'
import MasterPage from './pages/MasterPage'

function App() {

  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route element={<PrivateRoute />}>
              <Route path='/' element={<TransferPage />} />
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
