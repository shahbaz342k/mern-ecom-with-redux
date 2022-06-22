import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const ProceedToCheckout = (props) => {
    const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault()
    // alert('checkout click')
    navigate('/checkout', {state: {totalPrice:props.totalPrice}})
  }
  return (
    <>
    {/* {props.totalPrice} */}
        <button className="checkoutBtn" onClick={ (e) => handleClick(e) }>{props.btnTitle}</button>
    </>
  )
}

export default ProceedToCheckout