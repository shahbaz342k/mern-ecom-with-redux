import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart, updateCartQuantity } from './../../redux/actions/cartActions';
const CartItemsRow = (props) => {
    const dispatch = useDispatch();
    const result = useSelector((state) => state.cart);
    const [loading, setLoading] = useState(false);
    const {item} = props;

    const getIds = () => {
        if( result.cart.items ){
          let ids = Object.keys(result.cart.items);
          ids = ids.toString();
          return {ids};
        }
      }
      
      const qtyIncrement = (item, _id, updtype) => {
        // e.preventDefault()
        console.log('increment id ', _id)
        setLoading(true)
        dispatch(updateCartQuantity(item, _id, updtype));
        // fetchCart(url,getIds);
        setLoading(false)
    
      }
    
      const qtyDecrement = (item,_id,updtype) => {
          console.log('decrement id ', _id)
          if( _id > 1 ){
            setLoading(true)
            dispatch(updateCartQuantity(item,_id,updtype))
            // fetchCart(url,getIds);
            setLoading(false)
          }
      }
      const removeItem = (item) => {
        if( window.confirm('Are you sure want to delete') ){
          dispatch(removeFromCart(item))
        }
        
      }
      const getQty = (_id) => {
        if( result.cart.items ){
          console.log('get qty ', result)
          return result.cart.items[_id];
        }
      }
      const getSubTotal = (_id, price) => {
        if( result.cart.items ){
          return result.cart.items[_id] * price;
        }else{
          return price;
        }
      }

  return (
    <div className='cartItems d-flex' key={item._id}>
        <img src={item.image} alt={item.title} width="80px" />
        <p className='cartTitle'> {item.title} </p>
        <div className='cartQty'>
        {/* <button className='btn btn-primary' onClick={() => qtyDecrement(item._id)}>-</button> */}
        <button className='btn btn-primary' onClick={() => qtyDecrement(item, result.cart.items[item._id], 'dec')}>-</button>
        <input type="text" className='qty' value={ getQty(item._id) } />
        {/* <button className='btn btn-primary' onClick={(e) => qtyIncrement(e, item._id)}>+</button> */}
        <button className='btn btn-primary' onClick={() => qtyIncrement(item,result.cart.items[item._id],'inc')}>+</button>
        </div>
        {/* dispatch(updateCartQuantity(item,result.cart.items[item._id],'inc')) */}
        <div className='subTotal'>$ { getSubTotal(item._id,item.price) }</div>
        <button className='btn btn-danger' onClick={()=> removeItem(item) }>Remove</button>
    </div>
  )
}

export default CartItemsRow