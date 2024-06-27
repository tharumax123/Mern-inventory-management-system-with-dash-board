import React from 'react'
import './App.css'
import Header from './Header'
import Sidebar from './Sidebar'
import Home from './Home'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Products from './components/Products'
import Categories from './components/Categories'
import Customers from './components/Customers'
import Inventory from './components/Inventory'
import Reports from './components/Reports'
import Settings from './components/Settings'
import SignUp from './components/SignUp'
import Login from './components/Login'
function App() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <BrowserRouter>
      <div className='grid-container'>
        <Header OpenSidebar={OpenSidebar} />
        <Sidebar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
        <div className='main-content'>
          <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/products' element={<Products/>}/>
           <Route path='/categories' element={<Categories/>}/>
          <Route path='/customers' element={<Customers/>}/>
            <Route path='/inventory' element={<Inventory/>} />
           <Route path='/reports' element={<Reports/>}/>
            <Route path='/settings' element={<Settings />} />
            <Route path='/signup' element={<SignUp/>} />
          <Route path='/login' element={<Login />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default App;












