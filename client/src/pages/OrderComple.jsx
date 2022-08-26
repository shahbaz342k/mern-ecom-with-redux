import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import './css/thank-you.css';
import { useSelector } from 'react-redux';
const OrderComplete = () => {

  // const {state} = useLocation();
    // order:orderReducer
    // const order = useSelector( (state) => state.order )
    const order = useSelector((state) => state.order);

  console.log('order :', order)
  return (
    <div className='content'>
      <div className="wrapper-1">
        <div className="wrapper-2">
          <h1>Thank you !</h1>
          <p>Thanks for order, Your order id <b>{order._id}</b>.</p>
          <p>Our team will send you order invoice on email! </p>
          <Link to='/'><button className="go-home">go home</button></Link>
        </div>
      </div>
    </div>
  )
}

export default OrderComplete