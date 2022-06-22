import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
const Header = () => {
  return (
    
    <div className='headerWrapper'>
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path='/' exact element={<Home/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
            </Routes>
        </BrowserRouter>        
    </div>
  )
}

export default Header