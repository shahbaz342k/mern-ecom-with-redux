import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import './cartitempage.css'
import { removeFromCart, updateCartQuantity } from './../../redux/actions/cartActions';
const url = 'http://localhost:5000/api/cart'

const CartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();

  const result = useSelector((state) => state.cart);

  const fetchCart = async (url,payload) => {
    setLoading(true)
    try{
      const res = await axios.post(url, payload);
      setTimeout(() => {
        setData(res.data.result);
        setLoading(false)
        console.log(res);
      }, 1000);
      
    }catch(err){
      setError(err)
      // console.log(err)
    }
    
  } 
  
  useEffect(() => {
    if( result.cart ){
      console.log('result cart', result.cart);
      // let ids = result.cart.items.map( item => console.log(item));
      let ids = Object.keys(result.cart.items);
      ids = ids.toString()
      fetchCart(url,{ids});
    }
    
    // console.log(result.cart);
  }, [result.cart]);

  /*const qtyIncrement = (e, _id) => {
    e.preventDefault()
    console.log('increment id ', _id)
    console.log(result.cart)
    let product = result.cart.filter( (item,key) => {
      if( item._id === _id ){
        result.cart[key].count++;
      }
    })
    console.log('product ', product)

  }

  const qtyDecrement = (e, _id) => {
  
      e.preventDefault()
      console.log('decrement id ', _id)
      console.log(result.cart)
      let product = result.cart.filter( (item,key) => {
        if( item._id === _id ){
          if( result.cart[key].count > 1 ){
            result.cart[key].count--;
          }
        }
      })
      console.log('product ', product)
  }
  */

  const totalPrice = () => {
    return 0;
    let total=0;
    let qty;
    if( result.cart ){
      // total = data.reduce(function (result, item) {
      //   return result + ( item.price * result.cart.items[item._id] );
      // }, 0);
      total = data.map((item) =>{
        if( result.cart.tems[item._id] ){
          qty = result.cart.tems[item._id];
        }
        total += qty * item.price; 
      });
      // data.map( (item) => )
    }
    return total;
   
  }
  
  

  return (
    <div className='cartWrap'>
        <div className='row'>
          <div className='col-9'>
            <div className='cartItemBox'>
              <h6 className='boxTitle text-center'>Shopping Items</h6>
              {loading ? 'loading...' : data?.map( (item,key) => (<>
                
                <div className='cartItems d-flex' key={item._id}>
                  <img src={item.image} alt={item.title} width="80px" />
                  <p className='cartTitle'> {item.title} </p>
                  <div className='cartQty'>
                    {/* <button className='btn btn-primary' onClick={() => qtyDecrement(item._id)}>-</button> */}
                    <button className='btn btn-primary' onClick={() => dispatch(updateCartQuantity(item, result.cart.items[item._id], 'dec' ))}>-</button>
                    <input type="text" className='qty' value={result.cart.items[item._id]} />
                    {/* <button className='btn btn-primary' onClick={(e) => qtyIncrement(e, item._id)}>+</button> */}
                    <button className='btn btn-primary' onClick={() => dispatch(updateCartQuantity(item,result.cart.items[item._id],'inc'))}>+</button>
                  </div>
                  <div className='subTotal'>$ { result.cart.items[item._id] * item.price }</div>
                  <button className='btn btn-danger' onClick={()=>
                    dispatch(removeFromCart(item))
                  }>Remove</button>
                </div>
              
              </>))}
              

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
    </div>
  )
}

export default CartComponent