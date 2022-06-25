import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import './cartitempage.css'
import CartItemsRow from './CartItemsRow';
import { cartCount } from '../Helper/cartHelper';
import Loader from '../loader/Loader';
import ProceedToCheckout from '../checkout/ProceedToCheckout';
import { Link } from 'react-router-dom';

const url = 'http://localhost:5000/api/cart'

const CartComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadershow, setLoadershow] = useState(false);
  

  const result = useSelector((state) => state.cart);

  const fetchCart = async (url, payload) => {
    setLoading(true)
    try {
      const res = await axios.post(url, payload);
      setData(res.data.result);
      setLoading(false)
      console.log(res);

    } catch (err) {
      setError(err)
      console.log(err)
    }

  }
  useEffect(() => {
    if (result.cart.items) {
      console.log('result cart', result.cart);
      // let ids = result.cart.items.map( item => console.log(item));
      let ids = Object.keys(result.cart.items);
      ids = ids.toString()
      fetchCart(url, { ids });
    }

    // console.log(result.cart);
  }, [result.cart]);
  
  const shippingRate = () => {
    return 5;
  }

  const totalPrice = () => {
    // return 0;
    let total = 0;
    let qty;
    if (result.cart) {
      // console.log('total s: ', result.cart)
      // console.log('daga : ', data)
      data.map((product) => {
        qty = result.cart.items[product._id];
        // console.log(qty)
        total += qty * product.price;
      })

    }
    return total.toFixed(2);

  }

  return (
    <div className='cartWrap'>

      { loadershow ? <Loader /> : ''}
            

      {result.cart.totalItems > 0 ?
        <div className="cardItem">
          <div className="row">
            <div className="col-md-8 cart">
              <div className="title">
                <div className="row">
                  <div className="col"><h4><b>Shopping Cart</b></h4></div>
                  <div className="col align-self-center text-right text-muted">{cartCount()} items</div>
                </div>
              </div>
              {/* add map data here */}
              {loading ? 'loading...' : data.map((item) => <CartItemsRow item={item} key={item._id} />)}

              <div className="back-to-shop">
                <Link to='/'>
                <span className="text-muted">Back to shop</span>
                </Link>
                </div>
            </div>
            <div className="col-md-4 summary">
              <div className="checkoutWrapper">
                <div className="summarywrap">
                  <h2 className="mb-15">Summary</h2>
                  <div className="subTotal df-jcsb mb-10">
                    <h6>Sub Total</h6><span>$ {totalPrice() ? totalPrice() : 0}</span>
                  </div>
                  <div className="esShippingTax df-jcsb mb-10">
                    <h6>Estimate Shipping and Tax</h6><span>$ {shippingRate()}</span>
                  </div>
                  <div className="finalTotal df-jcsb mb-10">
                    <h6>Total</h6><span> $ {totalPrice() ? +totalPrice()+shippingRate() : 0}</span>
                    </div>
                  </div>
                 
                  <ProceedToCheckout btnTitle='Proceed to checkout' totalPrice={+totalPrice()+shippingRate() }/>
                </div>
            </div>
          </div>
        </div>
        :
        <div className='emptyCart'>
          <div className='container'>
            <div className='col-12 m-auto'></div>
            <img src="/empty-cart.png" alt="empty cart" className='emptyCart' />
            <h2 className='text-center mt-4'>Cart Empty</h2>
          </div>

        </div>
      }
    </div>
  )
}

export default CartComponent