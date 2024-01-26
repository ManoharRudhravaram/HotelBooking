import React from 'react'
import { Route, Routes } from 'react-router-dom';
import IndexPage from './Pages/IndexPage';
import LoginPage from './Pages/LoginPage';
import Layout from './Pages/Layout';
import RegisterPage from './Pages/RegisterPage';
import axios from 'axios';
import UserContextProvider from './Context/UserContext';
import AccountPage from './Pages/AccountPage';

function App() {
  axios.defaults.baseURL = 'http://localhost:4000';
  // axios.defaults.withCredentials = true;
  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/account/:subpage?' element={<AccountPage />} />
          <Route path='/account/:subpage/:action?' element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App