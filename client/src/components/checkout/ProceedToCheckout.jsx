import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { swal } from 'sweetalert';

const ProceedToCheckout = (props) => {
  const navigate = useNavigate();
  const {user} = useSelector( (state) => state.user);
  // swal('hello w', 'cancel')
  const handleClick = (e) => {
    e.preventDefault()
    // alert('checkout click')
    //  swal('hello w', 'cancel')
    if( user ){
      navigate('/checkout', {state: {totalPrice:props.totalPrice}})
    }else{
      // swal('Please Login first')
      // swal('Please Login first', 'ok')
      alert('Please login first')
      navigate('/user/login');
    }
    
  }
  return (
    <>
    {/* {props.totalPrice} */}
        <button className="checkoutBtn" onClick={ (e) => handleClick(e) }>{props.btnTitle}</button>
    </>
  )
}

export default ProceedToCheckout