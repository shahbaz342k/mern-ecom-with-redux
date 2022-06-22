import React from 'react'
import { useLocation } from 'react-router-dom';
// import './style.css';
const OrderComplete = () => {
  const {state} = useLocation();
  // console.log(location)
  return (
    <div className='orderComplete'>
        <h2>Thank you for order, Your order id {state && state.pyamentId}</h2>
    </div>
  )
}

export default OrderComplete