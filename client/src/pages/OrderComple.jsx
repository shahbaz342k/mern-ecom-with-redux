import React from 'react'
import { useLocation } from 'react-router-dom';
// import './style.css';
import { useSelector } from 'react-redux';
const OrderComplete = () => {

  // const {state} = useLocation();
    // order:orderReducer
    // const order = useSelector( (state) => state.order )
    const order = useSelector((state) => state.order);

  console.log(order)
  return (
    <div className='orderComplete'>
        <h2>Thank you for order, Your order id {order._id}</h2>
    </div>
  )
}

export default OrderComplete