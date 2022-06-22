import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import './cartitempage.css'
import CartItemsRow from './CartItemsRow';

const url = 'http://localhost:5000/api/cart'

const CartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const result = useSelector((state) => state.cart);

  const fetchCart = async (url,payload) => {
    setLoading(true)
    try{
      const res = await axios.post(url, payload);
      setData(res.data.result);
      setLoading(false)
      console.log(res);
      
    }catch(err){
      setError(err)
      console.log(err)
    }
    
  } 

 
  
  useEffect(() => {
    if( result.cart.items ){
      console.log('result cart', result.cart);
      // let ids = result.cart.items.map( item => console.log(item));
      let ids = Object.keys(result.cart.items);
      ids = ids.toString()
      fetchCart(url,{ids});
    }
    
    // console.log(result.cart);
  }, [result.cart]);

  const totalPrice = () => {
    // return 0;
    let total=0;
    let qty;
    if(result.cart){
      // console.log('total s: ', result.cart)
      // console.log('daga : ', data)
      data.map( (product) => {
        qty = result.cart.items[product._id];
        // console.log(qty)
        total += qty * product.price;
      })

    }
    return total;
   
  }
  
  return (
    <div className='cartWrap'>
      { result.cart.totalItems > 0 ?
      <div className='row'>
          <div className='col-9'>
          <h2>Cart</h2>
            <div className='cartItemBox'>
              <h6 className='boxTitle text-center'>Shopping Items</h6>
              {loading ? 'loading...' : data.map( (item) => <CartItemsRow item={item} key={item._id} /> ) }
              

              <div className='cartTotal'>
                <div className='row'>
                    <div className='col-10'></div>
                    <div className='col-2'>
                    <h4>Total: ${totalPrice() ? totalPrice() : 0}</h4>
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div className='col-3'>
            <h4>right</h4>
          </div>
      </div>
      :
      <div className='emptyCart'>
          <div className='container'>
            <div className='col-12 m-auto'></div>
            <img src="/empty-cart.png" alt="empty cart" style={
              {
                width:'400px',
                marginRight:'auto',
                marginLeft:'auto',
                display:'block'

              }
            } />
              <h2 className='text-center mt-4'>Cart Empty</h2>
          </div>
             
          </div>
      }
    </div>
  )
}

export default CartComponent