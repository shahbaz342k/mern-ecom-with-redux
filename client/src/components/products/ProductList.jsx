import React from 'react'
import AddToCart from '../cart/AddToCart'
import { firstLetterUpperCase } from '../Helper/common';
import './productlist.css'   
const ProductList = (props) => {
    const {product} = props;

  return (
    <div className="card mt-4" style={{width: "18rem",marginRight:"15px"}}>
        <img src={product.image} className="card-img-top img-responsive" alt={product.title}/>
        <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text"><b>Category: </b> { firstLetterUpperCase(product.category) }</p>
            <div className='card-btm'>
            <AddToCart product={product}/>
            <span className='productPrice'>$ {product.price} </span>
            </div>
        </div>
    </div>
  )
}

export default ProductList