import React from 'react'
import CartComponent from '../components/cart/CartComponent'
import CartNew from './../components/cart/CartNew';
const Cart = () => {
  
  return (
    <div className='container p-4'>
        <CartComponent/>
        {/* <CartNew />   */}
    </div>
  )
}

export default Cart