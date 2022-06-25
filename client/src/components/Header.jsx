import React from 'react'
import Navbar from './Navbar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import Cart from '../pages/Cart'
import Checkout from '../pages/Checkout'
import OrderComplete from './../pages/OrderComple';
import Login from '../pages/user/Login'
import SignUp from './../pages/user/SignUp';
import MyAccount from './../pages/user/MyAccount';
import Product from '../pages/Product'
import NotFound from '../pages/NotFound'
const Header = () => {
  return (
    
    <div className='headerWrapper'>
        <BrowserRouter>
        <Navbar />
            <Routes>
                <Route path='/' exact element={<Home/>}></Route>
                <Route path='/product/:id' exact element={<Product/>}></Route>
                <Route path='/user/login' exact element={<Login/>}></Route>
                <Route path='/user/signup'  element={<SignUp/>}></Route>
                <Route path='/user/my-account'  element={<MyAccount/>}></Route>
                <Route path='/cart' element={<Cart/>}></Route>
                <Route path='/checkout' element={<Checkout/>}></Route>
                <Route path='/thank-you' element={<OrderComplete/>}></Route>
                <Route path='*' element={<NotFound/>}></Route>
            </Routes>
        </BrowserRouter>        
    </div>
  )
}

export default Header