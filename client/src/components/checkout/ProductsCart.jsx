import React from 'react'
import { useSelector } from 'react-redux';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const url = 'http://localhost:5000/api/cart'
export const ProductsCart = () => {
    const cartProducts = useSelector( (state) => state.cart );
    // console.log('clg  ', cartProducts);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
    const getQty = (id) => {
        let qty = cartProducts.cart.items[id];
        return qty;
    }

    useEffect(() => {
        if (cartProducts.cart.items) {
          let ids = Object.keys(cartProducts.cart.items);
          ids = ids.toString()
          fetchCart(url, { ids });
        }
    }, [cartProducts.cart]);

  return (
   
    <>
     { data ? data.map( (item) => (
        <li className="list-group-item d-flex justify-content-between lh-sm" key={item._id}>
            <div>
            <h6 className="my-0">{item.title}</h6>
            <small className="text-muted">category : <b>{item.category}, </b></small>
            <small className="text-muted">qty : <b>{getQty(item._id)}</b></small>
            </div>
            <span className="text-muted">${item.price}</span>
        </li>
     ))
        
    : ''}
    </>
  )
}
export default ProductsCart;