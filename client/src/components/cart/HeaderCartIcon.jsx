import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import './headercart.css'
import { useSelector } from 'react-redux';
import { cartCount } from '../Helper/cartHelper';
function HeaderCartIcon() {
    
    const result = useSelector((state) => state.cart);
    // console.log('cart state ', result)
    let itemCount = result.cart ? result.cart.totalItems : 0
    // console.log(' itemd count', itemCount)
    
  return (
    <>
        <div className='headerCart cursor-pointer'>
            <FontAwesomeIcon icon={faShoppingCart} style={ {
                fontSize:'18px'
            } } />
            <span className='cartCount'>
                {/* {cartCount()} */}
                { itemCount }
            </span>
        </div>
    </>
  )
}

export default HeaderCartIcon