import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import OrderComplete from './../pages/OrderComple';
const Header = () => {
  return (
    
    <div className='headerWrapper'>
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path='/' exact element={<Home/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
                <Route path='/thank-you' element={<OrderComplete/>}></Route>
            </Routes>
        </BrowserRouter>        
    </div>
  )
}

export default Header